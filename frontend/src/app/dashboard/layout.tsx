'use client';

import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';

export default function DashboardPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </motion.div>
  );
}
