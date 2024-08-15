import NewPreviaForm from '@/components/forms/NewPreviaForm';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import Breadcrumbs from '@/components/breadcrumbs';

export default function page({
  searchParams,
}: {
  searchParams: { map: string; lat: string; lng: string };
}) {
  return (
    <Suspense fallback={<Loader />}>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas', href: '/dashboard/previas' },
          {
            label: 'New Previa',
            href: '/dashboard/previas/new',
            active: true,
          },
        ]}
      />
      <div className="min-h-screen px-12 py-6 lg:py-16">
        <NewPreviaForm searchParams={searchParams} />
      </div>
    </Suspense>
  );
}
