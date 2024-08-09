'use client'

import toast from 'react-hot-toast'
import { CustomButton } from '../buttons/CustomButton'
import { authenticate } from '@/lib/actions'
import { useState } from 'react';


export default function LoginForm() {
  const [error, setError] = useState(false);

  const handleLogin = async (formData: FormData) => {
    const res = await authenticate(undefined, formData);
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
      toast.success('Profile updated!')
      setError(false)
    }
  }


  return (
      <form  action={handleLogin} className="flex flex-col mt-3 gap-3 px-2 py-3">
        <label className='text-primary font-bold'>Email</label>
        <input
          className={error ? 'border-red-500 text-white' : 'border-primary'}
          type="email"
          name="email"
          
        />
        <label className='text-primary font-bold'>Password</label>
        <input
          className={error ? 'border-red-500 text-white' : 'border-primary'}
          type="password"
          name="password"
          
        />
        <CustomButton text="Login" toastMessage={`we're working on it, you'll be redirected soon...`} />
      </form>

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
