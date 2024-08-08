import MessageInput from './message-input';
import MessageList from './message-list';

import { useReducer } from 'react';
import { useChannel } from 'ably/react';
import { UserFormState } from '@/types/onboarding';
import ChatSideBar from './ChatSideBar';

export const ADD = 'ADD';

const reducer = (prev: any, event: any) => {
  switch (event.name) {
    // 👉 Append the message to messages
    case ADD:
      return [...prev, event];
  }
};
type ChatProps = {
  channelName: string;
  user: UserFormState;
  users: UserFormState[];
  initialMessages: any;
};
const Chat = ({ channelName, user, users, initialMessages }: ChatProps) => {
  // 👉 Placeholder user to be replaced with the authenticated user later

  const [messages, dispatch] = useReducer(reducer, []);
  // 👉 useChannel accepts the channel name and a function to invoke when
  //    new messages are received. We pass dispatch.
  const { publish } = useChannel(channelName, dispatch);

  const publishMessage = (text: string) => {
    // 👉 Publish event through Ably
    publish({
      name: ADD,
      data: {
        text,
        userData: user,
      },
    });
  };
 
  return (
    <div className="flex h-screen overflow-hidden">
      <ChatSideBar users={users} userDataId={user.user_id} />
      <div className="flex w-full flex-col">
        <div className="flex-1 overflow-y-auto">
          <MessageList messages={messages} userDataId={user.user_id} initialMessages={initialMessages}/>
        </div>
        <MessageInput publish={publishMessage} user={user} channel={channelName}/>
      </div>
    </div>
  );
};
export default Chat;
