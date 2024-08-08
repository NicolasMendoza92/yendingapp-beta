import { prisma } from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { channel, user_id, text, url_img, name } = await req.json();

  try {
    const message = await prisma.message.create({
      data: {
        channel,
        user_id,
        text,
        url_img,
        name,
      },
    });
    return NextResponse.json({ message }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al guardar el mensaje' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const channel = url.searchParams.get('channel');

  if (!channel) {
    return NextResponse.json({ message: 'channel is required' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        channel,
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    const messageData = messages.map((message) => ({
      timestamp: message.timestamp,
      data: {
        text: message.text,
        userData: {
          user_id: message.user_id,
          name: message.name,
          url_img: message.url_img,
        },
      },
    }));

    return NextResponse.json({ messages: messageData }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error al obtener los mensajes' }, { status: 500 });
  }
}
