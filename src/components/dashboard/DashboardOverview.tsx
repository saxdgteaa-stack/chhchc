'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  UserCheck,
  CreditCard,
  Smartphone
} from 'lucide-react';
import { mockDashboardStats, mockEvents, mockOfferings, mockMembers } from '@/lib/mock/data';
import { useAuthStore } from '@/store/auth';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const stats = [
  {
    title: 'Total Members',
    value: mockDashboardStats.totalMembers,
    change: mockDashboardStats.memberGrowth,
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    title: 'Monthly Offerings',
    value: `KES ${mockDashboardStats.monthlyOfferings.toLocaleString()}`,
    change: mockDashboardStats.offeringGrowth,
    icon: DollarSign,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    title: 'Weekly Attendance',
    value: mockDashboardStats.weeklyAttendance,
    change: 5,
    icon: UserCheck,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    title: 'Upcoming Events',
    value: mockDashboardStats.upcomingEvents,
    change: 0,
    icon: Calendar,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
];

const recentOfferings = mockOfferings.slice(0, 5);
const upcomingEvents = mockEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 3);
const recentMembers = mockMembers.slice(0, 5);

const monthlyData = [
  { name: 'Aug', offerings: 380000, attendance: 850 },
  { name: 'Sep', offerings: 425000, attendance: 890 },
  { name: 'Oct', offerings: 395000, attendance: 875 },
  { name: 'Nov', offerings: 450000, attendance: 920 },
  { name: 'Dec', offerings: 520000, attendance: 1100 },
  { name: 'Jan', offerings: 485000, attendance: 945 },
];

const paymentMethodData = [
  { name: 'Paybill', value: 145000, color: '#10B981' },
  { name: 'Cash', value: 280000, color: '#F59E0B' },
  { name: 'Bank', value: 45000, color: '#3B82F6' },
];

export function DashboardOverview() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user?.name?.split(' ')[0]}!</h2>
              <p className="text-muted-foreground mt-1">
                Here's what's happening at {user?.role === 'USHER' ? 'your assigned services' : 'the church'} today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                {stat.change !== 0 && (
                  <Badge variant={stat.change > 0 ? 'default' : 'destructive'} className="flex items-center gap-1">
                    {stat.change > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(stat.change)}%
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Offerings Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Offerings Trend</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip 
                    formatter={(value: number) => [`KES ${value.toLocaleString()}`, 'Offerings']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="offerings" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attendance Trend</CardTitle>
            <CardDescription>Weekly attendance over 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [value, 'Attendance']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="attendance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{event.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Offerings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Offerings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOfferings.map((offering) => (
                <div key={offering.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${offering.method === 'PAYBILL' ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                      {offering.method === 'PAYBILL' ? (
                        <Smartphone className="h-4 w-4 text-green-500" />
                      ) : (
                        <CreditCard className="h-4 w-4 text-amber-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{offering.payerName || 'Anonymous'}</p>
                      <p className="text-xs text-muted-foreground">{offering.method}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-green-600">
                    KES {offering.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Current month distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `KES ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {paymentMethodData.map((method, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: method.color }} />
                    <span>{method.name}</span>
                  </div>
                  <span className="font-medium">KES {method.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {recentMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {member.firstName[0]}{member.lastName[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{member.firstName} {member.lastName}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {member.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
