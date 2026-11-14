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
      id: "add-jobs",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: PlusCircle,
    },
    {
      id: "recruiter-manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
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

  const name = session?.user?.name || "";
  const roleLabel = role ? role.charAt(0).toUpperCase() + role.slice(1) : "";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Sidebar className="border-r-0!">
      <SidebarHeader className="gap-1 p-4 pb-0">
        {/* Logo */}
        <Link href="/" className="flex h-[30px] items-center px-1">
          <Image src={logo} alt="HireLoop" priority className="h-7 w-auto" />
        </Link>

        {/* Profile card */}
        <div className="rounded-xl border border-[#232327] bg-[#151516] p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-10">
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
              <p className="truncate text-sm font-semibold leading-[18px] text-white">
                {name}
              </p>
              <p className="text-xs font-medium leading-4 text-[#a0a0ab]">
                {roleLabel}
              </p>
              <Badge
                variant="outline"
                className="mt-1 rounded-full border-[#5c53fe]/30 bg-[#232338] px-2.5 text-[11px] font-medium leading-none text-[#c3c0ff]"
              >
                Premium account
              </Badge>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 pt-5">
        <SidebarGroup className="p-0">
          <SidebarMenu className="gap-0.5">
            {menuItemsByRole[role]?.map((item) => {
              const active = pathname === item.url;
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={active}
                    className={
                      active
                        ? "h-10 rounded-lg px-3 text-sm font-medium text-[#f4f4f5]! data-active:bg-[#232327]! data-active:text-[#f4f4f5]! hover:bg-[#232327]! hover:text-[#f4f4f5]! [&_svg]:size-5! [&_svg]:text-[#5c53fe]!"
                        : "h-10 rounded-lg px-3 text-[13px] font-medium text-[#a1a4aa] hover:bg-white/5! hover:text-[#f4f4f5]! [&_svg]:size-[18px]!"
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
