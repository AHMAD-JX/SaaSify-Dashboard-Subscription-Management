'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, X, AlertCircle, Info, CreditCard } from 'lucide-react';

type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'payment';
  read: boolean;
  date: string;
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Netflix Renewal Due',
      message: 'Your Netflix subscription will renew in 3 days for $15.99',
      type: 'payment',
      read: false,
      date: '2024-12-12T10:30:00Z'
    },
    {
      id: '2',
      title: 'Spotify Paused',
      message: 'Your Spotify subscription has been paused successfully',
      type: 'success',
      read: false,
      date: '2024-12-11T14:20:00Z'
    },
    {
      id: '3',
      title: 'Adobe CC Price Increase',
      message: 'Adobe Creative Cloud pricing will increase by $2/month starting January 2025',
      type: 'warning',
      read: true,
      date: '2024-12-10T09:15:00Z'
    },
    {
      id: '4',
      title: 'New Feature Available',
      message: 'Budget alerts are now available! Set spending limits for your subscriptions',
      type: 'info',
      read: true,
      date: '2024-12-09T16:45:00Z'
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  function markAsRead(id: string) {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }

  function markAllAsRead() {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
  }

  function deleteNotification(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }

  function getIcon(type: Notification['type']) {
    switch (type) {
      case 'payment': return CreditCard;
      case 'warning': return AlertCircle;
      case 'success': return Check;
      case 'info': return Info;
      default: return Bell;
    }
  }

  function getIconColor(type: Notification['type']) {
    switch (type) {
      case 'payment': return 'text-blue-600 dark:text-blue-400';
      case 'warning': return 'text-yellow-600 dark:text-yellow-400';
      case 'success': return 'text-green-600 dark:text-green-400';
      case 'info': return 'text-indigo-600 dark:text-indigo-400';
      default: return 'text-foreground/60';
    }
  }

  return (
    <motion.div 
      className="p-6 md:p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-foreground/70">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Mark All Read
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-foreground/5 p-1 rounded-xl w-fit">
          {(['all', 'unread', 'read'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filter === filterType
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {filterType}
              {filterType === 'unread' && unreadCount > 0 && (
                <span className="ml-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground/60 mb-2">No notifications</h3>
              <p className="text-foreground/40">
                {filter === 'unread' 
                  ? "You're all caught up!" 
                  : "No notifications to show"}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = getIcon(notification.type);
              const iconColor = getIconColor(notification.type);
              
              return (
                <div
                  key={notification.id}
                  className={`bg-card border border-border rounded-2xl p-6 transition-all ${
                    !notification.read ? 'ring-2 ring-indigo-500/20' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg bg-foreground/5 ${iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-foreground/80'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-foreground/70 mt-1">{notification.message}</p>
                          <p className="text-sm text-foreground/50 mt-2">
                            {new Date(notification.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-foreground/60" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete notification"
                          >
                            <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
  );
}
