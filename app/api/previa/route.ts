import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/auth.config';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');
  const user = session?.user?.userData;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { newFormData } = await req.json();
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    
    const creatorData = {
      user_id: user?.user_id,
      photo: user?.url_img,
      name: user?.name,
      email: user?.email,
    };

    const generated_previa_id = uuidv4();
    const generated_pass_code = uuidv4();
    const creator = creatorData;

    console.log('formData:', newFormData);
    // Crear un objeto updatedData combinando formData y age
    const updatedData = {
      ...newFormData,
      previa_id: generated_previa_id,
      creator: creator,
      pass_code: generated_pass_code,
      date: new Date(newFormData.date),
      join_requests: [],
    };
    console.log(updatedData);
    const newPrevia = await prisma.previas.create({ data: updatedData });
    console.log('previa:', newPrevia);
    //update user with previa_id
    const updatedUser = await prisma.user.update({
      where: {
        user_id: user?.user_id,
      },
      data: {
        previas_created: {
          push: newPrevia.previa_id,
        },
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ message: 'Error updating user.' }, { status: 404 });
    }

    return NextResponse.json({ newPrevia });
  } catch (error) {
    console.log('error', error);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const previa_id = searchParams.get('previa_id');

  if (!previa_id) {
    return NextResponse.json({ message: 'Something happen' }, { status: 400 });
  }

  try {
    const previa_data = await prisma.previas.findUnique({
      where: { previa_id },
    });

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 });
    }

    return NextResponse.json({ previa_data }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { formData } = await req.json();
    const { previaId, ...rest } = formData;
    console.log('previa_data:', formData);
    // Actualizamos los datos de la DB con previa_id
    const previa_data = await prisma.previas.update({
      where: { previa_id: previaId },
      data: rest,
    });

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 });
    }

    return NextResponse.json({ previa_data });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ message: 'A ocurrido un error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}');

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { previa_id } = await req.json();

    // Eliminar la previa en la base de datos usando previa_id
    const previa_data = await prisma.previas.delete({ where: { previa_id } });

    if (!previa_data) {
      return NextResponse.json({ message: 'Previa not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Previa deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log('error', error);
    return NextResponse.json({ message: 'A ocurrido un error' }, { status: 500 });
  }
}
