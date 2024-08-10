import Loader from '@/components/Loader';
import { Link } from 'next-view-transitions';

const NewVerificationPage = () => {
  return (
    <div className="mx-2 grid h-screen place-items-center">
      <div className="rounded-lg border-t-4 bg-primary_b text-black shadow-lg">
        <div className="gap-3 p-5">
          <h1 className="mb-2 text-center text-4xl font-bold text-primary">
            Confirming your verification
          </h1>
          <p className="mb-6 text-center text-primary">
            Sign in to your account using one of the methods below
          </p>
          <div className="flex flex-col gap-3 px-6">
            <Loader />
            <Link className="text-sm text-primary" href={'/auth/login'}>
              <span className="font-bold text-secondary underline">Go to onboarding</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewVerificationPage;
