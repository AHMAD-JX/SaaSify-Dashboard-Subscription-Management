'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import DashboardNavbar from './DashboardNavbar';
import { 
  LayoutDashboard, 
  CreditCard, 
  Bell, 
  User, 
  BarChart3, 
  Menu, 
  X,
  LogOut,
  Settings,
  HelpCircle,
  Home,
  Search,
  Plus,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const navItems = [
  { 
    section: 'Main',
    items: [
      { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    ]
  },
  { 
    section: 'Management',
    items: [
      { href: '/dashboard/notifications', label: 'Notifications', icon: Bell, badge: 3 },
      { href: '/dashboard/billing', label: 'Billing & Payments', icon: CreditCard },
    ]
  },
  { 
    section: 'Account',
    items: [
      { href: '/dashboard/profile', label: 'Profile', icon: User },
      { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ]
  }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarCollapsed, toggleSidebar: toggleCollapse } = useSidebar();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  function handleLogout() {
    // Handle logout logic here
    router.push('/auth/login');
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <motion.div 
              className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-card border-r border-border flex flex-col shadow-2xl"
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Mobile sidebar header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">SaaSify</h2>
                      <p className="text-sm text-foreground/60">Dashboard</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSidebarOpen(false)} 
                    className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search in mobile */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input
                    type="text"
                    placeholder="Search subscriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Mobile navigation */}
              <div className="flex-1 overflow-y-auto p-4">
                {navItems.map((section, sectionIndex) => (
                  <motion.div 
                    key={section.section} 
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                  >
                    <h3 className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4">
                      {section.section}
                    </h3>
                    <div className="space-y-1">
                      {section.items.map((item, itemIndex) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setSidebarOpen(false)}
                              className={`flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group ${
                                isActive 
                                  ? 'bg-indigo-600 text-white shadow-lg' 
                                  : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5 hover:shadow-md'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <Icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.label}</span>
                              </div>
                              {item.badge && (
                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile footer */}
              <div className="p-4 border-t border-border">
                <motion.button 
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Logout</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop sidebar */}
        <motion.div 
          className={`hidden md:flex md:flex-col md:fixed md:inset-y-0 z-30 ${
            sidebarCollapsed ? 'md:w-16' : 'md:w-72'
          }`}
          animate={{ width: sidebarCollapsed ? 64 : 288 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex-1 flex flex-col min-h-0 bg-card/95 backdrop-blur-md border-r border-border shadow-xl">
            {/* Desktop sidebar header */}
            <div className="p-6 border-b border-border relative">
              <motion.div 
                className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} mb-6`}
                animate={{ justifyContent: sidebarCollapsed ? 'center' : 'flex-start' }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h2 className="text-xl font-bold">SaaSify</h2>
                      <p className="text-sm text-foreground/60">Dashboard</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Search */}
              <AnimatePresence>
                {!sidebarCollapsed && (
                  <motion.div 
                    className="relative"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input
                      type="text"
                      placeholder="Search subscriptions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Toggle button */}
              <motion.button
                onClick={toggleCollapse}
                className={`absolute top-6 ${sidebarCollapsed ? 'right-2' : 'right-4'} p-2 rounded-lg hover:bg-foreground/5 transition-all duration-200 group`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ right: sidebarCollapsed ? 8 : 16 }}
                transition={{ duration: 0.3 }}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="w-4 h-4 text-foreground/60 group-hover:text-foreground" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-foreground/60 group-hover:text-foreground" />
                )}
              </motion.button>
            </div>

            {/* Desktop navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              {navItems.map((section, sectionIndex) => (
                <motion.div 
                  key={section.section} 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <AnimatePresence>
                    {!sidebarCollapsed && (
                      <motion.h3 
                        className="text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {section.section}
                      </motion.h3>
                    )}
                  </AnimatePresence>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                              isActive 
                                ? 'bg-indigo-600 text-white shadow-lg' 
                                : 'text-foreground/80 hover:text-foreground hover:bg-foreground/5 hover:shadow-md'
                            }`}
                            title={sidebarCollapsed ? item.label : undefined}
                          >
                            <div className={`flex items-center ${sidebarCollapsed ? '' : 'space-x-3'}`}>
                              <Icon className="w-5 h-5" />
                              <AnimatePresence>
                                {!sidebarCollapsed && (
                                  <motion.span 
                                    className="text-sm font-medium"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    {item.label}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </div>
                            <AnimatePresence>
                              {!sidebarCollapsed && item.badge && (
                                <motion.span 
                                  className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full"
                                  initial={{ opacity: 0, scale: 0 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {item.badge}
                                </motion.span>
                              )}
                            </AnimatePresence>
                            
                            {/* Enhanced tooltip for collapsed state */}
                            {sidebarCollapsed && (
                              <motion.div 
                                className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50"
                                initial={{ opacity: 0, x: -10 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="flex items-center space-x-2">
                                  <span>{item.label}</span>
                                  {item.badge && (
                                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                              </motion.div>
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop footer */}
            <div className="p-4 border-t border-border">
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/"
                    className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-xl text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all duration-200 group relative`}
                    title={sidebarCollapsed ? 'Back to Home' : undefined}
                  >
                    <Home className="w-5 h-5" />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span 
                          className="text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          Back to Home
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {sidebarCollapsed && (
                      <motion.div 
                        className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50"
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Back to Home
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </motion.div>
                    )}
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button 
                    onClick={handleLogout}
                    className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-all duration-200 group relative`}
                    title={sidebarCollapsed ? 'Logout' : undefined}
                  >
                    <LogOut className="w-5 h-5" />
                    <AnimatePresence>
                      {!sidebarCollapsed && (
                        <motion.span 
                          className="text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          Logout
                        </motion.span>
                      )}
                    </AnimatePresence>
                    {sidebarCollapsed && (
                      <motion.div 
                        className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50"
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        Logout
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                      </motion.div>
                    )}
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div 
          className={`flex flex-col flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'md:pl-16' : 'md:pl-72'
          }`}
          animate={{ paddingLeft: sidebarCollapsed ? 64 : 288 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Dashboard Navbar */}
          <DashboardNavbar />
          
          {/* Page content */}
          <div className="flex-1 min-h-screen bg-background">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
