#version 100
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
