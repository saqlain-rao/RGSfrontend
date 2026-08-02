const fs = require('fs');
const path = require('path');

const writePage = (name, content) => {
  fs.writeFileSync(path.join(__dirname, 'src', 'pages', `${name}.tsx`), content);
  console.log(`Upgraded ${name}.tsx`);
};

// 1. ABOUT US
writePage('About', `import { motion } from 'framer-motion';
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
}`);

// 2. SERVICES
writePage('Services', `import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  'Commercial Construction', 'Industrial Construction', 'Residential Construction', 'Turnkey Construction',
  'Grey Structure', 'Renovation & Remodeling', 'Architectural Design', 'Structural Engineering',
  'Project Management', 'MEP Services', 'Steel Structure', '3D Visualization'
];

export default function Services() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-32 bg-zinc-950 text-center border-b border-white/10 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.1)_0%,rgba(0,0,0,0)_70%)]"></div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter relative z-10">Our Expertise</motion.h1>
      </section>
      
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 3) * 0.1 }} className="group relative bg-zinc-950 border border-white/5 p-10 hover:bg-zinc-900 transition-all cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
              <div className="text-primary text-sm font-bold tracking-widest mb-4">0{i + 1}</div>
              <h3 className="text-2xl font-bold uppercase mb-6">{srv}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">Enterprise-grade execution tailored to the highest global standards of engineering and architecture.</p>
              <div className="flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest group-hover:text-primary transition-colors">
                Explore Service <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}`);

// 3. CONTACT
writePage('Contact', `import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-24 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Global Reach</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Initiate your next landmark project with RGS Constructor.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-zinc-950 p-10 border border-white/5">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-10">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                <input type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Project Details</label>
                <textarea rows={5} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors"></textarea>
              </div>
              <button type="button" className="bg-primary text-white font-bold uppercase tracking-widest px-8 py-4 w-full hover:bg-white hover:text-black transition-colors">Submit Inquiry</button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-10">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0"><MapPin className="text-primary" /></div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Headquarters</h3>
                <p className="text-gray-400 leading-relaxed">123 Corporate Blvd, Elite Business Park<br/>Metro City, NY 10001, USA</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0"><Phone className="text-primary" /></div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Contact Numbers</h3>
                <p className="text-gray-400 leading-relaxed">+1 (800) 123-4567<br/>+1 (800) 123-4568</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-zinc-950 border border-white/5 flex items-center justify-center shrink-0"><Mail className="text-primary" /></div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Email Directory</h3>
                <p className="text-gray-400 leading-relaxed">projects@rgsconstructor.com<br/>careers@rgsconstructor.com</p>
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="w-full h-[250px] bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-500 uppercase tracking-widest text-xs">Interactive Map Area</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}`);

// 4. PROJECTS
writePage('Projects', `import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-24 text-center border-b border-white/10 bg-zinc-950">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Our Masterpieces</motion.h1>
        <div className="flex justify-center gap-4 flex-wrap">
           {['All', 'Commercial', 'Industrial', 'Residential', 'Infrastructure'].map((cat, i) => (
             <button key={i} className={\`px-6 py-2 border uppercase tracking-widest text-xs font-bold \${i===0 ? 'bg-primary border-primary' : 'border-white/20 text-gray-400 hover:border-white'}\`}>{cat}</button>
           ))}
        </div>
      </section>
      
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10">
          {[1,2,3,4,5,6].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i%2)*0.1 }} className="group relative h-[450px] overflow-hidden bg-zinc-900 cursor-pointer">
              <img src={\`https://images.unsplash.com/photo-1\${540000000000 + i}?auto=format&fit=crop&q=80\`} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" alt="Project" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <div className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Mega Project</div>
                <h3 className="text-3xl font-black uppercase">Project Alpha {i+1}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}`);

// Generic Generator for remaining pages
const createGeneric = (name, title, subtitle) => `import { motion } from 'framer-motion';
export default function ${name}() {
  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-32 bg-zinc-950 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black uppercase tracking-tighter relative z-10">${title}</motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-gray-400 mt-6 max-w-xl mx-auto uppercase tracking-widest text-sm">${subtitle}</motion.p>
      </section>
      <section className="py-32 container mx-auto px-6 max-w-4xl text-center">
        <div className="w-24 h-24 border border-white/10 mx-auto rounded-full flex items-center justify-center mb-8">
           <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
        </div>
        <h2 className="text-3xl font-bold uppercase mb-6">Content Currently in Development</h2>
        <p className="text-gray-500 leading-relaxed text-lg">Our architects and engineers are currently drafting the perfect layout for this section. The ${title.toLowerCase()} page will feature the same elite enterprise-grade design as our core pages, launching shortly.</p>
      </section>
    </div>
  );
}`;

writePage('Portfolio', createGeneric('Portfolio', 'Elite Portfolio', 'A curated selection of our finest work'));
writePage('Process', createGeneric('Process', 'Construction Process', 'How we engineer perfection from ground zero'));
writePage('WhyUs', createGeneric('WhyUs', 'Why Choose Us', 'Unmatched enterprise capabilities'));
writePage('Team', createGeneric('Team', 'Leadership Team', 'The visionaries behind our legacy'));
writePage('Careers', createGeneric('Careers', 'Join Our Ranks', 'Build the future with us'));
writePage('Testimonials', createGeneric('Testimonials', 'Client Feedback', 'What global enterprises say about us'));
writePage('Gallery', createGeneric('Gallery', 'Media Gallery', 'Visual documentation of our sites'));
writePage('Blog', createGeneric('Blog', 'Insights & News', 'Industry updates and engineering thought leadership'));
writePage('FAQ', createGeneric('FAQ', 'Knowledge Base', 'Answers to common enterprise inquiries'));
writePage('Privacy', createGeneric('Privacy', 'Privacy Policy', 'Data protection and compliance'));
writePage('Terms', createGeneric('Terms', 'Terms & Conditions', 'Legal guidelines and agreements'));
writePage('NotFound', createGeneric('NotFound', '404 - Sector Not Found', 'The requested page has been relocated or destroyed.'));

