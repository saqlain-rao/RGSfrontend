import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, User, Tag } from 'lucide-react';
import { getBlogs } from '../services/api';
import GeometricBackground from '../components/GeometricBackground';
import { Blog } from '../types';
import SEO from '../components/SEO';

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(data => setBlogs(data.filter((b: Blog) => b.isPublished)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-black min-h-screen text-white pt-24 pb-32">
      <SEO 
        title="Company News & Insights" 
        description="Stay updated with our latest enterprise projects, industry insights, and architectural innovations." 
      />
      <GeometricBackground />
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-8 bg-primary"></div>
            <span className="text-primary tracking-widest text-xs font-semibold uppercase">Insights</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6"
          >
            Company <span className="text-primary">News</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light"
          >
            Stay updated with our latest enterprise projects, industry insights, and architectural innovations.
          </motion.p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-20">Loading articles...</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No articles published yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.article 
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-zinc-950 border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                      <span className="bg-primary text-black text-xs font-bold uppercase tracking-wider px-3 py-1">
                        {blog.tags[0]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1"><Clock size={12} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold uppercase tracking-wide mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed flex-1">
                    {blog.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    className="inline-flex items-center gap-2 text-sm text-primary font-bold tracking-widest uppercase mt-auto"
                  >
                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
