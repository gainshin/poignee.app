import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, Heart, BookOpen, Users, Library, BarChart3, Settings } from 'lucide-react';
import { cn } from '../utils/helpers';

const Layout: React.FC = () => {
  const navItems = [
    { to: '/', icon: Home, label: '首頁' },
    { to: '/companion', icon: Heart, label: 'AI陪伴' },
    { to: '/memories', icon: BookOpen, label: '記憶日記' },
    { to: '/family', icon: Users, label: '家人連結' },
    { to: '/culture', icon: Library, label: '文化寶庫' },
    { to: '/emotions', icon: BarChart3, label: '情緒追蹤' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 pb-20 lg:pb-0 lg:pl-64">
        {/* Desktop Sidebar */}
        <nav className="hidden lg:block fixed left-0 top-0 h-full w-64 glass-card rounded-none rounded-r-3xl border-l-0">
          <div className="p-6">
            <div className="mb-8">
              <h1 className="text-2xl font-bold gradient-text">Poignée 伴阮</h1>
              <p className="text-sm text-gray-600 mt-1">溫暖的數位陪伴</p>
            </div>
            
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300',
                        'hover:bg-white/20',
                        isActive && 'bg-white/30 shadow-lg'
                      )
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass-card rounded-t-3xl border-b-0 z-50">
          <ul className="flex justify-around items-center py-2">
            {navItems.slice(0, 5).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300',
                      'hover:bg-white/20',
                      isActive && 'bg-white/30'
                    )
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;