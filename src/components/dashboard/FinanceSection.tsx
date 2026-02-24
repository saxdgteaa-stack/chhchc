"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  Plus,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Smartphone,
  Building2,
  Receipt,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { mockOfferings, mockExpenses, mockEvents } from "@/lib/mock/data";
import {
  useAuthStore,
  canManageFinance,
  canApproveExpenses,
} from "@/store/auth";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const monthlyData = [
  { name: "Aug", offerings: 380000, expenses: 120000 },
  { name: "Sep", offerings: 425000, expenses: 135000 },
  { name: "Oct", offerings: 395000, expenses: 128000 },
  { name: "Nov", offerings: 450000, expenses: 142000 },
  { name: "Dec", offerings: 520000, expenses: 180000 },
  { name: "Jan", offerings: 485000, expenses: 155000 },
];

const paymentMethodData = [
  { name: "Paybill", value: 145000, color: "#10B981" },
  { name: "Cash", value: 280000, color: "#F59E0B" },
  { name: "Bank Transfer", value: 45000, color: "#3B82F6" },
];

const statusColors = {
  PENDING: "bg-amber-500/10 text-amber-600 border-amber-200",
  APPROVED: "bg-green-500/10 text-green-600 border-green-200",
  REJECTED: "bg-red-500/10 text-red-600 border-red-200",
};

export function FinanceSection() {
  const [isOfferingDialogOpen, setIsOfferingDialogOpen] = useState(false);
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);
  const { user } = useAuthStore();
  const canManage = canManageFinance(user?.role || "USHER");
  const canApprove = canApproveExpenses(user?.role || "USHER");

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
      value: pendingExpenses.length.toString(),
      change: 0,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ];

  const handleApproveExpense = (expenseId: string) => {
    console.log("Approving expense:", expenseId);
  };

  const handleRejectExpense = (expenseId: string) => {
    console.log("Rejecting expense:", expenseId);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
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
            <CardDescription>6 month financial overview</CardDescription>
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
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="offerings"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                    name="Offerings"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.2}
                    name="Expenses"
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

      <Tabs defaultValue="offerings">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <TabsList>
            <TabsTrigger value="offerings">Offerings</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <TabsContent value="offerings" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search offerings..." className="pl-9" />
                </div>
                {canManage && (
                  <Dialog
                    open={isOfferingDialogOpen}
                    onOpenChange={setIsOfferingDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Record Offering
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Record Offering</DialogTitle>
                        <DialogDescription>
                          Enter the details of the offering received.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Amount (KES) *</Label>
                            <Input type="number" placeholder="1000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Payment Method *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="CASH">Cash</SelectItem>
                                <SelectItem value="PAYBILL">Paybill</SelectItem>
                                <SelectItem value="BANK_TRANSFER">
                                  Bank Transfer
                                </SelectItem>
                                <SelectItem value="CHEQUE">Cheque</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Payer Name</Label>
                            <Input placeholder="John Doe" />
                          </div>
                          <div className="space-y-2">
                            <Label>Payer Phone</Label>
                            <Input placeholder="+254 7XX XXX XXX" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Transaction Code</Label>
                            <Input placeholder="TXN123456" />
                          </div>
                          <div className="space-y-2">
                            <Label>Event/Service</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockEvents.map((event) => (
                                  <SelectItem key={event.id} value={event.id}>
                                    {event.title}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            placeholder="Additional notes..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsOfferingDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsOfferingDialogOpen(false)}>
                          Record Offering
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Payer</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Transaction</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOfferings.map((offering) => (
                    <TableRow key={offering.id}>
                      <TableCell>
                        {new Date(offering.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {offering.payerName || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {offering.payerPhone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          {offering.method === "PAYBILL" && (
                            <Smartphone className="h-3 w-3" />
                          )}
                          {offering.method === "CASH" && (
                            <CreditCard className="h-3 w-3" />
                          )}
                          {offering.method === "BANK_TRANSFER" && (
                            <Building2 className="h-3 w-3" />
                          )}
                          {offering.method}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {offering.transactionCode || "-"}
                        </code>
                      </TableCell>
                      <TableCell>{offering.event?.title || "-"}</TableCell>
                      <TableCell className="text-right font-semibold text-green-600">
                        KES {offering.amount.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search expenses..." className="pl-9" />
                </div>
                {canManage && (
                  <Dialog
                    open={isExpenseDialogOpen}
                    onOpenChange={setIsExpenseDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Record Expense
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Record Expense</DialogTitle>
                        <DialogDescription>
                          Enter the details of the expense.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label>Description *</Label>
                          <Input placeholder="Sound System Maintenance" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Amount (KES) *</Label>
                            <Input type="number" placeholder="10000" />
                          </div>
                          <div className="space-y-2">
                            <Label>Category *</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Ministry">
                                  Ministry
                                </SelectItem>
                                <SelectItem value="Utilities">
                                  Utilities
                                </SelectItem>
                                <SelectItem value="Equipment">
                                  Equipment
                                </SelectItem>
                                <SelectItem value="Administration">
                                  Administration
                                </SelectItem>
                                <SelectItem value="Transport">
                                  Transport
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Receipt</Label>
                          <Input type="file" accept="image/*,.pdf" />
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            placeholder="Additional notes..."
                            rows={2}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsExpenseDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsExpenseDialogOpen(false)}>
                          Record Expense
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    {canApprove && (
                      <TableHead className="w-24">Actions</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockExpenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>
                        {new Date(expense.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{expense.description}</p>
                        {expense.receiptUrl && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-xs"
                          >
                            <Receipt className="h-3 w-3 mr-1" />
                            View Receipt
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{expense.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[expense.status]}>
                          {expense.status === "APPROVED" && (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {expense.status === "PENDING" && (
                            <Clock className="h-3 w-3 mr-1" />
                          )}
                          {expense.status === "REJECTED" && (
                            <XCircle className="h-3 w-3 mr-1" />
                          )}
                          {expense.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold text-red-600">
                        KES {expense.amount.toLocaleString()}
                      </TableCell>
                      {canApprove && (
                        <TableCell>
                          {expense.status === "PENDING" && (
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-green-600"
                                onClick={() => handleApproveExpense(expense.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-600"
                                onClick={() => handleRejectExpense(expense.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
