"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutGrid,
  Briefcase,
  FileText,
  Settings,
  Search,
  Users,
  Building2,
  PlusCircle,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItemsByRole = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutGrid,
    },
    {
      id: "seeker-browse-jobs",
      name: "Browse Jobs",
      url: "/dashboard/seeker/jobs",
      icon: Search,
    },
    {
      id: "seeker-applications",
      name: "Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutGrid,
    },
    {
      id: "recruiter-manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "add-jobs",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-applications",
      name: "Applications",
      url: "/dashboard/recruiter/applications",
      icon: FileText,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutGrid,
    },
    {
      id: "admin-manage-users",
      name: "Manage Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-manage-companies",
      name: "Manage Companies",
      url: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      id: "admin-manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
};

export function DashboardSidebar() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const role = session?.user?.role;

  const name = session?.user?.name ?? "Alex Sterling";
  const roleLabel = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "Recruiter";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar className="border-r border-white/5">
      <SidebarHeader className="gap-6 p-5">
        {/* Logo */}
        <Link href="/" className="px-1 pt-1">
          <Image src={logo} alt="HireLoop" priority className="h-7 w-auto" />
        </Link>

        {/* Profile card */}
        <div className="rounded-xl bg-[#15151d] p-4 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 ring-1 ring-white/10">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt={name}
                className="object-cover"
              />
              <AvatarFallback className="bg-[#5c53fe]/20 text-xs font-semibold text-[#b8b3fe]">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold leading-tight text-white">
                {name}
              </p>
              <p className="mt-1 text-xs leading-tight text-white/45">
                {roleLabel}
              </p>
              <Badge
                variant="outline"
                className="mt-3 h-6 rounded-full border-[#5c53fe]/40 bg-[#5c53fe]/10 px-3 text-[10px] font-medium tracking-wide text-[#a79fff] "
              >
                Premium account
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup>
          <SidebarMenu>
            {menuItemsByRole[role]?.map((item) => {
              const active = pathname === item.url;
              return (
                <SidebarMenuItem key={item.id}>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="absolute -left-2 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-[#5c53fe]"
                    />
                  )}
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={active}
                    className={
                      active
                        ? "bg-[#1b1b25] text-white hover:bg-[#1b1b25] hover:text-white"
                        : "text-[#8f8f9b] hover:bg-white/5 hover:text-white"
                    }
                  >
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
