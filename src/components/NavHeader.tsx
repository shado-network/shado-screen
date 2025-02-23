'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

import {
  RiAppsLine,
  RiGroupLine,
  RiExchange2Line,
  RiSettings3Line,
} from 'react-icons/ri'

import cn from '@/utils/cn'

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
            <span className="font-semibold uppercase leading-tight text-primary shadow-glow transition text-shadow group-hover:text-white group-hover:shadow-white group-hover:text-shadow-none">
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
          className={cn({
            'flex items-center gap-2': true,
            'uppercase text-neutral-400 transition hover:text-white': true,
            'text-primary': pathName.startsWith('/puppets'),
          })}
        >
          <RiGroupLine title="Puppets" />
          Puppets
        </Link>
        <Link
          href="/plays"
          className={cn({
            'flex items-center gap-2': true,
            'uppercase text-neutral-400 transition hover:text-white': true,
            'text-primary': pathName.startsWith('/plays'),
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
          className={cn({
            'flex h-6 w-6 items-center justify-center': true,
            'uppercase text-neutral-400 transition hover:text-white': true,
            'text-primary': pathName.startsWith('/settings'),
          })}
        >
          <RiSettings3Line title="Settings" />
        </Link>
      </section>
    </nav>
  )
}
