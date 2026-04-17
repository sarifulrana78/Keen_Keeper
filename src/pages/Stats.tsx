import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useFriends } from '../context/FriendContext';
import { motion } from 'motion/react';

const Stats: React.FC = () => {
  const { timeline, friends } = useFriends();

  // Interaction type data
  const interactionData = [
    { name: 'Call', value: timeline.filter(t => t.type === 'call').length },
    { name: 'Text', value: timeline.filter(t => t.type === 'text').length },
    { name: 'Video', value: timeline.filter(t => t.type === 'video').length },
  ].filter(d => d.value > 0);

  const COLORS = ['#22c55e', '#2D5A47', '#a855f7']; // Green, Brand, Purple

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Friendship Analytics</h1>
        <p className="text-slate-500 font-light mb-12">Visual insights into your connection habits.</p>

        <div className="max-w-3xl mx-auto lg:mx-0">
          {/* Interaction Type Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-8 border-b border-slate-50 pb-4">By Interaction Type</h3>
            <div className="h-[400px] w-full">
              {interactionData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={interactionData}
                      cx="50%"
                      cy="45%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {interactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 italic">
                  No interaction data yet. Start checking in with friends!
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
