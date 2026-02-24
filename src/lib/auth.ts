import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';
import { cookies } from 'next/headers';
import { verify } from 'crypto';

// Simple password hashing using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
}

// JWT-like token generation (simple implementation for demo)
export function generateToken(userId: string, role: UserRole): string {
  const payload = JSON.stringify({ userId, role, exp: Date.now() + 24 * 60 * 60 * 1000 });
  return Buffer.from(payload).toString('base64');
}

export function verifyToken(token: string): { userId: string; role: UserRole } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    if (payload.exp < Date.now()) return null;
    return { userId: payload.userId, role: payload.role };
  } catch {
    return null;
  }
}

// Server-side auth helpers
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  const user = await db.user.findUnique({
    where: { id: decoded.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      phone: true,
      isActive: true,
    },
  });
  
  return user;
}

// Role-based access control
export const rolePermissions: Record<UserRole, string[]> = {
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

export function hasPermission(role: UserRole, permission: string): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

// Permission levels for UI rendering
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
