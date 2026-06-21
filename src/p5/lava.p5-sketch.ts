import type p5 from "p5"

// 1. LIGHTWEIGHT MATH GRID
const TEXTURE_RES = 20
const NOISE_SCALE = 0.1
const MAPPING_FACTOR = 0.3
const MAPPING_MAX = 1 - MAPPING_FACTOR
const MAPPING_MIN = MAPPING_FACTOR
const TRANSITION_VELOCITY = 0.0025

export default function sketch(p: p5, parent: HTMLElement): void {
  let pg: p5.Graphics

  p.setup = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.createCanvas(w, h, p.WEBGL)
    
    pg = p.createGraphics(TEXTURE_RES, TEXTURE_RES)
    pg.noStroke()
    pg.colorMode(p.HSB, 360, 100, 100)
    
    p.describe("A multicolor lava lamp that moves fluidly and efficiently.")
  }

  p.draw = () => {
    const McCounters = TRANSITION_VELOCITY * p.frameCount 

    for (let y = 0; y < TEXTURE_RES; y++) {
      const ny = NOISE_SCALE * y
      for (let x = 0; x < TEXTURE_RES; x++) {
        const nx = NOISE_SCALE * x

        const rawNoise = p.noise(nx, ny, McCounters)
        const c = p.map(rawNoise, MAPPING_MAX, MAPPING_MIN, 0, 360, true)

        pg.fill(c, 100, 100)
        pg.rect(x, y, 1, 1)
      }
    }

    p.background(0)

    p.image(pg, -p.width / 2, -p.height / 2, p.width, p.height)
  }

  p.windowResized = () => {
    p.resizeCanvas(parent.clientWidth, parent.clientHeight)
  }
}