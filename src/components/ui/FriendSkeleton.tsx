import React from 'react';

const FriendSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm animate-pulse">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 bg-slate-200 dark:bg-slate-700 rounded-full mb-4"></div>
        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-1"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-4"></div>
        <div className="flex gap-1 mb-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
        </div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
      </div>
    </div>
  );
};

export default FriendSkeleton;