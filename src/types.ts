export type FriendStatus = 'overdue' | 'almost due' | 'on-track';

export interface Friend {
  id: number;
  name: string;
  picture: string;
  email: string;
  days_since_contact: number;
  status: FriendStatus;
  tags: string[];
  bio: string;
  goal: number;
  next_due_date: string;
}

export interface TimelineEntry {
  id: string;
  friendId: number;
  friendName: string;
  date: string;
  type: 'call' | 'text' | 'video';
  title: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

export type Theme = 'light' | 'dark';
