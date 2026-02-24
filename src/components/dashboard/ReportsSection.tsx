'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend 
} from 'recharts';
import { mockGroups, monthlyOfferingData, monthlyAttendanceData, groupDistributionData, offeringByMethodData } from '@/lib/mock/data';

const monthlyData = [
  { name: 'Aug', offerings: 380000, attendance: 850, members: 245 },
  { name: 'Sep', offerings: 425000, attendance: 890, members: 252 },
  { name: 'Oct', offerings: 395000, attendance: 875, members: 258 },
  { name: 'Nov', offerings: 450000, attendance: 920, members: 265 },
  { name: 'Dec', offerings: 520000, attendance: 1100, members: 275 },
  { name: 'Jan', offerings: 485000, attendance: 945, members: 287 },
];

const attendanceByService = [
  { name: 'First Service', value: 145, color: '#10B981' },
  { name: 'Second Service', value: 185, color: '#3B82F6' },
  { name: 'Midweek', value: 65, color: '#F59E0B' },
  { name: 'Youth Service', value: 45, color: '#8B5CF6' },
];

export function ReportsSection() {
  const [dateRange, setDateRange] = useState('this_month');

  const stats = [
    { 
      title: 'Total Attendance', 
      value: '5,580', 
      change: 12, 
      icon: Users, 
      color: 'text-blue-500' 
    },
    { 
      title: 'Total Offerings', 
      value: 'KES 2.66M', 
      change: 8, 
      icon: DollarSign, 
      color: 'text-green-500' 
    },
    { 
      title: 'Avg. Attendance', 
      value: '930', 
      change: 5, 
      icon: TrendingUp, 
      color: 'text-purple-500' 
    },
    { 
      title: 'New Members', 
      value: '+42', 
      change: -3, 
      icon: BarChart3, 
      color: 'text-amber-500' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-bold">Reports & Analytics</h2>
          <p className="text-muted-foreground">Church performance overview and insights</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this_week">This Week</SelectItem>
              <SelectItem value="this_month">This Month</SelectItem>
              <SelectItem value="last_3_months">Last 3 Months</SelectItem>
              <SelectItem value="this_year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-muted`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <Badge variant={stat.change >= 0 ? 'default' : 'destructive'}>
                  {stat.change >= 0 ? '+' : ''}{stat.change}%
                </Badge>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Offerings Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Offerings Trend</CardTitle>
                <CardDescription>Monthly financial performance</CardDescription>
              </div>
              <LineChartIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `${value / 1000}K`} />
                  <Tooltip 
                    formatter={(value: number) => [`KES ${value.toLocaleString()}`]}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="offerings" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.2} 
                    name="Offerings"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Attendance Trend</CardTitle>
                <CardDescription>Weekly attendance over time</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    formatter={(value: number) => [value, 'Attendance']}
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="attendance" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Attendance" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Group Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Group Distribution</CardTitle>
            <CardDescription>Members by group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={groupDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {groupDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Service Attendance</CardTitle>
            <CardDescription>Average by service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceByService}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {attendanceByService.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Offerings by method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={offeringByMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {offeringByMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `KES ${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Member Growth */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Member Growth</CardTitle>
          <CardDescription>Membership trend over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                />
                <Legend />
                <Line type="monotone" dataKey="members" stroke="#8B5CF6" strokeWidth={2} name="Total Members" dot={{ fill: '#8B5CF6' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
