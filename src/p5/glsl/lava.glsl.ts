import type p5 from "p5"
import vertexShader from "@/p5/glsl/raw-code/lava/lava.vert?raw"
import fragmentShader from "@/p5/glsl/raw-code/lava/lava.frag?raw"
const VELOCITY = 1.0
let timeOffset = 0
let seedOffset = 0

export default function sketch(p: p5, parent: HTMLElement): void {
  let lavaShader: p5.Shader

  p.setup = () => {
    // Notice the third parameter: WE MUST USE WEBGL MODE
    p.createCanvas(parent.clientWidth, parent.clientHeight, p.WEBGL)
    p.noStroke()

    // Compile the shaders inside the GPU
    lavaShader = p.createShader(vertexShader, fragmentShader)
    timeOffset = p.random(0, 10000)
    seedOffset = p.random(0, 10000)
  }

  p.draw = () => {
    p.shader(lavaShader)

    lavaShader.setUniform("u_resolution", [p.width, p.height])
    lavaShader.setUniform("u_time", p.frameCount * VELOCITY + timeOffset)
    lavaShader.setUniform("u_seed", seedOffset)

    p.rect(-p.width / 2, -p.height / 2, p.width, p.height)
  }

  p.windowResized = () => {
    p.resizeCanvas(parent.clientWidth, parent.clientHeight)
  }
}
