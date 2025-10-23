
import React from 'react';

const FreeFireGamePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 bg-white rounded-lg mb-4 md:mb-0 md:mr-8 flex items-center justify-center">
              <span className="text-3xl font-bold text-red-500">FF</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Garena Free Fire</h1>
              <p className="text-xl mb-4">Ultimate survival shooter on mobile</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Battle Royale</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Mobile</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Action</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Survival</span>
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
              Garena Free Fire is a battle royale game developed by 111dots Studio and published by Garena. 
              The game became the most downloaded mobile game globally in 2019 and has gained immense popularity, 
              especially in Southeast Asia, India, and Latin America.
            </p>
            <p className="text-gray-700 mb-6">
              In Free Fire, up to 50 players parachute onto an island and scavenge for weapons and equipment 
              to kill other players. Players can choose their starting position and take weapons and supplies to 
              extend their battle life. The last player or team standing wins the round.
            </p>

            <h3 className="text-xl font-semibold mb-3">Game Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Battle Royale</h4>
                <p className="text-gray-600 text-sm">Classic mode with solo, duo, and squad options</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Clash Squad</h4>
                <p className="text-gray-600 text-sm">4v4 team deathmatch with strategic gameplay</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Bomb Squad</h4>
                <p className="text-gray-600 text-sm">Defuse or plant bombs in a tactical mode</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Pet Rumble</h4>
                <p className="text-gray-600 text-sm">Battle mode featuring companion pets</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>50 players, 10-minute matches</li>
              <li>4-man squad with in-game voice chat</li>
              <li>Wide variety of weapons and attachments</li>
              <li>Unique character abilities</li>
              <li>Customizable characters and pets</li>
              <li>Regular events and updates</li>
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
                  <h3 className="text-lg font-semibold">Free Fire World Series 2023</h3>
                  <p className="text-gray-600">Prize Pool: $2,000,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">1 Week</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Free Fire Asia Championship</h3>
                  <p className="text-gray-600">Prize Pool: $500,000</p>
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
                <p className="font-semibold">TSG Jash</p>
                <p className="text-sm text-gray-600">Total Gaming</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <div>
                <p className="font-semibold">Rakesh</p>
                <p className="text-sm text-gray-600">Team Elite</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <div>
                <p className="font-semibold">Raistar</p>
                <p className="text-sm text-gray-600">X-Squad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeFireGamePage;
