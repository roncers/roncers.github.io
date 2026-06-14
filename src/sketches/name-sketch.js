import p5 from "p5"

// should depend on screen sizes
const CONGLOMERATION_FACTOR = 0.12
const MOUSE_REPULSION = 50
const PARTICLE_WEIGHT = 2
const SPRINGY_FORCE_MAX = 0.06

// text should be separated in 2 lines when tab-port

export default function sketch(p, parent) {
  let font
  let particles = []

  p.setup = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight


    p.createCanvas(w, h)

    p.loadFont("/Roboto-Black.ttf", (loadedFont) => {
      font = loadedFont

      const text = "Martín Roncero"
      const fontSize = w * 0.12

      p.textFont(font)
      p.textSize(fontSize)

      const bounds = font.textBounds(text, 0, 0)
      const x = (w - bounds.w) / 2
      const y = h / 2 + bounds.h / 2

      const points = font.textToPoints(text, x, y, {
        sampleFactor: CONGLOMERATION_FACTOR,
      })

      particles = points.map((pt) => new Particle(p, pt.x, pt.y))
    })
  }

  let sprFactor = 0
  let count = 0
  p.draw = () => {
    p.background(28, 28, 28)

    if (sprFactor >= SPRINGY_FORCE_MAX) {
      sprFactor = p.random(0.035, SPRINGY_FORCE_MAX)
    } else if (count % 2 === 0) {
      sprFactor += 0.001
    }
    count++

    for (const particle of particles) {
      particle.update(sprFactor)
      particle.show()
    }
  }

  p.mousePressed = () => {
    particles.push(new Particle(p, p.mouseX, p.mouseY, p.mouseX, p.mouseY))
  }

  p.windowResized = () => {
    const w = parent.clientWidth
    const h = parent.clientHeight
    p.resizeCanvas(w, h)

    // Recalculate text position/size
    const fontSize = w * 0.12
    p.textSize(fontSize)
    const bounds = font.textBounds("Martín Roncero", 0, 0)
    const x = (w - bounds.w) / 2
    const y = h / 2 + bounds.h / 2
    const points = font.textToPoints("Martín Roncero", x, y, {
      sampleFactor: CONGLOMERATION_FACTOR,
    })
    particles = points.map((pt) => new Particle(p, pt.x, pt.y))
  }
}

class Particle {
  constructor(p, targetX, targetY, startX, startY) {
    this.p = p

    this.target = p.createVector(targetX, targetY)

    this.pos = p.createVector(
      startX ?? p.random(p.width),
      startY ?? p.random(p.height),
    )

    this.vel = p.createVector(0, 0)
    this.acc = p.createVector(0, 0)

    this.noiseOffset = p.random(500)
  }

  update(springFactor) {
    const p = this.p

    let force = p5.Vector.sub(this.target, this.pos)

    force.mult(springFactor)

    const mouse = p.createVector(p.mouseX, p.mouseY)

    const distToMouse = p5.Vector.dist(this.pos, mouse)

    if (distToMouse < MOUSE_REPULSION) {
      const repelForce = p5.Vector.sub(this.pos, mouse)

      repelForce.setMag(3)

      this.vel.add(repelForce)
    }

    const floatX = p.map(p.noise(this.noiseOffset), 0, 1, -0.5, 0.5)

    const floatY = p.map(p.noise(this.noiseOffset + 1000), 0, 1, -0.5, 0.5)

    this.vel.add(p.createVector(floatX, floatY))

    this.noiseOffset += 0.05

    this.vel.mult(0.9)
    this.vel.add(force)
    this.pos.add(this.vel)
  }

  show() {
    const p = this.p

    p.stroke(250, 251, 253)
    p.strokeWeight(PARTICLE_WEIGHT)
    p.point(this.pos.x, this.pos.y)
  }
}
