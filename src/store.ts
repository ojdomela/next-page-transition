import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { create } from 'zustand'

type PageTransitionState = {
  isTransitioning: boolean
  path: string | null
}

type PageTransitionStore = {
  pageTransitionState: PageTransitionState
  setPageTransitionState: (state: PageTransitionState) => void
  duration: number | null
  setDuration: (duration: number | null) => void
  startTransition: (href: string, router: AppRouterInstance) => void
}

export const usePageTransitionStore = create<PageTransitionStore>((set, get) => ({
  pageTransitionState: {
    isTransitioning: false,
    path: null,
  },
  setPageTransitionState: (pageTransitionState) =>
    set((state) => ({ ...state, pageTransitionState })),
  duration: null,
  setDuration: (duration) => {
    const existingDuration = get().duration

    if (!duration || !existingDuration) {
      set((state) => ({ ...state, duration }))
      return
    }

    set((state) => ({ ...state, duration: Math.max(duration, existingDuration) }))
  },
  startTransition: (href, router) => {
    set((state) => ({
      ...state,
      pageTransitionState: {
        isTransitioning: true,
        path: href,
      },
    }))
    router.prefetch(href)
  },
}))
