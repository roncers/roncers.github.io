import type p5 from "p5"

// State
const coords: number[][] = []
const colors: number[] = []
// Constants
const RGB_COLORS = 3
const PIXEL_SIZE = 2
const JITTER = 3

export default function sketch(p: p5, parent: HTMLElement): void {
  p.setup = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.createCanvas(w, h)
    p.background(240)
    let points = p.max(w, h) / 6
    while (points > 0) {
      coords.push([])
      points--
    }
    coords.forEach((coord) => {
      coord.push(p.width / 2)
      coord.push(p.height / 2)
    })
    for (let i = 0; i < RGB_COLORS; i++) {
      colors.push(p.random(255))
    }
  }

  p.draw = () => {
    p.noStroke()
    p.fill(colors[0], colors[1], colors[2])
    coords.forEach((coord) => {
      const [x, y] = coord
      p.rect(x, y, PIXEL_SIZE, PIXEL_SIZE)
      coord[0] = x + p.random(-JITTER, JITTER)
      coord[1] = y + p.random(-JITTER, JITTER)
    })
    const indx = p.floor(p.random(RGB_COLORS))
    colors[indx] = (colors[indx] + p.random(1)) % 255
  }

  p.windowResized = () => {
    p.resizeCanvas(parent.clientWidth, parent.clientHeight)
    coords.forEach((coord) => {
      coord[0] = p.width / 2
      coord[1] = p.height / 2
    })
  }
}
