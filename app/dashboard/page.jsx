import DashboardCard from "@/components/dashboard/DashboardCard";
import QuickNavigation from "@/components/dashboard/QuickNavigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Gamepad2, Wallet, TrendingUp, Users, Calendar } from "lucide-react";

export default function DashboardHome() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your esports overview</p>
      </div>
      
      <QuickNavigation />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <DashboardCard title="Tournaments Played" value="8" />
        <DashboardCard title="Wins" value="3" />
        <DashboardCard title="Win Rate" value="37.5%" />
        <DashboardCard title="Earnings" value="$450" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Upcoming Tournaments
            </CardTitle>
            <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Valorant Blitz Cup</p>
                    <p className="text-xs text-gray-400">Nov 10, 2025</p>
                  </div>
                </div>
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/50">Upcoming</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:border-purple-500/50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">CS2 Battle Arena</p>
                    <p className="text-xs text-gray-400">Nov 18, 2025</p>
                  </div>
                </div>
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/50">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Recent Transactions
            </CardTitle>
            <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div>
                  <p className="font-medium">Tournament Win</p>
                  <p className="text-xs text-gray-400">Oct 18, 2025</p>
                </div>
                <p className="font-semibold text-green-400">+$150</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div>
                  <p className="font-medium">Withdrawal</p>
                  <p className="text-xs text-gray-400">Oct 10, 2025</p>
                </div>
                <p className="font-semibold text-red-400">-$100</p>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div>
                  <p className="font-medium">Tournament Win</p>
                  <p className="text-xs text-gray-400">Sep 25, 2025</p>
                </div>
                <p className="font-semibold text-green-400">+$225</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
