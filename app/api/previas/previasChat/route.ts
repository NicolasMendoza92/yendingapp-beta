export const dynamic = 'force-dynamic';
import { prisma } from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server';

// Ruta a la cual envio el array de los Ids de previas request de determinado user y me trae la info de la previa
export async function GET(req: NextRequest) {
  try {
    const session = JSON.parse(req.headers.get('Authorization') || '{}');

    const user_id = session.user.userData?.user_id;

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const previa_data = await prisma.previas.findMany({
      where: {
        date: {
          gte: tomorrow,
        },
        OR: [
          {
            join_requests: {
              some: {
                user_id,
              },
            },
          },
          {
            creator: {
              is: { user_id },
            },
          },
        ],
      },
    });

    if (!previa_data || previa_data.length === 0) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 });
    }

    return NextResponse.json({ previa_data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
  }
}
