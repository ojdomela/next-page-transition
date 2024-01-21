'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { type ReactNode, createContext, useContext, useMemo } from 'react'

const PageTransition = createContext<{
  startTransition: (href: string) => void
} | null>(null)

export const usePageTransition = () => {
  const ctx = useContext(PageTransition)
  if (!ctx) {
    throw new Error('usePageTransition must be used within a PageTransitionProvider')
  }
  return ctx
}

// Provider component that will wrap your application
export function PageTransitionProvider({
  children,
  setPageTransitionState,
}: {
  children: ReactNode
  setPageTransitionState: React.Dispatch<
    React.SetStateAction<{
      isTransitioning: boolean
      path: string | null
    }>
  >
}) {
  const router = useRouter()

  // Value object for the context provider
  const providerValue = useMemo(
    () => ({
      startTransition: (href: string) => {
        setPageTransitionState({
          isTransitioning: true,
          path: href,
        })
        router.prefetch(href)
      },
    }),
    [router, setPageTransitionState]
  )

  // Provide the value to the context
  return <PageTransition.Provider value={providerValue}>{children}</PageTransition.Provider>
}
