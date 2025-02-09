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

export default function NavHeader() {
  const pathName = usePathname()

  return (
    <nav className="flex border-b-1 border-neutral-900 bg-neutral-950">
      {/* Home */}
      <section className="flex items-center border-r-1 border-neutral-900 px-6 pr-9">
        <Link href="/" className="group flex items-center gap-3">
          <div className="text-neutral-500">
            <RiAppsLine />
          </div>
          <div className="flex flex-col">
            <span className="text-shadow shadow-glow font-semibold uppercase leading-tight text-primary transition group-hover:text-white group-hover:shadow-white">
              Shadō Screen
            </span>
            <span className="text-xs leading-tight text-neutral-500 transition group-hover:text-neutral-400">
              Shadō Network
            </span>
          </div>
        </Link>
      </section>

      {/* Links */}
      <section className="flex flex-1 items-center gap-x-12 px-9">
        <Link
          href="/puppets"
          className={conditionalClassNames({
            'flex items-center gap-2': true,
            'uppercase text-neutral-400 transition hover:text-white': true,
            'text-primary': pathName === '/puppets',
          })}
        >
          <RiGroupLine title="Puppets" />
          Puppets
        </Link>
        <Link
          href="/plays"
          className={conditionalClassNames({
            'flex items-center gap-2': true,
            'uppercase text-neutral-400 transition hover:text-white': true,
            'text-primary': pathName === '/plays',
          })}
        >
          <RiExchange2Line title="Plays" />
          Plays
        </Link>
      </section>

      {/* Settings */}
      <section className="flex aspect-square items-center border-l-1 border-neutral-900 px-6">
        <Link
          href="/settings"
          className={conditionalClassNames({
            'flex h-6 w-6 items-center justify-center': true,
            'uppercase text-neutral-400 transition hover:text-white': true,
            'text-primary': pathName === '/settings',
          })}
        >
          <RiSettings3Line title="Settings" />
        </Link>
      </section>
    </nav>
  )
}
