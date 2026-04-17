import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart3, Moon, Sun, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/timeline', label: 'Timeline', icon: Clock },
    { to: '/stats', label: 'Stats', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-brand dark:text-brand">KeenKeeper</span>
          </NavLink>

          <div className="flex gap-1 md:gap-4 items-center">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-brand text-white" 
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand"
                  )
                }
              >
                <link.icon size={18} />
                <span className="hidden sm:inline">{link.label}</span>
              </NavLink>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="ml-2"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
