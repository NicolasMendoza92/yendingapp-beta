export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import { MapContent } from '@/components/map/MapContent';
import { getPrevias } from '@/services/previas';

async function MapContentWrapper() {
  const previas = await getPrevias();
  return <MapContent previas={previas} />;
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <MapContentWrapper />
    </Suspense>
  );
}
