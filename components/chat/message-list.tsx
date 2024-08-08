import { useEffect, useRef } from 'react';
import { formatTime } from '@/lib/utils';
import { Message } from 'ably';
import Image from 'next/image';
import { FaArrowDown } from 'react-icons/fa';

type MessageListProps = {
  messages?: Message[];
  userDataId: string;
  initialMessages: any;
};

const MessageList = ({ messages, userDataId, initialMessages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!messages || messages.length === 0 && !initialMessages?.length) {
    return (
      <div className="flex h-full flex-col items-center justify-center bg-primary_b p-4 text-primary">
        <p className="text-lg">No messages yet</p>
        <FaArrowDown className="mt-2 text-2xl" />
      </div>
    );
  }

  const createLi = (message: Message, index: number) => {
    return (
      <li
        key={`${message.id}_${message.timestamp}_${index}`}
        className={`b my-2 flex items-start gap-3 p-3 ${
          userDataId === message?.data?.userData.user_id ? 'justify-start' : 'justify-end'
        }`}
      >
        <Image
          className="h-8 w-8 rounded-full"
          src={message?.data?.userData?.url_img || '/images/placeholder.jpg'}
          alt="user image"
          width={32}
          height={32}
        />
        <div className="max-w-lg flex-1">
          <div className="flex items-center justify-between space-x-2 max-w-96">
            <span className="text-sm font-semibold text-primary">{message.data.userData?.name || 'User'}</span>
            <span className="text-sm text-primary">{formatTime(message.timestamp)}</span>
          </div>
          <div
            className={`flex max-w-96 gap-3 rounded-lg ${
              userDataId === message?.data?.userData.user_id ? 'bg-primary' : 'bg-secondary'
            } p-3`}
          >
            <p
              className={`text-sm ${
                userDataId === message.data?.userData.user_id ? 'text-secondary' : 'text-primary'
              }`}
            >
              {message.data.text}
            </p>
          </div>
        </div>
      </li>
    );
  };

  const totalMessages = messages ? [...initialMessages, ...messages] : initialMessages;

  return (
    <div className="h-full flex-1 overflow-y-auto bg-primary_b">
      <ul className="p-4">
        {totalMessages?.map(createLi)}
        {/* Add a div to serve as a reference point for scrolling */}
        <div ref={messagesEndRef} />
      </ul>
    </div>
  );
};

export default MessageList;
