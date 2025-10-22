"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NEWS_PAGE } from "@/routes/WebsiteRoute";
import { tournamentsData } from "@/lib/data";

const GameArena = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

  // Add styles for animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes marquee {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
        display: flex;
        width: fit-content;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load upcoming tournaments from API
  useEffect(() => {
    const fetchUpcomingTournaments = async () => {
      try {
        // Fetch tournaments with "upcoming" status from our API
        const response = await fetch('/api/tournaments?status=upcoming');
        if (!response.ok) {
          throw new Error('Failed to fetch tournaments');
        }
        const data = await response.json();
        // Limit to 3 tournaments for display
        setUpcomingTournaments(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching tournaments:", error);
        // Set empty array if there's an error
        setUpcomingTournaments([]);
      }
    };
    
    fetchUpcomingTournaments();
  }, []);

  const features = [
    {
      icon: "🏆",
      title: "Tournaments",
      description: "Join daily and weekly tournaments with massive rewards.",
    },
    {
      icon: "💳",
      title: "Wallet & Earnings",
      description: "Track your winnings and manage your prize pool easily.",
    },
    {
      icon: "📊",
      title: "Player Stats",
      description: "Level up your gaming profile and unlock achievements.",
    },
  ];

  const testimonials = [
    {
      name: 'Alex "Shadow" Chen',
      avatar: "👤",
      quote:
        "GameArena changed my gaming career! The tournaments are fair and the rewards are amazing.",
    },
    {
      name: 'Sarah "Phoenix" Johnson',
      avatar: "👤",
      quote:
        "I've competed on many platforms, but GameArena offers the best experience by far.",
    },
    {
      name: 'Marcus "Titan" Rodriguez',
      avatar: "👤",
      quote:
        "The competitive scene here is incredible. I've made friends and improved my skills.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F19] to-[#121C2B] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0F19]/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
                GameArena
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button className="bg-transparent border border-[#00FFAA] text-[#00FFAA] hover:bg-[#00FFAA] hover:text-[#0B0F19] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,170,0.5)] hover:shadow-[0_0_20px_rgba(0,255,170,0.8)]">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with animated particles */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-indigo-900/20"></div>
          <div className="absolute inset-0 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center opacity-40"></div>
          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#00FFAA] opacity-20 animate-pulse"
                style={{
                  width: Math.random() * 5 + 2 + "px",
                  height: Math.random() * 5 + 2 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                  animationDelay: Math.random() * 5 + "s",
                  animationDuration: Math.random() * 10 + 10 + "s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00FFAA] via-[#4F46E5] to-[#9333EA] bg-clip-text text-transparent animate-pulse">
            Compete. Earn. Rise.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join tournaments, climb ranks, and win real rewards.
          </p>
          <Link href="/auth/login">
            <Button className="bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] text-[#0B0F19] font-bold py-3 px-8 rounded-full text-lg hover:shadow-[0_0_20px_rgba(0,255,170,0.5)] transition-all duration-300">
              Join the Battle
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            Why Choose GameArena
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-2 rounded-xl overflow-hidden"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-[#00FFAA]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFAA] via-[#4F46E5] to-[#9333EA] transform -translate-y-1/2 z-0"></div>

            {/* Steps */}
            {[
              { title: "Sign Up / Login", icon: "🎮" },
              { title: "Join Tournaments", icon: "🏆" },
              { title: "Earn Rewards", icon: "💰" },
            ].map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] flex items-center justify-center text-3xl mb-4 shadow-[0_0_20px_rgba(0,255,170,0.5)]">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            What Players Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden"
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">{testimonial.avatar}</div>
                  <p className="text-gray-300 mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <h3 className="text-lg font-bold text-[#00FFAA]">
                    {testimonial.name}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            Upcoming Tournaments
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingTournaments.map((tournament, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-2"
              >
                <div className="h-48 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center text-6xl">
                  🎮
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#00FFAA]">
                    {tournament.name}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Game:</span>
                      <span>{tournament.game}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Date:</span>
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Prize Pool:</span>
                      <span className="font-bold text-[#9333EA]">
                        {tournament.prize}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Entry Fee:</span>
                      <span>{tournament.entryFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Players:</span>
                      <span>{tournament.currentPlayers}/{tournament.maxPlayers}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] text-[#0B0F19] font-bold py-2 rounded-md hover:shadow-[0_0_20px_rgba(0,255,170,0.5)] transition-all duration-300">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            Featured Games
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "BGMI",
                category: "Battle Royale",
                icon: "🎯",
                players: "5.2M",
              },
              {
                name: "Call of Duty (COD)",
                category: "FPS",
                icon: "⚔️",
                players: "4.8M",
              },
              {
                name: "Free Fire",
                category: "Battle Royale",
                icon: "🔥",
                players: "6.1M",
              },
              {
                name: "Valorant",
                category: "Tactical Shooter",
                icon: "🎮",
                players: "3.9M",
              },
            ].map((game, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-2 group cursor-pointer"
              >
                <div className="h-32 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                  {game.icon}
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2 text-[#00FFAA]">
                    {game.name}
                  </h3>
                  <p className="text-gray-400 mb-2">{game.category}</p>
                  <p className="text-sm text-gray-500">
                    {game.players} players
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Tournaments Panel */}
      <section className="py-12 px-4 md:px-8 lg:px-16 relative z-10 bg-gradient-to-b from-transparent to-[#121C2B]/50">
        <div className="max-w-7xl mx-auto mb-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            Live Tournaments
          </h2>
        </div>
        
        {/* Live Tournaments Ticker */}
        <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-lg p-4 mb-8 overflow-hidden relative">
          <div className="flex items-center animate-marquee whitespace-nowrap">
            {[
              { game: "Cyber Strike", status: "Quarter Finals", prize: "$10,000", viewers: "12.5K" },
              { game: "Battle Legends", status: "Semi Finals", prize: "$25,000", viewers: "18.3K" },
              { game: "Space Conquest", status: "Group Stage", prize: "$50,000", viewers: "9.7K" },
              { game: "Racing Thunder", status: "Finals", prize: "$15,000", viewers: "22.1K" },
              { game: "Arena Warriors", status: "Round of 16", prize: "$30,000", viewers: "14.8K" },
            ].map((tournament, index) => (
              <div key={index} className="flex items-center mx-8">
                <span className="relative flex items-center mr-4">
                  <span className="absolute animate-ping inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  <span className="ml-2 text-red-500 font-bold animate-pulse">LIVE</span>
                </span>
                <span className="text-white font-bold mr-2">{tournament.game}:</span>
                <span className="text-gray-300 mr-2">{tournament.status}</span>
                <span className="text-[#9333EA] font-bold mr-2">{tournament.prize}</span>
                <span className="text-gray-400 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                  </svg>
                  {tournament.viewers}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Live Tournament Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              game: "Cyber Strike",
              status: "Quarter Finals",
              prize: "$10,000",
              viewers: "12.5K",
              participants: "8 Teams",
              icon: "🎮",
            },
            {
              game: "Battle Legends",
              status: "Semi Finals",
              prize: "$25,000",
              viewers: "18.3K",
              participants: "4 Teams",
              icon: "⚔️",
            },
            {
              game: "Racing Thunder",
              status: "Finals",
              prize: "$15,000",
              viewers: "22.1K",
              participants: "2 Racers",
              icon: "🏁",
            },
          ].map((tournament, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-2"
            >
              <div className="relative h-48 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center text-6xl overflow-hidden">
                {tournament.icon}
                <div className="absolute top-4 right-4 flex items-center bg-red-500/20 backdrop-blur-sm rounded-full px-3 py-1 animate-pulse">
                  <span className="relative flex items-center mr-2">
                    <span className="absolute animate-ping inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="text-red-500 font-bold text-sm">LIVE</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-[#00FFAA]">
                  {tournament.game}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status:</span>
                    <span className="font-semibold">{tournament.status}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Prize Pool:</span>
                    <span className="font-bold text-[#9333EA]">
                      {tournament.prize}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Participants:</span>
                    <span>{tournament.participants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Viewers:</span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                      </svg>
                      {tournament.viewers}
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] text-[#0B0F19] font-bold py-2 rounded-md hover:shadow-[0_0_20px_rgba(0,255,170,0.5)] transition-all duration-300">
                  Watch Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Esports News & Updates */}
      <section className="py-20 px-4 md:px-8 lg:px-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
            Latest Updates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Team Phoenix Wins Summer Championship",
                teaser: "In a stunning 3-2 victory over Team Dragon, Team Phoenix claims the $100,000 prize pool and secures their spot in the World Championship.",
                image: "🏆",
                date: "June 10, 2025",
                category: "Tournament Results",
              },
              {
                title: "New Battle Royale Map Released",
                teaser: "The highly anticipated 'Arctic Outpost' map is now available, featuring new terrain mechanics and strategic points of interest.",
                image: "🗺️",
                date: "June 8, 2025",
                category: "Game Updates",
              },
              {
                title: "International Esports Expo Announced",
                teaser: "The biggest esports event of the year will take place in Tokyo this October, featuring tournaments with over $2M in prizes.",
                image: "🎮",
                date: "June 5, 2025",
                category: "Events",
              },
            ].map((news, index) => (
              <Card
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 rounded-xl overflow-hidden hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:-translate-y-2 cursor-pointer"
              >
                <div className="h-48 bg-gradient-to-br from-purple-900/30 to-blue-900/30 flex items-center justify-center text-6xl overflow-hidden relative">
                  {news.image}
                  <div className="absolute top-4 left-4 bg-[#00FFAA]/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-[#00FFAA] text-sm font-semibold">{news.category}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="text-gray-400 text-sm mb-2">{news.date}</div>
                  <h3 className="text-xl font-bold mb-3 text-white">{news.title}</h3>
                  <p className="text-gray-300 mb-4">{news.teaser}</p>
                  <a href="#" className="text-[#00FFAA] font-semibold flex items-center hover:underline">
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href={NEWS_PAGE}>
              <Button className="bg-transparent border border-[#00FFAA] text-[#00FFAA] hover:bg-[#00FFAA] hover:text-[#0B0F19] transition-all duration-300 shadow-[0_0_10px_rgba(0,255,170,0.5)] hover:shadow-[0_0_20px_rgba(0,255,170,0.8)] px-8 py-3 rounded-full">
                View All News
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden">
        {/* Background with animated elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#121C2B] to-[#0B0F19] z-0"></div>
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[#00FFAA]/10 animate-pulse"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * 5 + "s",
                animationDuration: Math.random() * 10 + 10 + "s",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo and description */}
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#00FFAA] to-[#4F46E5] bg-clip-text text-transparent">
                GameArena
              </h1>
              <p className="text-gray-400 mb-6 max-w-md">
                The ultimate esports platform where players compete, earn
                rewards, and rise through the ranks.
              </p>
              <div className="flex space-x-4">
                {[
                  { name: "Discord", icon: "💬" },
                  { name: "YouTube", icon: "📺" },
                  { name: "Twitch", icon: "🎮" },
                  { name: "X", icon: "🐦" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-xl hover:bg-[#00FFAA]/20 hover:text-[#00FFAA] transition-all duration-300 hover:shadow-[0_0_10px_rgba(0,255,170,0.5)]"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#00FFAA]">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {["Tournaments", "Leaderboard", "Rewards", "Support"].map(
                  (link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-[#00FFAA] transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Games */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-[#00FFAA]">
                Popular Games
              </h3>
              <ul className="space-y-2">
                {[
                  "Cyber Strike",
                  "Battle Legends",
                  "Space Conquest",
                  "Racing Thunder",
                ].map((game, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-[#00FFAA] transition-colors duration-300"
                    >
                      {game}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              GameArena © 2025. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FFAA] transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FFAA] transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#00FFAA] transition-colors duration-300"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GameArena;
