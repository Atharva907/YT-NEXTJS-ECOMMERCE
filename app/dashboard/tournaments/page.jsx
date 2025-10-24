"use client";

import RegisterCard from "./RegisterCard";
import RegisteredTournaments from "./RegisteredTournaments";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Trophy, Filter, Search, Calendar, TrendingUp } from "lucide-react";
// Removed hardcoded data import
import { filterTournamentsByStatus, sortTournamentsByDate } from "@/lib/esportUtils";
import LoadingSkeleton from "@/components/dashboard/LoadingSkeleton";

export default function TournamentsPage() {
  const router = useRouter();
  const [registered, setRegistered] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Fetch tournaments data from database
  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/tournaments");
      
        if (response.ok) {
          const data = await response.json();
          // The actual tournaments data is in data field
          const tournamentsData = data.data || data;
          console.log("API Response:", data);
          console.log("First tournament:", tournamentsData[0]);

          setTournaments(Array.isArray(tournamentsData) ? tournamentsData : []);
        } else {
          console.error("Failed to fetch tournaments");
        }
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTournaments();
  }, []);
  
  // Filter tournaments based on active tab and search term
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesTab = activeTab === "all" || tournament.status === activeTab;
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  // Sort tournaments by date
  const sortedTournaments = sortTournamentsByDate(filteredTournaments);
  
  const handleRegister = (id) => {
    router.push(`/tournaments/${id}/register`);
  };

  const handleUnregister = (id) => {
    setRegistered(registered.filter((t) => t !== id));
  };
  
  // Get counts for each status
  const upcomingCount = tournaments.filter(t => t.status === "upcoming").length;
  const liveCount = tournaments.filter(t => t.status === "live").length;
  const completedCount = tournaments.filter(t => t.status === "completed").length;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Tournaments</h1>
          <p className="text-gray-400 mt-1">Discover and compete in esports tournaments</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Upcoming</p>
              <p className="text-2xl font-bold">{upcomingCount}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Live Now</p>
              <p className="text-2xl font-bold">{liveCount}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700 text-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold">{completedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for filtering tournaments */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-slate-800 border-slate-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All</TabsTrigger>
          <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Upcoming</TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Live</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Card key={i} className="bg-slate-800 border-slate-700 h-96">
                  <LoadingSkeleton />
                </Card>
              ))}
            </div>
          ) : sortedTournaments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTournaments.map((t) => (
                <RegisterCard
                  key={t.id || t._id}
                  tournament={t}
                  isRegistered={registered.includes(t.id || t._id)}
                  onRegister={() => handleRegister(t.id || t._id)}
                  onUnregister={() => handleUnregister(t.id || t._id)}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-slate-800 border-slate-700 text-white p-8 text-center">
              <Trophy className="h-12 w-12 mx-auto text-gray-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No tournaments found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <RegisteredTournaments
        tournaments={tournaments.filter((t) => registered.includes(t.id || t._id))}
      />
    </div>
  );
}
