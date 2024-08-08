// sideBar.tsx
import React from 'react';
import Image from 'next/image';
import { UserFormState } from '@/types/onboarding';

type SideBarProps = {
  users: UserFormState[];
  userDataId: string;
};

const ChatSideBar = ({ users, userDataId }: SideBarProps) => {
  return (
    <div className="flex w-60 flex-col border-r border-gray-300 bg-white">
      <header className="flex items-center justify-between border-b border-gray-300 bg-secondary_b p-4 text-white">
        <h1 className="text-xl font-semibold">Participants</h1>
      </header>
      <div className="mt-2 flex-1 overflow-y-auto">
        {users?.map((user, i) => (
          <div
            className={`mb-2 flex cursor-pointer items-center rounded-md p-2 hover:bg-secondary hover:text-primary ${user.user_id === userDataId && 'bg-primary_b text-primary'}`}
            key={`user_${i}`}
          >
            <div className="mr-3 h-12 w-12 rounded-full bg-gray-300">
              <Image
                src={user.url_img || '/images/placeholder.jpg'}
                alt="User Avatar"
                className="h-12 w-12 rounded-full"
                width={48}
                height={48}
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{user.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
