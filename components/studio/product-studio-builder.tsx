"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createProductAction } from "@/app/actions/product";
import { ProductCard } from "@/components/identity/product-card";
import type { Product } from "@/lib/types";

import { TypeSelector } from "./steps/type-selector";
import { ContentEditor } from "./steps/content-editor";
import { PricingEditor } from "./steps/pricing-editor";

const STEPS = ["Type", "Content", "Pricing"];

export function ProductStudioBuilder({ creatorUsername }: { creatorUsername: string }) {
  const router = useRouter();
  const [step, setStep] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState<string | null>(null);

  // Form State
  const [data, setData] = React.useState({
    kind: "",
    runtime: "static" as "static" | "executable",
    title: "",
    emoji: "📦",
    description: "",
    price: 0,
    repoUrl: ""
  });

  const nextStep = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handlePublish = async () => {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", data.title || "Untitled Offer");
        formData.append("description", data.description);
        formData.append("price", data.price.toString());
        formData.append("kind", data.kind);
        formData.append("runtime", data.runtime);
        formData.append("emoji", data.emoji);
        if (data.repoUrl) formData.append("repoUrl", data.repoUrl);

        await createProductAction(formData);
        router.push("/dashboard/products");
      } catch (err: any) {
        setError(err.message || "Failed to publish product");
      }
    });
  };

  // Construct a dummy product for the Live Preview
  const previewProduct: Product = {
    id: "preview",
    slug: "preview",
    title: data.title || "Untitled Offer",
    emoji: data.emoji,
    description: data.description || "Your offer description will appear here.",
    price: data.price,
    kind: (data.kind || "ebook") as any,
    runtime: data.runtime,
    badges: data.runtime === "executable" ? ["Live"] : ["Digital"],
    rating: 5.0,
    sales: 0,
    thumbnail: "",
    currency: "USD"
  };

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col bg-background/95 backdrop-blur-xl">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
            <X className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            <span className="text-muted-foreground">Identity OS / </span>
            <span>New Offer</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="hidden items-center gap-2 md:flex">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                    step === i
                      ? "bg-foreground text-background"
                      : step > i
                      ? "bg-emerald-500/20 text-emerald-500"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`text-sm ${step === i ? "text-foreground font-medium" : "text-muted-foreground"}`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && <div className="h-px w-8 bg-border" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Draft saved</span>
          <Button
            onClick={step === STEPS.length - 1 ? handlePublish : nextStep}
            disabled={isPending || (step === 0 && !data.kind)}
            className="rounded-full"
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {step === STEPS.length - 1 ? "Publish" : "Next step"}
            {step < STEPS.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Left Panel */}
        <div className="flex w-full flex-col overflow-y-auto px-6 py-12 md:w-3/5 lg:px-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mx-auto w-full max-w-xl flex-1"
            >
              {step === 0 && (
                <TypeSelector
                  data={data}
                  onChange={(k, r, repo) => setData({ ...data, kind: k, runtime: r, repoUrl: repo || "" })}
                />
              )}
              {step === 1 && (
                <ContentEditor
                  data={data}
                  onChange={(d) => setData({ ...data, ...d })}
                />
              )}
              {step === 2 && (
                <PricingEditor
                  data={data}
                  onChange={(d) => setData({ ...data, ...d })}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Footer Nav */}
          <div className="mx-auto mt-12 flex w-full max-w-xl items-center justify-between">
            {step > 0 ? (
              <Button variant="ghost" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Live Preview Right Panel */}
        <div className="hidden w-2/5 flex-col items-center justify-center border-l bg-secondary/30 p-12 md:flex relative">
           <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-widest">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Offer Preview
           </div>
           <div className="w-full max-w-sm">
              <ProductCard product={previewProduct} />
           </div>
           <div className="mt-8 rounded-xl border bg-card p-4 text-center max-w-sm w-full">
             <p className="text-sm font-medium">Identity URL</p>
             <p className="mt-1 font-mono text-xs text-muted-foreground">teskel.app/{creatorUsername}</p>
           </div>
        </div>
      </div>
      
      {error && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-destructive px-4 py-2 text-sm text-destructive-foreground shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
