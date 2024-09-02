import { prisma } from "@/auth.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const url = new URL(req.url);
    const userId = url.searchParams.get('id');
  
    if (!userId) {
      return NextResponse.json({ message: 'User ID does not exists' }, { status: 400 });
    }
  
    try {
      const user = await prisma.user.findUnique(
        { 
            where: { user_id: userId } 
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