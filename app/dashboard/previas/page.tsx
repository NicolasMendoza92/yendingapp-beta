import CreateNew from '@/components/cards/CreateNew'
import MyPreviasReq from '@/components/cards/MyPreviasReq'
import PreviasJoinRequests from '@/components/cards/PreviasJoinRequests'
import SeeMyPrevias from '@/components/cards/SeeMyPrevias'
import Loader from '@/components/Loader'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
    <div className="px-12 py-16 md:py-6 min-h-screen">
      <div className="flex flex-wrap justify-center items-center gap-3">
        <CreateNew />
        <SeeMyPrevias />
        <MyPreviasReq />
        <PreviasJoinRequests />
      </div>
    </div>
    </Suspense>
  )
}
