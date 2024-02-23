'use client'

import { useRouter } from 'next/navigation'
import { motion, type HTMLMotionProps, AnimatePresence, type AnimatePresenceProps } from 'framer-motion'
import type { ReactHTML, ReactNode } from 'react'
import React, { useEffect } from 'react'
import { usePageTransitionStore } from './store'

type PageTransitionProps<TagName extends keyof ReactHTML> = {
  children?: ReactNode
  element: TagName
  animatePresenceProps?: AnimatePresenceProps
  pageExitDuration: number
} & HTMLMotionProps<TagName>

export function PageTransition<TagName extends keyof ReactHTML>({
  children,
  element,
  animatePresenceProps,
  pageExitDuration,
  ...props
}: PageTransitionProps<TagName>) {
  const { pageTransitionState, setPageTransitionState, setNextDuration } = usePageTransitionStore()
  const { isTransitioning, currentDuration } = pageTransitionState
  const router = useRouter()

  useEffect(() => {
    setNextDuration(pageExitDuration)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onExitComplete = () => {
      setPageTransitionState({
        isTransitioning: false,
        currentDuration: null,
        path: null,
      })
      if (pageTransitionState.path) {
        router.push(pageTransitionState.path)
      }
    }

    if (isTransitioning) {
      const animationDuration = (currentDuration || 0.3) * 1000

      const timeoutId = setTimeout(() => {
        onExitComplete()
      }, animationDuration)

      return () => clearTimeout(timeoutId)
    }
  }, [pageTransitionState, router, setNextDuration, setPageTransitionState])

  const MotionElement = motion(element)
  return (
    <AnimatePresence {...animatePresenceProps}>
      {!isTransitioning && <MotionElement {...props}>{children}</MotionElement>}
    </AnimatePresence>
  )
}
