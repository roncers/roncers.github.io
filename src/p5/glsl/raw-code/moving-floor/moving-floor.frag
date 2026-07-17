#version 100
precision highp float;

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform float u_time;

float plot(float fn) {
    return smoothstep(0.0, 0.015, fn);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
    vec2 fragCoord = vTexCoord * u_resolution;

    float EXPANSION = 2.0;
    vec2 uv = fragCoord / u_resolution.xy * EXPANSION - EXPANSION / 2.0 + vec2(0.0, 0.9);
    uv.y *= u_resolution.y / u_resolution.x;
    float angle = u_time / 300.0;
    float s = sin(angle);
    float c = cos(angle);
    mat2 rotation = mat2(c, -s, s, c);
    uv *= rotation;

    uv += vec2(u_time / (u_resolution / 44.0));

    uv = fract(uv * 4.5);

    float randomVal = hash(uv + floor(u_time));

    float fx = 1.0 - abs(pow(uv.x, 1.0));
    float base = abs(uv.y);
    float timeShift = u_time / 2.0;
    vec2 targetPos = vec2(0.005, 0.5) + vec2(0.0, abs(sin(timeShift)) * uv.y - 0.5);
    float yLine = length(uv - targetPos);
    float aux = abs(sin(timeShift) * uv.x);
    if (aux < 0.01) {
        aux = -2.0;
    }

    vec2 targetXPos = vec2(0.0, 0.5) + vec2(aux, 0.0);
    float xLine = length(uv - targetXPos);

    vec3 col = vec3(plot(abs(uv.y - fx))) * vec3(plot(base)) * vec3(plot(yLine)) * vec3(plot(xLine));

    gl_FragColor = vec4(col, 1.0);
}
