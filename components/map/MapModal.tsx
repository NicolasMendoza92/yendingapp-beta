import React, { useEffect } from 'react';
import { MapContent } from './MapContent';
import { handleQueryParams } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

const MapModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleBackdropClick = (event: { target: any; currentTarget: any }) => {
    if (event.target === event.currentTarget) {
      handleQueryParams({
        searchParams,
        pathname,
        replace,
        values: [{ query: 'map' }],
      });
    }
  };

  const handleModalClose = () =>
    handleQueryParams({
      searchParams,
      pathname,
      replace,
      values: [{ query: 'map' }],
    });

  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scroll

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      id="crud-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div
        className="relative max-h-full w-full max-w-3xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/*   <!-- Modal content --> */}
        <div className="relative rounded-lg bg-primary_b shadow">
          {/*  <!-- Modal header --> */}
          <div className="flex items-center justify-between rounded-t border-b p-4 md:p-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-secondary">Select pickup point</h3>
            <button
              type="button"
              className="ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-transparent text-sm text-secondary hover:text-primary"
              data-modal-toggle="crud-modal"
              onClick={handleModalClose}
            >
              <FaTimes />
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <MapContent />
        </div>
      </div>
    </div>
  );
};

export default MapModal;
