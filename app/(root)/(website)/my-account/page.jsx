"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp, Calendar, Gamepad2, Shield, Zap } from "lucide-react";
import QuickNavigation from "@/components/dashboard/QuickNavigation";
import { getPlayerData, getPlayerInitials } from "@/services/playerService";
import { getCurrentUser } from "@/lib/authUtils";

const MyAccount = () => {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await getPlayerData();
        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching player data:", error);
        console.error("Full error details:", error);
        // If authentication fails, try to use Redux auth state as fallback
        try {
          const currentUser = getCurrentUser();
          if (currentUser) {
            setPlayerData({
              id: currentUser.id,
              username: currentUser.name,
              email: currentUser.email,
              avatar: currentUser.avatar || '/assets/avatar.jpg',
              level: Math.floor(Math.random() * 50) + 1,
              rank: Math.random() > 0.5 ? 'PRO PLAYER' : 'AMATEUR',
              memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              stats: {
                tournaments: Math.floor(Math.random() * 20) + 1,
                wins: Math.floor(Math.random() * 10) + 1,
                winRate: Math.floor(Math.random() * 100),
                points: Math.floor(Math.random() * 5000) + 500
              },
              recentTournaments: [
                {
                  id: 1,
                  name: 'Valorant Cup',
                  date: 'Oct 15, 2025',
                  result: 'Semi-Finalist',
                  icon: 'Trophy',
                  color: 'from-red-500 to-orange-500'
                },
                {
                  id: 2,
                  name: 'CS2 Battle',
                  date: 'Sep 30, 2025',
                  result: 'Winner',
                  icon: 'Shield',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  id: 3,
                  name: 'Apex Championship',
                  date: 'Sep 15, 2025',
                  result: 'Quarter-Finalist',
                  icon: 'Trophy',
                  color: 'from-purple-500 to-pink-500'
                }
              ],
              favoriteGames: [
                'Valorant',
                'CS2',
                'Apex Legends',
                'League of Legends',
                'Overwatch 2'
              ]
            });
            return;
          }
        } catch (e) {
          console.error("Failed to get current user:", e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-xl">Loading player data...</div>
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8 flex flex-col items-center justify-center gap-4">
        <div className="text-xl">Failed to load profile data</div>
        <p className="text-gray-300">Please refresh the page or try logging in again</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Refresh Page
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Player Profile</h1>
        <p className="text-gray-300">Manage your gaming profile and track your esports journey</p>
      </div>
      
      <QuickNavigation />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Player Profile Card */}
        <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white overflow-hidden lg:col-span-1">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-pink-600"></div>
          <div className="px-6 pb-6 -mt-12">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24 border-4 border-slate-800">
                <AvatarImage src={playerData.avatar} alt="Player Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-2xl">{getPlayerInitials(playerData.username)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">{playerData.username}</h2>
              <p className="text-gray-400 mb-3">{playerData.email}</p>
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="outline" className="bg-purple-600/20 text-purple-300 border-purple-500/50">{playerData.rank}</Badge>
                <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/50">LEVEL {playerData.level}</Badge>
              </div>
              <div className="text-sm text-gray-400 mb-1">Member Since</div>
              <div className="text-lg">{playerData.memberSince}</div>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">Edit Profile</Button>
          </div>
        </Card>
        
        {/* Stats and Achievements */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <Trophy className="h-8 w-8 text-yellow-400 mb-2" />
              <div className="text-2xl font-bold">{playerData.stats.tournaments}</div>
              <div className="text-sm text-gray-400">Tournaments</div>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <Target className="h-8 w-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold">{playerData.stats.wins}</div>
              <div className="text-sm text-gray-400">Wins</div>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">{playerData.stats.winRate}%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <Zap className="h-8 w-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold">{playerData.stats.points.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Points</div>
            </Card>
          </div>
          
          {/* Recent Tournaments */}
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-xl flex items-center gap-2">
                <Gamepad2 className="h-5 w-5" />
                Recent Tournaments
              </CardTitle>
              <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {playerData.recentTournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`h-12 w-12 bg-gradient-to-br ${tournament.color} rounded-lg flex items-center justify-center`}>
                        {tournament.icon === 'Trophy' ? (
                          <Trophy className="h-6 w-6 text-white" />
                        ) : (
                          <Shield className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{tournament.name}</p>
                        <p className="text-sm text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3" /> {tournament.date}</p>
                      </div>
                    </div>
                    <Badge className={`${
                      tournament.result === 'Winner' ? 'bg-green-600/20 text-green-300 border-green-500/50' :
                      tournament.result === 'Semi-Finalist' ? 'bg-yellow-600/20 text-yellow-300 border-yellow-500/50' :
                      'bg-blue-600/20 text-blue-300 border-blue-500/50'
                    }`}>
                      {tournament.result}
                    </Badge>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Valorant Cup</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3" /> Oct 15, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-600/20 text-yellow-300 border-yellow-500/50">Semi-Finalist</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">CS2 Battle</p>
                      <p className="text-sm text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3" /> Sep 30, 2025</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600/20 text-green-300 border-green-500/50">Winner</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Favorite Games */}
          <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Favorite Games</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {playerData.favoriteGames.map((game, index) => (
                  <Badge key={index} variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600 px-3 py-1">{game}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
