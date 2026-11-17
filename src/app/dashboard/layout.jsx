import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default async function Layout({ children }) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="relative min-w-0 flex-1 bg-[#131314]">
        <div className="absolute right-2 top-2 z-20">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
