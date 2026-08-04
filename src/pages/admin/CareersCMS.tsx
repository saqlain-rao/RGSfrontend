import { motion } from 'framer-motion';

export default function CareersCMS() {
  return (
    <div className="p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-800 dark:text-foreground mb-6">Careers Management</h1>
        <div className="bg-white dark:bg-card rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-border">
          <p className="text-muted-foreground">Welcome to the CareersCMS page. Content is under construction.</p>
        </div>
      </motion.div>
    </div>
  );
}
