import React from 'react'
import type { Sketch } from '@/types/p5.types'
import P5Canvas from '@/components/commons/P5Canvas'
import style from './TabCanvas.module.css'

interface TabCanvasProps {
  sketch: Sketch
  label: string
}

export default function TabCanvas({ sketch, label }: TabCanvasProps): React.ReactElement {

  return (
    <div className='w-full h-full flex flex-col' style={{ padding: '1rem' }}>
      <label className={style.label}>
        {label}
      </label>
      <P5Canvas style={{ border: '1px solid red' }} sketch={sketch} />
    </div>
  )
}
