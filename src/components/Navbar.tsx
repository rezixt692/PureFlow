import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wind } from 'lucide-react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Device', path: '/device' },
    { name: 'Real Stories', path: '/stories' },
    { name: 'Science', path: '/science' },
    { name: 'Plans', path: '/plans' },
    { name: 'Reach Us', path: '/contact' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 bg-transparent pointer-events-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gray-900 text-white p-1.5 rounded-full">
            <Wind size={18} />
          </div>
          <span className="font-semibold text-gray-900 tracking-tight">PureFlow</span>
        </Link>

        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 dark:bg-gray-900/10 backdrop-blur-md rounded-full px-2 py-1.5 items-center gap-1 border border-black/5 shadow-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'bg-gray-900 text-white shadow-sm' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-900/5'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <Link to="/plans" className="hidden md:flex bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-full items-center gap-2 hover:bg-gray-700 transition-all pointer-events-auto shadow-md hover:scale-105 active:scale-95">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
          Reserve Yours
        </Link>

        <button
          className="md:hidden text-gray-900 p-1 hover:bg-gray-200 rounded-full transition-colors pointer-events-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl pt-20 pb-6 px-5 shadow-lg flex flex-col gap-1 md:hidden pointer-events-auto border-b border-gray-200">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`text-base font-medium py-3 border-b border-gray-100 text-left transition-colors ${
                  isActive ? 'text-gray-900 font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <Link 
            to="/plans"
            onClick={() => setMenuOpen(false)}
            className="mt-4 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-full flex items-center gap-2 justify-center hover:bg-gray-700 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            Reserve Yours
          </Link>
        </div>
      )}
    </>
  );
}
