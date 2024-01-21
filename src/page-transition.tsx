'use client'

import { useRouter } from 'next/navigation'
import { motion, type HTMLMotionProps, AnimatePresence } from 'framer-motion'
import type { ReactHTML, ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import { PageTransitionProvider } from './context'

type PageTransitionProps<TagName extends keyof ReactHTML> = {
  children: ReactNode
  element: TagName
  duration?: number
} & HTMLMotionProps<TagName>

export function PageTransition<TagName extends keyof ReactHTML>({
  children,
  element,
  transition,
  duration = 0.3,
  ...props
}: PageTransitionProps<TagName>) {
  const [pageTransitionState, setPageTransitionState] = useState<{
    isTransitioning: boolean
    path: string | null
  }>({ isTransitioning: false, path: null })
  const { isTransitioning } = pageTransitionState
  const router = useRouter()

  useEffect(() => {
    const onExitComplete = () => {
      setPageTransitionState({
        isTransitioning: false,
        path: null,
      })
      if (pageTransitionState.path) {
        router.push(pageTransitionState.path)
      }
    }

    if (isTransitioning) {
      const animationDuration = duration * 1000

      const timeoutId = setTimeout(() => {
        onExitComplete()
      }, animationDuration)

      return () => clearTimeout(timeoutId)
    }
  }, [duration, isTransitioning, pageTransitionState, router])

  const MotionElement = motion(element)
  return (
    <PageTransitionProvider setPageTransitionState={setPageTransitionState}>
      <AnimatePresence>
        {!isTransitioning && (
          <MotionElement transition={{ ...transition, duration: duration }} {...props}>
            {children}
          </MotionElement>
        )}
      </AnimatePresence>
    </PageTransitionProvider>
  )
}
