'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart3, Shield, Zap, Users, CreditCard, TrendingUp, Check, Star, Crown, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="relative px-6 py-32">
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8"
            >
              <Star className="w-4 h-4" />
              <span>Trusted by 10,000+ businesses</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-bold mb-8 leading-tight"
            >
              Smart Dashboard for
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Subscription Management
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-2xl text-foreground/90 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Take control of your subscriptions with our intelligent dashboard. 
              Track, manage, and optimize your recurring payments with ease.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Link
                href="/auth/signup"
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-3 shadow-2xl hover:shadow-indigo-500/25 hover:scale-105"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            <Link
              href="/demo"
              className="text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 bg-white/90 hover:bg-white hover:scale-105 shadow-xl"
            >
                View Demo
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="text-4xl font-bold">$2M+</div>
                <div className="text-foreground/70">Saved by users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-foreground/70">Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">99.9%</div>
                <div className="text-foreground/70">Uptime</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-32 relative">
        {/* Removed distinct backgrounds; keep very light overlay only if needed */}
        <div className="absolute inset-0" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Everything you need to manage subscriptions
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Powerful features designed to help you stay on top of your recurring payments
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description: "Get insights into your spending patterns and subscription trends with our advanced analytics dashboard.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Shield,
                title: "Secure & Private",
                description: "Your financial data is protected with bank-level security and end-to-end encryption.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Auto-Renewal Alerts",
                description: "Never miss a renewal with intelligent notifications and smart reminders.",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share subscription insights with your team and collaborate on budget management.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: CreditCard,
                title: "Payment Tracking",
                description: "Track all your payments in one place with detailed transaction history.",
                color: "from-indigo-500 to-blue-500"
              },
              {
                icon: TrendingUp,
                title: "Cost Optimization",
                description: "Identify unused subscriptions and optimize your spending with smart recommendations.",
                color: "from-red-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="px-6 py-32 relative">
        <div className="absolute inset-0" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400/30 to-orange-500/30 rounded-full blur-xl animate-bounce" style={{animationDuration: '6s'}}></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-green-400/30 to-blue-500/30 rounded-full blur-xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-gradient-to-r from-pink-400/30 to-purple-500/30 rounded-full blur-xl animate-bounce" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        </div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
            animation: 'float 15s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center relative z-10">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <div className="text-5xl font-bold mb-2">$0</div>
                <div className="text-foreground/70 mb-8">Perfect for getting started</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Up to 5 subscriptions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Basic analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Email support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Mobile app</span>
                  </li>
                </ul>

                <Link
                  href="/auth/signup"
                  className="w-full bg-foreground/10 text-foreground py-3 rounded-xl font-semibold hover:bg-foreground/15 transition-all duration-200 flex items-center justify-center"
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-3xl p-8 border-2 border-indigo-400/70 hover:border-indigo-400 hover:shadow-2xl transition-all duration-300 relative overflow-hidden group bg-card"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-1 rounded-bl-2xl text-sm font-medium">
                Most Popular
              </div>
                <div className="text-center relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-2xl font-bold">Pro</h3>
                </div>
                <div className="text-5xl font-bold mb-2">$10</div>
                <div className="text-foreground/70 mb-8">per month</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Unlimited subscriptions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Advanced analytics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Priority support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Team collaboration</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">API access</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Custom reports</span>
                  </li>
                </ul>

                <Link
                  href="/auth/signup"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
                >
                  Start Pro Trial
                </Link>
              </div>
            </motion.div>

            {/* Pro+ Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-card rounded-3xl p-8 border border-border hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="text-center relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-400 mr-2" />
                  <h3 className="text-2xl font-bold">Pro+</h3>
                </div>
                <div className="text-5xl font-bold mb-2">$20</div>
                <div className="text-foreground/70 mb-8">per month</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Everything in Pro</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">White-label solution</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Dedicated support</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Custom integrations</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">Advanced security</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground/80">SLA guarantee</span>
                  </li>
                </ul>

                <Link
                  href="/auth/signup"
                  className="w-full bg-foreground text-background py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 flex items-center justify-center"
                >
                  Start Pro+ Trial
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-32 relative overflow-hidden">
        <div className="absolute inset-0" />
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${4 + Math.random() * 6}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to take control of your subscriptions?
            </h2>
            <p className="text-xl text-foreground/90 mb-10 leading-relaxed">
              Join thousands of users who are already saving money and staying organized with SaaSify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/auth/signup"
                className="inline-flex items-center space-x-3 bg-white text-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-2xl hover:scale-105"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center space-x-3 text-foreground border-2 border-foreground/30 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-foreground/5 transition-all duration-200"
              >
                <span>Watch Demo</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-foreground text-2xl font-bold">SaaSify</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The smartest way to manage your subscriptions and save money on recurring payments.
              </p>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/features" className="text-foreground/70 hover:text-foreground transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-foreground/70 hover:text-foreground transition-colors">Pricing</Link></li>
                <li><Link href="/integrations" className="text-foreground/70 hover:text-foreground transition-colors">Integrations</Link></li>
                <li><Link href="/api" className="text-foreground/70 hover:text-foreground transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-foreground/70 hover:text-foreground transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="text-foreground/70 hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-foreground/70 hover:text-foreground transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link href="/help" className="text-foreground/70 hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link href="/docs" className="text-foreground/70 hover:text-foreground transition-colors">Documentation</Link></li>
                <li><Link href="/status" className="text-foreground/70 hover:text-foreground transition-colors">Status</Link></li>
                <li><Link href="/security" className="text-foreground/70 hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-foreground/70">
                © 2024 SaaSify. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-foreground/70 hover:text-foreground transition-colors">Privacy</Link>
                <Link href="/terms" className="text-foreground/70 hover:text-foreground transition-colors">Terms</Link>
                <Link href="/cookies" className="text-foreground/70 hover:text-foreground transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
