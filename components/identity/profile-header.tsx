import {
  BadgeCheck,
  Github,
  Globe,
  Heart,
  Instagram,
  MapPin,
  Share2,
  Sparkles,
  Star,
  Twitter,
  Youtube
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCompactNumber, initials } from "@/lib/utils";
import type { Creator } from "@/lib/types";

const socialIcon = {
  x: Twitter,
  github: Github,
  youtube: Youtube,
  instagram: Instagram,
  site: Globe
} as const;

export function ProfileHeader({ creator }: { creator: Creator }) {
  return (
    <section className="overflow-hidden rounded-3xl border bg-card">
      <div
        className="relative h-40 w-full bg-secondary md:h-48"
        style={
          creator.cover
            ? {
                backgroundImage: `linear-gradient(180deg, transparent, rgba(0,0,0,0.25)), url(${creator.cover})`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }
            : undefined
        }
      />
      <div className="px-6 pb-6 md:px-8 md:pb-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="-mt-12 flex flex-col items-start gap-4 md:flex-row md:items-end">
            <Avatar className="h-24 w-24 rounded-2xl border-4 border-card shadow-md">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback className="rounded-2xl">
                {initials(creator.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="flex items-center gap-2 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                {creator.name}
                {creator.verified && (
                  <BadgeCheck className="h-5 w-5 fill-foreground text-background" />
                )}
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-mono">{creator.username}.ai</span>
                {creator.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {creator.location}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {creator.rating} · {formatCompactNumber(creator.followers)}{" "}
                  followers
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-3.5 w-3.5" />
              Follow
            </Button>
            <Button size="sm">
              <Sparkles className="h-3.5 w-3.5" />
              Chat with {creator.name.split(" ")[0]}&rsquo;s AI
            </Button>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-base text-foreground/90">
          {creator.tagline}
        </p>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          {creator.bio}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-secondary">{creator.niche}</Badge>
          {creator.persona.expertise.slice(0, 3).map((e) => (
            <Badge key={e} variant="outline">
              {e}
            </Badge>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
          {creator.socials.map((s) => {
            const Icon = socialIcon[s.kind] ?? Globe;
            return (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5" />
                {s.label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
