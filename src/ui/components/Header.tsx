'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  RiAppsLine,
  RiGroupLine,
  RiExchange2Line,
  RiSettings3Line,
} from 'react-icons/ri'

import conditionalClassNames from '@/libs/conditionalClassNames'

export default function Header() {
  const pathName = usePathname()

  return (
    <nav className="flex border-b-1 border-stone-800 bg-stone-950">
      <section className="flex items-center border-r-1 border-stone-800 px-6">
        <Link className="group flex items-center gap-3" href="/">
          <div className="text-stone-500">
            <RiAppsLine />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold leading-tight text-amber-400 transition group-hover:text-white">
              Shadō Screen
            </span>
            <span className="text-xs leading-tight text-stone-500 transition group-hover:text-stone-400">
              By Shadō Network
            </span>
          </div>
        </Link>
      </section>
      <section className="flex flex-1 items-center gap-x-6 px-6">
        <Link
          className={conditionalClassNames(
            'flex items-center gap-2 text-stone-400 transition hover:text-white',
            {
              'text-amber-400': pathName === '/puppets',
            },
          )}
          href="/puppets"
        >
          <RiGroupLine />
          Puppets
        </Link>
        <Link
          className={conditionalClassNames(
            'flex items-center gap-2 text-stone-400 transition hover:text-white',
            {
              'text-amber-400': pathName === '/plays',
            },
          )}
          href="/plays"
        >
          <RiExchange2Line />
          Plays
        </Link>
      </section>
      <section className="flex aspect-square items-center border-l-1 border-stone-800 px-6">
        <Link
          className={conditionalClassNames(
            'flex h-6 w-6 items-center justify-center text-stone-400 transition hover:text-white',
            {
              'text-amber-400': pathName === '/settings',
            },
          )}
          href="/settings"
        >
          <RiSettings3Line />
        </Link>
      </section>
    </nav>
  )
}
