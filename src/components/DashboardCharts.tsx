import React from 'react';
import { DailyPost, ClientDeadline } from '../types';

interface ChartsProps {
  dailyPosts: DailyPost[];
  clientDeadlines: ClientDeadline[];
}

export const DashboardCharts: React.FC<ChartsProps> = ({ dailyPosts, clientDeadlines }) => {
  // 1. Calculate Statistics
  const totalDms = dailyPosts.reduce((acc, p) => acc + p.dmCount, 0);
  const totalIntlDms = dailyPosts.reduce((acc, p) => acc + p.dmInternational, 0);
  const totalLocalDms = dailyPosts.reduce((acc, p) => acc + p.dmLocal, 0);
  
  const intlPercentage = totalDms > 0 ? Math.round((totalIntlDms / totalDms) * 100) : 0;
  const localPercentage = 100 - intlPercentage;

  // Department postings distribution
  const platformPostCounts = {
    Instagram: dailyPosts.filter(p => p.platform === 'Instagram' && p.postedToday).length,
    Facebook: dailyPosts.filter(p => p.platform === 'Facebook' && p.postedToday).length,
    LinkedIn: dailyPosts.filter(p => p.platform === 'LinkedIn' && p.postedToday).length,
  };

  const maxPosts = Math.max(...Object.values(platformPostCounts), 1);

  // Client Deadlines breakdown
  const statusCounts = {
    Urgent: clientDeadlines.filter(d => d.status === 'Urgent').length,
    'In Progress': clientDeadlines.filter(d => d.status === 'In Progress').length,
    Completed: clientDeadlines.filter(d => d.status === 'Completed').length,
    Delayed: clientDeadlines.filter(d => d.status === 'Delayed').length,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* 1. Metric Ring - International vs Local Outreach */}
      <div id="chart-outreach-ratio" className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Lead Outreach Ratio</h3>
          <p className="text-white text-lg font-medium">International vs Local DMs</p>
        </div>
        
        <div className="flex items-center justify-center py-6">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Custom SVG Circular Progress */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Outer circle (Local) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#27272a"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Active segment (International DM) */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10b981"
                strokeWidth="10"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * intlPercentage) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-bold text-white font-mono">{intlPercentage}%</span>
              <span className="block text-[10px] text-zinc-400 font-semibold uppercase">International</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center text-xs pt-2 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-zinc-400">Intl ({totalIntlDms})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
            <span className="text-zinc-400">Local ({totalLocalDms})</span>
          </div>
        </div>
      </div>

      {/* 2. Platform Posting Frequency Bar Chart */}
      <div id="chart-platform-postings" className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Department Content</h3>
          <p className="text-white text-lg font-medium">Daily Post Count Track</p>
        </div>

        <div className="space-y-4 py-4">
          {Object.entries(platformPostCounts).map(([platform, count]) => {
            const pct = (count / maxPosts) * 100;
            const barColors: Record<string, string> = {
              Instagram: 'bg-gradient-to-r from-pink-500 to-rose-400',
              Facebook: 'bg-gradient-to-r from-blue-600 to-indigo-500',
              LinkedIn: 'bg-gradient-to-r from-sky-600 to-emerald-400',
            };
            return (
              <div key={platform} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300 font-semibold">{platform}</span>
                  <span className="text-zinc-400">{count} Active Posts</span>
                </div>
                <div className="h-3 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${barColors[platform] || 'bg-emerald-500'}`}
                    style={{ width: `${Math.max(pct, 12)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-[10px] text-zinc-500 italic mt-2">
          * Updates automatically once founders transmit compliance reports.
        </div>
      </div>

      {/* 3. Client Deadline Urgency Matrix */}
      <div id="chart-deadline-urgency" className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
        <div>
          <h3 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">Project Milestones</h3>
          <p className="text-white text-lg font-medium">Client Deadline Health</p>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4">
          <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Urgent</span>
            <span className="text-2xl font-bold text-white font-mono">{statusCounts.Urgent}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">In Progress</span>
            <span className="text-2xl font-bold text-white font-mono">{statusCounts['In Progress']}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-green-500 tracking-wider">Completed</span>
            <span className="text-2xl font-bold text-white font-mono">{statusCounts.Completed}</span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-800/40 border border-zinc-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Delayed</span>
            <span className="text-2xl font-bold text-white font-mono">{statusCounts.Delayed}</span>
          </div>
        </div>

        <div className="text-xs text-zinc-400 flex items-center gap-2 border-t border-zinc-800 pt-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>{statusCounts.Urgent} Critical issues requiring review</span>
        </div>
      </div>
    </div>
  );
};
