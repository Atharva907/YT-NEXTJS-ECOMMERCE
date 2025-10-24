"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, Trophy, ArrowLeft, ExternalLink } from "lucide-react";
import { getStatusColor } from "@/lib/esportUtils";

export default function TournamentDetails() {
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();
  const tournamentId = params.id;

  useEffect(() => {
    const fetchTournamentDetails = async () => {
      try {
        const response = await fetch(`/api/tournament/${tournamentId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch tournament details");
        }
        const data = await response.json();
        setTournament(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentDetails();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !tournament) {
    return (
      <Card className="bg-slate-800 border-slate-700 text-white">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <h3 className="text-xl font-semibold mb-2">Error Loading Tournament</h3>
          <p className="text-gray-400 text-center mb-6">{error || "Tournament not found"}</p>
          <Button onClick={() => router.back()} className="bg-purple-600 hover:bg-purple-700">
            Go Back
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-4 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Tournaments
      </Button>

      <Card className="bg-slate-800 border-slate-700 text-white overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Trophy className="h-20 w-20 text-white opacity-50" />
          </div>
          <div className="absolute top-4 right-4">
            <Badge className={getStatusColor(tournament.status)}>
              {tournament.status}
            </Badge>
          </div>
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="bg-slate-900/70 text-white border-slate-600">
              {tournament.game}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl">{tournament.name}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Description</h3>
            <p className="text-gray-300">{tournament.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p>{tournament.startDate} - {tournament.endDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Time</p>
                  <p>{tournament.startTime} - {tournament.endTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p>{tournament.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Format</p>
                  <p>{tournament.format}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Prize Pool</p>
                  <p className="text-yellow-400 font-semibold">{tournament.prize || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-green-500"></div>
                <div>
                  <p className="text-sm text-gray-400">Entry Fee</p>
                  <p className="text-green-400 font-semibold">{tournament.entryFee || "Free"}</p>
                </div>
              </div>
            </div>
          </div>

          {tournament.rules && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-purple-400">Rules & Regulations</h3>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-gray-300 whitespace-pre-line">{tournament.rules}</p>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => router.push(`/tournaments/${tournament._id}`)}
              className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              View Public Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
