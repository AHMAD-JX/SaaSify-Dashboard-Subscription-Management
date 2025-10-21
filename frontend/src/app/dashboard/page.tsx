'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Grid3x3, 
  List, 
  Calendar, 
  DollarSign,
  TrendingUp,
  Activity,
  PlayCircle,
  PauseCircle,
  XCircle,
  Filter,
  Download,
  Upload,
  Sparkles,
  Tv,
  Music,
  Book,
  Code,
  Camera,
  Cloud,
  Zap,
  Heart
} from 'lucide-react';

type Subscription = {
  id: string;
  name: string;
  price: number; // monthly price
  renewalDate: string; // ISO date
  status: 'active' | 'paused' | 'canceled';
  category: 'Entertainment' | 'Work' | 'Tools' | 'Other';
  icon?: string;
  description?: string;
};

const STATUSES: Array<Subscription['status']> = ['active', 'paused', 'canceled'];
const CATEGORIES: Array<Subscription['category']> = ['Entertainment', 'Work', 'Tools', 'Other'];

const categoryIcons: Record<Subscription['category'], any> = {
  Entertainment: Tv,
  Work: Code,
  Tools: Zap,
  Other: Sparkles,
};

const subscriptionIcons: Record<string, any> = {
  Netflix: Tv,
  Spotify: Music,
  'Adobe CC': Camera,
  Dropbox: Cloud,
  GitHub: Code,
  YouTube: Tv,
  'Apple Music': Music,
  'Amazon Prime': Tv,
  Default: Heart,
};

export default function DashboardPage() {
  const [items, setItems] = useState<Subscription[]>([
    { id: '1', name: 'Netflix', price: 15.99, renewalDate: new Date().toISOString(), status: 'active', category: 'Entertainment', description: 'Streaming service' },
    { id: '2', name: 'Spotify', price: 9.99, renewalDate: new Date(Date.now() + 7*86400000).toISOString(), status: 'paused', category: 'Entertainment', description: 'Music streaming' },
    { id: '3', name: 'Adobe CC', price: 52.99, renewalDate: new Date(Date.now() + 30*86400000).toISOString(), status: 'active', category: 'Work', description: 'Creative Cloud' },
    { id: '4', name: 'GitHub', price: 4.00, renewalDate: new Date(Date.now() + 15*86400000).toISOString(), status: 'active', category: 'Work', description: 'Code hosting' },
    { id: '5', name: 'Dropbox', price: 11.99, renewalDate: new Date(Date.now() + 20*86400000).toISOString(), status: 'active', category: 'Tools', description: 'Cloud storage' },
  ]);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Subscription['status']>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Subscription['category']>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Subscription | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = useMemo(() => {
    return items.filter((it) => {
      const matchesQuery = it.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'all' ? true : it.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' ? true : it.category === categoryFilter;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [items, query, statusFilter, categoryFilter]);

  const stats = useMemo(() => {
    const activeCount = items.filter(i => i.status === 'active').length;
    const totalMonthly = items.filter(i => i.status === 'active').reduce((sum, i) => sum + i.price, 0);
    const upcomingRenewals = items.filter(i => {
      const daysUntil = Math.ceil((new Date(i.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      return daysUntil >= 0 && daysUntil <= 7 && i.status === 'active';
    }).length;
    
    return {
      activeCount,
      totalMonthly,
      upcomingRenewals,
      totalSubscriptions: items.length
    };
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  function resetForm() {
    setEditing(null);
    setShowForm(false);
  }

  function handleSave(form: Omit<Subscription, 'id'> & { id?: string }) {
    if (form.id) {
      setItems((prev) => prev.map((it) => (it.id === form.id ? { ...(it as any), ...form } as Subscription : it)));
    } else {
      const id = Math.random().toString(36).slice(2);
      setItems((prev) => [{ id, ...form } as Subscription, ...prev]);
    }
    resetForm();
  }

  function handleEdit(id: string) {
    const target = items.find((it) => it.id === id) || null;
    setEditing(target);
    setShowForm(true);
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this subscription?')) return;
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  const getIcon = (name: string) => {
    return subscriptionIcons[name] || subscriptionIcons.Default;
  };

  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">Subscriptions</h1>
          <p className="text-foreground/60 mt-1">Manage and track all your subscriptions</p>
        </div>
        <motion.button 
          onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Subscription</span>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{stats.activeCount}</span>
          </div>
          <p className="text-white/90 font-medium">Active Subscriptions</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">${stats.totalMonthly.toFixed(2)}</span>
          </div>
          <p className="text-white/90 font-medium">Monthly Spending</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white shadow-xl"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{stats.upcomingRenewals}</span>
          </div>
          <p className="text-white/90 font-medium">Renewing This Week</p>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <span className="text-2xl font-bold">{stats.totalSubscriptions}</span>
          </div>
          <p className="text-white/90 font-medium">Total Services</p>
        </motion.div>
      </motion.div>

      {/* Filters & View Toggle */}
      <motion.div 
        className="bg-card border border-border rounded-2xl p-4 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search & Filters */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Search subscriptions..."
                className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }}
              className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value as any); setPage(1); }}
              className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
              className="px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            >
              {[6, 9, 12, 18].map(n => <option key={n} value={n}>{n} per page</option>)}
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-background border border-border rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Subscriptions Grid/List */}
      <AnimatePresence mode="wait">
        {pageItems.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <div className="w-16 h-16 bg-foreground/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-foreground/40" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No subscriptions found</h3>
            <p className="text-foreground/60 mb-4">Try adjusting your filters or add a new subscription</p>
            <motion.button
              onClick={() => { setEditing(null); setShowForm(true); }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Subscription
            </motion.button>
          </motion.div>
        ) : viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {pageItems.map((item, index) => {
              const Icon = getIcon(item.name);
              const CategoryIcon = categoryIcons[item.category];
              const daysUntil = Math.ceil((new Date(item.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        item.status === 'active' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                        item.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                        'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.name}</h3>
                        <div className="flex items-center space-x-2 text-xs text-foreground/60">
                          <CategoryIcon className="w-3 h-3" />
                          <span>{item.category}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <motion.button
                        onClick={() => handleEdit(item.id)}
                        className="p-2 rounded-lg hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-foreground/60 hover:text-red-600 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Description */}
                  {item.description && (
                    <p className="text-sm text-foreground/60 mb-4">{item.description}</p>
                  )}

                  {/* Price & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-2xl font-bold text-foreground">${item.price.toFixed(2)}</p>
                      <p className="text-xs text-foreground/60">per month</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">{new Date(item.renewalDate).toLocaleDateString()}</p>
                      <p className="text-xs text-foreground/60">
                        {daysUntil >= 0 ? `in ${daysUntil} days` : `${Math.abs(daysUntil)} days ago`}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                      item.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {item.status === 'active' && <PlayCircle className="w-3 h-3" />}
                      {item.status === 'paused' && <PauseCircle className="w-3 h-3" />}
                      {item.status === 'canceled' && <XCircle className="w-3 h-3" />}
                      <span className="capitalize">{item.status}</span>
                    </span>
                    
                    {daysUntil >= 0 && daysUntil <= 7 && item.status === 'active' && (
                      <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                        Renewing soon
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-foreground/5 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase tracking-wider">Renewal</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-foreground/70 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-foreground/70 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {pageItems.map((item, index) => {
                    const Icon = getIcon(item.name);
                    const CategoryIcon = categoryIcons[item.category];
                    const daysUntil = Math.ceil((new Date(item.renewalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-foreground/5 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              item.status === 'active' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' :
                              item.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                              'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                            }`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              {item.description && (
                                <p className="text-xs text-foreground/60">{item.description}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2 text-sm text-foreground/80">
                            <CategoryIcon className="w-4 h-4" />
                            <span>{item.category}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-foreground">${item.price.toFixed(2)}</p>
                          <p className="text-xs text-foreground/60">per month</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground">{new Date(item.renewalDate).toLocaleDateString()}</p>
                          <p className="text-xs text-foreground/60">
                            {daysUntil >= 0 ? `in ${daysUntil} days` : `${Math.abs(daysUntil)} days ago`}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                            item.status === 'active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
                            item.status === 'paused' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' :
                            'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          }`}>
                            {item.status === 'active' && <PlayCircle className="w-3 h-3" />}
                            {item.status === 'paused' && <PauseCircle className="w-3 h-3" />}
                            {item.status === 'canceled' && <XCircle className="w-3 h-3" />}
                            <span className="capitalize">{item.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <motion.button
                              onClick={() => handleEdit(item.id)}
                              className="p-2 rounded-lg hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              onClick={() => handleDelete(item.id)}
                              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-foreground/60 hover:text-red-600 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {pageItems.length > 0 && (
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm text-foreground/60">
            Showing <span className="font-medium text-foreground">{(page - 1) * pageSize + 1}</span> to{' '}
            <span className="font-medium text-foreground">{Math.min(page * pageSize, filtered.length)}</span> of{' '}
            <span className="font-medium text-foreground">{filtered.length}</span> subscriptions
          </p>
          <div className="flex items-center space-x-2">
            <motion.button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/5 transition-colors"
              whileHover={{ scale: page === 1 ? 1 : 1.05 }}
              whileTap={{ scale: page === 1 ? 1 : 0.95 }}
            >
              Previous
            </motion.button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <motion.button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      page === pageNum
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'border border-border hover:bg-foreground/5'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {pageNum}
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-lg border border-border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-foreground/5 transition-colors"
              whileHover={{ scale: page === totalPages ? 1 : 1.05 }}
              whileTap={{ scale: page === totalPages ? 1 : 0.95 }}
            >
              Next
            </motion.button>
          </div>
        </motion.div>
      )}

        {showForm && (
          <SubscriptionForm
            initial={editing ?? undefined}
            onCancel={resetForm}
            onSave={(data) => handleSave({
              id: editing?.id,
              ...data
            })}
          />
        )}
      </motion.div>
  );
}

function SubscriptionForm({ initial, onCancel, onSave }: { initial?: Subscription; onCancel: () => void; onSave: (data: Omit<Subscription, 'id'>) => void }) {
  const [name, setName] = useState(initial?.name ?? '');
  const [price, setPrice] = useState<string>(initial ? String(initial.price) : '');
  const [renewalDate, setRenewalDate] = useState<string>(initial ? initial.renewalDate.slice(0,10) : '');
  const [status, setStatus] = useState<Subscription['status']>(initial?.status ?? 'active');
  const [category, setCategory] = useState<Subscription['category']>(initial?.category ?? 'Other');
  const [description, setDescription] = useState<string>(initial?.description ?? '');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !price || !renewalDate) return;
    onSave({ 
      name, 
      price: Number(price), 
      renewalDate: new Date(renewalDate).toISOString(), 
      status,
      category,
      description 
    });
  }

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
      >
        <motion.div 
          className="bg-card border border-border rounded-2xl w-full max-w-2xl p-6 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {initial ? 'Edit Subscription' : 'Add New Subscription'}
              </h2>
              <p className="text-sm text-foreground/60 mt-1">
                {initial ? 'Update your subscription details' : 'Add a new subscription to track'}
              </p>
            </div>
            <motion.button
              onClick={onCancel}
              className="p-2 rounded-lg hover:bg-foreground/5 text-foreground/60 hover:text-foreground transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <XCircle className="w-6 h-6" />
            </motion.button>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Name <span className="text-red-500">*</span>
                </label>
                <input 
                  value={name} 
                  onChange={(e)=>setName(e.target.value)} 
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="e.g. Netflix, Spotify" 
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select 
                  value={category} 
                  onChange={(e)=>setCategory(e.target.value as any)} 
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <input 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)} 
                className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                placeholder="Brief description of the service" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price (USD) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    value={price} 
                    onChange={(e)=>setPrice(e.target.value)} 
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Renewal Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <input 
                    type="date" 
                    value={renewalDate} 
                    onChange={(e)=>setRenewalDate(e.target.value)} 
                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status <span className="text-red-500">*</span>
                </label>
                <select 
                  value={status} 
                  onChange={(e)=>setStatus(e.target.value as any)} 
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-foreground focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all capitalize"
                  required
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s} className="capitalize">{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
              <motion.button 
                type="button" 
                onClick={onCancel} 
                className="px-6 py-2.5 rounded-xl border border-border hover:bg-foreground/5 transition-colors font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button 
                type="submit" 
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors font-medium shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {initial ? 'Update Subscription' : 'Add Subscription'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}