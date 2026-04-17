import React, { useState, useMemo } from 'react';
import { Phone, MessageSquare, Video, Search, Filter } from 'lucide-react';
import { useFriends } from '../context/FriendContext';
import { motion } from 'motion/react';
import { formatDate, cn } from '../lib/utils';

const Timeline: React.FC = () => {
  const { timeline } = useFriends();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTimeline = useMemo(() => {
    return timeline.filter(entry => {
      const matchesType = filterType === 'all' || entry.type === filterType;
      const matchesSearch = entry.friendName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            entry.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [timeline, filterType, searchQuery]);

  const typeIcons = {
    call: { icon: Phone, color: 'text-brand', bg: 'bg-brand/10' },
    text: { icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    video: { icon: Video, color: 'text-purple-500', bg: 'bg-purple-50' },
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Timeline</h1>
        <p className="text-slate-500 font-light mb-8">Keep track of your relationship milestones.</p>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by friend or interaction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-50 border-none px-4 py-2 rounded-xl text-sm focus:ring-2 focus:ring-brand outline-none transition-all font-medium text-slate-700 min-w-[120px]"
            >
              <option value="all">All Types</option>
              <option value="call">Calls</option>
              <option value="text">Texts</option>
              <option value="video">Videos</option>
            </select>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-4">
          {filteredTimeline.length > 0 ? (
            filteredTimeline.map((entry, idx) => {
              const config = typeIcons[entry.type as keyof typeof typeIcons];
              return (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={entry.id}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group"
                >
                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform", config.bg)}>
                    <config.icon className={cn("w-7 h-7", config.color)} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-slate-900 mb-0.5 truncate">{entry.title}</h3>
                    <p className="text-sm text-slate-400 font-medium">
                      {formatDate(entry.date)}
                    </p>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
              <p className="text-slate-400 font-light italic">No interaction records found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
