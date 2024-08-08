import React from 'react';
import Image from 'next/image';
import StatusBadge from '../StatusPreviaMessageBadge';
import { Previas } from '@/types/data';
import { getPreviasChat } from '@/services/previas';
import { auth } from '@/auth';
import { FaComments } from 'react-icons/fa';
import { Link } from 'next-view-transitions';

async function Table() {
  const previasData: Previas[] = await getPreviasChat();
  const session = await auth();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="m-2 rounded-lg p-2 md:pt-0">
          {!previasData?.length && (
            <div className="mt-2 w-fit rounded-md bg-primary_b px-3 py-1 text-lg text-white">
              You have no previas chats
            </div>
          )}
          {/* Mobile View */}
          <div className="md:hidden">
            {previasData?.map((previa, index) => (
              <div
                key={`${previa.id}_${index}`}
                className="mb-2 w-full rounded-md bg-primary_b p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="w-full">
                    <div className="mb-2 flex w-full items-center justify-between">
                      <Image
                        src={previa?.images_previa_url?.[0] || '/images/placeholder.jpg'}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${previa.creator?.name}'s profile picture`}
                      />
                      <Link href={`/dashboard/messages/chat/${previa.previa_id}`}>
                        <button>
                          <FaComments size="30" />
                        </button>
                      </Link>
                    </div>
                    <p className="text-sm text-secondary_b">
                      {new Date(previa?.date || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-md border p-4 text-secondary_b">
                  <p>Participants: {previa?.participants}</p>
                  <p>Location: {previa?.location}</p>
                  <div className="mt-2 flex justify-end gap-2">
                    <StatusBadge
                      isCreator={previa?.creator?.user_id === session?.user.userData.user_id}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop View */}
          <div className="hidden md:block">
            <div className="flex flex-col">
              <div className="m-2 gap-4 rounded-lg bg-primary_b p-2">
                <table className="min-w-full gap-4 text-gray-900 md:table">
                  <thead className="rounded-lg text-center text-sm font-normal text-white">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Previa Date
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Participants
                      </th>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Location
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        I am
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Chat
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-secondary text-center text-white">
                    {previasData?.map((previa, index) => (
                      <tr
                        key={`${previa.id}_${index}`}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap px-3 py-3">
                          {new Date(previa?.date || '').toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">{previa?.participants}</td>
                        <td className="whitespace-nowrap px-3 py-3">{previa?.location}</td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <StatusBadge
                            isCreator={previa?.creator?.user_id === session?.user.userData.user_id}
                          />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <Link href={`/dashboard/messages/chat/${previa.previa_id}`}>
                            {' '}
                            <button>
                              <FaComments size="30" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
