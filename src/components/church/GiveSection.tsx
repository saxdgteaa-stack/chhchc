'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Heart, CreditCard, Smartphone, Building2, CheckCircle } from 'lucide-react';
import { mockChurchInfo } from '@/lib/mock/data';

const givingMethods = [
  {
    icon: Smartphone,
    title: 'M-Pesa Paybill',
    description: 'Give quickly and securely using M-Pesa',
    details: [
      { label: 'Paybill Number', value: mockChurchInfo.paybillNumber },
      { label: 'Account Number', value: mockChurchInfo.accountNumber },
    ],
  },
  {
    icon: Building2,
    title: 'Bank Transfer',
    description: 'Direct bank deposit or transfer',
    details: [
      { label: 'Bank', value: mockChurchInfo.bankName },
      { label: 'Account Number', value: mockChurchInfo.accountNumber },
    ],
  },
  {
    icon: CreditCard,
    title: 'Cash Offering',
    description: 'Give during our services',
    details: [
      { label: 'Sunday Services', value: '8:00 AM & 10:30 AM' },
      { label: 'Midweek Service', value: 'Wednesday 6:00 PM' },
    ],
  },
];

const givingTypes = [
  { title: 'Tithe', description: 'Your regular 10% contribution' },
  { title: 'Offering', description: 'General church offering' },
  { title: 'Thanksgiving', description: 'Special thanksgiving offering' },
  { title: 'Building Fund', description: 'Support church development' },
  { title: 'Missions', description: 'Support outreach programs' },
  { title: 'Charity', description: 'Help those in need' },
];

export function GiveSection() {
  return (
    <section id="give" className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4">Give</Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Support Our Ministry
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Your generous giving enables us to continue spreading the Gospel and serving our community.
            Every contribution makes a difference.
          </p>
        </div>

        {/* Giving Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {givingMethods.map((method, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full" />
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <method.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                <div className="space-y-2">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{detail.label}:</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* M-Pesa Quick Give */}
        <Card className="max-w-xl mx-auto mb-16 border-2">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Quick M-Pesa Giving</h3>
                <p className="text-sm text-muted-foreground">Follow the steps below</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">1</div>
                <p className="text-sm">Go to M-Pesa Menu on your phone</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">2</div>
                <p className="text-sm">Select <strong>Lipa Na M-Pesa</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">3</div>
                <p className="text-sm">Select <strong>Paybill</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">4</div>
                <p className="text-sm">Enter Business Number: <strong className="text-primary">{mockChurchInfo.paybillNumber}</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">5</div>
                <p className="text-sm">Enter Account Number: <strong className="text-primary">{mockChurchInfo.accountNumber}</strong></p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">6</div>
                <p className="text-sm">Enter Amount and your PIN to confirm</p>
              </div>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <p className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                You will receive a confirmation SMS after successful payment
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Giving Types */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold">Ways to Give</h3>
          <p className="text-muted-foreground mt-2">Choose how you would like to contribute</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {givingTypes.map((type, index) => (
            <Card key={index} className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="p-4 flex items-center gap-3">
                <Heart className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <h4 className="font-medium">{type.title}</h4>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scripture */}
        <div className="text-center mt-16 p-8 bg-muted/50 rounded-xl max-w-2xl mx-auto">
          <p className="text-lg italic text-muted-foreground">
            "Each of you should give what you have decided in your heart to give, 
            not reluctantly or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="mt-4 font-semibold">2 Corinthians 9:7</p>
        </div>
      </div>
    </section>
  );
}
