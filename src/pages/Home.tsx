import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, HardHat, Ruler, ChevronRight, Globe, ShieldCheck, Star, Quote } from 'lucide-react';
import GeometricBackground from '../components/GeometricBackground';
import { getTestimonials } from '../services/api';
import { Testimonial } from '../types';
import SEO from '../components/SEO';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  useEffect(() => { 
    setIsLoaded(true);
    
    // Check if device is mobile for performance optimization
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    getTestimonials().then(data => setTestimonials(data.filter(t => t.isActive))).catch(console.error);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden selection:bg-primary selection:text-white">
      <SEO 
        title="Engineering Excellence" 
        description="RGS Constructor delivers uncompromising quality, architectural brilliance, and enterprise-grade infrastructure." 
      />
      
      {/* 1. ULTRA PREMIUM HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
        
        {/* Animated Image Background (Pure CSS for Extreme Performance) */}
        <div className="absolute inset-0 z-0 animate-ken-burns">
          <img 
            src="/images/hero-bg.png" 
            alt="RGS Infrastructure" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        {/* Render 3D Background only on Desktop for maximum performance */}
        {!isMobile && (
          <div className="absolute inset-0 z-0 hidden md:block">
            <GeometricBackground />
          </div>
        )}
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.05)_0%,rgba(0,0,0,0)_60%)] z-10 pointer-events-none" />

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={isLoaded ? "show" : "hidden"}
            className="max-w-5xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary tracking-[0.3em] text-sm font-semibold uppercase">Excellence in Engineering</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeUp}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8"
            >
              Building The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                Unthinkable
              </span>
              <span className="text-primary">.</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mb-12 leading-relaxed"
            >
              RGS Constructor delivers uncompromising quality, architectural brilliance, and enterprise-grade infrastructure. We don't just build structures; we engineer legacies.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-6">
              <Link 
                to="/projects" 
                className="group relative overflow-hidden bg-primary px-8 py-4 rounded-none font-medium tracking-wider uppercase text-sm transition-all duration-500"
              >
                <div className="absolute inset-0 w-0 bg-white transition-all duration-[400ms] ease-out group-hover:w-full"></div>
                <span className="relative flex items-center gap-3 group-hover:text-black transition-colors duration-300">
                  Explore Portfolio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/contact" 
                className="group flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wider uppercase text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary transition-colors">
                  <Globe className="w-4 h-4" />
                </div>
                Global Reach
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-xs uppercase tracking-widest text-gray-500 font-medium [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-[1px] h-12 bg-white/10 overflow-hidden">
            <motion.div 
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. OVERVIEW & STATISTICS */}
      <section className="relative py-32 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
                Mastering the Art of <br/> <span className="text-primary">Heavy Construction</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed mb-8">
                With over two decades of enterprise-level experience, RGS Constructor has spearheaded the development of industrial complexes, luxury corporate towers, and expansive infrastructure projects. Our precision-driven methodology ensures every project is a masterclass in durability and modern engineering.
              </motion.p>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                {[
                  { value: '25+', label: 'Years Experience' },
                  { value: '150+', label: 'Enterprise Projects' },
                  { value: '100%', label: 'Safety Record' },
                  { value: '50M+', label: 'Sq. Ft. Built' },
                ].map((stat, i) => (
                  <motion.div key={i} variants={fadeUp} className="border-l border-primary/30 pl-6">
                    <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative h-[600px] w-full"
            >
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <img 
                src="https://images.unsplash.com/photo-1541888081622-c9a92ab35c91?auto=format&fit=crop&q=80" 
                alt="Construction Engineering" 
                className="w-full h-full object-cover grayscale-[20%] contrast-125"
              />
              {/* Floating Element */}
              <div className="absolute -bottom-10 -left-10 bg-zinc-900 border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
                <ShieldCheck className="w-12 h-12 text-primary mb-4" />
                <div className="text-xl font-bold mb-2">ISO 9001:2015</div>
                <div className="text-sm text-gray-400">Certified Quality Management</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM SERVICES GRID */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-primary"></div>
                <span className="text-primary tracking-widest text-xs font-semibold uppercase">Our Capabilities</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Enterprise <br/>Services</h2>
            </div>
            <Link to="/services" className="group flex items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors">
              View All Services
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: 'Commercial Construction', desc: 'State-of-the-art corporate offices, retail complexes, and commercial plazas built to international standards.' },
              { icon: HardHat, title: 'Industrial Infrastructure', desc: 'Heavy-duty factories, warehouses, and manufacturing plants engineered for maximum operational efficiency.' },
              { icon: Ruler, title: 'Architectural Design', desc: 'Visionary planning and structural engineering using cutting-edge BIM and 3D visualization technology.' },
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-black border border-white/5 p-10 hover:bg-zinc-900 transition-all duration-500 hover:border-primary/30"
              >
                <service.icon className="w-12 h-12 text-zinc-700 group-hover:text-primary transition-colors duration-500 mb-8" />
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-wide group-hover:text-white">{service.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-8">{service.desc}</p>
                <Link to="/services" className="inline-flex items-center gap-2 text-sm text-primary font-bold tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS - LUXURY MASONRY/GRID */}
      <section className="py-32 bg-black border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-primary"></div>
              <span className="text-primary tracking-widest text-xs font-semibold uppercase">Portfolio</span>
              <div className="h-[1px] w-8 bg-primary"></div>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Iconic Landmarks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 1 - Large */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="group relative h-[600px] overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 duration-500" />
              <img src="https://images.unsplash.com/photo-1574523363321-70067645f7f3?auto=format&fit=crop&q=80" alt="Corporate Tower" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-10 z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                <span className="text-primary text-sm font-bold tracking-widest uppercase mb-2 block">Commercial</span>
                <h3 className="text-3xl font-bold text-white mb-2 uppercase">Nexus Corporate Tower</h3>
                <p className="text-gray-400">A 45-story commercial masterpiece.</p>
              </div>
            </motion.div>

            <div className="grid grid-rows-2 gap-8">
              {/* Project 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="group relative h-full overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 duration-500" />
                <img src="https://images.unsplash.com/photo-1504307651254-35680f356f27?auto=format&fit=crop&q=80" alt="Industrial Complex" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black via-black/60 to-transparent">
                  <span className="text-primary text-sm font-bold tracking-widest uppercase mb-1 block">Industrial</span>
                  <h3 className="text-2xl font-bold text-white uppercase">Apex Manufacturing Plant</h3>
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="group relative h-full overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 duration-500" />
                <img src="https://images.unsplash.com/photo-1541888081622-c9a92ab35c91?auto=format&fit=crop&q=80" alt="Infrastructure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full bg-gradient-to-t from-black via-black/60 to-transparent">
                  <span className="text-primary text-sm font-bold tracking-widest uppercase mb-1 block">Infrastructure</span>
                  <h3 className="text-2xl font-bold text-white uppercase">Grand Metro Terminal</h3>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/projects" className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* 4.5 TESTIMONIALS SECTION */}
      {testimonials.length > 0 && (
        <section className="py-32 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
          <div className="absolute -left-40 top-20 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-8 bg-primary"></div>
                  <span className="text-primary tracking-widest text-xs font-semibold uppercase">Client Feedback</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Trusted By <br/>Industry Leaders</h2>
              </div>
            </div>

            <div className="flex overflow-x-auto gap-6 pb-12 snap-x hide-scrollbar">
              {testimonials.map((t, i) => (
                <motion.div 
                  key={t._id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="min-w-[350px] md:min-w-[450px] bg-black border border-white/5 p-10 snap-start hover:border-primary/30 transition-colors"
                >
                  <Quote className="w-10 h-10 text-primary/40 mb-6" />
                  <p className="text-gray-300 leading-relaxed mb-8 text-lg">"{t.content}"</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      {t.image ? (
                        <img src={t.image} alt={t.clientName} className="w-12 h-12 rounded-full object-cover grayscale" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold uppercase">{t.clientName.charAt(0)}</div>
                      )}
                      <div>
                        <h4 className="text-white font-bold uppercase text-sm">{t.clientName}</h4>
                        <span className="text-primary text-xs uppercase tracking-widest">{t.role}{t.company ? ` @ ${t.company}` : ''}</span>
                      </div>
                    </div>
                    <div className="flex text-primary">
                      {[...Array(t.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. CTA SECTION */}
      <section className="relative py-32 bg-primary overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white mb-8"
          >
            Ready to Build <br/> The Future?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-white/80 text-xl max-w-2xl mx-auto mb-12"
          >
            Partner with RGS Constructor for your next enterprise project. Experience engineering excellence and flawless execution.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          >
            <Link to="/contact" className="inline-block bg-black text-white font-bold uppercase tracking-widest px-10 py-5 hover:bg-zinc-900 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              Initiate Project
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
