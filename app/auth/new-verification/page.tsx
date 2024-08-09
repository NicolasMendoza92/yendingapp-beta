import Loader from "@/components/Loader"
import { Link } from "next-view-transitions"

const NewVerificationPage = () => {
    return (
        <div className="grid place-items-center h-screen mx-2 ">
            <div className="bg-primary_b shadow-lg text-black rounded-lg border-t-4">
                <div className="p-5 gap-3 ">
                    <h1 className=" text-4xl text-primary font-bold text-center mb-2">
                        Confirming your verification
                    </h1>
                    <p className="text-center mb-6 text-primary ">
                        Sign in to your account using one of the methods below
                    </p>
                    <div className="flex flex-col gap-3 px-6">
                        <Loader/>
                        <Link className="text-sm text-primary" href={'/onboarding'}>
                            <span className="underline text-secondary font-bold">
                                Go to onboarding
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewVerificationPage