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

float quadraticIn(float t) {
  return t * t;
}

vec3 rainbowColor(int index) {
    if (index == 0) return vec3(1.0, 0.0, 0.0);
    if (index == 1) return vec3(1.0, 0.5, 0.0);
    if (index == 2) return vec3(1.0, 1.0, 0.0);
    if (index == 3) return vec3(0.0, 1.0, 0.0);
    if (index == 4) return vec3(0.0, 1.0, 1.0);
    if (index == 5) return vec3(0.0, 0.0, 1.0);
    if (index == 6) return vec3(0.29, 0.0, 0.51);
    if (index == 7) return vec3(0.93, 0.51, 0.93);
    if (index == 8) return vec3(1.0, 0.1, 1.0);
    if (index == 9) return vec3(0.0, 1.0, 0.5);
    if (index == 10) return vec3(0.5, 0.0, 1.0);
    return vec3(1.0, 0.8, 0.6);
}

void main() {
    vec2 fragCoord = vTexCoord * u_resolution;
    vec2 uv = fragCoord / u_resolution.xy;

    vec2 grid = floor(uv * 2.0);

    vec2 localUV = fract(uv * 2.0);

    if (grid.x == 1.0) localUV.x = 1.0 - localUV.x;
    if (grid.y == 1.0) localUV.y = 1.0 - localUV.y;

    const int arrLength = 12;

    vec3 col = vec3(0.0);
    float rangeIni = 0.0;
    float rangeStep = 1.0 / float(arrLength);
    float rangeEnd = rangeStep;

    float range;

    for (int i = 0; i < arrLength; i++) {
        vec3 currentColor = rainbowColor(i);
        float radius = quadraticIn(abs(sin(u_time)));
        range = smoothstep(rangeIni, rangeEnd, radius * pow(localUV.x, 6.0) * localUV.y);
        rangeIni += rangeStep;
        rangeEnd += rangeStep;
        col = mix(col, currentColor, range);
    }

    gl_FragColor = vec4(col, 1.0);
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