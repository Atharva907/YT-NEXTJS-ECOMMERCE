"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Trophy, Clock, ExternalLink } from "lucide-react";
import { formatDate, getStatusColor } from "@/lib/esportUtils";

export default function RegisteredTournaments({ tournaments }) {
  if (tournaments.length === 0)
    return (
      <Card className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white p-8 text-center mt-8">
        <Trophy className="h-12 w-12 mx-auto text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Registered Tournaments</h3>
        <p className="text-gray-400">Register for tournaments to see them here</p>
      </Card>
    );

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">My Registered Tournaments</h2>
        <Badge variant="outline" className="bg-purple-600/20 text-purple-300 border-purple-500/50 px-3 py-1">
          {tournaments.length} Active
        </Badge>
      </div>
      
      <div className="grid gap-4">
        {tournaments.map((t) => (
          <Card key={t.id} className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-purple-500/50">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-32 md:h-auto bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Trophy className="h-16 w-16 text-white opacity-50" />
              </div>
              
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{t.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(t.date)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{t.region}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{t.format}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(t.status)}>
                      {t.status}
                    </Badge>
                    <Badge variant="outline" className="bg-slate-700/50 text-gray-200 border-slate-600">
                      {t.game}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex gap-6 text-sm">
                    <div>
                      <p className="text-gray-400">Entry Fee</p>
                      <p className="font-semibold text-green-400">{t.entryFee}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Prize Pool</p>
                      <p className="font-semibold text-yellow-400">{t.prize}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400">Participants</p>
                      <p className="font-semibold">{t.currentPlayers}/{t.maxPlayers}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                    
                    {t.status === "upcoming" && (
                      <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600/10">
                        Unregister
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
