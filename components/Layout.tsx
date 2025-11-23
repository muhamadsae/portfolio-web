import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, ChevronRight, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from './ui';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-slate-900 font-semibold" : "text-gray-600 hover:text-slate-900";

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
              Elevate<span className="text-slate-500">AI</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link to="/" className={`text-sm ${isActive('/')}`}>Home</Link>
              <Link to="/blog" className={`text-sm ${isActive('/blog')}`}>Blog Prompt</Link>
              <Link to="/courses" className={`text-sm ${isActive('/courses')}`}>Courses</Link>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout} className="gap-2">
                  <LogOut size={16} />
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
                <Link to="/register"><Button variant="primary" size="sm">Register Free</Button></Link>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-4 shadow-lg">
            <Link to="/" className="block text-sm font-medium text-gray-700" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/blog" className="block text-sm font-medium text-gray-700" onClick={() => setIsMenuOpen(false)}>Blog Prompt</Link>
            <Link to="/courses" className="block text-sm font-medium text-gray-700" onClick={() => setIsMenuOpen(false)}>Courses</Link>
            <div className="border-t border-gray-100 pt-4">
               {user ? (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block mb-2 text-sm font-medium">Dashboard</Link>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-sm text-red-600 font-medium">Log out</button>
                  </>
               ) : (
                 <div className="flex flex-col gap-2">
                   <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button fullWidth variant="outline">Log in</Button></Link>
                   <Link to="/register" onClick={() => setIsMenuOpen(false)}><Button fullWidth variant="primary">Register Free</Button></Link>
                 </div>
               )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <span className="text-lg font-bold text-slate-900">ElevateAI</span>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Empowering office workers with cutting-edge AI skills for improved productivity and automation.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Platform</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><Link to="/courses" className="hover:text-slate-900">All Courses</Link></li>
                <li><Link to="/blog" className="hover:text-slate-900">Prompt Library</Link></li>
                <li><Link to="/login" className="hover:text-slate-900">Student Login</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-slate-900">Terms of Service</a></li>
                <li><a href="#" className="hover:text-slate-900">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-slate-900">Refund Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Secure Payment</h3>
              <p className="text-sm text-gray-500 mb-4">
                We accept major local banks and e-wallets via Midtrans.
              </p>
              <div className="flex gap-2 opacity-50 grayscale">
                 {/* Mock payment icons */}
                 <div className="w-8 h-5 bg-gray-300 rounded"></div>
                 <div className="w-8 h-5 bg-gray-300 rounded"></div>
                 <div className="w-8 h-5 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} ElevateAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;