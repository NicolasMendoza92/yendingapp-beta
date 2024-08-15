import RegisterForm from '@/components/forms/RegisterForm'
import Image from 'next/image'
import { Suspense } from 'react'
import Loader from '@/components/Loader'

export default function register() {
  return (
    <Suspense fallback={<Loader />}>
      <div className="grid place-items-center h-screen mx-2">
        <div className="shadow-lg bg-secondary_b text-primary rounded-lg">
          <div className="w-full h-64 relative mb-6">
            <Image
              src="/images/regis.jpg"
              alt="Descriptive Alt Text"
              className="rounded-t-lg"
              width={500}
              height={200}
            />
          </div>
          <div className="p-5 gap-3">
            <h1 className="text-4xl font-bold text-center mb-2">
              Create an account
            </h1>
            <p className="text-center mb-6">
              Put your email and your own password to enjoy yendgingapp
            </p>
            <RegisterForm />
          </div>
        </div>
      </div>
    </Suspense>
  )
}
