import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, Video, Clock, Target, Calendar, Edit2, Box, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useFriends } from '../context/FriendContext';
import { StatusBadge } from '../components/ui/StatusBadge';
import { motion } from 'motion/react';
import { formatDate, cn } from '../lib/utils';

const FriendDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { friends, addTimelineEntry, isLoading } = useFriends();

  const friend = friends.find(f => f.id === Number(id));

  if (isLoading) return null; // Handled by Suspense in App.tsx

  if (!friend) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Friend not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="text-brand font-medium hover:underline flex items-center justify-center gap-2 mx-auto"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    );
  }

  const handleInteraction = (type: 'call' | 'text' | 'video') => {
    addTimelineEntry(friend.id, friend.name, type);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} logged with ${friend.name}!`, {
      description: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate('/')}
          className="mb-8 text-slate-500 hover:text-brand flex items-center gap-2 transition-colors font-medium text-sm group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Friend Info */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center"
            >
              <img 
                src={friend.picture} 
                alt={friend.name}
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover ring-4 ring-slate-50"
                referrerPolicy="no-referrer"
              />
              <h1 className="text-2xl font-bold text-slate-900 mb-2">{friend.name}</h1>
              <div className="flex justify-center mb-4">
                <StatusBadge status={friend.status} className="px-3" />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {friend.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase font-bold text-brand bg-brand/5 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-slate-500 italic mb-4 font-light leading-relaxed">
                "{friend.bio}"
              </p>
              
              <p className="text-xs text-slate-400 font-medium">Preferred: email</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <button className="w-full bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-center gap-3 text-slate-700 hover:bg-slate-50 transition-colors font-semibold shadow-sm">
                <Clock size={18} className="text-slate-400" />
                Snooze 2 Weeks
              </button>
              <button className="w-full bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-center gap-3 text-slate-700 hover:bg-slate-50 transition-colors font-semibold shadow-sm">
                <Box size={18} className="text-slate-400" />
                Archive
              </button>
              <button className="w-full bg-white border border-slate-100 p-4 rounded-xl flex items-center justify-center gap-3 text-red-500 hover:bg-red-50 transition-colors font-semibold shadow-sm">
                <Trash2 size={18} className="text-red-400" />
                Delete
              </button>
            </motion.div>
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="lg:col-span-8 space-y-8">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Days Since Contact', value: friend.days_since_contact, icon: Clock },
                { label: 'Goal (Days)', value: friend.goal, icon: Target },
                { label: 'Next Due', value: formatDate(friend.next_due_date), icon: Calendar },
              ].map((stat, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={stat.label}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center"
                >
                  <span className="text-3xl font-bold text-slate-900 mb-2 truncate max-w-full">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Relationship Goal Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-brand font-bold mb-1">Relationship Goal</h3>
                <p className="text-slate-600 font-light">
                  Connect every <span className="font-bold text-slate-900">{friend.goal} days</span>
                </p>
              </div>
              <button className="bg-slate-50 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2">
                <Edit2 size={14} />
                Edit
              </button>
            </motion.div>

            {/* Quick Check-In Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
            >
              <h3 className="text-brand font-bold mb-6">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { type: 'call' as const, icon: Phone, color: 'text-brand' },
                  { type: 'text' as const, icon: MessageSquare, color: 'text-brand' },
                  { type: 'video' as const, icon: Video, color: 'text-brand' },
                ].map((action) => (
                  <button
                    key={action.type}
                    onClick={() => handleInteraction(action.type)}
                    className="flex flex-col items-center justify-center p-6 rounded-2xl border border-slate-100 hover:bg-brand/5 hover:border-brand/20 transition-all group gap-2"
                  >
                    <action.icon className={cn("w-6 h-6 transform group-hover:scale-110 transition-transform", action.color)} />
                    <span className="text-sm font-semibold text-slate-600 capitalize">
                      {action.type}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
