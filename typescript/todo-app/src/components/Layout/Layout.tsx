import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <div className="bg-neutral-800 w-full relative text-lg py-20 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 mt-8 pb-16">
        <Outlet />
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-900 py-3 px-6 text-center text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Todo App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 