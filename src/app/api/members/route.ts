import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUser, canManageMembers } from '@/lib/auth';

// GET - List all members
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: Record<string, unknown> = {};
    
    if (groupId) where.groupId = groupId;
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const members = await db.member.findMany({
      where,
      include: {
        group: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ members });
  } catch (error) {
    console.error('Get members error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new member
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !canManageMembers(user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    const member = await db.member.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email || null,
        phone: data.phone || null,
        address: data.address || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        gender: data.gender || null,
        occupation: data.occupation || null,
        groupId: data.groupId || null,
        status: data.status || 'VISITOR',
        notes: data.notes || null,
      },
      include: {
        group: true,
      },
    });

    // Log audit
    await db.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'MEMBER',
        entityId: member.id,
        newValues: JSON.stringify(member),
      },
    });

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Create member error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
