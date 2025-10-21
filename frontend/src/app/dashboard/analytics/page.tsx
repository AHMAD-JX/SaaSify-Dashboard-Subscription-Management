'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  CreditCard, 
  Calendar,
  Filter,
  Eye,
  EyeOff
} from 'lucide-react';

// Mock data for subscriptions
const mockSubscriptions = [
  { id: 1, name: 'Netflix', category: 'Entertainment', price: 15.99, status: 'active', renewalDate: '2024-02-15' },
  { id: 2, name: 'Spotify', category: 'Entertainment', price: 9.99, status: 'active', renewalDate: '2024-02-20' },
  { id: 3, name: 'Adobe Creative', category: 'Work', price: 22.99, status: 'active', renewalDate: '2024-02-25' },
  { id: 4, name: 'Microsoft 365', category: 'Work', price: 6.99, status: 'active', renewalDate: '2024-03-01' },
  { id: 5, name: 'Figma', category: 'Tools', price: 12.99, status: 'active', renewalDate: '2024-03-05' },
  { id: 6, name: 'Notion', category: 'Tools', price: 8.99, status: 'active', renewalDate: '2024-03-10' },
  { id: 7, name: 'Disney+', category: 'Entertainment', price: 7.99, status: 'active', renewalDate: '2024-03-15' },
  { id: 8, name: 'Slack', category: 'Work', price: 6.67, status: 'active', renewalDate: '2024-03-20' },
];

// Monthly spending data for charts
const monthlyData = [
  { month: 'Jan', amount: 89.99, subscriptions: 8 },
  { month: 'Feb', amount: 95.99, subscriptions: 9 },
  { month: 'Mar', amount: 102.99, subscriptions: 10 },
  { month: 'Apr', amount: 98.99, subscriptions: 9 },
  { month: 'May', amount: 105.99, subscriptions: 10 },
  { month: 'Jun', amount: 112.99, subscriptions: 11 },
];

const categoryColors = {
  Entertainment: '#8B5CF6',
  Work: '#06B6D4',
  Tools: '#10B981',
};

export default function AnalyticsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalSubscriptions = mockSubscriptions.length;
    const monthlySpending = mockSubscriptions.reduce((sum, sub) => sum + sub.price, 0);
    const activeSubscriptions = mockSubscriptions.filter(sub => sub.status === 'active').length;
    
    // Category breakdown
    const categoryBreakdown = mockSubscriptions.reduce((acc, sub) => {
      acc[sub.category] = (acc[sub.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSubscriptions,
      monthlySpending,
      activeSubscriptions,
      categoryBreakdown
    };
  }, []);

  // Filter subscriptions by category
  const filteredSubscriptions = useMemo(() => {
    if (selectedCategory === 'all') return mockSubscriptions;
    return mockSubscriptions.filter(sub => sub.category === selectedCategory);
  }, [selectedCategory]);

  // Prepare data for pie chart
  const pieData = Object.entries(stats.categoryBreakdown).map(([category, count]) => ({
    name: category,
    value: count,
    color: categoryColors[category as keyof typeof categoryColors]
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-foreground/60">Smart insights and analytics for your subscriptions</p>
          </motion.div>

          {/* Statistics Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Total Subscriptions</p>
                  <p className="text-3xl font-bold text-indigo-600">{stats.totalSubscriptions}</p>
                </div>
                <div className="p-3 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <CreditCard className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Monthly Spending</p>
                  <p className="text-3xl font-bold text-green-600">${stats.monthlySpending.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Active Services</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.activeSubscriptions}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground/60">Avg. per Service</p>
                  <p className="text-3xl font-bold text-purple-600">
                    ${(stats.monthlySpending / stats.totalSubscriptions).toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Filter by Category</h2>
                <button
                  onClick={() => setShowDetailedView(!showDetailedView)}
                  className="flex items-center space-x-2 px-4 py-2 bg-background border border-border rounded-lg hover:bg-foreground/5 transition-colors"
                >
                  {showDetailedView ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm">{showDetailedView ? 'Hide Details' : 'Show Details'}</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-background border border-border hover:bg-foreground/5'
                  }`}
                >
                  All Categories ({mockSubscriptions.length})
                </button>
                {Object.entries(stats.categoryBreakdown).map(([category, count]) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-indigo-600 text-white'
                        : 'bg-background border border-border hover:bg-foreground/5'
                    }`}
                  >
                    {category} ({count})
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Monthly Spending Chart */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Spending Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#8B5CF6" 
                    fill="#8B5CF6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Category Distribution */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Category Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Additional Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Spending by Category Bar Chart */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Spending by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pieData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Subscription Growth */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">Subscription Growth</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="subscriptions" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Insights Section */}
          <motion.div 
            className="bg-card border border-border rounded-xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Smart Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Spending Trend</h4>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your monthly spending has increased by 12% compared to last month.
                </p>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h4 className="font-medium text-green-900 dark:text-green-100">Cost Optimization</h4>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You could save $23.98/month by pausing unused Entertainment services.
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">Upcoming Renewals</h4>
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  3 subscriptions will renew in the next 7 days. Total: $45.97
                </p>
              </div>
            </div>
          </motion.div>

          {/* Detailed Subscriptions Table */}
          {showDetailedView && (
            <motion.div 
              className="bg-card border border-border rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {selectedCategory === 'all' ? 'All Subscriptions' : `${selectedCategory} Subscriptions`}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Category</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Price</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Renewal Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map((subscription, index) => (
                      <motion.tr 
                        key={subscription.id}
                        className="border-b border-border/50 hover:bg-foreground/5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{subscription.name}</td>
                        <td className="py-3 px-4">
                          <span 
                            className="px-2 py-1 text-xs rounded-full text-white"
                            style={{ backgroundColor: categoryColors[subscription.category as keyof typeof categoryColors] }}
                          >
                            {subscription.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">${subscription.price}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            {subscription.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-foreground">{subscription.renewalDate}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
  );
}