'use client'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'

export default function LoginGoogle() {
  const handleGoogleSignIn = async () => {
    const res = await signIn('google', { redirectTo: '/dashboard' })
    console.log(res)
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="btn-primary-flex"
    >
      <>
        <FaGoogle className="h-6" />
        <span>Continue with Google</span>
      </>
    </button>
  )
}
