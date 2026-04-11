import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Mail,
  MapPin,
  PhoneCall,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Triage AI", href: "#" },
      { name: "Find Doctors", href: "/doctors" },
      { name: "Video Consultation", href: "/video-call" },
      { name: "Specialties", href: "/doctors" },
    ],
    support: [
      { name: "Pricing", href: "/pricing" },
      { name: "Patient Dashboard", href: "/appointments" },
      { name: "Doctor Portal", href: "/doctor" },
      { name: "Help Center", href: "#" },
    ],
    company: [
      { name: "Reviews", href: "/reviews" },
      { name: "Onboarding", href: "/onboarding" },
      { name: "Success Stories", href: "#" },
      { name: "Contact Us", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", name: "Facebook" },
    { icon: <Twitter size={18} />, href: "#", name: "Twitter" },
    { icon: <Linkedin size={18} />, href: "#", name: "LinkedIn" },
    { icon: <Instagram size={18} />, href: "#", name: "Instagram" },
    { icon: <Github size={18} />, href: "#", name: "GitHub" },
  ];

  return (
    <footer className="relative bg-background border-t border-emerald-900/20 pt-20 pb-10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-800/5 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-700/5 rounded-full blur-3xl -ml-40 -mb-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="lg:col-span-2 flex flex-col space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="DocMeet Logo"
                width={180}
                height={50}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-muted-foreground text-lg max-w-sm">
              Revolutionizing healthcare access with AI-driven triage and
              seamless doctor consultations. Connect with specialists anytime, anywhere.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Group */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Services <ArrowRight className="ml-2 h-4 w-4 text-emerald-500" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Group */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Resources <ArrowRight className="ml-2 h-4 w-4 text-emerald-500" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-emerald-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 flex items-center">
              Contact <ArrowRight className="ml-2 h-4 w-4 text-emerald-500" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-muted-foreground group">
                <MapPin className="h-5 w-5 text-emerald-500 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>123 Health Street, Medical Suite 404, Wellness City</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground group">
                <PhoneCall className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>+1 (555) 000-HEALTH</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground group">
                <Mail className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                <span>hello@docmeet.health</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Sidebar */}
        <div className="pt-8 border-t border-emerald-900/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start space-y-1">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} DocMeet. All rights reserved.
            </p>
            <p className="text-emerald-500/60 text-[10px] font-medium tracking-widest uppercase">
              Build By RUSSS (Rehan, Utkarsh, Sudeep, Suryansh, Shivam)
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-muted-foreground hover:text-emerald-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
