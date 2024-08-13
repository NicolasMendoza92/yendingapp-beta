'use client'
import { passwordResetEmail } from '@/lib/actions'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'

export default function ResetPasswordEmailForm() {

    const handleReset = async (formData: FormData) => {
        const res = await passwordResetEmail(undefined, formData)
        toast.dismiss()
        if (res?.error) {
            toast.error(res.error)
        } else {
            toast.success('Email sent! Please check your email to reset your password.')
        }
    }

    return (
        <form action={handleReset} className="flex flex-col gap-3 px-6">
            <label>Email</label>
            <input
                type="email"
                name="email"
                color="white"
            />
            <CustomButton text="Send reset email" />
            <Link className="text-sm mt-3" href={'/auth/login'} scroll={false}>
                back to
                <span className="underline text-primary_b font-bold mx-1">Login</span>
            </Link>
        </form>
    )
}