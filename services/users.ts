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
    if (!response.ok) {
      const errorData = await response.json();
      return { ok: false, error: errorData.message };
    }

    // return { ok: true };

    const responseData = await response.json();

    return { ok: true, message: responseData.message, awaitingConfirmation: true };
  } catch (error) {
    console.error(error);
    throw new Error('Error en el registro.');
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

// añado unos generales para conseguir users
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    return user
  } catch {
    return null
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
