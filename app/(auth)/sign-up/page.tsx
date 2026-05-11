"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, AtSign, Check, Github, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUpPage() {
  const [handle, setHandle] = React.useState("");
  const cleaned = handle.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 24);
  const available = cleaned.length >= 3;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Claim your <span className="font-mono">.ai</span> identity
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Free forever for hobbyists. No credit card required.
      </p>

      <div className="mt-6 grid gap-2">
        <Button variant="outline" className="w-full">
          <Github className="h-4 w-4" />
          Continue with GitHub
        </Button>
        <Button variant="outline" className="w-full">
          <Mail className="h-4 w-4" />
          Continue with email
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        or sign up with handle
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="handle">Pick your handle</Label>
          <div className="flex h-11 items-center rounded-lg border bg-background px-3 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1">
            <AtSign className="h-4 w-4 text-muted-foreground" />
            <input
              id="handle"
              value={cleaned}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="yourhandle"
              className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <span className="font-mono text-sm text-muted-foreground">.ai</span>
          </div>
          {cleaned && (
            <p className="text-xs text-muted-foreground">
              {available ? (
                <span className="inline-flex items-center gap-1 text-emerald-600">
                  <Check className="h-3 w-3" />
                  <span className="font-mono">{cleaned}.ai</span> is available.
                </span>
              ) : (
                <>Handle must be at least 3 characters.</>
              )}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={!available}
        >
          Create my AI identity
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-xs text-muted-foreground">
        By signing up you agree to the Terms and Privacy Policy.
      </p>
      <p className="mt-4 text-sm">
        Already on Teskel?{" "}
        <Link href="/sign-in" className="font-medium text-violet-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
