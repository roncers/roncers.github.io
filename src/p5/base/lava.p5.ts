import type p5 from "p5"

const STEP_SIZE_DIVISOR = 30
const NOISE_SCALE = 0.002
const MAPPING_FACTOR = 0.3
const MAPPING_MAX = 1 - MAPPING_FACTOR
const MAPPING_MIN = MAPPING_FACTOR

export default function sketch(p: p5, parent: HTMLElement): void {
  let stepSize = 1

  p.setup = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.createCanvas(w, h)
    p.noStroke()
    p.colorMode(p.HSB, 360, 100, 100)
    stepSize = p.max(w, h) / STEP_SIZE_DIVISOR
    p.describe("A multicolor lava lamp that moves.")
  }

  p.draw = () => {
    const nt = NOISE_SCALE * p.frameCount
    for (let y = 0; y < p.height; y += stepSize) {
      const ny = NOISE_SCALE * y
      for (let x = 0; x < p.width; x += stepSize) {
        const nx = NOISE_SCALE * x
        const rawNoise = p.noise(nx, ny, nt)
        const c = p.map(rawNoise, MAPPING_MAX, MAPPING_MIN, 0, 360, true)
        p.fill(c, 100, 100)
        p.rect(x, y, stepSize, stepSize)
      }
    }
  }

  p.windowResized = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.resizeCanvas(w, h)
    stepSize = p.max(w, h) / STEP_SIZE_DIVISOR
  }
}