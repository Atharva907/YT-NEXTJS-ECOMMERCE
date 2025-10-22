"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar, Clock, Trophy, Users, MapPin } from "lucide-react";

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    game: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    location: "",
    maxParticipants: "",
    status: "upcoming",
    prize: "",
    rules: "",
    imageUrl: ""
  });

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    const mockTournaments = [
      {
        id: 1,
        name: "Summer Championship 2023",
        game: "Valorant",
        description: "The biggest Valorant tournament of the summer with teams from all over the region.",
        startDate: "2023-07-15",
        endDate: "2023-07-20",
        startTime: "10:00",
        endTime: "18:00",
        location: "Online",
        maxParticipants: 32,
        currentParticipants: 28,
        status: "live",
        prize: "$5,000",
        rules: "Standard 5v5 tournament rules. Single elimination.",
        imageUrl: "/assets/tournaments/valorant-summer.jpg"
      },
      {
        id: 2,
        name: "CS:GO Masters League",
        game: "Counter-Strike: Global Offensive",
        description: "Professional CS:GO tournament with top-tier teams competing for the championship title.",
        startDate: "2023-08-10",
        endDate: "2023-08-15",
        startTime: "14:00",
        endTime: "22:00",
        location: "Berlin, Germany",
        maxParticipants: 16,
        currentParticipants: 16,
        status: "upcoming",
        prize: "$10,000",
        rules: "Standard tournament rules. Double elimination.",
        imageUrl: "/assets/tournaments/csgo-masters.jpg"
      },
      {
        id: 3,
        name: "Fortnite Battle Royale",
        game: "Fortnite",
        description: "Epic Fortnite Battle Royale tournament with solo and duo competitions.",
        startDate: "2023-06-05",
        endDate: "2023-06-07",
        startTime: "16:00",
        endTime: "20:00",
        location: "Online",
        maxParticipants: 100,
        currentParticipants: 87,
        status: "completed",
        prize: "$3,000",
        rules: "Solo and duo modes. Standard battle royale rules.",
        imageUrl: "/assets/tournaments/fortnite-br.jpg"
      },
      {
        id: 4,
        name: "League of Legends Regional",
        game: "League of Legends",
        description: "Regional qualifying tournament for the world championship.",
        startDate: "2023-09-01",
        endDate: "2023-09-05",
        startTime: "12:00",
        endTime: "20:00",
        location: "Seoul, South Korea",
        maxParticipants: 8,
        currentParticipants: 5,
        status: "upcoming",
        prize: "$15,000",
        rules: "Standard 5v5 Summoner's Rift. Best of 3 for group stage, best of 5 for playoffs.",
        imageUrl: "/assets/tournaments/lol-regional.jpg"
      }
    ];
    setTournaments(mockTournaments);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value, name) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      game: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      location: "",
      maxParticipants: "",
      status: "upcoming",
      prize: "",
      rules: "",
      imageUrl: ""
    });
  };

  const handleCreateTournament = () => {
    const newTournament = {
      id: tournaments.length + 1,
      ...formData,
      currentParticipants: 0
    };
    setTournaments([...tournaments, newTournament]);
    resetForm();
    setIsCreateModalOpen(false);
  };

  const handleEditTournament = () => {
    const updatedTournaments = tournaments.map(tournament => {
      if (tournament.id === selectedTournament.id) {
        return {
          ...tournament,
          ...formData
        };
      }
      return tournament;
    });
    setTournaments(updatedTournaments);
    resetForm();
    setIsEditModalOpen(false);
    setSelectedTournament(null);
  };

  const handleDeleteTournament = (id) => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      setTournaments(tournaments.filter(tournament => tournament.id !== id));
    }
  };

  const openEditModal = (tournament) => {
    setSelectedTournament(tournament);
    setFormData({
      name: tournament.name,
      description: tournament.description,
      game: tournament.game,
      startDate: tournament.startDate,
      endDate: tournament.endDate,
      startTime: tournament.startTime,
      endTime: tournament.endTime,
      location: tournament.location,
      maxParticipants: tournament.maxParticipants,
      status: tournament.status,
      prize: tournament.prize,
      rules: tournament.rules,
      imageUrl: tournament.imageUrl
    });
    setIsEditModalOpen(true);
  };

  const filterTournaments = (status) => {
    if (status === "all") return tournaments;
    return tournaments.filter(tournament => tournament.status === status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "live":
        return "bg-green-500";
      case "upcoming":
        return "bg-blue-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tournaments</h1>
          <p className="text-muted-foreground">Manage gaming tournaments</p>
        </div>
      </div>
      
      {/* Fixed Add Tournament Button */}
      <div className="fixed top-20 right-8 z-40">
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 rounded-md h-10 px-4 shadow-lg">
              <Plus className="h-4 w-4" />
              <span>Add Tournament</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Tournament</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new tournament.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tournament Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter tournament name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="game">Game</Label>
                  <Input
                    id="game"
                    name="game"
                    value={formData.game}
                    onChange={handleInputChange}
                    placeholder="Enter game name"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter tournament description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    name="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={handleInputChange}
                    placeholder="Enter max participants"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => handleSelectChange(value, "status")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prize">Prize Pool</Label>
                  <Input
                    id="prize"
                    name="prize"
                    value={formData.prize}
                    onChange={handleInputChange}
                    placeholder="Enter prize amount"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rules">Rules</Label>
                <Textarea
                  id="rules"
                  name="rules"
                  value={formData.rules}
                  onChange={handleInputChange}
                  placeholder="Enter tournament rules"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={handleCreateTournament}>
                Create Tournament
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Tournaments</TabsTrigger>
          <TabsTrigger value="live">Live</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTournaments("all").map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 relative">
                  {/* In a real app, use Next.js Image component */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Trophy className="h-12 w-12" />
                  </div>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <Badge className={`${getStatusColor(tournament.status)} text-white`}>
                      {tournament.status}
                    </Badge>
                  </div>
                  <CardDescription>{tournament.game}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{tournament.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {tournament.startDate} - {tournament.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tournament.startTime} - {tournament.endTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {tournament.currentParticipants}/{tournament.maxParticipants} participants
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm font-medium">{tournament.prize} Prize Pool</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(tournament)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteTournament(tournament.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTournaments("live").map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden border-green-500">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 relative">
                  {/* In a real app, use Next.js Image component */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Trophy className="h-12 w-12" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">LIVE NOW</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <Badge className="bg-green-500 text-white">
                      {tournament.status}
                    </Badge>
                  </div>
                  <CardDescription>{tournament.game}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{tournament.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {tournament.startDate} - {tournament.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tournament.startTime} - {tournament.endTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {tournament.currentParticipants}/{tournament.maxParticipants} participants
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm font-medium">{tournament.prize} Prize Pool</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(tournament)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteTournament(tournament.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTournaments("upcoming").map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 relative">
                  {/* In a real app, use Next.js Image component */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Trophy className="h-12 w-12" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-blue-500 text-white">UPCOMING</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <Badge className="bg-blue-500 text-white">
                      {tournament.status}
                    </Badge>
                  </div>
                  <CardDescription>{tournament.game}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{tournament.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {tournament.startDate} - {tournament.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tournament.startTime} - {tournament.endTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {tournament.currentParticipants}/{tournament.maxParticipants} participants
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm font-medium">{tournament.prize} Prize Pool</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(tournament)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteTournament(tournament.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filterTournaments("completed").map((tournament) => (
              <Card key={tournament.id} className="overflow-hidden opacity-75">
                <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 relative">
                  {/* In a real app, use Next.js Image component */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                    <Trophy className="h-12 w-12" />
                  </div>
                  <Badge className="absolute top-2 right-2 bg-gray-500 text-white">COMPLETED</Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{tournament.name}</CardTitle>
                    <Badge className="bg-gray-500 text-white">
                      {tournament.status}
                    </Badge>
                  </div>
                  <CardDescription>{tournament.game}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">{tournament.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {tournament.startDate} - {tournament.endDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {tournament.startTime} - {tournament.endTime}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {tournament.currentParticipants}/{tournament.maxParticipants} participants
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm font-medium">{tournament.prize} Prize Pool</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(tournament)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteTournament(tournament.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Tournament Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tournament</DialogTitle>
            <DialogDescription>
              Update the tournament details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Tournament Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter tournament name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-game">Game</Label>
                <Input
                  id="edit-game"
                  name="game"
                  value={formData.game}
                  onChange={handleInputChange}
                  placeholder="Enter game name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter tournament description"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-startTime">Start Time</Label>
                <Input
                  id="edit-startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endTime">End Time</Label>
                <Input
                  id="edit-endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maxParticipants">Max Participants</Label>
                <Input
                  id="edit-maxParticipants"
                  name="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={handleInputChange}
                  placeholder="Enter max participants"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "status")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-prize">Prize Pool</Label>
                <Input
                  id="edit-prize"
                  name="prize"
                  value={formData.prize}
                  onChange={handleInputChange}
                  placeholder="Enter prize amount"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-rules">Rules</Label>
              <Textarea
                id="edit-rules"
                name="rules"
                value={formData.rules}
                onChange={handleInputChange}
                placeholder="Enter tournament rules"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-imageUrl">Image URL</Label>
              <Input
                id="edit-imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleEditTournament}>
              Update Tournament
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TournamentsPage;