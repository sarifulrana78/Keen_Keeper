import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { FriendProvider } from './context/FriendContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Lazy load pages for performance and loading animation exercise
const Home = lazy(() => import('./pages/Home'));
const FriendDetails = lazy(() => import('./pages/FriendDetails'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Stats = lazy(() => import('./pages/Stats'));
const NotFound = lazy(() => import('./pages/NotFound'));

const LoadingFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <FriendProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/friend/:id" element={<FriendDetails />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </FriendProvider>
  );
}
