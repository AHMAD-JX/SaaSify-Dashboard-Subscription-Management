import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <motion.div 
      className="p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-foreground/60">Manage your account settings and preferences</p>
          </div>

          <div className="space-y-8">
            {/* Profile Settings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 bg-background border border-border rounded-xl text-foreground"
                    />
                  </div>
                </div>
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Email Notifications</h3>
                    <p className="text-sm text-foreground/60">Receive notifications via email</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Renewal Reminders</h3>
                    <p className="text-sm text-foreground/60">Get notified before subscription renewals</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">Payment Alerts</h3>
                    <p className="text-sm text-foreground/60">Notifications for payment issues</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600" />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Security</h2>
              <div className="space-y-4">
                <button className="px-6 py-2 bg-background border border-border text-foreground rounded-xl hover:bg-foreground/5 transition-colors">
                  Change Password
                </button>
                <button className="px-6 py-2 bg-background border border-border text-foreground rounded-xl hover:bg-foreground/5 transition-colors">
                  Enable Two-Factor Authentication
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>
              <div className="space-y-4">
                <button className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}
