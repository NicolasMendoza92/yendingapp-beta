'use client'
import { signup } from '@/lib/actions'
import { Link } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'
import { useState } from 'react'

export default function RegisterForm() {
  const [error, setError] = useState(false);

  const handleForm = async (formData: FormData) => {
    const res = await signup(undefined, formData)
    toast.dismiss()
    if (res?.error) {
      if (Array.isArray(res.error)) {
        res.error.forEach((err: { message: string }) => {
          toast.error(err.message)
          setError(true)
        })
      } else {
        toast.error(res.error)
        setError(true)
      }
    } else {
      toast.success('Account Created!')
      setError(false)
    }
  }

  return (
    <form action={handleForm} className="flex flex-col gap-3 px-6">
      <label>Put your email</label>
      <input
        type="email"
        name="email"
        color="white"
        className={error ? 'border-red-500 text-white' : ''}
      />
      <label>Choose your password</label>
      <input
        type="password"
        name="password"
        color="white"
        className={error ? 'border-red-500 text-white' : ''}
      />
      <CustomButton text="Register" />
      <Link className="text-sm mt-3" href={'/auth/login'} scroll={false}>
        Already have an account?{' '}
        <span className="underline text-primary_b font-bold">Login</span>
      </Link>
    </form>
  )
}
