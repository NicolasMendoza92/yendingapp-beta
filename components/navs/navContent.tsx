'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
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

  const pathValue = () => {
      signOut()
  }

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={`${link.name}_${index}`}
            href={link.href}
            className={`flex mb-2 justify-start items-center gap-4 pl-5 p-2 rounded-md group cursor-pointer hover:bg-primary_b hover:shadow-lg m-auto ${
              pathname === link.href ? 'bg-primary_b' : ''
            }`}
          >
            <LinkIcon
              className={`text-2xl ${
                pathname === link.href ? 'text-white' : 'text-secondary'
              } group-hover:text-white`}
            />
            <h3
              className={`text-base font-semibold ${
                pathname === link.href ? 'text-white' : 'text-secondary'
              } group-hover:text-white`}
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
        onClick={() => pathValue()}
        className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b  hover:bg-primary_b p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto"
      >
        <MdOutlineLogout className="text-2xl  group-hover:text-white " />
        <h3 className="text-base  group-hover:text-white font-semibold ">
          Logout
        </h3>
      </div>
      <Link
        href="/"
        className="flex mb-2 justify-start items-center gap-4 pl-5 border border-primary_b hover:bg-primary_b p-1 rounded-md group cursor-pointer hover:shadow-lg m-auto"
      >
        <IoReturnDownBack className="text-2xl  group-hover:text-white " />
        <h3 className="text-base  group-hover:text-white font-semibold ">
          Home
        </h3>
      </Link>
    </>
  )
}
