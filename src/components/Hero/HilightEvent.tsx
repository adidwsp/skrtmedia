'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

type Props = {
  title?: string
  subtitle?: string
  href?: string
}

/**
 * HighlightEvent
 * - A small attention-grabbing card to promote a new event (default: Trust Islam)
 * - Save this file as `components/HighlightEvent.tsx` and import it into your landing section.
 * - Defaults: href="/events/trust-islam"
 */
export default function HighlightEvent({
  title = 'Trust Islam — Event Baru',
  subtitle = 'Diskusi, kajian, dan networking untuk pemuda. Klik untuk info & tiket gratis.',
  href = '/trust-islam',
}: Props) {
  return (
    <div className="mt-8 flex justify-center">
      <Link href={href} aria-label={`Buka halaman acara ${title}`} className="w-full max-w-[980px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.35 }}
          className="group relative flex items-center gap-6 overflow-hidden rounded-2xl border border-sky-100/30 bg-gradient-to-r from-white/80 to-sky-50/60 px-6 py-5 shadow-lg ring-1 ring-sky-100/20 dark:from-gray-800/70 dark:to-gray-800/50 dark:border-gray-700"
        >
          {/* Left: badge + icon */}
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-gray-900">
              <div className="absolute -inset-0.5 animate-pulse rounded-xl bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-300 opacity-60 blur-[6px]" />
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg bg-white/90 text-primary dark:bg-gray-800">
                {/* megaphone icon (inline svg) */}
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M3 11v2a2 2 0 002 2h2l7 3V6L7 9H5a2 2 0 00-2 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 8v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* NEW badge */}
            <div className="flex flex-col">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-rose-600">
                <span className="inline-flex h-2 w-2 items-center justify-center">
                  <span className="h-2 w-2 animate-ping rounded-full bg-rose-400" />
                  <span className="absolute inline-flex h-2 w-2 rounded-full bg-rose-500" />
                </span>
                NEW
              </span>
            </div>
          </div>

          {/* Middle: text */}
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="truncate text-left text-lg font-bold leading-snug text-sky-900 dark:text-white sm:text-xl">
              {title}
            </h3>
            <p className="mt-1 truncate text-left text-sm font-medium text-sky-700/80 dark:text-sky-200/80 sm:text-sm">
              {subtitle}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="hidden rounded-full bg-sky-50/60 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-gray-700/40 dark:text-sky-200 sm:inline">
                Free Ticket
              </span>
              <span className="ml-auto inline-flex items-center gap-2 rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-transform group-hover:translate-x-0.5">
                Lihat Event
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </div>

          {/* Right: subtle decorative gradient */}
          <div className="pointer-events-none absolute right-3 top-3 hidden h-20 w-20 -rotate-12 transform rounded-xl bg-gradient-to-br from-pink-200 to-yellow-200 opacity-40 blur-xl dark:opacity-20 md:block" />

          {/* keyboard focus ring */}
          <span className="sr-only">Buka detail acara Trust Islam</span>
        </motion.div>
      </Link>
    </div>
  )
}
