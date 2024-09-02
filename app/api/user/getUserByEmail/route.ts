import { prisma } from "@/auth.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const session = JSON.parse(req.headers.get('Authorization') || '{}');
    // const email = session?.user?.email || '';
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
  
    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }
  
    try {
      const user = await prisma.user.findUnique(
        { 
            where: { email } 
        }
    );
  
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Ha ocurrido un error' }, { status: 500 });
    }
  }