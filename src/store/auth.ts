import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

export type Permission =
  | "dashboard:view"
  | "members:view"
  | "members:create"
  | "members:edit"
  | "members:delete"
  | "events:view"
  | "events:create"
  | "events:edit"
  | "events:delete"
  | "events:assign_ushers"
  | "attendance:view"
  | "attendance:mark"
  | "messages:send"
  | "messages:view"
  | "finance:view"
  | "finance:create"
  | "finance:edit"
  | "finance:delete"
  | "finance:approve"
  | "reports:view"
  | "reports:finance"
  | "reports:members"
  | "reports:attendance"
  | "settings:view"
  | "settings:edit";

const rolePermissions: Record<UserRole, Permission[]> = {
  SUPER_PASTOR: [
    "dashboard:view",
    "members:view",
    "events:view",
    "attendance:view",
    "messages:send",
    "messages:view",
    "finance:view",
    "reports:view",
    "reports:finance",
    "reports:members",
    "reports:attendance",
    "settings:view",
    "settings:edit",
  ],
  PASTOR: [
    "dashboard:view",
    "members:view",
    "members:create",
    "members:edit",
    "members:delete",
    "events:view",
    "events:create",
    "events:edit",
    "attendance:view",
    "attendance:mark",
    "messages:send",
    "messages:view",
    "finance:view",
    "finance:create",
    "reports:view",
    "reports:members",
    "reports:attendance",
  ],
  ACCOUNTANT: [
    "dashboard:view",
    "members:view",
    "events:view",
    "finance:view",
    "finance:create",
    "finance:edit",
    "finance:delete",
    "finance:approve",
    "reports:view",
    "reports:finance",
  ],
  USHER: [
    "dashboard:view",
    "members:view",
    "events:view",
    "attendance:view",
    "attendance:mark",
  ],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => {
        set({ user, isAuthenticated: true });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      hasPermission: (permission: string) => {
        const { user } = get();
        if (!user) return false;
        return (
          rolePermissions[user.role]?.includes(permission as Permission) ??
          false
        );
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);

export function getRolePermissions(role: UserRole): Permission[] {
  return rolePermissions[role] || [];
}

export function canViewDashboard(role: UserRole): boolean {
  return rolePermissions[role].includes("dashboard:view");
}

export function canManageMembers(role: UserRole): boolean {
  return rolePermissions[role].includes("members:create");
}

export function canViewMembers(role: UserRole): boolean {
  return rolePermissions[role].includes("members:view");
}

export function canManageEvents(role: UserRole): boolean {
  return rolePermissions[role].includes("events:create");
}

export function canAssignUshers(role: UserRole): boolean {
  return rolePermissions[role].includes("events:assign_ushers");
}

export function canMarkAttendance(role: UserRole): boolean {
  return rolePermissions[role].includes("attendance:mark");
}

export function canSendMessages(role: UserRole): boolean {
  return rolePermissions[role].includes("messages:send");
}

export function canViewFinance(role: UserRole): boolean {
  return rolePermissions[role].includes("finance:view");
}

export function canManageFinance(role: UserRole): boolean {
  return rolePermissions[role].includes("finance:create");
}

export function canApproveExpenses(role: UserRole): boolean {
  return rolePermissions[role].includes("finance:approve");
}

export function canViewReports(role: UserRole): boolean {
  return rolePermissions[role].includes("reports:view");
}

export function canViewFinanceReports(role: UserRole): boolean {
  return rolePermissions[role].includes("reports:finance");
}

export function canManageSettings(role: UserRole): boolean {
  return rolePermissions[role].includes("settings:edit");
}
