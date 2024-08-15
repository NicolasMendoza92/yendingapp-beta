import { UserFormState } from '@/types/onboarding';
import ChatInput from '../customComponents/ChatInput';
import { sendMessage } from '@/lib/actions';
import { useState } from 'react';

type MessageInputProps = {
  publish: (text: string) => void;
  user: UserFormState;
  channel: string;
  disabled?: boolean;
};

const MessageInput = ({ publish, user, disabled, channel }: MessageInputProps) => {
  const [onReset, setOnReset] = useState(false);

  const handleSubmit = async (formData: FormData) => {

    const message = formData.get('message') as string;
    const postedMessage = await sendMessage(
      user.user_id,
      channel,
      user.url_img || '',
      user.name,
      formData,
    );
    if (postedMessage !== 'Error saving message') {
      publish(message);
      setOnReset(!onReset);
    }
  };

  return (
    <footer className="border-t border-gray-300 bg-white p-4">
      <form action={handleSubmit}>
        <div className="flex items-center">
          <ChatInput
            type="text"
            name="message"
            label=""
            initialValue=""
            disabled={disabled}
            placeholder={disabled ? 'This input has been disabled.' : 'Your message here'}
            customClass="w-full rounded-md border border-gray-400 p-2 focus:border-blue-500 focus:outline-none"
            onReset={onReset}
          />
          <button className="ml-2 rounded-md bg-secondary_b px-4 py-2 text-white">Send</button>
        </div>
      </form>
    </footer>
  );
};

export default MessageInput;
