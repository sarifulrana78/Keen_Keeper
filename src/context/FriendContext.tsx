import React, { createContext, useContext, useState, useEffect } from 'react';
import { Friend, TimelineEntry } from '../types';
import friendsData from '../data/friends.json';

interface FriendContextType {
  friends: Friend[];
  timeline: TimelineEntry[];
  isLoading: boolean;
  addTimelineEntry: (friendId: number, friendName: string, type: 'call' | 'text' | 'video') => void;
}

const FriendContext = createContext<FriendContextType | undefined>(undefined);

export const FriendProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setFriends(friendsData as Friend[]);
      setIsLoading(false);
    }, 1000);

    // Initial timeline data from localStorage
    const savedTimeline = localStorage.getItem('keenkeeper_timeline');
    if (savedTimeline) {
      setTimeline(JSON.parse(savedTimeline));
    } else {
      // Add some initial mock timeline data if empty
      const initialTimeline: TimelineEntry[] = [
        {
          id: '1',
          friendId: 1,
          friendName: 'Sarah Chen',
          date: new Date(Date.now() - 86400000 * 2).toISOString(),
          type: 'call',
          title: 'Call with Sarah Chen'
        },
        {
          id: '2',
          friendId: 2,
          friendName: 'Alex Johnson',
          date: new Date(Date.now() - 86400000 * 5).toISOString(),
          type: 'text',
          title: 'Text with Alex Johnson'
        }
      ];
      setTimeline(initialTimeline);
      localStorage.setItem('keenkeeper_timeline', JSON.stringify(initialTimeline));
    }

    return () => clearTimeout(timer);
  }, []);

  const addTimelineEntry = (friendId: number, friendName: string, type: 'call' | 'text' | 'video') => {
    const newEntry: TimelineEntry = {
      id: Date.now().toString(),
      friendId,
      friendName,
      date: new Date().toISOString(),
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friendName}`
    };

    const updatedTimeline = [newEntry, ...timeline];
    setTimeline(updatedTimeline);
    localStorage.setItem('keenkeeper_timeline', JSON.stringify(updatedTimeline));
  };

  return (
    <FriendContext.Provider value={{ friends, timeline, isLoading, addTimelineEntry }}>
      {children}
    </FriendContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendContext);
  if (context === undefined) {
    throw new Error('useFriends must be used within a FriendProvider');
  }
  return context;
};
