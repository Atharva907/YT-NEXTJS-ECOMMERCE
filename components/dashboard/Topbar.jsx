"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";

export default function Topbar({ onOpenSidebar = () => {} }) {
  const [playerName, setPlayerName] = useState("Player");
  const router = useRouter();
  
  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const responseData = await response.json();
          // The actual user data is in the data field
          const userData = responseData.data || responseData;
          
          // Try to get player name from player profile
          if (userData.email) {
            const playerResponse = await fetch(`/api/player?email=${encodeURIComponent(userData.email)}`);
            if (playerResponse.ok) {
              const playerData = await playerResponse.json();
              if (playerData.fullName) {
                // Extract first name from full name
                const firstName = playerData.fullName.split(" ")[0];
                setPlayerName(firstName);
                return;
              }
            }
          }
          
          // Fallback to user name if player profile not found
          if (userData.name) {
            // Extract first name from full name
            const firstName = userData.name.split(" ")[0];
            setPlayerName(firstName);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    // Clear player data from localStorage
    localStorage.removeItem("playerEmail");
    // Redirect to login page
    router.push("/auth/login");
  };
  
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700 p-4 flex justify-between items-center z-30 md:static shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"></div>
      <div className="flex items-center gap-3">
        {/* Mobile menu button (visible on small screens) */}
        <Button
          onClick={onOpenSidebar}
          type="button"
          size="icon"
          className="md:hidden bg-slate-800 hover:bg-slate-700 border border-slate-600"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
        <div>
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Welcome back, {playerName}!</h2>
          <p className="text-xs text-gray-400">Ready for your next challenge?</p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={() => router.push("/dashboard/my-account")}
          className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20 hover:border-purple-500 transition-all duration-300 flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Profile
        </Button>
        <Button 
          className="bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-700 hover:to-pink-700 transition-all duration-300 flex items-center gap-2" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
