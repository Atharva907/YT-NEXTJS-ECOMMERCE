"use client";
import React, { useState } from "react";
import AppSidebar from "@/components/Application/Admin/AppSidebar";
import Topbar from "@/components/Application/Admin/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex h-screen">
          {/* Sidebar */}
          <AppSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

          {/* Content Area */}
          <div className="flex flex-col flex-1 ml-0 md:ml-64">
            {/* Topbar */}
            <Topbar onOpenSidebar={openSidebar} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto p-5 pt-16 pb-16">{children}</main>
          </div>

          {/* Fixed Footer: full width */}
          <footer className="fixed bottom-0 left-0 w-full h-12 border-t flex items-center justify-center bg-gray-50 dark:bg-background text-sm z-50">
            © {new Date().getFullYear()} GameArena. All rights reserved.
          </footer>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default Layout;
