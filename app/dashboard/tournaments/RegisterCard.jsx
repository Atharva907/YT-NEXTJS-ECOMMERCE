"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, Trophy, MapPin, Clock, ExternalLink } from "lucide-react";
import { formatCurrency, getStatusColor, truncateText } from "@/lib/esportUtils";

export default function RegisterCard({ tournament, isRegistered, onRegister, onUnregister }) {
  const registrationProgress = (tournament.currentPlayers / tournament.maxPlayers) * 100;
  const isFull = tournament.currentPlayers >= tournament.maxPlayers;
  const isPast = new Date(tournament.date) < new Date();
  
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-slate-800 border-slate-700 text-white h-full flex flex-col">
      <div className="relative h-40 overflow-hidden">
        {/* Tournament Image or Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-80"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Trophy className="h-16 w-16 text-white opacity-50" />
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={getStatusColor(tournament.status)}>
            {tournament.status}
          </Badge>
        </div>
        
        {/* Game Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-slate-900/70 text-white border-slate-600">
            {tournament.game}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl line-clamp-1">{tournament.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar className="h-4 w-4" />
          <span>{tournament.date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <MapPin className="h-4 w-4" />
          <span>{tournament.region}</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-300">
          <Users className="h-4 w-4" />
          <span>{tournament.format}</span>
        </div>
        
        <div className="pt-2 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Entry Fee</span>
            <span className="font-semibold text-green-400">{tournament.entryFee}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Prize Pool</span>
            <span className="font-semibold text-yellow-400">{tournament.prize}</span>
          </div>
        </div>
        
        <div className="pt-2 space-y-1">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Registration</span>
            <span>{tournament.currentPlayers}/{tournament.maxPlayers}</span>
          </div>
          <Progress value={registrationProgress} className="h-2 bg-slate-700" />
        </div>
        
        <p className="text-xs text-gray-400 mt-2 line-clamp-2">
          {truncateText(tournament.description, 100)}
        </p>
      </CardContent>
      
      <CardFooter className="pt-3 space-y-2">
        <Button
          onClick={isRegistered ? onUnregister : onRegister}
          disabled={isFull || isPast}
          className={`w-full ${
            isRegistered 
              ? "bg-red-600 hover:bg-red-700" 
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          } ${
            (isFull || isPast) ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isRegistered ? "Unregister" : isFull ? "Full" : isPast ? "Ended" : "Register"}
        </Button>
        
        <Button variant="outline" size="sm" className="w-full border-slate-600 text-gray-300 hover:bg-slate-700">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
