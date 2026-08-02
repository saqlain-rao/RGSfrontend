import { motion } from 'framer-motion';
export default function Terms() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-32 bg-zinc-950 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter relative z-10">Terms & Conditions</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 mt-6 max-w-xl mx-auto uppercase tracking-widest text-sm">Legal guidelines and agreements</motion.p>
      </section>
      <section className="py-32 container mx-auto px-6 max-w-4xl text-center">
        <div className="w-24 h-24 border border-white/10 mx-auto rounded-full flex items-center justify-center mb-8">
           <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        </div>
        <h2 className="text-3xl font-bold uppercase mb-6">Content Currently in Development</h2>
        <p className="text-gray-500 leading-relaxed text-lg">Our architects and engineers are currently drafting the perfect layout for this section. The terms & conditions page will feature the same elite enterprise-grade design as our core pages, launching shortly.</p>
      </section>
    </div>
  );
}