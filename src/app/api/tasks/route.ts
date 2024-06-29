import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const user = getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: { userId: user.userId },
  });

  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const user = getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, description, status, dueDate } = await request.json();

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status,
      dueDate,
      userId: user.userId,
    },
  });

  return NextResponse.json(task, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const user = getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, title, description, status, dueDate } = await request.json();

  const task = await prisma.task.update({
    where: { id, userId: user.userId },
    data: { title, description, status, dueDate },
  });

  return NextResponse.json(task);
}

export async function DELETE(request: NextRequest) {
  const user = getUserFromToken(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();

  await prisma.task.delete({
    where: { id, userId: user.userId },
  });

  return NextResponse.json({ message: 'Task deleted successfully' });
}