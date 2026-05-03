import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css';

// Lazy load pages for better efficiency and smaller initial bundles
const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Guide = lazy(() => import('./pages/Guide'));
const Assistant = lazy(() => import('./pages/Assistant'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full animate-spin dark:border-slate-700 dark:border-t-primary"></div>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/assistant" element={<Assistant />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;

