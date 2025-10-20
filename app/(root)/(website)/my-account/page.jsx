"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, TrendingUp, Calendar, Gamepad2, Shield, Zap } from "lucide-react";
import QuickNavigation from "@/components/dashboard/QuickNavigation";

const MyAccount = () => {
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
                <AvatarImage src="/assets/avatar.jpg" alt="Player Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-2xl">P1</AvatarFallback>
              </Avatar>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">Player123</h2>
              <p className="text-gray-400 mb-3">player@example.com</p>
              <div className="flex justify-center gap-2 mb-4">
                <Badge variant="outline" className="bg-purple-600/20 text-purple-300 border-purple-500/50">PRO PLAYER</Badge>
                <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/50">LEVEL 42</Badge>
              </div>
              <div className="text-sm text-gray-400 mb-1">Member Since</div>
              <div className="text-lg">September 2023</div>
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
              <div className="text-2xl font-bold">8</div>
              <div className="text-sm text-gray-400">Tournaments</div>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <Target className="h-8 w-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-gray-400">Wins</div>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold">37.5%</div>
              <div className="text-sm text-gray-400">Win Rate</div>
            </Card>
            <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-4 flex flex-col items-center justify-center">
              <Zap className="h-8 w-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold">2,450</div>
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
                <Badge variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600 px-3 py-1">Valorant</Badge>
                <Badge variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600 px-3 py-1">CS2</Badge>
                <Badge variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600 px-3 py-1">Apex Legends</Badge>
                <Badge variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600 px-3 py-1">League of Legends</Badge>
                <Badge variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600 px-3 py-1">Overwatch 2</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
