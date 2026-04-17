import React from 'react';
import { cn } from '../../lib/utils';
import { FriendStatus } from '../../types';

interface StatusBadgeProps {
  status: FriendStatus;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const styles = {
    overdue: 'bg-overdue text-overdue-text uppercase text-[10px] font-bold px-2 py-0.5 rounded',
    'almost due': 'bg-almost text-almost-text uppercase text-[10px] font-bold px-2 py-0.5 rounded',
    'on-track': 'bg-ontrack text-ontrack-text uppercase text-[10px] font-bold px-2 py-0.5 rounded'
  };

  return (
    <span className={cn(styles[status], className)}>
      {status}
    </span>
  );
};
