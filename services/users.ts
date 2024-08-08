import { FormState } from '@/types/onboarding'
import customFetch from './customFetch'

type SignUp = {
  email: string
  password: string
}

export const signUp = async ({ email, password }: SignUp) => {
  try {
    const response = await customFetch({
      path: `/api/auth/signup`,
      method: 'POST',
      withCredentials: false,
      body: { email, password }
    })
    return response
  } catch (error) {
    console.error(error)
    throw new Error('Error en el registro.')
  }
}

export const getUser = async () => {
  try {
    const response = await customFetch({
      path: `/api/user`,
      method: 'GET',
      withCredentials: true
    })
    const data = await response.json()
    return data?.user_data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener el usuario.')
  }
}

export const updatedUser = async (formData: FormState) => {
  try {
    const response = await customFetch({
      path: `/api/user`,
      method: 'PUT',
      withCredentials: true,
      body: { updatedFormData: formData }
    })
    if (response.status === 200) {
    } else {
      console.error('Failed to update user:', response.status)
    }
    return response
  } catch (err) {
    console.log(err)
    throw new Error('Error updating user')
  }
}

export const getUsers = async (previaId: string) => {
  try {
    const response = await customFetch({
      path: `/api/users?previaId=${previaId}`,
      method: 'GET',
      withCredentials: false,
    })
    const data = await response.json()
    return data?.users_data
  } catch (error) {
    console.error(error)
    throw new Error('Error al obtener el usuario.')
  }
}