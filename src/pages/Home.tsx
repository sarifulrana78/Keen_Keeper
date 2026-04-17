import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Users, CheckCircle, AlertCircle, BarChart2, Search, Download } from 'lucide-react';
import { useFriends } from '../context/FriendContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import Button from '../components/ui/Button';
import { motion } from 'motion/react';

const Home: React.FC = () => {
  const { friends, isLoading, timeline, error } = useFriends();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = useMemo(() => {
    if (!searchQuery) return friends;
    return friends.filter(friend =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [friends, searchQuery]);

  const exportFriends = () => {
    const dataStr = JSON.stringify(filteredFriends, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'friends.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const totalFriends = friends.length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;
  const needAttentionCount = friends.filter(f => f.status !== 'on-track').length;
  const interactionCount = timeline.length;

  const summaryCards = [
    { label: 'Total Friends', value: totalFriends, icon: Users, color: 'text-blue-600' },
    { label: 'On Track', value: onTrackCount, icon: CheckCircle, color: 'text-green-600' },
    { label: 'Need Attention', value: needAttentionCount, icon: AlertCircle, color: 'text-amber-600' },
    { label: 'Interactions This Month', value: interactionCount, icon: BarChart2, color: 'text-brand' },
  ];

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold">Oops! Something went wrong</p>
          <p className="text-sm text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 animate-pulse font-medium">Fetching your friends...</p>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-8">
      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Friends to keep close in your life
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8 font-light">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <Button size="lg">
          <Plus size={20} />
          Add a Friend
        </Button>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 text-left">
          {summaryCards.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={card.label}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center justify-center"
            >
              <span className="text-3xl font-bold text-slate-900 mb-1">{card.value}</span>
              <span className="text-sm text-slate-500 font-medium">{card.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-bold text-slate-900 dark:text-slate-100"
          >
            Your Friends
          </motion.h2>
          <div className="flex gap-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-full sm:w-80"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              />
            </motion.div>
            <Button variant="outline" size="sm" onClick={exportFriends}>
              <Download size={18} />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFriends.map((friend, idx) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              key={friend.id}
              onClick={() => navigate(`/friend/${friend.id}`)}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer text-center flex flex-col items-center"
            >
              <div className="relative mb-4">
                <img
                  src={friend.picture}
                  alt={friend.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-50 group-hover:ring-brand/10 transition-all"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">{friend.name}</h3>
              <p className="text-xs text-slate-400 mb-2">{friend.days_since_contact}d ago</p>
              
              <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                {friend.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="text-[10px] uppercase font-bold text-brand bg-brand/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <StatusBadge status={friend.status} className="w-full py-1 text-center" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
