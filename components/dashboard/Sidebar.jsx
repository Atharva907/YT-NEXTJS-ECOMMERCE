"use client";

import Link from "next/link";
import { Home, User, Trophy, Settings, Wallet, Gamepad2 } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "My Account", href: "/dashboard/my-account", icon: User },
  { name: "Tournaments", href: "/dashboard/tournaments", icon: Gamepad2 },
  { name: "My Tournaments", href: "/dashboard/my-tournaments", icon: Trophy },
  { name: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Player Panel</h1>
      <nav className="space-y-2">
        {navItems.map(({ name, href, icon: Icon }) => (
          <Link
            key={name}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent hover:text-accent-foreground transition"
          >
            <Icon size={18} />
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
