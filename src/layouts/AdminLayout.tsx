import { Outlet, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Settings, FileText, Briefcase, Image as ImageIcon, Users, MessageSquare } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  // Assume auth check here in real implementation
  
  const handleLogout = () => {
    // auth logout logic
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-card text-foreground overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/admin" className="text-xl font-bold text-primary tracking-wider uppercase">
            RGS Admin
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 space-y-1" data-lenis-prevent="true">
          <Link to="/admin" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/admin/projects" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Briefcase size={20} />
            Projects
          </Link>
          <Link to="/admin/services" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Settings size={20} />
            Services
          </Link>
          <Link to="/admin/blogs" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <FileText size={20} />
            Blogs
          </Link>
          <Link to="/admin/gallery" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <ImageIcon size={20} />
            Media Library
          </Link>
          <Link to="/admin/team" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <Users size={20} />
            Team
          </Link>
          <Link to="/admin/messages" className="flex items-center gap-3 px-6 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
            <MessageSquare size={20} />
            Messages
          </Link>
        </nav>
        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive py-2 rounded hover:bg-destructive/20 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-8">
          <h2 className="text-xl font-semibold">CMS Management</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-card" data-lenis-prevent="true">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
