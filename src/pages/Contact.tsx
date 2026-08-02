import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { submitContact } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await submitContact(formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-black min-h-screen text-white pt-24">
      <section className="py-24 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Global Reach</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Initiate your next landmark project with RGS Constructor.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-zinc-950 p-10 border border-white/5 relative">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-10">Send a Message</h2>
            
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-zinc-950 z-10 flex flex-col items-center justify-center text-center p-10">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold uppercase mb-2">Message Sent!</h3>
                <p className="text-gray-400">Our enterprise team will contact you shortly regarding your inquiry.</p>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Project Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-black border border-white/10 px-4 py-3 text-white focus:border-primary outline-none transition-colors"></textarea>
              </div>
              
              {status === 'error' && <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>}
              
              <button disabled={status === 'loading'} type="submit" className="bg-primary text-white font-bold uppercase tracking-widest px-8 py-4 w-full hover:bg-white hover:text-black transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
              </button>
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}