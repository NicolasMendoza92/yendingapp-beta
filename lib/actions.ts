'use server';

import { auth, signIn, update } from '@/auth';
import { getUserValues } from '@/lib/utils';
import {
  deletedPrevia,
  getStatusRequests,
  postPrevia,
  postRequestJoin,
  putJoinRequest,
  putPrevia,
} from '@/services/previas';
import { getUserByEmail, signUp, updatedUser } from '@/services/users';
import type { UpdateJoinRequest } from '@/types/data';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  CreateLoginSchema,
  CreatePreviaFromSchema,
  CreateRequestJoinSchema,
  RegisterSchema,
  UpdatePreviaFromSchema,
} from './schemas';
import { FormState, ValidatedErrors } from '@/types/onboarding';
import { postMessage } from '@/services/messages';
import { z } from 'zod';
import { generateVerificationToken } from './tokens';


export async function authenticate(_prevState: string | undefined, formData: FormData) {

  const { email, password } = CreateLoginSchema.parse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  // primero vemos si esta validado el token, lo valido antes de llamar a autehnticate pero lo hago de nuevo 
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  // if (!existingUser.emailVerified) {
  //   const verificationToken = await generateVerificationToken(existingUser.email)
  //   console.log('verifiTok: ', verificationToken)
  //   return {success : "Confirmation email sent"}
  // }

  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        case "CallbackRouteError":
          return { error: "Invalid credentials." };
        default:
          return { error: "Invalid credentials." };
      }
    }
    throw error;
  }
}

export async function signup(_prevState: { error: string } | undefined, formData: FormData) {
  try {
    const { email, password } = RegisterSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    const res = await signUp({ email, password });

    if (!res.ok) {
      return { error: 'Error signing up' };
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/onboarding',
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials.' };
        default:
          return { error: 'Something went wrong.' };
      }
    }
    console.error(error);
    throw error;
  }
}

export async function updateUser(
  _prevState: { error: string; errors?: Record<string, any> } | undefined,
  formData: FormData,
) {
  try {
    const session = await auth();
    const user = session?.user;
    const newFormData = getUserValues(formData);
    if ((newFormData as ValidatedErrors).errors) {
      return {
        error: (newFormData as ValidatedErrors).message,
        errors: (newFormData as ValidatedErrors).errors,
      };
    }
    const res = await updatedUser(newFormData as FormState);
    await update({ ...user, userData: newFormData });
    if (!res.ok) {
      return { error: 'Error updating user' };
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return { error: 'Error updating user' };
  }
  revalidatePath('/dashboard/profile');
  redirect('/dashboard');
}

export async function createPrevia(_prevState: void | undefined, formData: FormData) {
  console.log(formData);
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
  });

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
  };

  try {
    const res = await postPrevia(newFormData);
    if (!res) {
      return { error: 'Error creating previa' };
    }
  } catch (error) {
    console.error('Error creating previa:', error);
    return { error: 'Error creating previa' };
  }

  revalidatePath('/dashboard/previas');
  redirect('/dashboard/previas');
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
  });
  try {
    const res = await postRequestJoin({
      ...values,
      previa_id: previaId,
    });
    if (!res) {
      return { error: 'Error requesting join' };
    }
  } catch (error) {
    console.error('Error requesting join:', error);
    return { error: 'Error requesting join' };
  }
  revalidatePath('/dashboard/previas/my-requests');
}

type StatusRequests = {
  acceptedRequests: any[];
  rejectedRequests: any[];
};

export async function statusRequests(): Promise<StatusRequests> {
  try {
    const response = await getStatusRequests();
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { acceptedRequests: [], rejectedRequests: [] };
  }
}

export async function updateJoinRequestStatus({ previaId, userId, status }: UpdateJoinRequest) {
  await putJoinRequest({ previaId, userId, status });
  revalidatePath('/dashboard/previas/manage-requests');
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
    });
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
    });
    if (!res) {
      return { error: 'Error updating previa' };
    }
  } catch (error) {
    console.error('Error updating previa:', error);
    return { error: 'Error updating previa' };
  }
  revalidatePath('/dashboard/previas/my-previas');
}

export async function deletePrevia(previa_id?: string) {
  try {
    const res = await deletedPrevia(previa_id);
    if (!res) {
      return { error: 'Error deleting previa' };
    }
  } catch (error) {
    console.error('Error deleting previa:', error);
    return { error: 'Error deleting previa' };
  }
  revalidatePath('/dashboard/previas/my-previas');
}

export async function sendMessage(
  user_id: string,
  channel: string,
  url_img: string,
  name: string,
  formData: FormData,
) {
  const message = formData.get('message') as string;
  try {
    const res = await postMessage(message, user_id, channel, url_img, name);
    if (!res) {
      return 'Error saving message';
    }
    return res;
  } catch (error) {
    console.error('Error saving message:', error);
    return 'Error saving message';
  }
}
