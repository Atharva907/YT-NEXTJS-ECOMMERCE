
import React from 'react';

const CODGamePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-green-600 to-black rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 bg-white rounded-lg mb-4 md:mb-0 md:mr-8 flex items-center justify-center">
              <span className="text-3xl font-bold text-green-600">COD</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Call of Duty</h1>
              <p className="text-xl mb-4">The ultimate first-person shooter experience</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">FPS</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Multiplayer</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Battle Royale</span>
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
              Call of Duty is a first-person shooter video game franchise published by Activision. 
              The series began on Microsoft Windows and later expanded to consoles and handhelds. 
              Several spin-off games have been released, with the most popular being Call of Duty: Mobile and Call of Duty: Warzone.
            </p>
            <p className="text-gray-700 mb-6">
              The games feature intense combat scenarios across various historical and fictional settings, 
              with players engaging in single-player campaigns and competitive multiplayer modes.
            </p>

            <h3 className="text-xl font-semibold mb-3">Popular Titles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Call of Duty: Warzone</h4>
                <p className="text-gray-600 text-sm">Free-to-play battle royale with up to 150 players</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Call of Duty: Mobile</h4>
                <p className="text-gray-600 text-sm">Mobile version with classic maps and modes</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Call of Duty: Modern Warfare II</h4>
                <p className="text-gray-600 text-sm">Latest installment with enhanced graphics</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Call of Duty: Black Ops Cold War</h4>
                <p className="text-gray-600 text-sm">Cold War setting with zombies mode</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Game Modes</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Team Deathmatch</li>
              <li>Domination</li>
              <li>Search and Destroy</li>
              <li>Hardpoint</li>
              <li>Battle Royale (Warzone)</li>
              <li>Zombies</li>
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
                  <h3 className="text-lg font-semibold">COD Championship Series</h3>
                  <p className="text-gray-600">Prize Pool: $2,000,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">3 Days</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Warzone World Cup</h3>
                  <p className="text-gray-600">Prize Pool: $1,500,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">1 Week</p>
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
                <p className="font-semibold">Simp</p>
                <p className="text-sm text-gray-600">FaZe Clan</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <div>
                <p className="font-semibold">Scump</p>
                <p className="text-sm text-gray-600">OpTic Gaming</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <div>
                <p className="font-semibold">Crimsix</p>
                <p className="text-sm text-gray-600">OpTic Gaming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CODGamePage;
