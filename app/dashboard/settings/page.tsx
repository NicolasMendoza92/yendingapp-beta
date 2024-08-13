import React, { Suspense } from 'react';
import Loader from '@/components/Loader';

export default function SettingPage() {

  return (
    <Suspense fallback={<Loader />}>
    <div>
      <h1>Settings</h1>
    </div>
    </Suspense>
  );
}