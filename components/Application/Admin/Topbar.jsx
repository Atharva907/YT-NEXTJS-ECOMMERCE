"use client";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";
import UserDropdown from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { RiMenu4Fill } from "react-icons/ri";

const Topbar = ({ onOpenSidebar = () => {} }) => {
  return (
    <header
      className="
        fixed top-0 left-0 h-14
        w-full md:ml-64 md:w-[calc(100%-16rem)]
        border-b z-30 flex justify-between items-center
        bg-white dark:bg-card px-5
      "
    >
      {/* Left: Search area */}
      <div className="flex-1 max-w-md">
        {/* Replace with your real search input */}
        <div className="text-sm text-muted-foreground">Searching content</div>
      </div>

      {/* Right: actions + mobile menu button */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <ThemeSwitch />
        <UserDropdown />

        {/* Mobile menu button (visible on small screens) */}
        <Button
          onClick={onOpenSidebar}
          type="button"
          size="icon"
          className="ms-2 md:hidden"
          aria-label="Open sidebar"
        >
          <RiMenu4Fill />
        </Button>
      </div>
    </header>
  );
};

export default Topbar;
