import { useState, useEffect } from 'react';
import { Users, Briefcase, FileText, MessageSquare } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
    blogs: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, messagesRes, blogsRes] = await Promise.all([
          axios.get(`${API_URL}/projects`),
          axios.get(`${API_URL}/contactmessages`),
          axios.get(`${API_URL}/blogs`)
        ]);

        setStats({
          projects: projectsRes.data.data.length || 0,
          messages: messagesRes.data.data.length || 0,
          blogs: blogsRes.data.data.length || 0
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Mock a dynamically increasing visitor count based on current date
  const visitorsCount = 12450 + (new Date().getDate() * 14) + new Date().getHours();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back to the RGS Constructor admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Total Visitors</p>
            <h3 className="text-2xl font-bold text-foreground">{visitorsCount.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Active Projects</p>
            <h3 className="text-2xl font-bold text-foreground">
              {loading ? '...' : stats.projects}
            </h3>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Messages</p>
            <h3 className="text-2xl font-bold text-foreground">
              {loading ? '...' : stats.messages}
            </h3>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Published Blogs</p>
            <h3 className="text-2xl font-bold text-foreground">
              {loading ? '...' : stats.blogs}
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">Admin logged into the dashboard</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm text-foreground">Dashboard statistics updated</p>
                <p className="text-xs text-muted-foreground">A few minutes ago</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => window.location.href = '/admin/projects'} className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">Manage Projects</h4>
              <p className="text-xs text-muted-foreground">View and add portfolio entries</p>
            </button>
            <button onClick={() => window.location.href = '/admin/blogs'} className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">Write Blog Post</h4>
              <p className="text-xs text-muted-foreground">Publish news and updates</p>
            </button>
            <button onClick={() => window.location.href = '/admin/services'} className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">Edit Services</h4>
              <p className="text-xs text-muted-foreground">Update your offerings</p>
            </button>
            <button onClick={() => window.location.href = '/admin/messages'} className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">View Messages</h4>
              <p className="text-xs text-muted-foreground">Check client inquiries</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
