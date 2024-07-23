import { auth } from '@/auth'
import { NavLinksContent } from './navContent'
import { Suspense } from 'react'
import Loader from '../Loader'


export default async function NavLinks() {
  const session = await auth()
  const logged = session?.user?.email || ''

  return (
    <Suspense fallback={<Loader/>}>
      <NavLinksContent logged={logged} />
    </Suspense>
  )
}

{
  /* <Link href="/dashboard" className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
    pathname === '/dashboard' ? 'bg-primary_b' : ''
  }`}>
  <MdOutlineSpaceDashboard className={`text-2xl ${pathname === '/dashboard' ? 'text-white' : 'text-secondary'} group-hover:text-white`} />
  <h3 className={`text-base font-semibold ${
      pathname === '/dashboard' ? 'text-white' : 'text-secondary'
    } group-hover:text-white`}>
    Dashboard
  </h3>
</Link>
<Link href="/dashboard/previas" className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
    pathname.startsWith('/dashboard/previas') ? 'bg-primary_b' : ''
  }`}>
  <FaGlassCheers className={`text-2xl ${pathname.startsWith('/dashboard/previas') ? 'text-white' : 'text-secondary'} group-hover:text-white`} />
  <h3 className={`text-base font-semibold ${
      pathname.startsWith('/dashboard/previas') ? 'text-white' : 'text-secondary'
    } group-hover:text-white`}>
    Previas
  </h3>
</Link>
<Link href="/dashboard/profile" className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
    pathname === '/dashboard/profile' ? 'bg-primary_b' : ''
  }`}>
  <CgProfile className={`text-2xl ${pathname === '/dashboard/profile' ? 'text-white' : 'text-secondary'} group-hover:text-white`} />
  <h3 className={`text-base font-semibold ${
      pathname === '/dashboard/profile' ? 'text-white' : 'text-secondary'
    } group-hover:text-white`}>
    Profile
  </h3>
</Link>
<div className="flex  mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <BiMessageSquareDots className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    Messages
  </h3>
</div>
</div>
{/* setting  
<div className=" my-4 border-b border-primary_b pb-4">
<div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <MdOutlineSettings className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    Settings
  </h3>
</div>
<div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <MdOutlineMoreHoriz className="text-2xl group-hover:text-white " />
  <h3 className="text-base group-hover:text-white font-semibold ">
    More
  </h3>
</div>
</div>
//logout
<div className="my-4 text-secondary">
{session? (
  <div className="flex flex-col text-sm p-2">
  <p className="">Logged as: </p>
  <p className="text-xs font-bold ">{session?.user?.email}</p>
</div>
) : ""}
<Link href={pathValue()} className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b  hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto" >
  <MdOutlineLogout className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    {status === 'loading' ? '..Loading' : session ? "Logout" : "Sign in"}
  </h3>
</Link>
<Link href="/" className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b hover:bg-primary_b p-1 rounded-md group cursor-pointer hover:shadow-lg m-auto">
  <IoReturnDownBack className="text-2xl  group-hover:text-white " />
  <h3 className="text-base  group-hover:text-white font-semibold ">
    Home
  </h3>
</Link> */
}