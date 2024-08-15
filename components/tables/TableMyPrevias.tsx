import React from 'react';
import Image from 'next/image';
import { Previas } from '@/types/data';
import { getCreatedPrevias } from '@/services/previas';
import { getFormatedDate, getSortedPrevias } from '@/lib/utils';
import { DeleteButton, EditButton, Modal } from '../customComponents/MyPreviasContent';

type MyPreviasTableProps = {
  searchParams: { sortCriteria: string; modal: string; previa_id: string };
};

async function Table({ searchParams }: MyPreviasTableProps) {
  const previas = await getCreatedPrevias();
  const sortedPrevias: Previas[] = await getSortedPrevias({
    previas,
    sortCriteria: searchParams.sortCriteria,
    needsToValidate: false,
  });
  const isModalOpen = searchParams.modal === 'true';
  const previaId = searchParams.previa_id;
  const selectedPrevia = sortedPrevias.find((previa) => previa.previa_id === previaId);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="m-2 rounded-lg p-2 lg:pt-0">
          {!sortedPrevias?.length && (
            <div className="mt-2 w-fit rounded-md bg-primary_b px-3 py-1 text-lg text-white">
              You have no previas Requests
            </div>
          )}
          {/* Mobile View */}
          <div className="lg:hidden">
            {sortedPrevias?.map((previa, index) => (
              <div
                key={`${previa.id}_${index}`}
                className="mb-2 w-full rounded-md bg-primary_b p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="w-full">
                    <div className="mb-2 flex w-full items-center justify-between">
                      <Image
                        src={previa?.images_previa_url?.[0] || '/images/placeholder.jpg'}
                        className="mr-2"
                        width={80}
                        height={80}
                        alt={`${previa.creator?.name}'s profile picture`}
                      />
                      <p className="text-secondary_b">{previa.location}</p>
                      <p className="text-secondary_b"> + {previa.participants}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-md border p-4 text-secondary_b">
                  {previa?.location} - {previa?.place_details}
                  <div className="flex text-sm text-secondary_b">
                    <p
                      className={`mt-3 ${
                        getFormatedDate(previa?.date) === 'Due'
                          ? 'text-red-500'
                          : 'text-secondary_b'
                      }`}
                    >
                      {getFormatedDate(previa?.date)}
                    </p>
                    <p className="mt-3 text-secondary_b">&nbsp;At: {previa?.startTime}</p>{' '}
                  </div>
                  <div className="mt-2 flex justify-end gap-2">
                    <EditButton date={previa?.date} previa_id={previa?.previa_id} />
                    <DeleteButton previa_id={previa?.previa_id} />{' '}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="flex flex-col">
              <div className="rounded-lg bg-primary_b">
                <table className="min-w-full gap-4 text-gray-900 lg:table">
                  <thead className="rounded-lg text-center text-sm font-normal text-white">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Photo
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Previa Date
                      </th>

                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Participants
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Address
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-secondary text-center text-white">
                    {sortedPrevias?.map((previa, index) => (
                      <tr
                        key={`${previa.id}_${index}`}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={previa.images_previa_url?.[0] || '/images/placeholder.jpg'}
                              className="rounded-full"
                              width={35}
                              height={50}
                              alt={`${previa?.creator?.name}'s previa picture`}
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          <p
                            className={`mt-3 ${
                              getFormatedDate(previa?.date) === 'Due'
                                ? 'text-red-500'
                                : 'text-primary_b'
                            }`}
                          >
                            {getFormatedDate(previa?.date)}
                          </p>
                          <p className="mt-3 text-primary_b"> At: {previa?.startTime}</p>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">{previa?.participants}</td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {previa?.location} - {previa?.place_details}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">{previa?.description}</td>
                        <td className="flex flex-col gap-1 whitespace-nowrap px-3 py-3">
                          <EditButton date={previa?.date} previa_id={previa?.previa_id} />
                          <DeleteButton previa_id={previa?.previa_id} />
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
      {isModalOpen && <Modal {...selectedPrevia} />}
    </div>
  );
}

export default Table;
