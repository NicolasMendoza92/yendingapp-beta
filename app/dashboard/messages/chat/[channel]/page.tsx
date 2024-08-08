export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import Loader from '@/components/Loader';
import Breadcrumbs from '@/components/breadcrumbs';
import Chat from '@/components/chat/Chat';
import { ablyApiKey } from '@/lib/constants';
import { auth } from '@/auth';
import { getUsers } from '@/services/users';
import { getMessages } from '@/services/messages';

async function PreviaMessagesContent({ params }: { params: { channel: string } }) {
  const session = await auth();
  const users = await getUsers(params.channel);
  const initialMessages = await getMessages(params.channel);
  const userData = session?.user.userData;

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas chat', href: '/dashboard/messages' },
          {
            label: 'chat',
            href: '/dashboard/messages/chat',
            active: true,
          },
        ]}
      />
      <div className="min-h-screen px-6 py-6 lg:py-16">
        <Chat params={params} apiKey={ablyApiKey} userData={userData} users={users} initialMessages={initialMessages}/>
      </div>
    </div>
  );
}

export default function Page({ params }: { params: { channel: string } }) {
  return (
    <Suspense fallback={<Loader />}>
      <PreviaMessagesContent params={params} />
    </Suspense>
  );
}
