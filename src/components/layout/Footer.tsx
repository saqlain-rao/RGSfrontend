import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-sm w-12 h-12">
                <img src="/logo.png" alt="RGS Constructor" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black text-lg tracking-widest uppercase leading-none">RGS</span>
                <span className="text-primary text-[9px] font-bold tracking-[0.3em] uppercase mt-1">Constructor</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Leading the industry in enterprise-level construction, architectural brilliance, and unyielding quality for over 25 years.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary hover:bg-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary hover:bg-primary transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary hover:bg-primary transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-primary hover:bg-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Projects', 'Services', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Expertise</h4>
            <ul className="space-y-4">
              {['Commercial Construction', 'Industrial Facilities', 'Architectural Design', 'Project Management', 'MEP Services'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest mb-6">Headquarters</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-500 text-sm">123 Corporate Blvd, Elite Business Park, Metro City, 10001</span>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-500 text-sm">+1 (800) 123-4567<br/>+1 (800) 123-4568</span>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-500 text-sm">contact@rgsconstructor.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} RGS Constructor. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-600 hover:text-white text-xs uppercase tracking-wider transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-white text-xs uppercase tracking-wider transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
