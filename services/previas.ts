import { Previas, UpdateJoinRequest } from '@/types/data';
import customFetch from './customFetch';

export const getPrevias = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas`,
      method: 'GET',
      withCredentials: true,
    });
    const data = await response.json();
    return data.previas;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const getMyPrevias = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas/myPrevias`,
      method: 'GET',
      withCredentials: true,
    });
    const data = await response.json();
    return { previas_data: data.previa_data, user_id: data.user_id };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { previas_data: [], user_id: '' };
  }
};

export const getCreatedPrevias = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas/created`,
      method: 'GET',
      withCredentials: true,
    });
    const data = await response.json();
    return data.previas;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

export const getPreviasChat = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas/previasChat`,
      method: 'GET',
      withCredentials: true,
    });
    const data = await response.json();
    return data.previa_data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { previas_data: [], user_id: '' };
  }
};

export const postPrevia = async (newFormData: Previas) => {
  try {
    const response = await customFetch({
      path: `/api/previa`,
      method: 'POST',
      withCredentials: true,
      body: { newFormData },
    });
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 'Error creating previa';
  }
};

type UpdatePreviaProps = Previas & { previaId: string };

export const putPrevia = async (updatedData: UpdatePreviaProps) => {
  try {
    const response = await customFetch({
      path: `/api/previa`,
      method: 'PUT',
      withCredentials: true,
      body: { formData: updatedData },
    });
    return response.json();
  } catch (error) {
    console.error('Error updating previa:', error);
    return 'Error updating previa';
  }
};
export const deletedPrevia = async (previa_id?: string) => {
  try {
    const response = await customFetch({
      path: `/api/previa`,
      method: 'DELETE',
      withCredentials: true,
      body: { previa_id },
    });
    return response.json();
  } catch (error) {
    console.error('Error deleting previa:', error);
    return 'Error deleting previa';
  }
};

export const getStatusRequests = async () => {
  try {
    const response = await customFetch({
      path: `/api/previas/statusRequests`,
      method: 'GET',
      withCredentials: true,
    });
    const data = await response.json();
    return {
      acceptedRequests: data?.acceptedRequests,
      rejectedRequests: data.rejectedRequests,
    };
  } catch (error) {
    console.error('Error fetching status requests:', error);
    return { acceptedRequests: [], rejectedRequests: [] };
  }
};
type RequestJoin = {
  previa_id: string;
  intentions: string;
  url_img?: string | string[];
  attendants: string;
};

export const postRequestJoin = async (body: RequestJoin) => {
  try {
    const response = await customFetch({
      path: `/api/previaUsers`,
      method: 'POST',
      withCredentials: true,
      body: body,
    });
    if (response.status === 400) {
      throw new Error('User already sent a request');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 'Error joining previa';
  }
};

export const putJoinRequest = async ({ previaId, userId, status }: UpdateJoinRequest) => {
  try {
    const response = await customFetch({
      path: `/api/previa/updateJoinReq`,
      method: 'PUT',
      withCredentials: true,
      body: { previaId, userId, status },
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 'Error updating join request';
  }
};
