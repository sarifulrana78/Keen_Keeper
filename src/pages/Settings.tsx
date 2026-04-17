import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, Settings as SettingsIcon } from 'lucide-react';
import Button from '../components/ui/Button';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="pb-16 pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="text-brand" size={32} />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">Theme</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle between light and dark mode</p>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;