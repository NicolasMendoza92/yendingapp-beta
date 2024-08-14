'use client'
import { signup } from '@/lib/actions'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'


export default function RegisterForm() {

  const handleForm = async (formData: FormData) => {
    const res = await signup(undefined, formData)
    toast.dismiss()
    if (res?.error) {
      const errors = Array.isArray(res.error) ? res.error : [{ message: res.error }];
      errors.forEach((err: { message: string }) => {
        toast.error(err.message);
      });
    } else {
      toast.success('Account Created! Please check your email to confirm your account.');
    }
  }

  return (
    <form action={handleForm} className="flex flex-col gap-3 px-6">
      <label>Put your email</label>
      <input
        type="email"
        name="email"
        color="white"
      />
      <label>Choose your password</label>
      <input
        type="password"
        name="password"
        color="white"
      />
      <CustomButton text="Register" />
      <Link className="text-sm mt-3" href={'/auth/login'} scroll={false}>
        Already have an account?{' '}
        <span className="underline text-primary_b font-bold">Login</span>
      </Link>
    </form>
  )
}
