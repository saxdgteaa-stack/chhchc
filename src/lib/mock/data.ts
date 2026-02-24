import {
  User,
  Group,
  Member,
  Event,
  Attendance,
  Offering,
  Expense,
  Message,
  MessageTemplate,
  ChurchInfo,
  DashboardStats,
  AuditLog,
} from '@/types';

// Church Info
export const mockChurchInfo: ChurchInfo = {
  id: '1',
  name: 'Grace Community Church',
  tagline: 'A Place of Worship, Fellowship, and Growth',
  address: '123 Church Street, Nairobi, Kenya',
  phone: '+254 700 000 001',
  email: 'info@gracecommunity.org',
  website: 'www.gracecommunity.org',
  paybillNumber: '123456',
  accountNumber: '1234567890',
  bankName: 'Equity Bank',
  aboutText: 'Grace Community Church is a vibrant place of worship dedicated to spreading the love of Christ and building strong community bonds. We welcome everyone to join us in worship, fellowship, and service.',
  missionVision: 'Mission: To spread the Gospel of Jesus Christ and serve our community with love and compassion. Vision: A transformed society where everyone experiences the love of God through Christ-centered living.',
  serviceTimes: [
    { day: 'Sunday', time: '8:00 AM - First Service' },
    { day: 'Sunday', time: '10:30 AM - Second Service' },
    { day: 'Wednesday', time: '6:00 PM - Midweek Service' },
    { day: 'Friday', time: '6:00 PM - Youth Service' },
  ],
  socialLinks: {
    facebook: 'https://facebook.com/gracecommunity',
    twitter: 'https://twitter.com/gracecommunity',
    instagram: 'https://instagram.com/gracecommunity',
    youtube: 'https://youtube.com/gracecommunity',
  },
  logoUrl: '/logo.svg',
  bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200',
};

// Users
export const mockUsers: User[] = [
  {
    id: 'u1',
    email: 'admin@church.com',
    name: 'Pastor John Kamau',
    phone: '+254 700 000 001',
    role: 'SUPER_PASTOR',
    isActive: true,
    lastLogin: '2024-01-15T08:00:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',
  },
  {
    id: 'u2',
    email: 'pastor@church.com',
    name: 'Pastor Mary Wanjiku',
    phone: '+254 700 000 002',
    role: 'PASTOR',
    isActive: true,
    lastLogin: '2024-01-14T10:30:00Z',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-14T10:30:00Z',
  },
  {
    id: 'u3',
    email: 'usher@church.com',
    name: 'Peter Mwangi',
    phone: '+254 700 000 003',
    role: 'USHER',
    isActive: true,
    createdAt: '2023-06-01T00:00:00Z',
    updatedAt: '2024-01-10T14:00:00Z',
  },
  {
    id: 'u4',
    email: 'accountant@church.com',
    name: 'Grace Otieno',
    phone: '+254 700 000 004',
    role: 'ACCOUNTANT',
    isActive: true,
    lastLogin: '2024-01-15T09:00:00Z',
    createdAt: '2023-03-01T00:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
  },
];

// Groups
export const mockGroups: Group[] = [
  { id: 'g1', name: 'Youth', description: 'Youth Ministry (Ages 18-35)', color: '#10B981', memberCount: 45, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g2', name: 'Women', description: "Women's Fellowship Ministry", color: '#EC4899', memberCount: 62, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g3', name: 'Men', description: "Men's Fellowship Ministry", color: '#3B82F6', memberCount: 38, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g4', name: 'Choir', description: 'Praise and Worship Team', color: '#8B5CF6', memberCount: 25, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g5', name: 'Elders', description: 'Church Elders Council', color: '#F59E0B', memberCount: 12, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g6', name: 'Ushers', description: 'Ushering and Protocol Team', color: '#6366F1', memberCount: 18, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g7', name: 'Sunday School', description: 'Children Ministry', color: '#14B8A6', memberCount: 55, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'g8', name: 'Couples', description: 'Couples Fellowship', color: '#F97316', memberCount: 32, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
];

// Members
export const mockMembers: Member[] = [
  {
    id: 'm1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+254 711 111 111',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    occupation: 'Businessman',
    joinDate: '2020-01-15',
    status: 'ACTIVE',
    groupId: 'g3',
    group: mockGroups[2],
    createdAt: '2020-01-15T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@email.com',
    phone: '+254 722 222 222',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    occupation: 'Teacher',
    joinDate: '2019-06-01',
    status: 'ACTIVE',
    groupId: 'g2',
    group: mockGroups[1],
    createdAt: '2019-06-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm3',
    firstName: 'Peter',
    lastName: 'Johnson',
    email: 'peter.j@email.com',
    phone: '+254 733 333 333',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1998-11-08',
    gender: 'Male',
    occupation: 'Software Developer',
    joinDate: '2022-03-20',
    status: 'ACTIVE',
    groupId: 'g1',
    group: mockGroups[0],
    createdAt: '2022-03-20T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm4',
    firstName: 'Mary',
    lastName: 'Wambui',
    email: 'mary.w@email.com',
    phone: '+254 744 444 444',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1988-05-10',
    gender: 'Female',
    occupation: 'Nurse',
    joinDate: '2021-09-15',
    status: 'ACTIVE',
    groupId: 'g4',
    group: mockGroups[3],
    createdAt: '2021-09-15T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm5',
    firstName: 'James',
    lastName: 'Kariuki',
    email: 'james.k@email.com',
    phone: '+254 755 555 555',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1975-12-25',
    gender: 'Male',
    occupation: 'Accountant',
    joinDate: '2018-02-01',
    status: 'ACTIVE',
    groupId: 'g5',
    group: mockGroups[4],
    createdAt: '2018-02-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm6',
    firstName: 'Sarah',
    lastName: 'Ochieng',
    email: 'sarah.o@email.com',
    phone: '+254 766 666 666',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1995-08-30',
    gender: 'Female',
    occupation: 'Marketing Manager',
    joinDate: '2023-01-10',
    status: 'VISITOR',
    groupId: 'g1',
    group: mockGroups[0],
    createdAt: '2023-01-10T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm7',
    firstName: 'David',
    lastName: 'Muthoni',
    email: 'david.m@email.com',
    phone: '+254 777 777 777',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1982-04-18',
    gender: 'Male',
    occupation: 'Doctor',
    joinDate: '2017-05-20',
    status: 'ACTIVE',
    groupId: 'g3',
    group: mockGroups[2],
    createdAt: '2017-05-20T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'm8',
    firstName: 'Esther',
    lastName: 'Njeri',
    email: 'esther.n@email.com',
    phone: '+254 788 888 888',
    address: 'Nairobi, Kenya',
    dateOfBirth: '1992-09-12',
    gender: 'Female',
    occupation: 'Lawyer',
    joinDate: '2020-11-05',
    status: 'ACTIVE',
    groupId: 'g2',
    group: mockGroups[1],
    createdAt: '2020-11-05T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Events
const today = new Date();
const nextSunday = new Date(today);
nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7 || 7));
nextSunday.setHours(9, 0, 0, 0);

const lastSunday = new Date(today);
lastSunday.setDate(today.getDate() - (today.getDay() || 7));
lastSunday.setHours(9, 0, 0, 0);

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Sunday Worship Service',
    description: 'Join us for our weekly Sunday worship service with praise, worship, and the word of God. All are welcome!',
    date: nextSunday.toISOString(),
    endTime: new Date(nextSunday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Main Sanctuary',
    bannerUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800',
    isPublic: true,
    isInternal: true,
    enableAttendance: true,
    enableOfferings: true,
    status: 'SCHEDULED',
    attendanceCount: 245,
    offeringTotal: 125000,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'e2',
    title: 'Youth Conference 2024',
    description: 'Annual youth conference with powerful speakers, worship, and fellowship. Theme: "Rising Generation"',
    date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000).toISOString(),
    location: 'Church Auditorium',
    bannerUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800',
    isPublic: true,
    isInternal: true,
    enableAttendance: true,
    enableOfferings: false,
    status: 'SCHEDULED',
    attendanceCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'e3',
    title: 'Women Fellowship Meeting',
    description: 'Monthly women fellowship meeting for prayer, sharing, and encouragement.',
    date: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Fellowship Hall',
    isPublic: false,
    isInternal: true,
    enableAttendance: true,
    enableOfferings: true,
    status: 'SCHEDULED',
    attendanceCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'e4',
    title: 'Sunday Worship Service',
    description: 'Last Sunday worship service',
    date: lastSunday.toISOString(),
    endTime: new Date(lastSunday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Main Sanctuary',
    isPublic: true,
    isInternal: true,
    enableAttendance: true,
    enableOfferings: true,
    status: 'COMPLETED',
    attendanceCount: 230,
    offeringTotal: 98500,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'e5',
    title: 'Bible Study - The Book of Romans',
    description: 'Weekly bible study session covering the Book of Romans chapter by chapter.',
    date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000 + 1.5 * 60 * 60 * 1000).toISOString(),
    location: 'Conference Room',
    isPublic: false,
    isInternal: true,
    enableAttendance: true,
    enableOfferings: false,
    status: 'SCHEDULED',
    attendanceCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'e6',
    title: 'Christmas Carol Service',
    description: 'Annual Christmas Carol Service with special performances by the choir.',
    date: new Date('2024-12-24T18:00:00').toISOString(),
    endTime: new Date('2024-12-24T21:00:00').toISOString(),
    location: 'Main Sanctuary',
    bannerUrl: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=800',
    isPublic: true,
    isInternal: true,
    enableAttendance: true,
    enableOfferings: true,
    status: 'SCHEDULED',
    attendanceCount: 0,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

// Offerings
export const mockOfferings: Offering[] = [
  { id: 'o1', amount: 5000, method: 'PAYBILL', transactionCode: 'TXN123456', payerPhone: '+254 711 111 111', payerName: 'John Doe', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, createdAt: '2024-01-14T10:30:00Z', updatedAt: '2024-01-14T10:30:00Z' },
  { id: 'o2', amount: 2500, method: 'PAYBILL', transactionCode: 'TXN123457', payerPhone: '+254 722 222 222', payerName: 'Jane Smith', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, createdAt: '2024-01-14T10:35:00Z', updatedAt: '2024-01-14T10:35:00Z' },
  { id: 'o3', amount: 15000, method: 'CASH', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, notes: 'Main offering collection', createdAt: '2024-01-14T12:00:00Z', updatedAt: '2024-01-14T12:00:00Z' },
  { id: 'o4', amount: 10000, method: 'PAYBILL', transactionCode: 'TXN123458', payerPhone: '+254 733 333 333', payerName: 'Peter Johnson', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, createdAt: '2024-01-14T11:00:00Z', updatedAt: '2024-01-14T11:00:00Z' },
  { id: 'o5', amount: 3500, method: 'PAYBILL', transactionCode: 'TXN123459', payerPhone: '+254 744 444 444', payerName: 'Mary Wambui', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, createdAt: '2024-01-14T11:15:00Z', updatedAt: '2024-01-14T11:15:00Z' },
  { id: 'o6', amount: 7500, method: 'CASH', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, notes: 'Tithe collection', createdAt: '2024-01-14T12:30:00Z', updatedAt: '2024-01-14T12:30:00Z' },
  { id: 'o7', amount: 55000, method: 'CASH', eventId: 'e4', event: mockEvents[3], recordedBy: 'u4', verified: true, notes: 'Thanksgiving offering', createdAt: '2024-01-14T13:00:00Z', updatedAt: '2024-01-14T13:00:00Z' },
];

// Expenses
export const mockExpenses: Expense[] = [
  { id: 'ex1', description: 'Sound System Maintenance', amount: 25000, category: 'Equipment', date: '2024-01-10', recordedBy: 'u4', status: 'APPROVED', approvedBy: 'u1', createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-01-10T00:00:00Z' },
  { id: 'ex2', description: 'Sunday School Materials', amount: 8000, category: 'Ministry', date: '2024-01-08', recordedBy: 'u4', status: 'APPROVED', approvedBy: 'u1', createdAt: '2024-01-08T00:00:00Z', updatedAt: '2024-01-08T00:00:00Z' },
  { id: 'ex3', description: 'Utility Bills - January', amount: 15000, category: 'Utilities', date: '2024-01-05', recordedBy: 'u4', status: 'APPROVED', approvedBy: 'u1', createdAt: '2024-01-05T00:00:00Z', updatedAt: '2024-01-05T00:00:00Z' },
  { id: 'ex4', description: 'Church Van Fuel', amount: 5000, category: 'Transport', date: '2024-01-12', recordedBy: 'u4', status: 'PENDING', createdAt: '2024-01-12T00:00:00Z', updatedAt: '2024-01-12T00:00:00Z' },
  { id: 'ex5', description: 'Office Supplies', amount: 3000, category: 'Administration', date: '2024-01-13', recordedBy: 'u4', status: 'PENDING', createdAt: '2024-01-13T00:00:00Z', updatedAt: '2024-01-13T00:00:00Z' },
];

// Messages
export const mockMessages: Message[] = [
  { id: 'msg1', content: 'Dear Church Member, we invite you to our Sunday Service tomorrow at 8:00 AM. God bless you!', recipientType: 'ALL_MEMBERS', sentBy: 'u2', sender: mockUsers[1], sentAt: '2024-01-13T18:00:00Z', status: 'SENT', recipientCount: 287, cost: 2870 },
  { id: 'msg2', content: 'Youth Meeting this Friday at 6 PM. Bring a friend!', recipientType: 'GROUP', groupId: 'g1', group: mockGroups[0], sentBy: 'u2', sender: mockUsers[1], sentAt: '2024-01-12T10:00:00Z', status: 'SENT', recipientCount: 45, cost: 450 },
  { id: 'msg3', content: 'Thank you for your generous offering of KES 5,000 to Grace Community Church. May God bless you abundantly!', recipientType: 'CUSTOM', sentBy: 'u4', sender: mockUsers[3], sentAt: '2024-01-14T10:35:00Z', status: 'SENT', recipientCount: 1, cost: 10 },
  { id: 'msg4', content: 'Women Fellowship meeting on Saturday at 2 PM. All ladies welcome!', recipientType: 'GROUP', groupId: 'g2', group: mockGroups[1], sentBy: 'u2', sender: mockUsers[1], sentAt: '2024-01-11T09:00:00Z', status: 'SENT', recipientCount: 62, cost: 620 },
];

// Message Templates
export const mockMessageTemplates: MessageTemplate[] = [
  { id: 't1', name: 'Thank You for Offering', content: 'Dear {name}, thank you for your generous offering of KES {amount} to Grace Community Church. May God bless you abundantly!', type: 'thank_you', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 't2', name: 'Welcome Visitor', content: 'Welcome to Grace Community Church! We are glad you joined us today. We hope to see you again soon. God bless you!', type: 'welcome', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 't3', name: 'Event Reminder', content: 'Reminder: {event_name} on {date} at {time}. Location: {location}. We look forward to seeing you!', type: 'reminder', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 't4', name: 'Prayer Request Follow-up', content: 'We are praying for you. Your prayer request has been received and our prayer team is standing with you in faith.', type: 'follow_up', isActive: true, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  totalMembers: 287,
  activeMembers: 245,
  visitors: 42,
  totalOfferings: 2450000,
  monthlyOfferings: 485000,
  todayOfferings: 0,
  upcomingEvents: 4,
  todayAttendance: 0,
  weeklyAttendance: 230,
  memberGrowth: 12,
  offeringGrowth: 8,
};

// Audit Logs
export const mockAuditLogs: AuditLog[] = [
  { id: 'al1', userId: 'u1', user: mockUsers[0], action: 'LOGIN', entityType: 'USER', entityId: 'u1', createdAt: '2024-01-15T08:00:00Z' },
  { id: 'al2', userId: 'u2', user: mockUsers[1], action: 'CREATE', entityType: 'EVENT', entityId: 'e2', newValues: JSON.stringify(mockEvents[1]), createdAt: '2024-01-14T15:00:00Z' },
  { id: 'al3', userId: 'u4', user: mockUsers[3], action: 'CREATE', entityType: 'OFFERING', entityId: 'o1', newValues: JSON.stringify(mockOfferings[0]), createdAt: '2024-01-14T10:30:00Z' },
  { id: 'al4', userId: 'u1', user: mockUsers[0], action: 'UPDATE', entityType: 'USER', entityId: 'u3', createdAt: '2024-01-13T11:00:00Z' },
  { id: 'al5', userId: 'u2', user: mockUsers[1], action: 'CREATE', entityType: 'MEMBER', entityId: 'm6', createdAt: '2024-01-10T09:30:00Z' },
];

// Attendance for events
export const mockAttendance: Attendance[] = [
  { id: 'a1', memberId: 'm1', member: mockMembers[0], eventId: 'e4', event: mockEvents[3], isPresent: true, markedAt: '2024-01-14T09:15:00Z' },
  { id: 'a2', memberId: 'm2', member: mockMembers[1], eventId: 'e4', event: mockEvents[3], isPresent: true, markedAt: '2024-01-14T09:20:00Z' },
  { id: 'a3', memberId: 'm3', member: mockMembers[2], eventId: 'e4', event: mockEvents[3], isPresent: true, markedAt: '2024-01-14T09:25:00Z' },
  { id: 'a4', memberId: 'm4', member: mockMembers[3], eventId: 'e4', event: mockEvents[3], isPresent: true, markedAt: '2024-01-14T09:30:00Z' },
  { id: 'a5', visitorName: 'Visitor One', visitorPhone: '+254 799 000 001', eventId: 'e4', event: mockEvents[3], isPresent: true, markedAt: '2024-01-14T09:35:00Z' },
  { id: 'a6', visitorName: 'Visitor Two', visitorPhone: '+254 799 000 002', eventId: 'e4', event: mockEvents[3], isPresent: true, markedAt: '2024-01-14T09:40:00Z' },
];

// Chart data for reports
export const monthlyOfferingData = [
  { name: 'Aug', value: 380000 },
  { name: 'Sep', value: 425000 },
  { name: 'Oct', value: 395000 },
  { name: 'Nov', value: 450000 },
  { name: 'Dec', value: 520000 },
  { name: 'Jan', value: 485000 },
];

export const monthlyAttendanceData = [
  { name: 'Aug', value: 850 },
  { name: 'Sep', value: 890 },
  { name: 'Oct', value: 875 },
  { name: 'Nov', value: 920 },
  { name: 'Dec', value: 1100 },
  { name: 'Jan', value: 945 },
];

export const groupDistributionData = mockGroups.map(g => ({
  name: g.name,
  value: g.memberCount || 0,
  color: g.color,
}));

export const offeringByMethodData = [
  { name: 'Paybill', value: 145000, color: '#10B981' },
  { name: 'Cash', value: 280000, color: '#F59E0B' },
  { name: 'Bank Transfer', value: 45000, color: '#3B82F6' },
  { name: 'Cheque', value: 15000, color: '#8B5CF6' },
];
