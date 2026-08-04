import { motion } from 'framer-motion';
import { ArrowRight, Building2, HardHat, Ruler, Pickaxe, PaintRoller, Cable } from 'lucide-react';
import { useServices } from '../hooks/useCMS';
import { Service } from '../types';

const iconMap: Record<string, any> = {
  Building2: Building2,
  HardHat: HardHat,
  Ruler: Ruler,
  Pickaxe: Pickaxe,
  PaintRoller: PaintRoller,
  Cable: Cable
};

export default function Services() {
  const { data: services, isLoading, error } = useServices();

  return (
    <div className="bg-background min-h-screen text-foreground pt-24">
      <section className="py-32 bg-muted text-center border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter relative z-10">Our Expertise</motion.h1>
      </section>
      
      <section className="py-24 container mx-auto px-6">
        {isLoading ? (
          <div className="text-center text-muted-foreground uppercase tracking-widest font-bold">Loading Services...</div>
        ) : error ? (
          <div className="text-center text-red-500 uppercase tracking-widest font-bold">Failed to load services.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((srv: Service, i: number) => {
              const IconComponent = srv.icon && iconMap[srv.icon] ? iconMap[srv.icon] : Building2;
              
              return (
                <motion.div 
                  key={srv._id || i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: (i % 3) * 0.1 }} 
                  className="group relative bg-muted border border-border/50 p-10 hover:bg-card transition-all cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <IconComponent className="w-10 h-10 text-primary" />
                    <div className="text-zinc-800 text-4xl font-black tracking-tighter group-hover:text-zinc-700 transition-colors">0{i + 1}</div>
                  </div>

                  <h3 className="text-2xl font-bold uppercase mb-4">{srv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 h-20 overflow-hidden">{srv.description}</p>
                  
                  {srv.features && srv.features.length > 0 && (
                    <ul className="mb-8 space-y-2">
                      {srv.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                           <div className="w-1 h-1 bg-primary rounded-full"></div> {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex items-center gap-2 text-foreground font-bold uppercase text-xs tracking-widest group-hover:text-primary transition-colors">
                    Explore Service <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}