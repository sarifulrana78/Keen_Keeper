import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-slate-100 absolute -z-10 select-none">404</h1>
      <div className="z-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Lost in Connection?</h2>
        <p className="text-slate-500 max-w-md mx-auto mb-8 font-light">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20"
        >
          <Home size={20} />
          Safe Return Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
