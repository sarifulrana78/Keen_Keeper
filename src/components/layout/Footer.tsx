import React from 'react';
import { Instagram, Facebook, X } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#213F33] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-6xl font-black mb-6 tracking-tight">KeenKeeper</h2>
        <p className="text-slate-300 max-w-2xl mx-auto mb-8 font-light text-base">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <div className="mb-12">
          <p className="text-lg font-semibold text-white mb-6">Social Links</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-slate-100 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white text-brand-dark flex items-center justify-center hover:bg-slate-100 transition-colors">
              <X size={24} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
