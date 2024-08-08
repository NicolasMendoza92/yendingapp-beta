import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/auth.config';

export async function POST(req: NextRequest) {
  // necesito el dato del usuario que esta solicitando para enviarlo a la db como user_id del solicitante
  const session = JSON.parse(req.headers.get('Authorization') || '{}');
  const user_data = session?.user?.userData || '';
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { attendants, url_img, intentions, previa_id } = await req.json();

    // con estos datos ya es suficiente para la creación PreviaUser
    const joinRequest = {
      intentions,
      //TODO: handle photos properly
      photos: [url_img],
      //TODO: should be an string
      attendants: Number(attendants),
      user_id: user_data?.user_id,
      status: 'pending',
      previa_id,
    };

    const previaUserExists = await prisma.previausers.findUnique({
      where: {
        user_id: user_data?.user_id,
        previa_id,
      },
    });

    if (previaUserExists) {
      return NextResponse.json({ message: 'User already sent a request' }, { status: 400 });
    }

    const newPreviaUser = await prisma.previausers.create({ data: joinRequest });

    if (!newPreviaUser) {
      return NextResponse.json({ message: 'Error creating previa user' }, { status: 500 });
    }

    console.log('newReq:', newPreviaUser);

    await prisma.user.update({
      where: {
        user_id: user_data?.user_id,
      },
      data: {
        previas_requests: {
          push: previa_id, // hago el push a la prop previas_requests
        },
      },
    });
    console.log('newReq:', newPreviaUser);

    const { previa_id: NewPreviaId, createdAt, updatedAt, ...joinRequestData } = newPreviaUser;

    await prisma.previas.update({
      where: { previa_id: NewPreviaId },
      data: {
        join_requests: {
          push: joinRequestData,
        },
      },
    });

    return NextResponse.json({ newPreviaUser });
  } catch (error) {
    return NextResponse.json({ message: 'Error message' }, { status: 500 });
  }
}

//  Trae las solicitudes de union que hizo el usuario que esta logeado
export async function GET(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');
  const emailWanted = session?.user?.email || '';
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const userJoinRequests = await prisma.previas.findMany({
      where: {
        creator: emailWanted,
      },
    });

    return NextResponse.json({ userJoinRequests }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
  }
}

//  modifico el status de PreviaUsers cuando el dueño de la previa cambia el mismo
export async function PUT(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session?.user?.id as string;

  try {
    const { previaId, status }: { previaId: string; status: string } = await req.json();
    console.log('previaId:', previaId);
    const previaUser = await prisma.previausers.findUnique({
      where: {
        user_id: userId,
      },
    });

    if (!previaUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await prisma.previausers.update({
      where: {
        user_id: userId,
      },
      data: {
        status: status,
      },
    });

    // MONGO

    // const previaUser = await prisma.previausers.findOne({
    //   previa_id: previaId,
    //   user_id: userId
    // })

    // if (!previaUser) {
    //   return NextResponse.json(
    //     { message: 'PreviaUser not found' },
    //     { status: 404 }
    //   )
    // }

    // previaUser.status = status
    // await previaUser.save()

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (error) {
    console.error('Error updating PreviaUser status:', error);
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 });
  }
}
