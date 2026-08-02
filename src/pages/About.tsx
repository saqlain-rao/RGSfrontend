import { motion } from 'framer-motion';
import { Target, Shield, Award, Building2 } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };

export default function About() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888081622-c9a92ab35c91?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h1 initial="hidden" animate="show" variants={fadeUp} className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6">Our Legacy</motion.h1>
          <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ duration: 1, delay: 0.5 }} className="h-1 bg-primary mx-auto"></motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl font-bold uppercase mb-8">Pioneers in <span className="text-primary">Enterprise Construction</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">Founded on the principles of engineering brilliance and uncompromising quality, RGS Constructor has grown into a global leader in commercial and industrial construction.</p>
            <p className="text-gray-400 text-lg leading-relaxed">With over two decades of experience, our footprint can be seen in some of the most iconic infrastructure projects worldwide.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[500px]">
             <img src="https://images.unsplash.com/photo-1504307651254-35680f356f27?auto=format&fit=crop&q=80" alt="Construction site" className="w-full h-full object-cover grayscale border border-white/10" />
             <div className="absolute -bottom-8 -left-8 bg-primary p-8 hidden md:block">
               <div className="text-5xl font-black">25+</div>
               <div className="text-sm uppercase tracking-widest font-bold mt-2">Years of Excellence</div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-3xl font-bold uppercase tracking-widest mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Integrity', desc: 'Uncompromising ethical standards in every project.' },
              { icon: Target, title: 'Precision', desc: 'Flawless execution from blueprint to reality.' },
              { icon: Award, title: 'Quality', desc: 'Premium materials and world-class craftsmanship.' },
              { icon: Building2, title: 'Innovation', desc: 'Pioneering modern architectural solutions.' }
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-black p-8 border border-white/5 hover:border-primary/50 transition-colors">
                <v.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold uppercase mb-4">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}