import * as React from "react";
import { db } from "@/lib/db";
import { mapCreator } from "@/lib/data-mapper";
import { PersonaClient } from "./persona-client";

export default async function PersonaPage() {
  let clerkUserId: string | null = null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();
    clerkUserId = session.userId;
  } catch (e) {}

  let dbCreator = null;
  if (clerkUserId) {
    dbCreator = await db.creator.findUnique({
      where: { clerkUserId }
    });
  }

  if (!dbCreator) {
    dbCreator = await db.creator.findFirst({
      where: { username: "yogi" }
    });
  }

  if (!dbCreator) {
    return <div>No creator found. Run db:seed.</div>;
  }

  const creator = mapCreator(dbCreator);

  return <PersonaClient creator={creator} />;
}
