'use client';

import { UserFormState } from '@/types/onboarding';
import ChatContent from './ChatContent';
import { Realtime } from 'ably';
import { AblyProvider, ChannelProvider } from 'ably/react';


type Props = {
  params: { channel: string };
  apiKey?: string;
  userData: UserFormState;
  users: UserFormState[];
  initialMessages: any;
};

export default function Chat({ params, apiKey, userData, users, initialMessages }: Props) {
  // 👉 Instantiate Ably client
  const client = new Realtime({
    key: apiKey,
    clientId: userData.user_id,
  });
  const channelName = `chat:${params.channel || 'general'}`;
  return (
    // 👉 Wrap chat app in AblyProvider and ChannelProvider necessary to
    // use Ably hooks
    <AblyProvider client={client}>
      <ChannelProvider channelName={channelName}>
        <ChatContent channelName={channelName} user={userData} users={users} initialMessages={initialMessages}/>
      </ChannelProvider>
    </AblyProvider>
  );
}
