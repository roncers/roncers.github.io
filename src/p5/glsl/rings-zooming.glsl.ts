import type p5 from "p5";

const vertexShader = `
precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

void main() {
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`;

const fragmentShader = `
precision highp float;

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 fragCoord = vTexCoord * u_resolution;

    vec2 uv = (fragCoord - 0.5 * u_resolution) / u_resolution.y;

    float movement = -abs(sin(u_time / 3.0));

    float d = fract(length(uv) * (10.0 * movement));

    vec3 ring = vec3(
        smoothstep(-0.005, 0.45, d - fragCoord.x / 10000.0)
    );

    gl_FragColor = vec4(ring, 1.0);
}
`;

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