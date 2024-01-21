# next-page-transition

```
    npm i @ojdom/next-page-transition
```

This package is meant to smooth over difficulty with Page Transitions with the NextJS App Router. You can find a detailed discussion for the issue [here](https://github.com/vercel/next.js/issues/49279).

This library exposes a `<PageTransition>` component which extends Framer-motion's `motion` component, wrapped with its' own `AnimatePresence`. It also exposes a `usePageTransition` hook.

## PageTransition component

`<PageTransition>` accepts all `motion` props as well as extra props `element`, `pageExitDuration` and `animatePresenceProps`.

```
'use client'

import { PageTransition } from '@ojdom/next-page-transition'

export default function Home() {
  return (
    <main>
      <PageTransition
        element="aside"
        pageExitDuration={2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', delay: 1.5, duration: 0.5 }}
      >
        <Sidebar />
      </PageTransition>
    </main>
  )
}

```

You can also use multiple components if required. If passed different `pageExitDuration` values, it will use the highest value for all.

```
'use client'

import { PageTransition } from '@ojdom/next-page-transition'

export default function Home() {
  return (
    <>
      <PageTransition
        element="header"
        pageExitDuration={1}
        animatePresenceProps={{ initial: false, onExitComplete: () => {} }}
        animate={{ height: '10vh' }}
        exit={{ height: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.5 }}
      >
        <Header />
      </PageTransition>
      <main>
        <PageTransition
          element="aside"
          pageExitDuration={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', delay: 1.5, duration: 0.5 }}
        >
          <Sidebar />
        </PageTransition>
      </main>
    </>
  )
}

```

## usePageTransition

The `usePageTransition` hook contains `isTransitioning` and `startTransition`:

```
'use client'

import { usePageTransition } from @ojdom/next-page-transition

export default function Header() {
    const { isTransitioning, startTransition } = usePageTransition()

    return (
        <>
            <div>
                {isTransitioning ? <Spinner /> : <Logo />}
            </div>
            <div>
                <a onClick={() => startTransition('/home')}>Home</a>
                <a onClick={() => startTransition('/about')}>About</a>
                <a onClick={() => startTransition('/contact')}>Contact</a>
            </div>
        </>
    )
}
```
