import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/auth.config';
import { v4 as uuidv4 } from 'uuid';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const existentUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existentUser) {
      return NextResponse.json({ message: 'Usuario ya existe' }, { status: 400 });
    }

    const generated_user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      email,
      emailVerified : null,
      password: hashedPassword,
      user_id: generated_user_id,
      createdAt: new Date(),
      updatedAt: new Date(),
      previas_created: [],
      previas_requests: [],
    };

    await prisma.user.create({ data: userData });

    // generate a verification token 
    const verificationToken = await generateVerificationToken(email);
    console.log('verificationToken', verificationToken)

    // import send an email function 

    // await sendVerificationEmail(
    //   verificationToken.email, 
    //   verificationToken.token
    // )

    return NextResponse.json({ message: 'confirmation email sent' }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'A ocurrido un error' }, { status: 500 });
  }
}
