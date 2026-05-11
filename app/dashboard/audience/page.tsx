import { Crown, Mail, MessageSquare, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/dashboard/section-header";

const people = [
  { name: "Sasha M.", seed: "Sasha", tier: "Founder", spent: "$248", joined: "Mar 12" },
  { name: "Devansh P.", seed: "Devansh", tier: "Builder", spent: "$56", joined: "Mar 18" },
  { name: "Lia R.", seed: "Lia", tier: "Operator", spent: "$1,210", joined: "Jan 4" },
  { name: "Noor A.", seed: "NoorA", tier: "Founder", spent: "$310", joined: "Feb 22" },
  { name: "Ravi T.", seed: "RaviT", tier: "Builder", spent: "$78", joined: "Apr 1" },
  { name: "Mei H.", seed: "MeiH", tier: "Founder", spent: "$420", joined: "Apr 8" }
];

export default function AudiencePage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Audience"
        description="Customers, members, and AI-chat leads."
        actions={
          <>
            <Button variant="outline">
              <Mail className="h-3.5 w-3.5" />
              Broadcast
            </Button>
            <Button variant="gradient">
              <UserPlus className="h-3.5 w-3.5" />
              Invite
            </Button>
          </>
        }
      />

      <div className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid grid-cols-12 gap-2 border-b bg-secondary/40 px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          <div className="col-span-5">Member</div>
          <div className="col-span-3">Tier</div>
          <div className="col-span-2">Spent</div>
          <div className="col-span-2 text-right">Joined</div>
        </div>
        <div className="divide-y">
          {people.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-12 items-center gap-2 px-4 py-3 hover:bg-secondary/40"
            >
              <div className="col-span-5 flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${p.seed}&backgroundColor=ede9fe`}
                  />
                  <AvatarFallback>{p.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.name.toLowerCase().replace(/\s+/g, "")}@email.com
                  </p>
                </div>
              </div>
              <div className="col-span-3">
                <Badge
                  variant={
                    p.tier === "Operator"
                      ? "soft"
                      : p.tier === "Founder"
                        ? "success"
                        : "outline"
                  }
                >
                  {p.tier === "Operator" && <Crown className="mr-1 h-3 w-3" />}
                  {p.tier}
                </Badge>
              </div>
              <div className="col-span-2 text-sm">{p.spent}</div>
              <div className="col-span-2 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                {p.joined}
                <Button size="icon" variant="ghost" className="h-7 w-7">
                  <MessageSquare className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
