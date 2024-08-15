import LoginGoogle from '@/components/buttons/LoginGoogle'
import Image from 'next/image'
import { Link } from 'next-view-transitions'
import { Suspense } from 'react'
import Loader from '@/components/Loader'
import CredentialLogin from '@/components/buttons/CredentialLogin'

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader />}>
    <div className="grid place-items-center h-screen mx-2 ">
      <div className="bg-primary_b shadow-lg text-black rounded-lg">
        <div className="relative mb-6">
          <Image
            src="/images/celebrate.jpg"
            alt="Descriptive Alt Text"
            priority={true}
            className="rounded-t-lg w-auto h-64"
            width={500}
            height={200}
          />
        </div>
        <div className="p-5 gap-3 ">
          <h1 className=" text-4xl text-primary font-bold text-center mb-2">
            Sign in
          </h1>
          <p className="text-center mb-6 text-primary ">
            Sign in to your account using one of the methods below
          </p>
          <div className="flex flex-col gap-3 px-6">
            <LoginGoogle />
            <CredentialLogin />
            <Link className="text-sm text-primary" href={'/auth/register'}>
              {`Don't have an account?`}{' '}
              <span className="underline text-secondary font-bold">
                Register
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Suspense>
  )
}
