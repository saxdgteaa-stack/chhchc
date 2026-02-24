'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, BookOpen, HandHeart } from 'lucide-react';
import { mockChurchInfo } from '@/lib/mock/data';

const values = [
  {
    icon: Heart,
    title: 'Love',
    description: 'We believe in loving God and loving our neighbors as ourselves.',
  },
  {
    icon: BookOpen,
    title: 'Faith',
    description: 'Grounded in the Word of God, we grow together in faith and understanding.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building strong relationships and supporting one another in our journey.',
  },
  {
    icon: HandHeart,
    title: 'Service',
    description: 'Serving our community and making a positive impact in the world.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">About Us</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to {mockChurchInfo.name}
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            {mockChurchInfo.aboutText}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="border-2">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Our Mission</h3>
              <p className="text-muted-foreground">
                To spread the Gospel of Jesus Christ and serve our community with love and compassion. 
                We are committed to making disciples and transforming lives through the power of God.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Our Vision</h3>
              <p className="text-muted-foreground">
                A transformed society where everyone experiences the love of God through Christ-centered living. 
                We envision a community united in faith, hope, and love.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Our Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold">Our Core Values</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Times */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold mb-8">Service Times</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {mockChurchInfo.serviceTimes?.map((service, index) => (
              <Card key={index} className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="font-semibold">{service.day}</p>
                  <p className="text-sm text-muted-foreground">{service.time}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
