import { NextResponse } from 'next/server'
import { prisma } from '@/auth.config'

interface Requests {
  user_id: string
  attendants: number
  intentions: string
  photos: string[]
  status: string
  previa_id: string
  location: string
  date: Date
}

export async function GET(req: Request) {
  const session = JSON.parse(req.headers.get('Authorization') || '{}')
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const previas = await prisma.previas.findMany({
      where: {
        creator: {
          equals: session?.user?.email || ''
        }
      }
    })

    const {
      acceptedRequests,
      rejectedRequests
    }: {
      acceptedRequests: Requests[]
      rejectedRequests: Requests[]
    } = previas.reduce(
      (acc, previa) => {
        previa.join_requests.forEach((joinReq) => {
          const request: Requests = {
            user_id: joinReq.user_id || '',
            attendants: joinReq.attendants,
            intentions: joinReq.intentions,
            photos: joinReq.photos,
            status: joinReq.status,
            previa_id: previa.previa_id,
            location: previa.location,
            date: previa.date
          }

          if (joinReq.status === 'accepted') {
            acc.acceptedRequests.push(request)
          } else if (joinReq.status === 'rejected') {
            acc.rejectedRequests.push(request)
          }
        })
        return acc
      },
      { acceptedRequests: [], rejectedRequests: [] } as {
        acceptedRequests: Requests[]
        rejectedRequests: Requests[]
      }
    )

    return NextResponse.json({
      acceptedRequests,
      rejectedRequests
    })
  } catch (error) {
    console.error('Error fetching status requests:', error)
    return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
  }
}
