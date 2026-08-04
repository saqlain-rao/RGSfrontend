import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { submitContact } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Send email via Vercel Serverless Function (DO THIS FIRST so it doesn't wait for Render DB)
      const emailPromise = fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message
        })
      }).catch(err => console.error("Failed to send email", err));

      // Save to database via backend API (Might be slow if Render is asleep)
      const dbPromise = submitContact(formData).catch(err => console.error("Failed to save to DB", err));

      // Wait for both to finish (or fail) without blocking each other
      await Promise.all([emailPromise, dbPromise]);

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
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
    <div className="bg-background min-h-screen text-foreground pt-24">
      <section className="py-24 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Global Reach</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Initiate your next landmark project with RGS Constructor.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-muted p-10 border border-border/50 relative">
            <h2 className="text-2xl font-bold uppercase tracking-widest mb-10">Send a Message</h2>
            
            {status === 'success' ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-muted z-10 flex flex-col items-center justify-center text-center p-10">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                <h3 className="text-2xl font-bold uppercase mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">Our enterprise team will contact you shortly regarding your inquiry.</p>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-gray-400 dark:border-zinc-700 px-4 py-3 text-black dark:text-white focus:border-primary outline-none transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-gray-400 dark:border-zinc-700 px-4 py-3 text-black dark:text-white focus:border-primary outline-none transition-colors shadow-sm" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-gray-400 dark:border-zinc-700 px-4 py-3 text-black dark:text-white focus:border-primary outline-none transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-white dark:bg-zinc-950 border border-gray-400 dark:border-zinc-700 px-4 py-3 text-black dark:text-white focus:border-primary outline-none transition-colors shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Project Details</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-white dark:bg-zinc-950 border border-gray-400 dark:border-zinc-700 px-4 py-3 text-black dark:text-white focus:border-primary outline-none transition-colors shadow-sm"></textarea>
              </div>
              
              {status === 'error' && <p className="text-red-500 text-sm">Failed to send message. Please try again.</p>}
              
              <button disabled={status === 'loading'} type="submit" className="bg-primary text-foreground font-bold uppercase tracking-widest px-8 py-4 w-full hover:bg-white hover:text-black transition-colors disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-10">
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-muted border border-border/50 flex items-center justify-center shrink-0"><MapPin className="text-primary" /></div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Headquarters</h3>
                <p className="text-muted-foreground leading-relaxed">123 Corporate Blvd, Elite Business Park<br/>Metro City, NY 10001, USA</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-muted border border-border/50 flex items-center justify-center shrink-0"><Phone className="text-primary" /></div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Contact Numbers</h3>
                <p className="text-muted-foreground leading-relaxed">+1 (800) 123-4567<br/>+1 (800) 123-4568</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-16 h-16 bg-muted border border-border/50 flex items-center justify-center shrink-0"><Mail className="text-primary" /></div>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-widest mb-2">Email Directory</h3>
                <p className="text-muted-foreground leading-relaxed">projects@rgsconstructor.com<br/>careers@rgsconstructor.com</p>
              </div>
            </div>

            <div className="pt-6">
              <a 
                href="https://wa.me/message/4FLJDMI76XLMJ1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold uppercase tracking-widest px-8 py-4 hover:bg-[#128C7E] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}