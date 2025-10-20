"use client";

import { Button } from "@/components/ui/button";

export default function Topbar() {
  return (
    <header className="w-full bg-card border-b border-border p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Welcome back, Player!</h2>
      <div className="flex gap-3">
        <Button variant="outline">Profile</Button>
        <Button className="bg-red-500 text-white hover:bg-red-600">Logout</Button>
      </div>
    </header>
  );
}
