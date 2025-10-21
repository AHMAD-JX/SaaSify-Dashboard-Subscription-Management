'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Calendar, Download, Eye, EyeOff } from 'lucide-react';

type PaymentMethod = {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
};

type Transaction = {
  id: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  subscription: string;
};

export default function BillingPage() {
  const [showCardNumber, setShowCardNumber] = useState(false);
  
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      description: 'Netflix Premium',
      amount: 15.99,
      date: '2024-12-01T00:00:00Z',
      status: 'completed',
      subscription: 'Netflix',
    },
    {
      id: '2',
      description: 'Adobe Creative Cloud',
      amount: 52.99,
      date: '2024-11-15T00:00:00Z',
      status: 'completed',
      subscription: 'Adobe CC',
    },
    {
      id: '3',
      description: 'Spotify Premium',
      amount: 9.99,
      date: '2024-11-01T00:00:00Z',
      status: 'completed',
      subscription: 'Spotify',
    },
    {
      id: '4',
      description: 'Google Drive Storage',
      amount: 1.99,
      date: '2024-10-15T00:00:00Z',
      status: 'completed',
      subscription: 'Google Drive',
    },
  ];

  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  const thisMonthSpent = transactions
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <motion.div 
      className="p-6 md:p-8 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Billing & Payments</h1>
          <p className="text-foreground/70">Manage your payment methods and view transaction history</p>
        </div>

        {/* Billing Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">This Month</h3>
              <CreditCard className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-3xl font-bold">${thisMonthSpent.toFixed(2)}</p>
            <p className="text-sm text-foreground/60 mt-1">Total spent this month</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Time</h3>
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
            <p className="text-sm text-foreground/60 mt-1">Total spent all time</p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Next Payment</h3>
              <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <p className="text-3xl font-bold">$15.99</p>
            <p className="text-sm text-foreground/60 mt-1">Netflix - Dec 15</p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <button className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add Method</span>
            </button>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border border-border rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium">{method.brand} •••• {method.last4}</p>
                      {method.isDefault && (
                        <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/60">
                      Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded-lg hover:bg-foreground/5 transition-colors">
                    {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-border hover:bg-foreground/5 transition-colors">
                    Edit
                  </button>
                  {!method.isDefault && (
                    <button className="px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Transaction History</h2>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl border border-border hover:bg-foreground/5 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-foreground/70 border-b border-border">
                  <th className="pb-3">Description</th>
                  <th className="pb-3">Subscription</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border last:border-b-0">
                    <td className="py-4 font-medium">{transaction.description}</td>
                    <td className="py-4 text-foreground/70">{transaction.subscription}</td>
                    <td className="py-4 font-semibold">${transaction.amount.toFixed(2)}</td>
                    <td className="py-4 text-foreground/70">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                          : transaction.status === 'pending'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
  );
}
