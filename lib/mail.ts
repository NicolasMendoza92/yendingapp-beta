
import { Resend } from "resend"

//  API KEY de resend.com -> la version gratis funciona con el mail del admin , en este caso "nmapi2022@gmail.com"
if (!process.env.RESEND_API_KEY) {
    throw new Error('Invalid/Missing environment variable: "RESEND_API_KEY"')
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    // Cambiar para el deploy despues
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Yending App <onboarding@resend.dev>",
        to: email,
        subject: "Confirm your email",
        html: `<p> Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    })

}
