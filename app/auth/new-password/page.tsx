
import NewPasswordForm from '@/components/forms/NewPasswordForm'
import Loader from '@/components/Loader'
import React, { Suspense } from 'react'

const ResetPasswordPage = () => {

  return (
    <Suspense fallback={<Loader />}>
      <div className="grid place-items-center h-screen mx-2">
        <div className="shadow-lg bg-secondary_b text-primary rounded-lg border-t-4">
          <div className="p-5 gap-3">
            <h1 className="text-4xl font-bold text-center mb-2">
              Reset your password
            </h1>
            <p className="text-center mb-6">
              Choose your new password and back to login.
            </p>
            <NewPasswordForm/>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default ResetPasswordPage