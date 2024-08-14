import { prisma } from "@/auth.config";
import { getUserByEmail } from "@/services/users";

export async function changeSettings(twoFactorStatus: boolean | undefined, email: string) {

    console.log("2fa", twoFactorStatus, email)

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email not found!" }
    }

    // Una vez que el usuario verifica, hago el update en la db
    try {
        await prisma.user.update({
            where: { id: existingUser.id },
            data: {
                isTwoFactorEnabled: twoFactorStatus
            }
        })

        return { success:"Changes saved" }
    } catch (error) {
        console.log(error)
    }

}