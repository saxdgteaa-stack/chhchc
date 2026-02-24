"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  UserPlus,
  CheckCircle,
  XCircle,
  Users,
  Calendar,
  Clock,
  Save,
  UserCheck,
} from "lucide-react";
import { mockEvents, mockMembers } from "@/lib/mock/data";
import { useAuthStore } from "@/store/auth";

export function AttendanceSection() {
  const [selectedEvent, setSelectedEvent] = useState(mockEvents[0]?.id || "");
  const [search, setSearch] = useState("");
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [isVisitorDialogOpen, setIsVisitorDialogOpen] = useState(false);
  const { user } = useAuthStore();

  const currentEvent = mockEvents.find((e) => e.id === selectedEvent);
  const today = new Date();

  const availableEvents =
    user?.role === "USHER"
      ? mockEvents
          .filter((e) => new Date(e.date) >= today && e.enableAttendance)
          .slice(0, 2)
      : mockEvents.filter(
          (e) => new Date(e.date) >= today && e.enableAttendance,
        );

  const filteredMembers = mockMembers.filter(
    (member) =>
      member.firstName.toLowerCase().includes(search.toLowerCase()) ||
      member.lastName.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = [
    {
      label: "Present",
      value: Object.values(attendance).filter(Boolean).length,
      color: "text-green-500",
    },
    {
      label: "Absent",
      value:
        filteredMembers.length -
        Object.values(attendance).filter(Boolean).length,
      color: "text-red-500",
    },
    { label: "Visitors", value: 2, color: "text-blue-500" },
    {
      label: "Total",
      value: filteredMembers.length + 2,
      color: "text-purple-500",
    },
  ];

  const toggleAttendance = (memberId: string) => {
    setAttendance((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, boolean> = {};
    filteredMembers.forEach((m) => (allPresent[m.id] = true));
    setAttendance(allPresent);
  };

  const markAllAbsent = () => {
    setAttendance({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label>Select Event/Service</Label>
              <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {availableEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.title} -{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {currentEvent && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(currentEvent.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {new Date(currentEvent.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle className="text-lg">Mark Attendance</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={markAllPresent}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  All Present
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent}>
                  <XCircle className="mr-2 h-4 w-4" />
                  All Absent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {filteredMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                      attendance[member.id]
                        ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => toggleAttendance(member.id)}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback
                          className={
                            attendance[member.id]
                              ? "bg-green-500 text-white"
                              : "bg-muted"
                          }
                        >
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.group?.name || "No Group"}
                        </p>
                      </div>
                    </div>
                    <Checkbox
                      checked={attendance[member.id] || false}
                      onCheckedChange={() => toggleAttendance(member.id)}
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="default">
                <Save className="mr-2 h-4 w-4" />
                Save Attendance
              </Button>
              <Dialog
                open={isVisitorDialogOpen}
                onOpenChange={setIsVisitorDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="w-full" variant="outline">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Register Visitor
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Register Visitor</DialogTitle>
                    <DialogDescription>
                      Add a new visitor to today&apos;s service.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="visitorName">Full Name *</Label>
                        <Input id="visitorName" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="visitorPhone">Phone</Label>
                        <Input
                          id="visitorPhone"
                          placeholder="+254 7XX XXX XXX"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visitorEmail">Email</Label>
                      <Input
                        id="visitorEmail"
                        type="email"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="visitorNotes">Notes</Label>
                      <Input
                        id="visitorNotes"
                        placeholder="How did they hear about us?"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsVisitorDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={() => setIsVisitorDialogOpen(false)}>
                      Add Visitor
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Visitor One", phone: "+254 799 000 001" },
                  { name: "Visitor Two", phone: "+254 799 000 002" },
                ].map((visitor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/50"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500/10 text-blue-500">
                        {visitor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{visitor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {visitor.phone}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
