import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "./verification-token";
import { prisma } from "@/auth.config";
import { getPasswordResetTokenByEmail } from "./password-reset-token";
import { getTwoFactorTokenByEmail } from "./two-factor-token";


export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    // Seteo el tiempo que va a tener este token
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getTwoFactorTokenByEmail(email);

    if(existingToken){
        await prisma.twoFactorToken.delete({
            where:{
                id: existingToken.id
            }
        });
    }

    const twoFactorToken = await prisma.twoFactorToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return twoFactorToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    // chequeamos si tenemos un token existente ya enviado para este email que se esta logeando 
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    };

    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    // chequeamos si tenemos un token existente ya enviado para este email que se esta logeando 
    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await prisma.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    };

    const passwordResetToken = await prisma.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}