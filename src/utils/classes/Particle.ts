import type p5 from "p5"
import type { ParticleUpdateOptions } from "../../types/p5"

export default class Particle {
  p: p5
  target: p5.Vector
  pos: p5.Vector
  vel: p5.Vector
  acc: p5.Vector
  noiseOffset: number
  force: p5.Vector
  mouseRepelForce: p5.Vector

  constructor(
    p: p5,
    targetX: number,
    targetY: number,
    startX?: number,
    startY?: number,
  ) {
    this.p = p

    this.target = p.createVector(targetX, targetY)

    this.pos = p.createVector(
      startX ?? p.random(p.width),
      startY ?? p.random(p.height),
    )

    this.vel = p.createVector(0, 0)
    this.acc = p.createVector(0, 0)

    this.noiseOffset = p.random(1000)

    this.force = p.createVector(0, 0)
    this.mouseRepelForce = p.createVector(0, 0)
  }

  update(
    springFactor: number,
    { mouse, mouseRepulsionSq }: ParticleUpdateOptions,
    noiseValue: number,
  ): void {
    const p = this.p

    this.force.x = this.target.x - this.pos.x
    this.force.y = this.target.y - this.pos.y

    this.force.mult(springFactor)

    const dx = this.pos.x - mouse.x
    const dy = this.pos.y - mouse.y
    if (dx * dx + dy * dy < mouseRepulsionSq) {
      this.mouseRepelForce.x = this.pos.x - mouse.x
      this.mouseRepelForce.y = this.pos.y - mouse.y
      this.mouseRepelForce.setMag(3)
      this.vel.add(this.mouseRepelForce)
    }

    // maybe check this double noise call.
    const floatX = p.map(
      p.noise(this.noiseOffset),
      0,
      1,
      -noiseValue,
      noiseValue,
    )
    const floatY = p.map(
      p.noise(this.noiseOffset + 10000),
      0,
      1,
      -noiseValue,
      noiseValue,
    )

    this.vel.add(p.createVector(floatX, floatY))

    this.noiseOffset += 0.05

    this.vel.mult(0.9)
    this.vel.add(this.force)
    this.pos.add(this.vel)
  }

  show(): void {
    const p = this.p
    p.point(this.pos.x, this.pos.y)
  }
}
