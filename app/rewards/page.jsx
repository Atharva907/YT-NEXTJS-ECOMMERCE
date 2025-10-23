
import React from 'react';

const RewardsPage = () => {
  // Sample rewards data
  const rewardsData = [
    {
      id: 1,
      name: "Gaming Headset Pro",
      description: "Premium noise-cancelling gaming headset with 7.1 surround sound",
      pointsRequired: 2500,
      category: "Hardware",
      image: "/images/headset.jpg",
      available: true
    },
    {
      id: 2,
      name: "Tournament Entry Pass",
      description: "Free entry to any premium tournament of your choice",
      pointsRequired: 1500,
      category: "Tournament",
      image: "/images/ticket.jpg",
      available: true
    },
    {
      id: 3,
      name: "Custom Avatar Pack",
      description: "Exclusive avatar collection with rare skins and animations",
      pointsRequired: 800,
      category: "Digital",
      image: "/images/avatars.jpg",
      available: true
    },
    {
      id: 4,
      name: "Pro Gaming Mouse",
      description: "High-precision gaming mouse with customizable RGB lighting",
      pointsRequired: 2000,
      category: "Hardware",
      image: "/images/mouse.jpg",
      available: true
    },
    {
      id: 5,
      name: "Bonus XP Boost",
      description: "2x experience points for 7 days across all game modes",
      pointsRequired: 500,
      category: "Digital",
      image: "/images/xp-boost.jpg",
      available: true
    },
    {
      id: 6,
      name: "Mechanical Keyboard",
      description: "RGB mechanical keyboard with customizable switches",
      pointsRequired: 3000,
      category: "Hardware",
      image: "/images/keyboard.jpg",
      available: false
    }
  ];

  // User points balance
  const userPoints = 1850;

  // Filter for available rewards
  const availableRewards = rewardsData.filter(reward => reward.available);

  // Category colors
  const getCategoryColor = (category) => {
    switch(category) {
      case "Hardware": return "bg-blue-100 text-blue-800";
      case "Tournament": return "bg-purple-100 text-purple-800";
      case "Digital": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Rewards Store</h1>

      <div className="max-w-6xl mx-auto">
        {/* User Points Balance Card */}
        <div className="bg-gradient-to-r from-[#00FFAA] to-blue-500 rounded-lg shadow-md p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Your Points Balance</h2>
              <p className="text-xl font-bold">{userPoints.toLocaleString()} Points</p>
            </div>
            <div className="text-center">
              <p className="text-sm opacity-90 mb-1">Next Reward In</p>
              <p className="text-2xl font-bold">650 Points</p>
            </div>
          </div>
          <div className="mt-4 bg-white bg-opacity-20 rounded-lg h-4">
            <div className="bg-white bg-opacity-70 h-4 rounded-lg" style={{width: `${Math.min((userPoints / 2500) * 100, 100)}%`}}></div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          <button className="px-4 py-2 bg-[#00FFAA] text-black font-semibold rounded-lg hover:bg-opacity-80 transition-colors">
            All Rewards
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            Hardware
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            Digital
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
            Tournament
          </button>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {availableRewards.map((reward) => (
            <div key={reward.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500 text-lg">Reward Image</span>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{reward.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(reward.category)}`}>
                    {reward.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-[#00FFAA]">{reward.pointsRequired.toLocaleString()} Points</span>
                  <button 
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      userPoints >= reward.pointsRequired 
                        ? "bg-[#00FFAA] text-black hover:bg-opacity-80" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={userPoints < reward.pointsRequired}
                  >
                    {userPoints >= reward.pointsRequired ? "Redeem" : "Not Enough Points"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Earn Points Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">How to Earn Points</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-[#00FFAA] bg-opacity-20 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#00FFAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Win Tournaments</h3>
                <p className="text-gray-600">Earn 100-500 points based on tournament difficulty</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#00FFAA] bg-opacity-20 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#00FFAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Daily Login</h3>
                <p className="text-gray-600">Get 10 points for each consecutive day you log in</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#00FFAA] bg-opacity-20 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#00FFAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Complete Challenges</h3>
                <p className="text-gray-600">Special challenges offer 50-200 points</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-[#00FFAA] bg-opacity-20 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-[#00FFAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Refer Friends</h3>
                <p className="text-gray-600">Get 100 points when your friends sign up and play</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardsPage;
