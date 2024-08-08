import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/auth.config';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const previaId = url.searchParams.get('previaId');

    if (!previaId) {
      return NextResponse.json({ message: 'Previa ID is required' }, { status: 400 });
    }

    const previa_data = await prisma.previas.findUnique({
      where: { previa_id: previaId },
    });

    const acceptedUsers = previa_data?.join_requests
      ?.map((request) => {
        if (request.status === 'accepted') return request.user_id;
        return '';
      })
      ?.filter((user) => user) as string[];

    const users = [previa_data?.creator?.user_id || '', ...acceptedUsers];

    const users_data = await prisma.user.findMany({ where: { user_id: { in: users } } });

    if (!users_data?.length) {
      return NextResponse.json({ message: 'Users not found' }, { status: 404 });
    }

    return NextResponse.json({ users_data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
  }
}
