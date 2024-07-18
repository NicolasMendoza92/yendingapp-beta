'use client'
import React from 'react'
import toast from 'react-hot-toast'
import { baseUrl } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

type PreviaManageRequestsButtonsProps = {
  previaId: string
  userId: string
}

type UpdateJoinRequestStatusProps = {
  previaId: string
  userId: string
  status: 'accepted' | 'rejected'
}
const PreviaManageRequestsButtons = ({
  previaId,
  userId
}: PreviaManageRequestsButtonsProps) => {
  const updateJoinRequestStatus = async ({
    previaId,
    userId,
    status
  }: UpdateJoinRequestStatusProps) => {
    console.log(previaId, userId)
    let toastId
    try {
      toastId = toast.loading("We're attending your requests...")
      const responsePrevia = await fetch(
        `${baseUrl}/api/previa/updateJoinReq`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ previaId, userId, status })
        }
      )
      if (!responsePrevia.ok) {
        throw new Error(
          'Error al actualizar el estado de la solicitud de unión'
        )
      }

      // Update status in PreviaUser model
      const responsePreviaUser = await fetch(`${baseUrl}/api/previaUsers`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ previaId, userId, status })
      })
      if (!responsePreviaUser.ok) {
        throw new Error(
          'Error al actualizar el estado de la solicitud de unión en PreviaUser'
        )
      }
      toast.dismiss(toastId)
      // Fetch updated data
      revalidatePath('/dashboard/previas/manage-requests')
      toast.success('Status change')
    } catch (error) {
      console.error('Error updating join request status:', error)
      toast.dismiss(toastId)
    }
  }
  return (
    <div className="flex flex-wrap">
      <button
        className="btn btn-secondary"
        onClick={() =>
          updateJoinRequestStatus({ previaId, userId, status: 'accepted' })
        }
      >
        Accept
      </button>
      <button
        className="btn btn-secondary"
        onClick={() =>
          updateJoinRequestStatus({ previaId, userId, status: 'rejected' })
        }
      >
        Reject
      </button>
    </div>
  )
}

export default PreviaManageRequestsButtons