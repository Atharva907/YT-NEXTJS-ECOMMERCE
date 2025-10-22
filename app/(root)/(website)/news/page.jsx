import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { WEBSITE_HOME, NEWS_PAGE } from "@/routes/WebsiteRoute";

const NewsPage = () => {
  // Sample news data - in a real app, this would come from an API
  const newsItems = [
    {
      id: 1,
      title: "New Tournament Season Announced",
      excerpt: "Get ready for the most exciting tournament season yet with new prizes and game modes.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
      date: "2025-10-20",
      author: "Admin",
      category: "Tournaments",
      image: "/assets/tournament.jpg",
      featured: true
    },
    {
      id: 2,
      title: "Pro Player Spotlight: Interview with Champion",
      excerpt: "We sat down with last season's champion to discuss their journey to the top.",
      content: "Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor.",
      date: "2025-10-18",
      author: "Editor",
      category: "Interviews",
      image: "/assets/interview.jpg",
      featured: false
    },
    {
      id: 3,
      title: "Game Update: New Maps and Features",
      excerpt: "The latest game update brings exciting new maps and gameplay features.",
      content: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget.",
      date: "2025-10-15",
      author: "Dev Team",
      category: "Updates",
      image: "/assets/update.jpg",
      featured: false
    },
    {
      id: 4,
      title: "Community Event: Charity Gaming Marathon",
      excerpt: "Join us for a 24-hour gaming marathon to raise money for charity.",
      content: "Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.",
      date: "2025-10-12",
      author: "Community Manager",
      category: "Events",
      image: "/assets/charity.jpg",
      featured: false
    },
    {
      id: 5,
      title: "Strategy Guide: Mastering the Meta",
      excerpt: "Our experts break down the current meta and share tips to improve your gameplay.",
      content: "Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum.",
      date: "2025-10-10",
      author: "Pro Player",
      category: "Guides",
      image: "/assets/strategy.jpg",
      featured: false
    }
  ];

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link href={WEBSITE_HOME}>
            <Button variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Gaming News</h1>
        <p className="text-gray-300">Stay updated with the latest gaming news, tournaments, and updates</p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Featured News Section */}
        {featuredNews.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredNews.map((item) => (
                <Card key={item.id} className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/50">
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{item.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.author}
                      </div>
                      <Button variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-600/20">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular News Section */}
        {regularNews.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularNews.map((item) => (
                <Card key={item.id} className="bg-slate-800/60 backdrop-blur-sm border-slate-700 text-white overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/50">
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {item.date}
                      </div>
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{item.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-3 w-3 mr-1" />
                        {item.author}
                      </div>
                      <Button variant="outline" className="border-blue-500/50 text-blue-300 hover:bg-blue-600/20">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
