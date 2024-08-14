'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import SwitchComp from '../customComponents/SwitchComp'
import { changeSettings } from '@/lib/settings'
import toast from 'react-hot-toast'


interface UserCard {
    name: string,
    email: string,
    isTwoFactorEnable: boolean,
    emailVerified: Date,
    role: string,
    age: string,
    url_img: string,

}

const UserCard = ({ user }: { user?: UserCard }) => {

    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(user?.isTwoFactorEnable || false);
    const [twoFactorStatus, setTwoFactorStatus] = useState<string>(isSwitchOn ? "ON" : "OFF");

    const handleSwitchChange = (checked: boolean) => {
        setIsSwitchOn(checked);
        setTwoFactorStatus(checked ? "ON" : "OFF");
    }

    // Falta esto desde settings
    const changePassword = async () => {
        const email = user?.email;
        console.log(email);
    }

    const handleSaveSettings = async () => {
        if (user?.email) {
            try {
                const twoFactorBoolean = isSwitchOn;
                const response = await changeSettings(twoFactorBoolean, user.email);

                if (response?.error) {
                    toast.error(response.error);
                } else if (response?.success) {
                    toast.success(response.success);
                }
            } catch (error) {
                toast.error("An unexpected error occurred"); // Error genérico
                console.error(error);
            }
        }
    }

    return (
        <div className="bg-secondary_b grid grid-cols-4 gap-3 w-auto p-4 rounded-md shadow-md align-middle text-primary ">
            <div className="col-span-4 lg:col-span-1 ">
                <Image
                    src={user?.url_img || ""}
                    alt="Descriptive Alt Text"
                    priority={true}
                    className="rounded-lg object-cover w-full h-auto"
                    layout="responsive"
                    width={100}
                    height={100}
                />
            </div>
            <div className='col-span-4 lg:col-span-3 gap-3 '>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                    <p className='text-md font-medium'>User Name</p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-primary text-secondary rounded-md'>{user?.name}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                    <p className='text-md font-medium'>Email</p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-primary text-secondary rounded-md'>{user?.email}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                    <p className='text-md font-medium'>Age</p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-primary text-secondary rounded-md'>{user?.age}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                    <p className='text-md font-medium'>Role</p>
                    <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-primary text-secondary rounded-md'>{user?.role}</p>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                    <p className='text-md font-medium'>Password</p>
                    <button onClick={changePassword} className='truncate text-xs max-w-[180px] font-mono p-1 bg-secondary text-primary rounded-md'>Change Password</button>
                </div>
                <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm my-2">
                    <div className='flex flex-col'>
                        <p className='text-md font-medium'>Two Factor Auth</p>
                        <label className="text-primary text-xs">
                            Enable two factor authentication for your account
                        </label>
                    </div>
                    <div className='flex gap-2'>
                        <p className='truncate text-xs max-w-[180px] font-mono p-1 bg-primary text-secondary rounded-md'>{twoFactorStatus}</p>
                        <SwitchComp
                            isChecked={isSwitchOn}
                            onChange={handleSwitchChange}
                        />
                    </div>
                </div>
                <button className='btn-secondary-flex' onClick={handleSaveSettings}>Save</button>
            </div>

        </div>
    )
}

export default UserCard