import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Expeditions', href: '#expeditions' },
    { name: 'About Us', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  const expeditions = [
    { name: 'Arctic Exploration', href: '#' },
    { name: 'Amazon Rainforest', href: '#' },
    { name: 'Himalayan Trek', href: '#' },
    { name: 'Saharan Desert', href: '#' },
    { name: 'Antarctic Cruise', href: '#' },
    { name: 'Patagonia Hiking', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">
                Expedition<span className="text-primary">Co</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional expedition services to the world&apos;s most remote and breathtaking locations. 
              Safety, expertise, and unforgettable experiences since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expeditions */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Expeditions</h3>
            <ul className="space-y-3">
              {expeditions.map((expedition) => (
                <li key={expedition.name}>
                  <Link
                    href={expedition.href}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {expedition.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  123 Adventure Street<br />
                  Boulder, CO 80301<br />
                  United States
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-primary transition-colors">
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a href="mailto:info@expeditionco.com" className="text-gray-400 hover:text-primary transition-colors">
                  info@expeditionco.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-gray-400">Mon-Fri: 9AM-6PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ExpeditionCo. All rights reserved. | Designed for Adventure</p>
          <p className="mt-2 text-xs">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            {' | '}
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            {' | '}
            <Link href="#" className="hover:text-primary transition-colors">Safety Guidelines</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}