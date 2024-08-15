import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { handleQueryParams } from '@/lib/utils';
import { FaMapPin } from 'react-icons/fa';

const PickupPointButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleModalOpen = () =>
    handleQueryParams({
      searchParams,
      pathname,
      replace,
      values: [
        {
          value: 'true',
          query: 'map',
        },
      ],
    });

  return (
    <button className={'btn-primary'} onClick={handleModalOpen}>
      <FaMapPin className="mt-2" size={30}/>
    </button>
  );
};

export default PickupPointButton;
