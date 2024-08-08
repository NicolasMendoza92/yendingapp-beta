import { prisma } from '@/auth.config';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PUT(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');
  const emailWanted = session?.user?.email || '';

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { updatedFormData, previaId } = await req.json();

    // Conexión a la base de datos MongoDB
    const user_data = await prisma.user.findUnique({
      where: { email: emailWanted },
    });

    if (!user_data) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Crear updatedData dependiendo de si user_id ya existe o no
    let updatedData: any;
    // Verificar si user_id ya existe en user_data
    if (user_data.user_id === null) {
      updatedData = {
        ...updatedFormData,
        user_id: uuidv4(),
      };
    } else {
      updatedData = {
        ...updatedFormData,
      };
    }
    // Actualizar el usuario en la base de datos
    await prisma.user.update({
      where: {
        id: user_data.id,
      },
      data: updatedData,
    });

    // If previaId is provided, update the previas_created array
    if (previaId) {
      await prisma.user.update({
        where: {
          id: user_data.id,
        },
        data: {
          previas_created: previaId,
        },
      });
    }

    return NextResponse.json(
      { user_data },
      // { message: "Usuario modificado" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'A ocurrido un error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');
  const email = session?.user?.email || '';

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const user_data = await prisma.user.findUnique({ where: { email } });

    if (!user_data) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user_data }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
  }
}
