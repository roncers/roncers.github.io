import type p5 from 'p5'

// Extended Font interface with methods that exist at runtime but may be missing from @types/p5
// Use this with type assertion: (font as ExtendedFont).textBounds(...)
export interface ExtendedFont extends p5.Font {
  textBounds(text: string, x: number, y: number, fontSize?: number): {
    x: number
    y: number
    w: number
    h: number
  }
  textToPoints(
    text: string,
    x: number,
    y: number,
    options?: { sampleFactor?: number; simplifyThreshold?: number }
  ): Array<{ x: number; y: number; alpha?: number }>
}

export type Sketch = (p: p5, parent: HTMLElement) => void

export interface ParticleUpdateOptions {
  mouse: p5.Vector
  mouseRepulsionSq: number
}

// Point interface for textToPoints results
export interface TextPoint {
  x: number
  y: number
  alpha?: number
}
