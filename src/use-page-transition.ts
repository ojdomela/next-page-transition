'use client'

import { useRouter } from 'next/navigation'
import { usePageTransitionStore } from './store'

function usePageTransition() {
  const { startTransition, pageTransitionState } = usePageTransitionStore()
  const router = useRouter()

  return {
    isTransitioning: pageTransitionState.isTransitioning,
    startTransition: (href: string) => startTransition(href, router),
  }
}

export default usePageTransition
