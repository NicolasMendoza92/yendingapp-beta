export const dynamic = 'force-dynamic';
import GroupBtn from '@/components/buttons/GroupBtn';
import React, { Suspense } from 'react';
import Loader from '@/components/Loader';
import Breadcrumbs from '@/components/breadcrumbs';
import Table from '@/components/tables/TableMyPrevias';

export default function Page({
  searchParams,
}: {
  searchParams: { sortCriteria: string; modal: string; previa_id: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas', href: '/dashboard/previas' },
          {
            label: 'My Previas',
            href: '/dashboard/previas/my-previas',
            active: true,
          },
        ]}
      />
      <div>
        <GroupBtn />
      </div>
      <Suspense fallback={<Loader />}>
        <Table searchParams={searchParams} />
      </Suspense>
    </Suspense>
  );
}
