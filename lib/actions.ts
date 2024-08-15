'use server'

import { auth, signIn, update } from '@/auth'
import { getUserValues } from '@/lib/utils'
import {
  deletedPrevia,
  getStatusRequests,
  postPrevia,
  postRequestJoin,
  putJoinRequest,
  putPrevia,
<<<<<<< HEAD
} from '@/services/previas';
import { getUserByEmail, signUp, updatedUser, updatePassword } from '@/services/users';
import type { UpdateJoinRequest } from '@/types/data';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
=======
} from '@/services/previas'
import { signUp, updatedUser } from '@/services/users'
import type { UpdateJoinRequest } from '@/types/data'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
>>>>>>> 1f12eed82a798ef1c3d7d5151521c8476cc74c89
import {
  CreateLoginSchema,
  CreatePreviaFromSchema,
  CreateRequestJoinSchema,
  NewPasswordSchema,
  RegisterSchema,
  ResetSchema,
  UpdatePreviaFromSchema,
<<<<<<< HEAD
} from './schemas';
import { FormState, ValidatedErrors } from '@/types/onboarding';
import { postMessage } from '@/services/messages';
import { z } from 'zod';
import { generatePasswordResetToken, generateVerificationToken, generateTwoFactorToken } from './tokens';
import { getVerificationTokenByToken } from './verification-token';
import { prisma } from '@/auth.config';
import { sendPasswordResetEmail, sendVerificationEmail, sendTwoFactorTokenEmail } from './mail';
import { getPasswordResetTokenByToken } from './password-reset-token';
import { getTwoFactorTokenByEmail } from './two-factor-token';
import { getTwoFactorConfirmationByUserId } from './two-factor-confirmation';


export async function authenticate(_prevState: string | undefined, formData: FormData) {

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const twoFacCode = formData.get('code') as string;

  if (!email || !password) {
    return { error: 'Email and password are required!' };
  }

  const dataToValidate: { email: string; password: string; twoFacCode?: string } = {
    email: email,
    password: password,
  };

  if (twoFacCode) {
    dataToValidate.twoFacCode = twoFacCode;
  }
  // Ahora valido los datos
  const parsedData = CreateLoginSchema.parse(dataToValidate);

  const existingUser = await getUserByEmail(parsedData.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Email does not exist!' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    console.log('verifiTok: ', verificationToken);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )

    return { success: 'Confirmation email sent, please validate' };
  }

  // Logica si el usuario tiene habilitado el 2FCode
  if (existingUser.isTwoFactorEnabled && existingUser.email) {

    if (parsedData.twoFacCode) {

      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Invalid code" }
      }
      if (twoFactorToken.token !== parsedData.twoFacCode) {
        return { error: "Invalid code" }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expired" }
      }

      // Manejo la db eliminando lo que ya no necesito
      await prisma.twoFactorToken.delete({
        where: { id: twoFactorToken.id }
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if (existingConfirmation) {
        await prisma.twoFactorConfirmation.delete(
          { where: { id: existingConfirmation.id } }
        )
      }

      await prisma.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        }
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      console.log('2FATok: ', twoFactorToken);

      await sendTwoFactorTokenEmail(
        twoFactorToken.email,
        twoFactorToken.token
      )
      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', {
      email: parsedData.email,
      password: parsedData.password,
      redirect: false
    });
=======
} from './schemas'
import { FormState, ValidatedErrors } from '@/types/onboarding'
import { postMessage } from '@/services/messages'

export async function authenticate(_prevState: string | undefined, formData: FormData) {
  try {
    const { email, password } = CreateLoginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    await signIn('credentials', { email, password, redirect: false })
>>>>>>> 1f12eed82a798ef1c3d7d5151521c8476cc74c89
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
<<<<<<< HEAD
          return { error: [{ message: 'Invalid credentials.' }] };
        case 'CallbackRouteError':
          return { error: [{ message: 'Invalid credentials.' }] };
        default:
          return { error: [{ message: 'Something went wrong.' }] };
=======
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
>>>>>>> 1f12eed82a798ef1c3d7d5151521c8476cc74c89
      }
    }
    throw error
  }
}

// Logica para register
export async function signup(_prevState: { error: string } | undefined, formData: FormData) {
  try {
<<<<<<< HEAD
  const { email, password } = RegisterSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

    const res = await signUp({ email, password });
    if (!res.ok) {
      return { error: res.error };
    }
    return { success: 'Account created successfully!' };
=======
    const { email, password } = CreateLoginSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    const res = await signUp({ email, password })

    if (!res.ok) {
      return { error: 'Error signing up' }
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/onboarding',
    })
>>>>>>> 1f12eed82a798ef1c3d7d5151521c8476cc74c89
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map((err) => ({ message: err.message })) };
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
<<<<<<< HEAD
          return { error: [{ message: 'Invalid credentials.' }] };
        case 'CallbackRouteError':
          return { error: [{ message: 'Invalid credentials.' }] };
        default:
          return { error: [{ message: 'Something went wrong.' }] };
      }
    }
=======
          return { error: 'Invalid credentials.' }
        default:
          return { error: 'Something went wrong.' }
      }
    }
    console.error(error)
>>>>>>> 1f12eed82a798ef1c3d7d5151521c8476cc74c89
    throw error
  }
}

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token does not exist!" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" }
  }

  // Una vez que el usuario verifica, hago el update en la db
  try {
    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email
      }
    })

    //   si va todo bien, elimina el token de la db.
    await prisma.verificationToken.delete({
      where: { id: existingToken.id }
    })

    return { success: "Email verified successfully" }
  } catch (error) {
    console.log(error)
  }
}

export async function passwordResetEmail(_prevState: string | undefined, formData: FormData) {
  const { email } = ResetSchema.parse({
    email: formData.get('email'),
  });
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email not found!" }
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  )
}


export async function newPassword(formData: FormData, token: string | null) {

  if (!token) {
    return { error: "Missing Token" }
  }

  const { password } = NewPasswordSchema.parse({
    password: formData.get('password'),
  });

  // Buscamos el token en nuestra db
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" }
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exists!" }
  }

  try {
    // Llamo a la funcion para actualizar la contraseña.
    await updatePassword(existingUser.id, password, existingToken.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.message };
    }
  }

}

export async function updateUser(formData: FormData) {

  try {
    const session = await auth()
    const user = session?.user
    const newFormData = getUserValues(formData)
    if ((newFormData as ValidatedErrors).errors) {
      return {
        error: (newFormData as ValidatedErrors).message,
        errors: (newFormData as ValidatedErrors).errors,
      }
    }
<<<<<<< HEAD
    const res = await updatedUser(newFormData as FormState);
    console.log(res)
    if (!res.ok) {
      return { error: 'Error updating user' };
=======
    const res = await updatedUser(newFormData as FormState)
    if (!res) {
      return { error: 'Error updating user' }
>>>>>>> 1f12eed82a798ef1c3d7d5151521c8476cc74c89
    }

    const updatedData = { ...user.userData , ...res.updatedUser }
    await update({ ...user, userData: updatedData })
  } catch (error) {
    console.error('Error updating user:', error)
    return { error: 'Error updating user' }
  }
  revalidatePath('/dashboard/profile')
  redirect('/dashboard')
}

export async function createPrevia(_prevState: void | undefined, formData: FormData) {
  const {
    location,
    date,
    startTime,
    participants,
    description,
    place_details,
    show_location,
    images_previa_url,
    lng,
    lat,
  } = CreatePreviaFromSchema.parse({
    location: formData.get('location'),
    date: formData.get('date'),
    startTime: formData.get('startTime'),
    participants: formData.get('participants'),
    description: formData.get('description'),
    place_details: formData.get('place_details'),
    show_location: formData.get('show_location'),
    images_previa_url: formData.get('images_previa_url'),
    lng: formData.get('longitude'),
    lat: formData.get('latitude'),
  })

  const newFormData = {
    location,
    date,
    startTime,
    participants,
    description,
    place_details,
    show_location,
    lat,
    lng,
    images_previa_url: Array.isArray(images_previa_url) ? images_previa_url : [images_previa_url],
  }

  try {
    const res = await postPrevia(newFormData)
    if (!res) {
      return { error: 'Error creating previa' }
    }
  } catch (error) {
    console.error('Error creating previa:', error)
    return { error: 'Error creating previa' }
  }

  revalidatePath('/dashboard/previas')
  redirect('/dashboard/previas')
}

export async function requestJoin(
  previaId: string,
  _prevState: { message: string } | undefined,
  formData: FormData,
) {
  const values = CreateRequestJoinSchema.parse({
    intentions: formData.get('intentions'),
    url_img: formData.get('url_img'),
    attendants: formData.get('attendants'),
  })
  try {
    const res = await postRequestJoin({
      ...values,
      previa_id: previaId,
    })
    if (!res) {
      return { error: 'Error requesting join' }
    }
  } catch (error) {
    console.error('Error requesting join:', error)
    return { error: 'Error requesting join' }
  }
  revalidatePath('/dashboard/previas/my-requests')
}

type StatusRequests = {
  acceptedRequests: any[]
  rejectedRequests: any[]
}

export async function statusRequests(): Promise<StatusRequests> {
  try {
    const response = await getStatusRequests()
    return response
  } catch (error) {
    console.error('Error fetching user data:', error)
    return { acceptedRequests: [], rejectedRequests: [] }
  }
}

export async function updateJoinRequestStatus({ previaId, userId, status }: UpdateJoinRequest) {
  await putJoinRequest({ previaId, userId, status })
  revalidatePath('/dashboard/previas/manage-requests')
}

export async function updatePrevia(
  previaId: string,
  _prevState: { error: string } | undefined,
  formData: FormData,
) {
  const { location, date, startTime, participants, description, place_details, show_location } =
    UpdatePreviaFromSchema.parse({
      location: formData.get('location'),
      date: formData.get('date'),
      startTime: formData.get('startTime'),
      participants: formData.get('participants'),
      description: formData.get('description'),
      place_details: formData.get('place_details'),
      show_location: formData.get('show_location'),
    })
  try {
    const res = await putPrevia({
      location,
      date,
      startTime,
      participants,
      description,
      place_details,
      show_location,
      previaId,
    })
    if (!res) {
      return { error: 'Error updating previa' }
    }
  } catch (error) {
    console.error('Error updating previa:', error)
    return { error: 'Error updating previa' }
  }
  revalidatePath('/dashboard/previas/my-previas')
}

export async function deletePrevia(previa_id?: string) {
  try {
    const res = await deletedPrevia(previa_id)
    if (!res) {
      return { error: 'Error deleting previa' }
    }
  } catch (error) {
    console.error('Error deleting previa:', error)
    return { error: 'Error deleting previa' }
  }
  revalidatePath('/dashboard/previas/my-previas')
}

export async function sendMessage(
  user_id: string,
  channel: string,
  url_img: string,
  name: string,
  formData: FormData,
) {
  const message = formData.get('message') as string
  try {
    const res = await postMessage(message, user_id, channel, url_img, name)
    if (!res) {
      return 'Error saving message'
    }
    return res
  } catch (error) {
    console.error('Error saving message:', error)
    return 'Error saving message'
  }
}
