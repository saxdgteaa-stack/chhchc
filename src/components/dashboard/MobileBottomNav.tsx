"use client";

import { cn } from "@/lib/utils";
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
  Home,
  Info,
  Heart,
  LogIn,
} from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { UserRole } from "@/types";

interface MobileBottomNavProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  roles?: UserRole[];
  href?: string;
}

const dashboardNavItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Home",
    icon: Home,
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
    label: "Events",
    icon: Calendar,
    roles: ["SUPER_PASTOR", "PASTOR", "USHER", "ACCOUNTANT"],
  },
  {
    id: "attendance",
    label: "Check-in",
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

const publicNavItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "#home" },
  { id: "about", label: "About", icon: Info, href: "#about" },
  { id: "events", label: "Events", icon: Calendar, href: "#events" },
  { id: "give", label: "Give", icon: Heart, href: "#give" },
  { id: "login", label: "Login", icon: LogIn, href: "/?view=login" },
];

export function MobileBottomNav({
  currentTab,
  onTabChange,
}: MobileBottomNavProps) {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (isAuthenticated && user) {
    const filteredItems = dashboardNavItems.filter(
      (item) => item.roles && item.roles.includes(user.role),
    );

    const maxItems = 4;
    const visibleItems = filteredItems.slice(0, maxItems);

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {visibleItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px]",
                currentTab === item.id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] text-muted-foreground hover:text-destructive hover:bg-muted"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs font-medium">Logout</span>
          </button>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {publicNavItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
