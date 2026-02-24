// Church Management System Types

export type UserRole = 'SUPER_PASTOR' | 'PASTOR' | 'USHER' | 'ACCOUNTANT';

export type MemberStatus = 'ACTIVE' | 'VISITOR' | 'INACTIVE' | 'TRANSFERRED';

export type PaymentMethod = 'CASH' | 'PAYBILL' | 'BANK_TRANSFER' | 'CHEQUE';

export type EventStatus = 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';

export type RecipientType = 'GROUP' | 'EVENT_ATTENDEES' | 'ALL_MEMBERS' | 'CUSTOM';

export type MessageStatus = 'PENDING' | 'SENT' | 'FAILED' | 'PARTIAL';

export type ExpenseStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

// User
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// Group
export interface Group {
  id: string;
  name: string;
  description?: string;
  color?: string;
  memberCount?: number;
  createdAt: string;
  updatedAt: string;
}

// Member
export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
  joinDate: string;
  status: MemberStatus;
  notes?: string;
  group?: Group;
  groupId?: string;
  createdAt: string;
  updatedAt: string;
}

// Event
export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  endTime?: string;
  location?: string;
  bannerUrl?: string;
  isPublic: boolean;
  isInternal: boolean;
  enableAttendance: boolean;
  enableOfferings: boolean;
  status: EventStatus;
  attendanceCount?: number;
  offeringTotal?: number;
  assignedUshers?: EventUsher[];
  createdAt: string;
  updatedAt: string;
}

export interface EventUsher {
  id: string;
  eventId: string;
  userId: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
  assignedAt: string;
}

// Attendance
export interface Attendance {
  id: string;
  memberId?: string;
  member?: Member;
  eventId: string;
  event?: Event;
  isPresent: boolean;
  visitorName?: string;
  visitorPhone?: string;
  visitorEmail?: string;
  markedAt: string;
  notes?: string;
}

// Offering
export interface Offering {
  id: string;
  amount: number;
  method: PaymentMethod;
  transactionCode?: string;
  accountId?: string;
  payerPhone?: string;
  payerName?: string;
  eventId?: string;
  event?: Event;
  memberId?: string;
  member?: Member;
  recordedBy: string;
  verified: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Expense
export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  receiptUrl?: string;
  date: string;
  recordedBy: string;
  approvedBy?: string;
  status: ExpenseStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Message
export interface Message {
  id: string;
  content: string;
  recipientType: RecipientType;
  groupId?: string;
  group?: Group;
  eventId?: string;
  event?: Event;
  sentBy: string;
  sender?: User;
  sentAt: string;
  status: MessageStatus;
  recipientCount: number;
  cost?: number;
  notes?: string;
}

// Message Template
export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Church Info
export interface ChurchInfo {
  id: string;
  name: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  paybillNumber?: string;
  accountNumber?: string;
  bankName?: string;
  aboutText?: string;
  missionVision?: string;
  serviceTimes?: ServiceTime[];
  socialLinks?: SocialLinks;
  logoUrl?: string;
  bannerUrl?: string;
}

export interface ServiceTime {
  day: string;
  time: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  visitors: number;
  totalOfferings: number;
  monthlyOfferings: number;
  todayOfferings: number;
  upcomingEvents: number;
  todayAttendance: number;
  weeklyAttendance: number;
  memberGrowth: number;
  offeringGrowth: number;
}

// Audit Log
export interface AuditLog {
  id: string;
  userId?: string;
  user?: User;
  action: string;
  entityType: string;
  entityId?: string;
  oldValues?: string;
  newValues?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

// Report Data
export interface ReportData {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}
