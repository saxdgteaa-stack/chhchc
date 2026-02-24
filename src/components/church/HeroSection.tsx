'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { mockChurchInfo, mockEvents } from '@/lib/mock/data';
import Link from 'next/link';

export function HeroSection() {
  const upcomingEvent = mockEvents.find(e => e.isPublic && new Date(e.date) >= new Date());

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mockChurchInfo.bannerUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6">
        <div className="max-w-3xl">
          <Badge className="mb-4 bg-primary/90 hover:bg-primary">
            Welcome to {mockChurchInfo.name}
          </Badge>
          
          <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
            A Place of <span className="text-primary">Worship</span>, Fellowship, and Growth
          </h1>
          
          <p className="mt-6 text-lg text-white/80 md:text-xl max-w-2xl">
            Join us as we gather to worship, grow in faith, and serve our community together. 
            Everyone is welcome!
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="#events">
              <Button size="lg" className="w-full sm:w-auto">
                <Calendar className="mr-2 h-5 w-5" />
                View Events
              </Button>
            </Link>
            <Link href="#give">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20">
                <ArrowRight className="mr-2 h-5 w-5" />
                Give Online
              </Button>
            </Link>
          </div>

          {/* Next Event Card */}
          {upcomingEvent && (
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 max-w-md">
              <Badge variant="secondary" className="mb-3">Next Event</Badge>
              <h3 className="text-xl font-semibold text-white">{upcomingEvent.title}</h3>
              <p className="mt-2 text-sm text-white/70 line-clamp-2">{upcomingEvent.description}</p>
              <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(upcomingEvent.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {new Date(upcomingEvent.date).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                {upcomingEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {upcomingEvent.location}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
