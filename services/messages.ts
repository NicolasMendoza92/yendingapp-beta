import customFetch from './customFetch';

export const postMessage = async (
  message: string,
  user_id: string,
  channel: string,
  url_img: string,
  name: string,
) => {
  try {
    const response = await customFetch({
      path: `/api/messages`,
      method: 'POST',
      withCredentials: true,
      body: { text: message, user_id, channel, url_img, name },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return 'Error saving message';
  }
};

export const getMessages = async (channel: string) => {
  try {
    const response = await customFetch({
      path: `/api/messages?channel=chat:${channel}`,
      method: 'GET',
      withCredentials: true,
    });
    const data = await response.json();
    return data.messages || [];
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};
