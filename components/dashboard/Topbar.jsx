"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Topbar() {
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
    <header className="w-full bg-card border-b border-border p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Welcome back, {playerName}!</h2>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => router.push("/dashboard/my-account")}>Profile</Button>
        <Button className="bg-red-500 text-white hover:bg-red-600" onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}
