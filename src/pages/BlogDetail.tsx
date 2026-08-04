import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import { getBlogBySlug } from '../services/api';
import { Blog } from '../types';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    getBlogBySlug(slug)
      .then(data => {
        if (!data || !data.isPublished) {
          navigate('/blog');
        } else {
          setBlog(data);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/blog');
      })
      .finally(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Loading...</div>;
  }

  if (!blog) return null;

  return (
    <div className="bg-background min-h-screen text-foreground pt-24 pb-32">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover grayscale-[30%] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-foreground uppercase tracking-widest text-sm font-bold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex gap-3 mb-6 flex-wrap">
              {blog.tags.map(tag => (
                <span key={tag} className="bg-primary text-black px-3 py-1 text-xs font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-8"
          >
            {blog.title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground uppercase tracking-widest"
          >
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {new Date(blog.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {blog.author}</span>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 max-w-4xl relative z-20 mt-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-muted border border-border/50 p-8 md:p-12 lg:p-16"
        >
          {/* Excerpt */}
          <div className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed mb-12 pb-12 border-b border-border">
            {blog.excerpt}
          </div>
          
          {/* Main Content (HTML) */}
          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary prose-p:text-muted-foreground prose-img:rounded-xl prose-img:border prose-img:border-border"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          {/* Share/Footer */}
          <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-3">
              {blog.tags?.map(tag => (
                <span key={tag} className="text-muted-foreground text-xs font-bold uppercase tracking-widest border border-border px-4 py-2 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            <button className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" /> Share Article
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
