'use client'

import { useRouter } from 'next/navigation'
import { usePageTransitionInternal } from './use-page-transition'
import { AnimatePresence, motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactHTML, ReactNode } from 'react'
import React from 'react'

type PageTransitionProps<TagName extends keyof ReactHTML> = {
  children: ReactNode
  element: TagName
} & HTMLMotionProps<TagName>

export function PageTransition<TagName extends keyof ReactHTML>({
  children,
  element,
  ...props
}: PageTransitionProps<TagName>) {
  const router = useRouter()
  const { isTransitioning, setIsTransitioning, setPath, path } = usePageTransitionInternal()
  const MotionComponent = motion(element)
  const onExitComplete = () => {
    setIsTransitioning(false)
    setPath(null)
    if (path) {
      router.push(path)
    }
  }

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {isTransitioning && <MotionComponent {...props}>{children}</MotionComponent>}
    </AnimatePresence>
  )
}
