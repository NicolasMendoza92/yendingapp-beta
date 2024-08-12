'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'next-view-transitions';
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/lib/actions';
import toast from 'react-hot-toast';
import { BeatLoader } from 'react-spinners'

const NewVerificationPage = () => {

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token")

    const onSubmit = useCallback(() => {

        if (success || error) return;

        if (!token) {
            toast.error("Missing token")
            return;
        }
        newVerification(token).then((data) => {
            if (data?.success) {
                toast.success(data?.success)
                setSuccess(data?.success)
            }
            else {
                toast.error(data?.error || "Something went wrong")
                setError(data?.error)
            }
        })
            .catch(() => {
                toast.error("Something went wrong")
            })
    }, [token, success, error]);

    useEffect(() => {
        onSubmit();
    }, [onSubmit])

    return (
        <div className="grid h-screen place-items-center mx-2">
            <div className="rounded-lg border-t-4 bg-primary_b text-black shadow-lg">
                <div className="gap-3 p-5">
                    <h1 className="mb-2 text-center text-4xl font-bold text-primary">
                        Confirming your verification
                    </h1>
                    <p className="mb-6 text-center text-primary">
                        Complete the process to start enjoying
                    </p>
                    {!success && !error && (
                        <div className='text-center'>
                            <BeatLoader />
                        </div>
                    )}
                    {!success && (
                        <div className='bg-red-200 border border-red-500 rounded-md text-center p-2 my-2'>
                            {error}
                        </div>
                    )}
                    {!error && (
                        <div className='bg-green-200 border border-green-500 rounded-md  text-center p-2 my-2'>
                            {success}
                        </div>
                    )}

                    <div className="text-center">
                        Click
                        <Link className="text-primary mx-1" href={'/auth/login'}>
                            <span className="font-bold text-secondary underline">Here</span>
                        </Link> to login with your verified credentials.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewVerificationPage;
