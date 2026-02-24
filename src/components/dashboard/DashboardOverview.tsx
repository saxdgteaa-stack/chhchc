"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  Smartphone,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Shield,
} from "lucide-react";
import {
  mockDashboardStats,
  mockEvents,
  mockOfferings,
  mockMembers,
  mockExpenses,
  mockAuditLogs,
} from "@/lib/mock/data";
import {
  useAuthStore,
  canManageFinance,
  canApproveExpenses,
  canManageSettings,
} from "@/store/auth";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { name: "Aug", offerings: 380000, attendance: 850 },
  { name: "Sep", offerings: 425000, attendance: 890 },
  { name: "Oct", offerings: 395000, attendance: 875 },
  { name: "Nov", offerings: 450000, attendance: 920 },
  { name: "Dec", offerings: 520000, attendance: 1100 },
  { name: "Jan", offerings: 485000, attendance: 945 },
];

const paymentMethodData = [
  { name: "Paybill", value: 145000, color: "#10B981" },
  { name: "Cash", value: 280000, color: "#F59E0B" },
  { name: "Bank", value: 45000, color: "#3B82F6" },
];

function SuperPastorDashboard() {
  const pendingExpenses = mockExpenses.filter((e) => e.status === "PENDING");
  const recentLogs = mockAuditLogs.slice(0, 5);

  const stats = [
    {
      title: "Total Members",
      value: mockDashboardStats.totalMembers,
      change: mockDashboardStats.memberGrowth,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Monthly Offerings",
      value: `KES ${mockDashboardStats.monthlyOfferings.toLocaleString()}`,
      change: mockDashboardStats.offeringGrowth,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Weekly Attendance",
      value: mockDashboardStats.weeklyAttendance,
      change: 5,
      icon: UserCheck,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Pending Approvals",
      value: pendingExpenses.length,
      change: 0,
      icon: AlertCircle,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-500/10 to-purple-500/5 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Super Pastor Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Full system overview and management
              </p>
            </div>
            <Shield className="h-12 w-12 text-purple-500/50" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                {stat.change !== 0 && (
                  <Badge
                    variant={stat.change > 0 ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Offerings Trend</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis
                    className="text-xs"
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `KES ${value.toLocaleString()}`,
                      "Offerings",
                    ]}
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>System audit log</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    {log.action === "LOGIN" && (
                      <UserCheck className="h-4 w-4 text-primary" />
                    )}
                    {log.action === "CREATE" && (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    )}
                    {log.action === "UPDATE" && (
                      <TrendingUp className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {log.user?.name || "System"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {log.action} - {log.entityType}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PastorDashboard() {
  const upcomingEvents = mockEvents
    .filter((e) => new Date(e.date) >= new Date())
    .slice(0, 3);
  const recentOfferings = mockOfferings.slice(0, 5);
  const recentMembers = mockMembers.slice(0, 5);

  const stats = [
    {
      title: "Total Members",
      value: mockDashboardStats.totalMembers,
      change: mockDashboardStats.memberGrowth,
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Monthly Offerings",
      value: `KES ${mockDashboardStats.monthlyOfferings.toLocaleString()}`,
      change: mockDashboardStats.offeringGrowth,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Weekly Attendance",
      value: mockDashboardStats.weeklyAttendance,
      change: 5,
      icon: UserCheck,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Upcoming Events",
      value: mockDashboardStats.upcomingEvents,
      change: 0,
      icon: Calendar,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Pastor Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Ministry overview and member management
              </p>
            </div>
            <Users className="h-12 w-12 text-blue-500/50" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                {stat.change !== 0 && (
                  <Badge
                    variant={stat.change > 0 ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    formatter={(value: number) => [value, "Attendance"]}
                  />
                  <Bar
                    dataKey="attendance"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {event.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {recentMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {member.firstName} {member.lastName}
                  </p>
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

function AccountantDashboard() {
  const totalOfferings = mockOfferings.reduce((sum, o) => sum + o.amount, 0);
  const totalExpenses = mockExpenses.reduce((sum, e) => sum + e.amount, 0);
  const pendingExpenses = mockExpenses.filter((e) => e.status === "PENDING");

  const stats = [
    {
      title: "Total Offerings",
      value: `KES ${totalOfferings.toLocaleString()}`,
      change: 8,
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Total Expenses",
      value: `KES ${totalExpenses.toLocaleString()}`,
      change: -3,
      icon: TrendingDown,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      title: "Net Balance",
      value: `KES ${(totalOfferings - totalExpenses).toLocaleString()}`,
      change: 12,
      icon: DollarSign,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Pending Approvals",
      value: pendingExpenses.length,
      change: 0,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-amber-500/10 to-amber-500/5 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Finance Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Financial overview and management
              </p>
            </div>
            <DollarSign className="h-12 w-12 text-amber-500/50" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                {stat.change !== 0 && (
                  <Badge
                    variant={stat.change > 0 ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {stat.change > 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(stat.change)}%
                  </Badge>
                )}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Revenue vs Expenses</CardTitle>
            <CardDescription>6 month overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis
                    className="text-xs"
                    tickFormatter={(value) => `${value / 1000}K`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `KES ${value.toLocaleString()}`,
                    ]}
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

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Methods</CardTitle>
            <CardDescription>Current month distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) =>
                      `KES ${value.toLocaleString()}`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {canApproveExpenses("ACCOUNTANT") && pendingExpenses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Expense Approvals</CardTitle>
            <CardDescription>Expenses awaiting your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-red-600">
                      KES {expense.amount.toLocaleString()}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function UsherDashboard() {
  const today = new Date();
  const upcomingEvents = mockEvents
    .filter((e) => new Date(e.date) >= today)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-500/10 to-green-500/5 border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Usher Dashboard</h2>
              <p className="text-muted-foreground mt-1">
                Your assigned events and attendance
              </p>
            </div>
            <UserCheck className="h-12 w-12 text-green-500/50" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-green-500/10">
                <Calendar className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">{upcomingEvents.length}</p>
              <p className="text-sm text-muted-foreground">Assigned Events</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">
                {mockDashboardStats.weeklyAttendance}
              </p>
              <p className="text-sm text-muted-foreground">Weekly Attendance</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-purple-500/10">
                <UserCheck className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Visitors Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-muted-foreground">Next Event</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Assigned Events</CardTitle>
          <CardDescription>Events you are assigned to usher</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-3 p-4 rounded-lg border"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{event.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    {" at "}
                    {new Date(event.date).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </div>
                  )}
                  <Button size="sm" className="mt-3">
                    <UserCheck className="mr-2 h-4 w-4" />
                    Mark Attendance
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <UserCheck className="h-6 w-6" />
              <span>Mark Attendance</span>
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="h-6 w-6" />
              <span>Register Visitor</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardOverview() {
  const { user } = useAuthStore();

  if (!user) return null;

  switch (user.role) {
    case "SUPER_PASTOR":
      return <SuperPastorDashboard />;
    case "PASTOR":
      return <PastorDashboard />;
    case "ACCOUNTANT":
      return <AccountantDashboard />;
    case "USHER":
      return <UsherDashboard />;
    default:
      return <PastorDashboard />;
  }
}
