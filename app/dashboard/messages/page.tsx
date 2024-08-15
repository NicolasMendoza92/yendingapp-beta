export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import Loader from '@/components/Loader'
import Breadcrumbs from '@/components/breadcrumbs'
import Table from '@/components/tables/TablePreviaMessages'

 function PreviaMessagesContent() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Previas chat', href: '/dashboard/messages' },
        ]}
      />
      <div className="px-6 py-2 lg:py-6 min-h-screen">
        <Table />
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <PreviaMessagesContent />
    </Suspense>
  )
}
