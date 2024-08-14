import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import UserCard from '@/components/cards/UserCard';
import { auth } from '@/auth';



async function SettingContainer() {
  const session = await auth()
  const user = session?.user.userData
  return (
    <div className="px-12 py-6 lg:py-16 min-h-screen overflow-x-hidden">
      <h1 className="text-secondary text-2xl font-bold mb-4">Settings</h1>
      <UserCard user={user} />
    </div>
  )
}

export default function SettingPage() {

  return (
    <Suspense fallback={<Loader />}>
      <SettingContainer />
    </Suspense>
  );
}