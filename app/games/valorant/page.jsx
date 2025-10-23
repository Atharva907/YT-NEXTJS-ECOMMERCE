
import React from 'react';

const ValorantGamePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Game Header */}
        <div className="bg-gradient-to-r from-red-600 to-black rounded-lg shadow-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-32 h-32 bg-white rounded-lg mb-4 md:mb-0 md:mr-8 flex items-center justify-center">
              <span className="text-3xl font-bold text-red-600">V</span>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">Valorant</h1>
              <p className="text-xl mb-4">5v5 tactical shooter with unique agent abilities</p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">FPS</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Tactical</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Multiplayer</span>
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">Competitive</span>
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
              Valorant is a free-to-play first-person hero shooter developed and published by Riot Games. 
              The game combines tactical gameplay with character abilities, similar to games like Counter-Strike: Global Offensive and Overwatch.
            </p>
            <p className="text-gray-700 mb-6">
              In the main game mode, two teams of five players compete in rounds with the objective of either 
              eliminating the opposing team or completing a map-specific objective. Players choose from a roster of agents, 
              each with unique abilities that can be used strategically to gain an advantage.
            </p>

            <h3 className="text-xl font-semibold mb-3">Game Modes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Unrated/Competitive</h4>
                <p className="text-gray-600 text-sm">Standard 5v5 mode with spike plant/defuse</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Spike Rush</h4>
                <p className="text-gray-600 text-sm">Faster-paced mode with all abilities available</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Deathmatch</h4>
                <p className="text-gray-600 text-sm">Free-for-all mode to practice gunplay</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Escalation</h4>
                <p className="text-gray-600 text-sm">Team-based mode with changing weapons</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-3">Popular Agents</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Jett - Duelist with mobility abilities</li>
              <li>Sova - Initiator with information gathering tools</li>
              <li>Killjoy - Sentinel with area denial abilities</li>
              <li>Breach - Initiator with crowd control abilities</li>
              <li>Reyna - Duelist with self-sustain mechanics</li>
              <li>Omen - Controller with teleportation and smokes</li>
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
                  <h3 className="text-lg font-semibold">VCT Champions 2023</h3>
                  <p className="text-gray-600">Prize Pool: $2,250,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">2 Weeks</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">VCT Game Changers</h3>
                  <p className="text-gray-600">Prize Pool: $500,000</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Starts in</p>
                  <p className="text-lg font-semibold">3 Weeks</p>
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
                <p className="font-semibold">TenZ</p>
                <p className="text-sm text-gray-600">Sentinels</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                2
              </div>
              <div>
                <p className="font-semibold">ScreaM</p>
                <p className="text-sm text-gray-600">Team Liquid</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                3
              </div>
              <div>
                <p className="font-semibold">Derke</p>
                <p className="text-sm text-gray-600">Fnatic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValorantGamePage;
