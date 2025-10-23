
import React from 'react';

const BGMIGamePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 bg-white rounded-lg mb-4 md:mb-0 md:mr-8 flex items-center justify-center">
              <span className="text-4xl font-bold text-blue-600">BGMI</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Battlegrounds Mobile India</h1>
              <p className="text-xl mb-4">Experience the ultimate battle royale on mobile</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Battle Royale</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Multiplayer</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Mobile</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Action</span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Info Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              <button className="px-6 py-3 border-b-2 border-[#00FFAA] text-[#00FFAA] font-semibold">
                Overview
              </button>
              <button className="px-6 py-3 text-gray-600 hover:text-[#00FFAA] transition-colors">
                Tournaments
              </button>
              <button className="px-6 py-3 text-gray-600 hover:text-[#00FFAA] transition-colors">
                Leaderboard
              </button>
              <button className="px-6 py-3 text-gray-600 hover:text-[#00FFAA] transition-colors">
                Guides
              </button>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Game Overview</h2>
            <p className="text-gray-700 mb-4">
              Battlegrounds Mobile India (BGMI) is an online multiplayer battle royale game developed and published by Krafton. 
              The game is based on the PUBG Mobile gameplay and is specifically designed for players in India. 
              Up to 100 players parachute onto an island and scavenge for weapons and equipment to kill others while avoiding getting killed themselves.
            </p>
            <p className="text-gray-700 mb-6">
              The available safe area of the game's map decreases in size over time, directing surviving players into tighter areas to force encounters. 
              The last player or team standing wins the round.
            </p>

            <h3 className="text-xl font-semibold mb-3">Game Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Classic</h4>
                <p className="text-gray-600 text-sm">The original battle royale experience with multiple map options</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Arena</h4>
                <p className="text-gray-600 text-sm">4v4 team deathmatch with fast-paced action</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Payload</h4>
                <p className="text-gray-600 text-sm">Strategic gameplay with helicopters and armored vehicles</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Infection</h4>
                <p className="text-gray-600 text-sm">Survivors vs zombies in a thrilling survival mode</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Realistic graphics and physics</li>
              <li>Multiple maps with diverse terrain</li>
              <li>Wide variety of weapons and vehicles</li>
              <li>Customizable characters and outfits</li>
              <li>Regular updates with new content</li>
              <li>Tournaments and esports events</li>
            </ul>
          </div>
        </div>

        {/* Upcoming Tournaments */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Upcoming Tournaments</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">BGMI Pro League Season 3</h3>
                  <p className="text-gray-600">Prize Pool: ₹50,00,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">5 Days</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">BGMI National Championship</h3>
                  <p className="text-gray-600">Prize Pool: ₹1,00,00,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">2 Weeks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Players */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Top Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                1
              </div>
              <div>
                <p className="font-semibold">ScoutOP</p>
                <p className="text-sm text-gray-600">Team X</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <div>
                <p className="font-semibold">Mortal</p>
                <p className="text-sm text-gray-600">Team Y</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <div>
                <p className="font-semibold">Viper</p>
                <p className="text-sm text-gray-600">Team Z</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BGMIGamePage;
