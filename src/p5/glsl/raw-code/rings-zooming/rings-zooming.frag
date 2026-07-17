#version 100
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
