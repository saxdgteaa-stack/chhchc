'use client';

import Link from 'next/link';
import { Church, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { mockChurchInfo } from '@/lib/mock/data';

export function PublicFooter() {
  const socialLinks = mockChurchInfo.socialLinks;
  
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Church className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg">{mockChurchInfo.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {mockChurchInfo.tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks?.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.twitter && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks?.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              <Link href="#events" className="text-sm text-muted-foreground hover:text-primary transition-colors">Events</Link>
              <Link href="#give" className="text-sm text-muted-foreground hover:text-primary transition-colors">Give</Link>
              <Link href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </nav>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h3 className="font-semibold">Service Times</h3>
            <div className="space-y-2">
              {mockChurchInfo.serviceTimes?.map((service, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  <span className="font-medium">{service.day}:</span> {service.time}
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{mockChurchInfo.address}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <span>{mockChurchInfo.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <span>{mockChurchInfo.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {mockChurchInfo.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
