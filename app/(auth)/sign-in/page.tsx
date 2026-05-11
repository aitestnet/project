"use client";

import Link from "next/link";
import { ArrowRight, Github, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Sign in to your Teskel identity.
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
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot?
            </Link>
          </div>
          <Input id="password" type="password" placeholder="••••••••" />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>

      <p className="mt-6 text-sm">
        New to Teskel?{" "}
        <Link href="/sign-up" className="font-medium text-foreground hover:underline">
          Claim your handle
        </Link>
      </p>
    </div>
  );
}
