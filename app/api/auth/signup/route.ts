import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/auth.config";
import { v4 as uuidv4 } from 'uuid';


export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();
        
        const existingUser = await prisma.users.findUnique({
            where:{
                email:email,
            }
        });

        if(existingUser){
            return NextResponse.json(
                { message: "Email already taken" },
                { status: 400 }
            )
        }

        const generated_user_id = uuidv4()
        const hashedPassword = await bcrypt.hash(password, 10);

         const userData = {
            email,
            emailVerified: new Date(),
            password: hashedPassword,
            user_id: generated_user_id,
            createdAt: new Date(),
            updatedAt: new Date(),
            previas_created: [],
            previas_requests: [],
        };

        await prisma.users.create({ data: userData});

        // TODO: Sent verification token email

        return NextResponse.json(
            { message: "Usuario registrado" },
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "A ocurrido un error" },
            { status: 500 }
        )

    }
}