import type p5 from "p5";
import vertexShader from "@/p5/glsl/raw-code/romboid-rainbow/romboid-rainbow.vert?raw"
import fragmentShader from "@/p5/glsl/raw-code/romboid-rainbow/romboid-rainbow.frag?raw"

export default function sketch(p: p5, parent: HTMLElement): void {
  let shader: p5.Shader;

  p.setup = () => {
    p.createCanvas(parent.clientWidth, parent.clientHeight, p.WEBGL);
    p.noStroke();

    shader = p.createShader(vertexShader, fragmentShader);
  };

  p.draw = () => {
    p.shader(shader);

    shader.setUniform("u_resolution", [p.width, p.height]);
    shader.setUniform("u_time", p.millis() / 1000.0);

    p.rect(-p.width / 2, -p.height / 2, p.width, p.height);
  };

  p.windowResized = () => {
    p.resizeCanvas(parent.clientWidth, parent.clientHeight);
  };
}