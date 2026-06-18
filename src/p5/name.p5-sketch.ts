import type p5 from "p5"
import { debounce } from "@/utils/functions/debounce"
import Particle from "@/utils/classes/Particle"
import type {
  ExtendedFont,
  ParticleUpdateOptions,
  TextPoint,
} from "@/types/p5.types"
import interThinFont from "@/assets/fonts/Inter/static/Inter_18pt-Thin.ttf"

// Font path - update this to match your actual font file location normally 0.6
export const SPRINGY_FORCE_MAX = 0.1
const TEXT_1 = "Martín"
const TEXT_2 = "Roncero"
const DISPLAYED_TEXT = `${TEXT_1} ${TEXT_2}`

// TAL Y COMO SE QUEDA AL FINAL NO ME TERMINA DE CONVENCER, MIRAR ESO.
// should depend on screen sizes
let conglomerationFactor = 0
let mouseRepulsion = 0
let particleWeight = 0
let noiseValue = 0
// will be 15, now for testing is lower
const DELAY = 2
const PARTICLE_LIFETIME = 60 * 1000
const MOBILE_BREAKPOINT = 768

export default function sketch(p: p5, parent: HTMLElement): void {
  // ENV
  let font: ExtendedFont | null = null
  let particles: Particle[] = []
  const timeouts: ReturnType<typeof setTimeout>[] = []

  // SHOULD BE 0
  let sprFactor = 0
  let count = 0

  // --- UTILITIES ---
  const handleResize = debounce(() => {
    if (!font) return
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.resizeCanvas(w, h)
    calcTextSize(w, h)
    timeouts.forEach((timeout) => clearTimeout(timeout))
    const points = getPoints(w, h)
    points.forEach((point, index) => {
      if (index < particles.length) {
        // resetting target of existing particles in different points
        particles[index].target.x = point.x
        particles[index].target.y = point.y
      } else {
        // addition of new particles
        particles.push(new Particle(p, point.x, point.y))
      }
    })
    // deletion of particles if needed
    if (particles.length > points.length) {
      particles = particles.slice(0, points.length)
    }
    setVariables(w, h)
  }, 150)

  function calcTextSize(w: number, h: number): void {
    if (w > h) {
      p.textSize(w * 0.12)
    } else {
      p.textSize(h * 0.11)
    }
  }

  function setVariables(w: number, h: number): void {
    mouseRepulsion = w * 0.05
    particleWeight = w > MOBILE_BREAKPOINT ? 3 : 2
    conglomerationFactor = p.max(p.max(w, h) * 0.00005, 0.12)
    noiseValue = w > MOBILE_BREAKPOINT ? 1 : 0.5
  }

  function getPoints(w: number, h: number): TextPoint[] {
    if (!font) return []

    if (w < MOBILE_BREAKPOINT) {
      // Get bounds for both words separately to center them individually
      const bounds1 = font.textBounds(TEXT_1, 0, 0)
      const bounds2 = font.textBounds(TEXT_2, 0, 0)

      // Define the vertical gap between the lines
      const lineSpacing = bounds1.h * 0.5
      const totalHeight = bounds1.h + bounds2.h + lineSpacing

      // Calculate the starting Y so the entire text block is vertically centered
      const startY = (h - totalHeight) / 2

      // X and Y for Line 1
      const x1 = (w - bounds1.w) / 2
      const y1 = startY + bounds1.h // Y represents the text baseline

      // X and Y for Line 2
      const x2 = (w - bounds2.w) / 2
      const y2 = y1 + lineSpacing + bounds2.h

      // Get points for both lines
      const sampleFactor = conglomerationFactor ?? 0.12
      const points1 = font.textToPoints(TEXT_1, x1, y1, {
        sampleFactor,
      })
      const points2 = font.textToPoints(TEXT_2, x2, y2, {
        sampleFactor,
      })

      // Combine both arrays of points into one
      return [...points1, ...points2]
    } else {
      // --- DESKTOP LOGIC (Your Original Single Line) ---
      const bounds = font.textBounds(DISPLAYED_TEXT, 0, 0)
      const x = (w - bounds.w) / 2
      const y = h / 2 + bounds.h / 2

      const sampleFactor = conglomerationFactor ?? 0.12
      return font.textToPoints(DISPLAYED_TEXT, x, y, {
        sampleFactor,
      })
    }
  }
  // --- P5.JS STUFF ---
  p.setup = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.frameRate(60)
    setVariables(w, h)

    p.createCanvas(w, h)

    p.loadFont(interThinFont, (loadedFont) => {
      font = loadedFont as ExtendedFont

      p.textFont(font)

      calcTextSize(w, h)

      const points = getPoints(w, h)

      particles = points.map((pt) => new Particle(p, pt.x, pt.y))
    })
  }

  p.draw = () => {
    p.background(28, 28, 28)

    if (sprFactor < SPRINGY_FORCE_MAX) {
      count++
      if (count % DELAY === 0) {
        sprFactor += 0.0005
      }
    }
    const mouse = p.createVector(p.mouseX, p.mouseY)
    p.stroke(250, 251, 253)
    p.strokeWeight(particleWeight)

    const updateOptions: ParticleUpdateOptions = {
      mouse,
      mouseRepulsionSq: mouseRepulsion ** 2,
    }

    for (const particle of particles) {
      particle.update(sprFactor, updateOptions, noiseValue)
      particle.show()
    }
  }

  p.mousePressed = () => {
    particles.push(new Particle(p, p.mouseX, p.mouseY, p.mouseX, p.mouseY))
    timeouts.push(
      setTimeout(() => {
        particles.pop()
      }, PARTICLE_LIFETIME),
    )
  }

  p.windowResized = handleResize
}
