'use client'

import { usePageTransitionStore } from '@/page-transition/store'
import { useRouter } from 'next/navigation'

function usePageTransition() {
  const { startTransition, pageTransitionState } = usePageTransitionStore()
  const router = useRouter()

  return {
    isTransitioning: pageTransitionState.isTransitioning,
    startTransition: (href: string) => startTransition(href, router),
  }
}

export default usePageTransition
