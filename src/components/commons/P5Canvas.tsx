import React, { useEffect, useRef } from 'react'
import type p5 from 'p5'
import type { Sketch } from '@/types/p5.types'

interface P5CanvasProps {
  sketch: Sketch
  className?: string
  [key: string]: any
}

export default function P5Canvas({ sketch, className, ...props }: P5CanvasProps): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = containerRef.current
    if (!parent) return

    let instance: p5 | null = null
    let resizeObserver: ResizeObserver | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    // timeout is to fix a bug where 2 instances where getting mounted with React 19 strict mode
    timeoutId = setTimeout(() => {
      import('p5').then(({ default: P5 }) => {
        instance = new P5((p: p5) => sketch(p, parent), parent)

        // forward container size changes to the sketch's windowResized hook
        resizeObserver = new ResizeObserver(() => {
          instance?.windowResized?.()
        })
        resizeObserver.observe(parent)
      })
    }, 0)

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      resizeObserver?.disconnect()
      instance?.remove()
    }
  }, [sketch])

  return <div ref={containerRef} className={`w-full h-full flex-1 min-h-0 ${className || ''}`} {...props} />
}
