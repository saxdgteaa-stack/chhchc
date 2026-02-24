import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, canManageEvents } from '@/lib/auth';

// GET - List all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isPublic = searchParams.get('public');
    const upcoming = searchParams.get('upcoming');
    const past = searchParams.get('past');

    const where: Record<string, unknown> = {};
    
    if (isPublic === 'true') {
      where.isPublic = true;
      where.date = { gte: new Date() };
    }
    
    if (upcoming === 'true') {
      where.date = { gte: new Date() };
    }
    
    if (past === 'true') {
      where.date = { lt: new Date() };
    }

    const events = await db.event.findMany({
      where,
      include: {
        _count: {
          select: { attendance: true, offerings: true },
        },
        assignedUshers: {
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        },
      },
      orderBy: { date: 'asc' },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Get events error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !canManageEvents(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const event = await db.event.create({
      data: {
        title: data.title,
        description: data.description || null,
        date: new Date(data.date),
        endTime: data.endTime ? new Date(data.endTime) : null,
        location: data.location || null,
        bannerUrl: data.bannerUrl || null,
        isPublic: data.isPublic ?? false,
        isInternal: data.isInternal ?? true,
        enableAttendance: data.enableAttendance ?? true,
        enableOfferings: data.enableOfferings ?? false,
      },
    });

    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'EVENT',
        entityId: event.id,
        newValues: JSON.stringify(event),
      },
    });

    return NextResponse.json({ event });
  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
