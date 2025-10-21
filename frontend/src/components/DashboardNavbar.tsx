'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import { useUser } from '@/contexts/UserContext';
import { 
  Menu, 
  X,
  Bell,
  Search,
  Plus,
  Sparkles,
  Home,
  LogOut,
  User,
  ChevronLeft
} from 'lucide-react';

export default function DashboardNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar } = useSidebar();
  const { user, loading, logout } = useUser();

  async function handleLogout() {
    await logout();
    router.push('/auth/login');
  }

  const isDashboardPage = pathname.startsWith('/dashboard');

  if (!isDashboardPage) {
    return null; // Don't render on non-dashboard pages
  }

  return (
    <>
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <motion.div 
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-card border-l border-border p-6 shadow-2xl"
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Quick Actions</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <motion.button 
                  className="w-full flex items-center space-x-3 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Subscription</span>
                </motion.button>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
                  >
                    <Home className="w-5 h-5" />
                    <span>Back to Home</span>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Navbar */}
      <motion.nav 
        className="sticky top-0 z-30 bg-card/95 backdrop-blur-md border-b border-border shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Mobile menu, sidebar toggle, and search */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              
              {/* Desktop sidebar toggle */}
              <button
                onClick={toggleSidebar}
                className="hidden md:flex p-2 rounded-lg hover:bg-foreground/5 transition-colors"
              >
                <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${
                  sidebarCollapsed ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* Page title */}
              <motion.div 
                className="flex items-center space-x-3"
                key={pathname}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-lg sm:text-xl font-semibold text-foreground">
                  {pathname === '/dashboard' ? 'Dashboard' : 
                   pathname === '/dashboard/analytics' ? 'Analytics' :
                   pathname === '/dashboard/notifications' ? 'Notifications' :
                   pathname === '/dashboard/billing' ? 'Billing & Payments' :
                   pathname === '/dashboard/profile' ? 'Profile' :
                   pathname === '/dashboard/settings' ? 'Settings' : 'Dashboard'}
                </h1>
                <p className="hidden sm:block text-sm text-foreground/60">
                  {pathname === '/dashboard' ? 'Manage your subscriptions' : 'Dashboard overview'}
                </p>
              </motion.div>
              
              {/* Search bar - responsive */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search subscriptions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right side - Actions and profile */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Quick Add Button - responsive */}
              <motion.button 
                className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:block text-sm font-medium">Add Subscription</span>
              </motion.button>
              
              {/* Mobile Add Button */}
              <motion.button 
                className="sm:hidden p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
              
              {/* Notifications */}
              <motion.button 
                className="relative p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5 text-foreground/80" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </motion.button>
              
              {/* User Profile */}
              <motion.div 
                className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-3 border-l border-border"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-medium">
                    {loading ? '...' : user ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-foreground">
                    {loading ? 'Loading...' : user ? user.name : 'User'}
                  </p>
                  <p className="text-xs text-foreground/60 capitalize">
                    {loading ? '' : user ? user.role : 'User'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
