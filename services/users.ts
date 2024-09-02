import { FormState } from '@/types/onboarding'
import customFetch from './customFetch'
import { prisma } from '@/auth.config'
import bcrypt from 'bcryptjs';

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
    const responseData = await response.json();

    if (!response.ok) {
       return { error: responseData.message };
    }

    return responseData;
  } catch (error) {
    console.error(error);
    return { error: [{ message: 'Error en el registro.' }] };
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
    const data = await response.json()
    return data
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


export const getUserByEmail = async (email:string) => {
try {
  const response = await customFetch({
    path: `/api/user/getUserByEmail?email=${email}`,
    method: 'GET',
    withCredentials: false,
  })
  const data = await response.json()
  return data?.user
} catch (error) {
  
}
}

export const getUserById = async (id: string) => {
  try {
    const response = await customFetch({
      path: `/api/user/getUserById?id=${id}`,
      method: 'GET',
      withCredentials: false,
    })
    const data = await response.json()
    return data?.user
  } catch (error) {
    
  }
}

export const updatePassword = async (existingUserId: string, newPassword: string, existingTokenId: string) => {

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  try {
    await prisma.user.update({
      where: { id: existingUserId },
      data: { password: hashedPassword }
    })

    await prisma.passwordResetToken.delete(
      {
        where: { id: existingTokenId }
      }
    )

    return {success: "Password updated"}
  } catch (error) {
    return {error: "failed to change password"}
  }
}
