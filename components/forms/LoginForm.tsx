'use client'

import { useTransitionRouter as useRouter } from 'next-view-transitions'
import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'
import { authenticate } from '@/lib/actions'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginForm() {
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleLogin = async (formData: FormData) => {
    if (!showTwoFactor) {
      // Almacena email y password en el estado antes de enviar los datos
      setFormValues({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      })
    }

    // Agrega los datos almacenados al FormData si se está enviando el 2FA
    if (showTwoFactor) {
      formData.append('email', formValues.email)
      formData.append('password', formValues.password)
    }

    const res = await authenticate(undefined, formData)

    toast.dismiss()

    if (res?.error) {
      const errors = Array.isArray(res.error) ? res.error : [{ message: res.error }]
      errors.forEach((err) => {
        toast.error(err.message)
      })
    } else if (res?.success) {
      toast.success(res.success || 'Operation successful')
    } else if (res?.twoFactor) {
      setShowTwoFactor(true)
      toast.success('Verification code sent, please check your email')
    }
    router.push('/dashboard')
  }

  return (
    <>
      <form action={handleLogin} className="mt-3 flex flex-col gap-3 px-2 py-3">
        {!showTwoFactor && (
          <>
            <label className="font-bold text-primary">Email</label>
            <input className={'border-primary'} type="email" name="email" />
            <label className="font-bold text-primary">Password</label>
            <input className={'border-primary'} type="password" name="password" />
          </>
        )}
        {showTwoFactor && (
          <>
            <label className="text-center font-bold text-primary">Two Factor Code</label>
            <input className={'border-primary'} name="code" />
          </>
        )}
        <Link className="mt-3 text-sm" href={'/auth/reset'} scroll={false}>
          <span className="font-bold text-primary underline transition duration-300 hover:text-secondary_b">
            Forgot password?
          </span>
        </Link>
        <CustomButton
          text={showTwoFactor ? 'Confirm' : 'Login'}
          toastMessage={`we're working on it, you'll be redirected soon...`}
        />
      </form>
    </>
  )
}

// import { CustomButton } from '@/components/buttons/CustomButton'
// import { authenticate } from '@/lib/actions'
// import toast from 'react-hot-toast'
// import { CardWrapper } from '../auth/card-wrapper'

// export default function LoginForm() {

// const handleLogin = async (formData: FormData) => {
//   const res = await authenticate(undefined, formData)
//   toast.dismiss()
//   if (res) {
//     toast.error(res)
//   }
// }
//   return (
//       <form action={handleLogin} className="flex flex-col mt-3 gap-3">
//         <label className='text-primary font-bold'>Email</label>
//         <input
//           className='border-primary'
//           id="email"
//           type="email"
//           name="email"
//         />
//         <label className='text-primary font-bold'>Password</label>
//         <input
//           className='border-primary'
//           id="password"
//           type="password"
//           name="password"
//         />
//         <CustomButton text="Login" toastMessage={`we're working on it, you'll be redirected soon...`} />
//       </form>
//   )
// }
