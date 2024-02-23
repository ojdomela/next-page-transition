import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { create } from 'zustand'

type PageTransitionState = {
  isTransitioning: boolean
  currentDuration: number | null
  path: string | null
}

type PageTransitionStore = {
  pageTransitionState: PageTransitionState
  setPageTransitionState: (state: PageTransitionState) => void
  nextDuration: number | null
  setNextDuration: (duration: number | null) => void
  startTransition: (href: string, router: AppRouterInstance) => void
}

export const usePageTransitionStore = create<PageTransitionStore>((set, get) => ({
  pageTransitionState: {
    isTransitioning: false,
    currentDuration: null,
    path: null,
  },
  setPageTransitionState: (pageTransitionState) =>
    set((state) => ({ ...state, pageTransitionState })),
  nextDuration: null,
  setNextDuration: (duration) => {
    const existingNextDuration = get().nextDuration

    if (!duration || !existingNextDuration) {
      set((state) => ({ ...state, duration }))
      return
    }

    set((state) => ({ ...state, duration: Math.max(duration, existingNextDuration) }))
  },
  startTransition: (href, router) => {
    set((state) => ({
      ...state,
      nextDuration: null,
      pageTransitionState: {
        isTransitioning: true,
        currentDuration: state.nextDuration,
        path: href,
      },
    }))
    router.prefetch(href)
  },
}))
