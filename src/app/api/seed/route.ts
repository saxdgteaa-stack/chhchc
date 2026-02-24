import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/auth';

export async function POST() {
  try {
    // Check if already seeded
    const existingUser = await db.user.findFirst();
    if (existingUser) {
      return NextResponse.json({ message: 'Database already seeded' });
    }

    // Create default Super Pastor
    const hashedPassword = await hashPassword('admin123');
    const superPastor = await db.user.create({
      data: {
        email: 'admin@church.com',
        name: 'Super Pastor',
        password: hashedPassword,
        role: 'SUPER_PASTOR',
        phone: '+254700000000',
      },
    });

    // Create default groups
    const groups = await Promise.all([
      db.group.create({
        data: { name: 'Youth', description: 'Youth Ministry', color: '#10B981' },
      }),
      db.group.create({
        data: { name: 'Women', description: 'Women Ministry', color: '#EC4899' },
      }),
      db.group.create({
        data: { name: 'Men', description: 'Men Ministry', color: '#3B82F6' },
      }),
      db.group.create({
        data: { name: 'Choir', description: 'Choir Ministry', color: '#8B5CF6' },
      }),
      db.group.create({
        data: { name: 'Elders', description: 'Church Elders', color: '#F59E0B' },
      }),
      db.group.create({
        data: { name: 'Ushers', description: 'Ushering Team', color: '#6366F1' },
      }),
    ]);

    // Create church info
    await db.churchInfo.create({
      data: {
        name: 'Grace Community Church',
        tagline: 'A Place of Worship, Fellowship, and Growth',
        address: '123 Church Street, Nairobi, Kenya',
        phone: '+254700000001',
        email: 'info@gracecommunity.org',
        website: 'www.gracecommunity.org',
        paybillNumber: '123456',
        accountNumber: '1234567890',
        bankName: 'Equity Bank',
        aboutText: 'Grace Community Church is a vibrant place of worship dedicated to spreading the love of Christ and building strong community bonds.',
        missionVision: 'Mission: To spread the Gospel and serve our community. Vision: A transformed society through Christ-centered living.',
        serviceTimes: JSON.stringify([
          { day: 'Sunday', time: '8:00 AM - First Service' },
          { day: 'Sunday', time: '10:30 AM - Second Service' },
          { day: 'Wednesday', time: '6:00 PM - Midweek Service' },
          { day: 'Friday', time: '6:00 PM - Youth Service' },
        ]),
        socialLinks: JSON.stringify({
          facebook: 'https://facebook.com/gracecommunity',
          twitter: 'https://twitter.com/gracecommunity',
          instagram: 'https://instagram.com/gracecommunity',
          youtube: 'https://youtube.com/gracecommunity',
        }),
      },
    });

    // Create message templates
    await Promise.all([
      db.messageTemplate.create({
        data: {
          name: 'Thank You for Offering',
          content: 'Dear {name}, thank you for your generous offering of KES {amount} to Grace Community Church. May God bless you abundantly!',
          type: 'thank_you',
        },
      }),
      db.messageTemplate.create({
        data: {
          name: 'Welcome Visitor',
          content: 'Welcome to Grace Community Church! We are glad you joined us. For more info, visit our website or call us.',
          type: 'welcome',
        },
      }),
      db.messageTemplate.create({
        data: {
          name: 'Event Reminder',
          content: 'Reminder: {event_name} on {date} at {time}. We look forward to seeing you!',
          type: 'reminder',
        },
      }),
    ]);

    // Create some sample members
    await Promise.all([
      db.member.create({
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+254711111111',
          groupId: groups[2].id, // Men
          status: 'ACTIVE',
        },
      }),
      db.member.create({
        data: {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane@example.com',
          phone: '+254722222222',
          groupId: groups[1].id, // Women
          status: 'ACTIVE',
        },
      }),
      db.member.create({
        data: {
          firstName: 'Peter',
          lastName: 'Johnson',
          email: 'peter@example.com',
          phone: '+254733333333',
          groupId: groups[0].id, // Youth
          status: 'ACTIVE',
        },
      }),
    ]);

    // Create a sample event
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + ((7 - today.getDay()) % 7 || 7));
    nextSunday.setHours(9, 0, 0, 0);

    await db.event.create({
      data: {
        title: 'Sunday Worship Service',
        description: 'Join us for our weekly Sunday worship service with praise, worship, and the word of God.',
        date: nextSunday,
        endTime: new Date(nextSunday.getTime() + 2 * 60 * 60 * 1000),
        location: 'Main Sanctuary',
        isPublic: true,
        isInternal: true,
        enableAttendance: true,
        enableOfferings: true,
      },
    });

    return NextResponse.json({
      message: 'Database seeded successfully',
      superPastor: { email: 'admin@church.com', password: 'admin123' },
      groups: groups.length,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seeding failed' }, { status: 500 });
  }
}
