const fs = require('fs');
const path = require('path');

const pages = [
  'Portfolio', 'Process', 'WhyUs', 'Team', 'Careers', 'Testimonials', 
  'Gallery', 'Blog', 'FAQ', 'Privacy', 'Terms', 'NotFound'
];

const adminPages = [
  'ServicesCMS', 'BlogsCMS', 'GalleryCMS', 'TestimonialsCMS', 'CareersCMS', 
  'TeamCMS', 'FaqsCMS', 'MessagesCMS', 'HomeCMS', 'SeoCMS', 'MediaCMS', 
  'SettingsCMS', 'UsersCMS', 'RolesCMS', 'AnalyticsCMS'
];

const createTemplate = (name, isAdmin) => `import { motion } from 'framer-motion';

export default function ${name}() {
  return (
    <div className="${isAdmin ? 'p-6' : 'min-h-screen pt-32 px-6'}">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold ${isAdmin ? 'text-gray-800 dark:text-white' : 'text-foreground'} mb-6">${name.replace('CMS', '')} ${isAdmin ? 'Management' : ''}</h1>
        <div className="${isAdmin ? 'bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800' : 'prose prose-invert max-w-none'}">
          <p className="text-muted-foreground">Welcome to the ${name} page. Content is under construction.</p>
        </div>
      </motion.div>
    </div>
  );
}
`;

// Create Frontend Pages
pages.forEach(page => {
  const filePath = path.join(__dirname, 'src', 'pages', `${page}.tsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, createTemplate(page, false));
    console.log(`Created: src/pages/${page}.tsx`);
  }
});

// Create Admin Pages
adminPages.forEach(page => {
  const filePath = path.join(__dirname, 'src', 'pages', 'admin', `${page}.tsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, createTemplate(page, true));
    console.log(`Created: src/pages/admin/${page}.tsx`);
  }
});
