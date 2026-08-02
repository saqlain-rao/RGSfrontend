import { Users, Briefcase, FileText, MessageSquare } from 'lucide-react';

export default function Dashboard() {
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
            <h3 className="text-2xl font-bold text-foreground">12,450</h3>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
            <Briefcase size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Active Projects</p>
            <h3 className="text-2xl font-bold text-foreground">24</h3>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Unread Messages</p>
            <h3 className="text-2xl font-bold text-foreground">5</h3>
          </div>
        </div>
        <div className="bg-background p-6 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">Published Blogs</p>
            <h3 className="text-2xl font-bold text-foreground">18</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Recent Activities</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Admin updated the Homepage Settings</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h3 className="text-xl font-bold text-foreground mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">Add New Project</h4>
              <p className="text-xs text-muted-foreground">Create a new portfolio entry</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">Write Blog Post</h4>
              <p className="text-xs text-muted-foreground">Publish news and updates</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">Upload Media</h4>
              <p className="text-xs text-muted-foreground">Add to media library</p>
            </button>
            <button className="p-4 border border-border rounded-lg hover:bg-primary/5 hover:border-primary/50 transition-colors text-left">
              <h4 className="font-semibold text-foreground mb-1">View Messages</h4>
              <p className="text-xs text-muted-foreground">Check client inquiries</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
