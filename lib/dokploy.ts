/**
 * Dokploy API client for the executable product runtime.
 *
 * Dokploy handles:
 * - Docker container management
 * - Auto-SSL certificate provisioning
 * - Subdomain routing ({product}.{creator}.ai)
 * - Zero-downtime deployments
 * - Logs and monitoring
 *
 * @see https://docs.dokploy.com/docs/core
 */

type DokployConfig = {
  apiUrl: string;
  apiToken: string;
};

function getConfig(): DokployConfig | null {
  const apiUrl = process.env.DOKPLOY_API_URL;
  const apiToken = process.env.DOKPLOY_API_TOKEN;
  if (!apiUrl || !apiToken) return null;
  return { apiUrl, apiToken };
}

async function dokployFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const config = getConfig();
  if (!config) throw new Error("Dokploy not configured");

  const res = await fetch(`${config.apiUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiToken}`,
      ...options?.headers
    }
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Dokploy API error [${res.status}]: ${body}`);
  }

  return res.json();
}

// ─── Project management ────────────────────────────────

export async function createProject(name: string, description?: string) {
  return dokployFetch<{ projectId: string }>("/api/project.create", {
    method: "POST",
    body: JSON.stringify({ name, description: description ?? "" })
  });
}

export async function listProjects() {
  return dokployFetch<{ projects: Array<{ projectId: string; name: string; status: string }> }>(
    "/api/project.all"
  );
}

// ─── Application deployment ────────────────────────────

export async function createApplication(opts: {
  projectId: string;
  name: string;
  sourceType: "github" | "docker" | "git";
  repository?: string;
  branch?: string;
  dockerImage?: string;
}) {
  return dokployFetch<{ applicationId: string }>("/api/application.create", {
    method: "POST",
    body: JSON.stringify({
      projectId: opts.projectId,
      name: opts.name,
      appName: opts.name.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      sourceType: opts.sourceType,
      repository: opts.repository,
      branch: opts.branch ?? "main",
      dockerImage: opts.dockerImage
    })
  });
}

export async function deployApplication(applicationId: string) {
  return dokployFetch<{ deploymentId: string }>("/api/application.deploy", {
    method: "POST",
    body: JSON.stringify({ applicationId })
  });
}

export async function getApplicationStatus(applicationId: string) {
  return dokployFetch<{
    applicationId: string;
    status: "running" | "deploying" | "stopped" | "error";
    url: string;
    lastDeployAt: string;
  }>(`/api/application.one?applicationId=${applicationId}`);
}

export async function getApplicationLogs(
  applicationId: string,
  tail = 50
) {
  return dokployFetch<{ logs: string[] }>(
    `/api/application.logs?applicationId=${applicationId}&tail=${tail}`
  );
}

// ─── Domain management ─────────────────────────────────

export async function addDomain(opts: {
  applicationId: string;
  host: string; // e.g. "seo.yogi.ai"
  https: boolean;
}) {
  return dokployFetch<{ domainId: string }>("/api/domain.create", {
    method: "POST",
    body: JSON.stringify({
      applicationId: opts.applicationId,
      host: opts.host,
      https: opts.https,
      certificateType: opts.https ? "letsencrypt" : "none"
    })
  });
}

// ─── Helper: full deploy flow ──────────────────────────

/**
 * One-shot deploy: create project → create app → add domain → deploy.
 *
 * Used when a creator publishes an executable product.
 */
export async function fullDeploy(opts: {
  creatorUsername: string;
  productSlug: string;
  repository: string;
  branch?: string;
}) {
  const projectName = `${opts.creatorUsername}-${opts.productSlug}`;
  const domain = `${opts.productSlug}.${opts.creatorUsername}.ai`;

  // 1. Create project
  const { projectId } = await createProject(projectName, `Executable product: ${opts.productSlug}`);

  // 2. Create application from GitHub
  const { applicationId } = await createApplication({
    projectId,
    name: projectName,
    sourceType: "github",
    repository: opts.repository,
    branch: opts.branch ?? "main"
  });

  // 3. Add custom domain with auto-SSL
  await addDomain({
    applicationId,
    host: domain,
    https: true
  });

  // 4. Trigger deployment
  const { deploymentId } = await deployApplication(applicationId);

  return {
    projectId,
    applicationId,
    deploymentId,
    domain: `https://${domain}`
  };
}
