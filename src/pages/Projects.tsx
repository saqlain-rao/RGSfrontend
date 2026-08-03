import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useCMS';
import { Project } from '../types';

export default function Projects() {
  const { data: projects, isLoading, error } = useProjects();
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Commercial', 'Industrial', 'Residential', 'Infrastructure'];

  const filteredProjects = projects?.filter(
    (p: Project) => activeFilter === 'All' || p.category.toLowerCase() === activeFilter.toLowerCase()
  ) || [];

  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-24 text-center border-b border-white/10 bg-zinc-950">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
          Our Masterpieces
        </motion.h1>
        <div className="flex justify-center gap-4 flex-wrap">
           {categories.map((cat) => (
             <button 
               key={cat} 
               onClick={() => setActiveFilter(cat)}
               className={`px-6 py-2 border uppercase tracking-widest text-xs font-bold transition-colors ${
                 activeFilter === cat 
                 ? 'bg-primary border-primary text-white' 
                 : 'border-white/20 text-gray-400 hover:border-white hover:text-white'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </section>
      
      <section className="py-24 container mx-auto px-6">
        {isLoading ? (
          <div className="text-center text-gray-500 uppercase tracking-widest font-bold">Loading Projects...</div>
        ) : error ? (
          <div className="text-center text-red-500 uppercase tracking-widest font-bold">Failed to load projects.</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-gray-500 uppercase tracking-widest font-bold">No projects found in this category.</div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence>
              {filteredProjects.map((project: Project, i: number) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={project._id || i} 
                  className="group relative h-[450px] overflow-hidden bg-zinc-900 cursor-pointer"
                >
                  <img 
                    src={project.mainImage || 'https://images.unsplash.com/photo-1541888081622-c9a92ab35c91'} 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                    alt={project.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{project.category}</div>
                    <h3 className="text-2xl font-black uppercase leading-tight mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.shortDescription}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
}