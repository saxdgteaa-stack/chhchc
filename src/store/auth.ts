import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

// Role permissions map
const rolePermissions: Record<UserRole, string[]> = {
  SUPER_PASTOR: [
    'dashboard', 'members', 'groups', 'events', 'attendance', 'messages', 
    'finance', 'reports', 'settings', 'users'
  ],
  PASTOR: [
    'dashboard', 'members', 'groups', 'events', 'attendance', 'messages', 
    'finance', 'reports'
  ],
  USHER: ['dashboard', 'attendance'],
  ACCOUNTANT: ['dashboard', 'finance', 'reports'],
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
        return rolePermissions[user.role]?.includes(permission) ?? false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Helper functions for role-based access
export function canViewFinance(role: UserRole): boolean {
  return ['SUPER_PASTOR', 'PASTOR', 'ACCOUNTANT'].includes(role);
}

export function canManageMembers(role: UserRole): boolean {
  return ['SUPER_PASTOR', 'PASTOR'].includes(role);
}

export function canManageEvents(role: UserRole): boolean {
  return ['SUPER_PASTOR', 'PASTOR'].includes(role);
}

export function canSendMessages(role: UserRole): boolean {
  return ['SUPER_PASTOR', 'PASTOR'].includes(role);
}

export function canManageSettings(role: UserRole): boolean {
  return role === 'SUPER_PASTOR';
}

export function canMarkAttendance(role: UserRole): boolean {
  return ['SUPER_PASTOR', 'PASTOR', 'USHER'].includes(role);
}

export function canViewReports(role: UserRole): boolean {
  return ['SUPER_PASTOR', 'PASTOR', 'ACCOUNTANT'].includes(role);
}
