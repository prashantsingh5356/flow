import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

import AppSidebar from "./_components/AppSidebar";

import { Separator } from "@/components/ui/separator";
import NavBreadCrumb from "./_components/NavBreadCrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100%] h-[100vh]  ">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="bg-white z-1000 flex h-16 sticky top-0  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-9"
              />
              <NavBreadCrumb />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
            <main>{children}</main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
