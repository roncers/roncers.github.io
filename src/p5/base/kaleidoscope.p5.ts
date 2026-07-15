import type p5 from "p5"
const NOISE_FACTOR = 0.006
const SLICES = 8
const COLOR_VELOCITY = 0.05
const ROTATION_VELOCITY = 0.002
const MAPPING_FACTOR = 0.15
const MAPPING_MAX = 1 - MAPPING_FACTOR
const MAPPING_MIN = MAPPING_FACTOR
const MAX_TRAIL_LENGTH = 250

type Point = { x: number; y: number; hue: number }

export default function sketch(p: p5, parent: HTMLElement): void {
  const pointsHistory: Point[] = []
  let angle = 0
  let rFactor = 0
  let buffer: p5.Graphics

  function createBuffer(w: number, h: number) {
    if (buffer) buffer.remove()
    buffer = p.createGraphics(w, h)
    buffer.colorMode(p.HSB, 360, 100, 100, 1)
    buffer.noStroke()
  }

  p.setup = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.createCanvas(w, h)
    p.colorMode(p.HSB, 360, 100, 100, 1)
    angle = p.TWO_PI / SLICES
    createBuffer(w, h)
    p.describe("rotating-rainbow-kaleidoscope")
    rFactor = p.random(0, 360)
  }

  p.draw = () => {
    const currentHue = (p.frameCount * COLOR_VELOCITY + rFactor) % 360

    const rawNoiseX = p.noise(p.frameCount * NOISE_FACTOR + rFactor, 0)
    const rawNoiseY = p.noise(p.frameCount * NOISE_FACTOR + rFactor, 100)

    const drawX = p.map(rawNoiseX, MAPPING_MIN, MAPPING_MAX, -p.width / 2, p.width / 2)
    const drawY = p.map(rawNoiseY, MAPPING_MIN, MAPPING_MAX, -p.height / 2, p.height / 2)

    const dotHue = (currentHue + 110) % 360
    pointsHistory.push({ x: drawX, y: drawY, hue: dotHue })
    if (pointsHistory.length > MAX_TRAIL_LENGTH) pointsHistory.shift()

    // Phase A: render the trail once into the offscreen buffer
    buffer.clear()
    buffer.push()
    buffer.translate(buffer.width / 2, buffer.height / 2)
    const lastIndex = pointsHistory.length - 1
    for (let j = 0; j < pointsHistory.length; j++) {
      const trailAlpha = lastIndex > 0 ? j / lastIndex : 1
      const pt = pointsHistory[j]
      buffer.fill(pt.hue, 100, 100, trailAlpha)
      buffer.circle(pt.x, pt.y, 5)
    }
    buffer.pop()

    // Phase B: blit the buffer once per slice with rotation/mirror
    p.background(currentHue, 100, 100)
    p.push()
    p.translate(p.width / 2, p.height / 2)
    p.rotate(p.frameCount * ROTATION_VELOCITY + rFactor)
    for (let i = 0; i < SLICES; i++) {
      p.push()
      p.rotate(i * angle)
      if (i % 2 === 1) p.scale(1, -1)
      p.image(buffer, -buffer.width / 2, -buffer.height / 2)
      p.pop()
    }
    p.pop()
  }

  p.windowResized = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.resizeCanvas(w, h)
    createBuffer(w, h)
  }
}
