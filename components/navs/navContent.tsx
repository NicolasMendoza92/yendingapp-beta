'use client'
import { signOut } from 'next-auth/react'
import { useTransitionRouter as useRouter } from 'next-view-transitions'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { BiMessageSquareDots } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { FaGlassCheers, FaMapMarkerAlt } from 'react-icons/fa'
import { IoReturnDownBack } from 'react-icons/io5'
import {
  MdOutlineLogout,
  MdOutlineSettings,
  MdOutlineSpaceDashboard
} from 'react-icons/md'

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: MdOutlineSpaceDashboard },
  {
    name: 'Previas',
    href: '/dashboard/previas',
    icon: FaGlassCheers
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: CgProfile
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: BiMessageSquareDots
  },
  {
    name: 'Map',
    href: '/dashboard/map',
    icon: FaMapMarkerAlt
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: MdOutlineSettings
  }
]

interface NavLinksContentProps {
  logged: boolean
}

export function NavLinksContent({ logged }: NavLinksContentProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async() => {
      await signOut({redirect: false})
      router.push('/')
  }

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={`${link.name}_${index}`}
            href={link.href}
            className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-secondary hover:shadow-lg m-auto ${
              pathname === link.href ? 'bg-secondary' : ''
            }`}
          >
            <LinkIcon
              className={`text-2xl ${
                pathname === link.href ? 'text-primary' : 'text-secondary'
              } group-hover:text-primary`}
            />
            <h3
              className={`text-base font-semibold ${
                pathname === link.href ? 'text-primary' : 'text-secondary'
              } group-hover:text-primary`}
            >
              {link.name}
            </h3>
          </Link>
        )
      })}
      {logged ? (
        <div className="flex flex-col text-sm p-2">
          <p className="">Logged as: </p>
          <p className="text-xs font-bold ">{logged}</p>
        </div>
      ) : (
        ''
      )}
      <div
        onClick={handleSignOut}
        className="flex mb-2 justify-start items-center gap-4 pl-5 border border-bg-secondary  hover:bg-secondary p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
      >
        <MdOutlineLogout className="text-2xl  group-hover:text-primary " />
        <h3 className="text-base  group-hover:text-primary font-semibold ">
          Logout
        </h3>
      </div>
      <Link
        href="/"
        className="flex mb-2 justify-start items-center gap-4 pl-5 border border-bg-secondary hover:bg-secondary p-1 rounded-md group cursor-pointer hover:shadow-lg m-auto"
      >
        <IoReturnDownBack className="text-2xl  group-hover:text-primary " />
        <h3 className="text-base  group-hover:text-primary font-semibold ">
          Home
        </h3>
      </Link>
    </>
  )
}
