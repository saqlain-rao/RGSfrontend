import { motion } from 'framer-motion';

export default function SeoCMS() {
  return (
    <div className="p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Seo Management</h1>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
          <p className="text-muted-foreground">Welcome to the SeoCMS page. Content is under construction.</p>
        </div>
      </motion.div>
    </div>
  );
}
