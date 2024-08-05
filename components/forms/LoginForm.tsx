'use client'
import { CustomButton } from '@/components/buttons/CustomButton'
import { authenticate } from '@/lib/actions'
import { useTransitionRouter as useRouter } from 'next-view-transitions'
import toast from 'react-hot-toast'

export default function LoginForm() {
  const router = useRouter()

  const handleLogin = async(formData: FormData) => {
    const res = await authenticate(undefined, formData)
    toast.dismiss()
    if (res) {
      toast.error(res)
    }
    router.push('/dashboard')
  }
  return (
    <form action={handleLogin} className="flex flex-col mt-3 gap-3">
      <label className='text-primary font-bold'>Email</label>
      <input
        className='border-primary'
        id="email"
        type="email"
        name="email"
      />
      <label className='text-primary font-bold'>Password</label>
      <input
        className='border-primary'
        id="password"
        type="password"
        name="password"
      />
      <CustomButton  text="Login" toastMessage={`we're working on it, you'll be redirected soon...`}/>
    </form>
  )
}
