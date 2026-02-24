"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  MessageSquare,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Church,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["SUPER_PASTOR", "PASTOR", "USHER", "ACCOUNTANT"],
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    roles: ["SUPER_PASTOR", "PASTOR", "USHER", "ACCOUNTANT"],
  },
  {
    id: "events",
    label: "Events & Services",
    icon: Calendar,
    roles: ["SUPER_PASTOR", "PASTOR", "USHER", "ACCOUNTANT"],
  },
  {
    id: "attendance",
    label: "Attendance",
    icon: ClipboardCheck,
    roles: ["SUPER_PASTOR", "PASTOR", "USHER"],
  },
  {
    id: "messages",
    label: "Messages",
    icon: MessageSquare,
    roles: ["SUPER_PASTOR", "PASTOR"],
  },
  {
    id: "finance",
    label: "Finance",
    icon: DollarSign,
    roles: ["SUPER_PASTOR", "PASTOR", "ACCOUNTANT"],
  },
  {
    id: "reports",
    label: "Reports",
    icon: BarChart3,
    roles: ["SUPER_PASTOR", "PASTOR", "ACCOUNTANT"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    roles: ["SUPER_PASTOR"],
  },
];

const roleColors: Record<UserRole, string> = {
  SUPER_PASTOR: "bg-purple-500",
  PASTOR: "bg-blue-500",
  USHER: "bg-green-500",
  ACCOUNTANT: "bg-amber-500",
};

const roleLabels: Record<UserRole, string> = {
  SUPER_PASTOR: "Super Pastor",
  PASTOR: "Pastor",
  USHER: "Usher",
  ACCOUNTANT: "Accountant",
};

export function DashboardSidebar({
  currentTab,
  onTabChange,
  isMobileOpen,
  onMobileClose,
}: SidebarProps) {
  const { user, logout } = useAuthStore();

  const filteredNavItems = navItems.filter(
    (item) => user && item.roles.includes(user.role),
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r transition-transform duration-300 lg:sticky lg:translate-x-0 lg:z-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <Church className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight">
                  Grace Community
                </span>
                <span className="text-xs text-muted-foreground">
                  Management System
                </span>
              </div>
            </Link>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback
                  className={cn(
                    "text-white",
                    user ? roleColors[user.role] : "bg-gray-500",
                  )}
                >
                  {user ? getInitials(user.name) : "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <Badge variant="secondary" className="text-xs">
                  {user && roleLabels[user.role]}
                </Badge>
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {filteredNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant={currentTab === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3",
                    currentTab === item.id && "bg-secondary",
                  )}
                  onClick={() => {
                    onTabChange(item.id);
                    onMobileClose();
                  }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
