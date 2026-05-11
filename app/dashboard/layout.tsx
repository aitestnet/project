import Link from "next/link";

import { Logo } from "@/components/site/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Logo />
            <Badge variant="outline" className="hidden md:inline-flex">
              Dashboard
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/yogi"
              className="hidden text-xs text-muted-foreground hover:text-foreground md:inline"
            >
              View public page →
            </Link>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://api.dicebear.com/9.x/notionists/svg?seed=Yogi&backgroundColor=ede9fe" />
              <AvatarFallback>YP</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <div className="flex">
        <DashboardSidebar />
        <main className="min-w-0 flex-1 px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
