'use client'

import { useCallback } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function usePageTransitionInternal() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [path, setPath] = useState<string | null>(null)
  const router = useRouter()

  const startTransition = useCallback((href: string) => {
    setIsTransitioning(true)
    setPath(href)
    router.prefetch(href)
  }, [])

  return { startTransition, isTransitioning, path, setIsTransitioning, setPath }
}

export function usePageTransition() {
  const { startTransition, isTransitioning } = usePageTransitionInternal()

  return { startTransition, isTransitioning }
}
