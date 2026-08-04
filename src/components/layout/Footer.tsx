import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSettings } from '../../services/api';
import { Settings as SettingsType } from '../../types';

export default function Footer() {
  const [settings, setSettings] = useState<SettingsType | null>(null);

  useEffect(() => {
    getSettings().then(data => setSettings(data)).catch(console.error);
  }, []);
  return (
    <footer className="bg-muted border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-white p-1 rounded-sm w-12 h-12">
                <img src="/logo.png" alt="RGS Constructor" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-black text-lg tracking-widest uppercase leading-none">RGS</span>
                <span className="text-primary text-[9px] font-bold tracking-[0.3em] uppercase mt-1">Constructor</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {settings?.heroContent?.subheading || 'Leading the industry in enterprise-level construction, architectural brilliance, and unyielding quality for over 25 years.'}
            </p>
            <div className="flex gap-4">
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4">
              {['About Us', 'Our Projects', 'Services', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest mb-6">Expertise</h4>
            <ul className="space-y-4">
              {['Commercial Construction', 'Industrial Facilities', 'Architectural Design', 'Project Management', 'MEP Services'].map((item) => (
                <li key={item}>
                  <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-bold uppercase tracking-widest mb-6">Headquarters</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm whitespace-pre-line">{settings?.address || '123 Corporate Blvd, Elite Business Park, Metro City, 10001'}</span>
              </li>
              <li className="flex gap-4">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm whitespace-pre-line">{settings?.contactPhone || '+1 (800) 123-4567\n+1 (800) 123-4568'}</span>
              </li>
              <li className="flex gap-4">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">{settings?.contactEmail || 'contact@rgsconstructor.com'}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs uppercase tracking-wider">
            &copy; {new Date().getFullYear()} {settings?.companyName || 'RGS Constructor'}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-600 hover:text-foreground text-xs uppercase tracking-wider transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-foreground text-xs uppercase tracking-wider transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
