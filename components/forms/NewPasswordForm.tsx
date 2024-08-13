'use client'
import { newPassword } from '@/lib/actions'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'
import { useSearchParams } from 'next/navigation'



export default function NewPasswordForm() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const submitNewPassword = async (formData: FormData) => {

        const res = await newPassword(formData, token);
        if (res?.error) {
            toast.dismiss();
            toast.error(res.error);
        } else {
            toast.dismiss();
            toast.success('Password updated!');
        }
    };

    return (
        <form action={submitNewPassword} className="flex flex-col gap-3 px-6">
            <label>New Password</label>
            <input
                type="password"
                name="password"
                color="white"
            />
            <CustomButton text="Reset password" />
            <Link className="text-sm mt-3" href={'/auth/reset'} scroll={false}>
                back to
                <span className="underline text-primary_b font-bold mx-1">Login</span>
            </Link>
        </form>
    )
}
