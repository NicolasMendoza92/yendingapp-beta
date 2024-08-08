import { auth } from '@/auth';
import { prisma } from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server';

// actualizacion de el model User , añadiendo las previas que ha solicitado unirse .. modificamos el array previa_requests
export async function PUT(req: NextRequest) {
  const session = await auth();
  const emailWanted = session?.user?.email || '';

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { previaId }: { previaId: string } = await req.json();

    // const user_data = await prisma.user.findOneAndUpdate(
    //   { email: emailWanted },
    //   { $push: { previas_requests: previaId } },
    //   { new: true }
    // )

    // if (!user_data) {
    //   return NextResponse.json({ message: 'User not found' }, { status: 404 })
    // }

    // return NextResponse.json({ user_data }, { status: 200 })

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: {
        email: emailWanted,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: emailWanted,
      },
      data: {
        previas_requests: {
          push: previaId, // hago el push a la prop previas_requests
        },
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
