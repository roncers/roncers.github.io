precision highp float;

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform float u_time;

#define TWO_PI 6.28318530718

vec3 hsb2rgb(vec3 c) {
    vec3 rgb = clamp(
        abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
        0.0,
        1.0
    );

    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

vec2 rotate(vec2 uv, vec2 pivot, float angle) {
    uv -= pivot;

    float s = sin(angle);
    float c = cos(angle);
    mat2 rotation = mat2(c, -s, s, c);

    uv *= rotation;
    return uv + pivot;
}

void main() {
    vec2 fragCoord = vTexCoord * u_resolution;
    vec2 st = (fragCoord - 0.5 * u_resolution) / u_resolution.y;

    st = rotate(st, vec2(0.0), u_time + sin(u_time / 1.5));

    float paintRadius = 0.325 + cos(u_time / 1.5) * 0.125;
    vec2 toCenter = -st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter) / paintRadius;

    float hue = (angle / TWO_PI) + 0.5;
    hue = pow(hue, 5.75 + cos(u_time / 5.) * 5.0);
    vec3 color = hsb2rgb(vec3(hue, radius, 1.0));
    color *= smoothstep(length(st) - 0.015, length(st), paintRadius);

    // TODO: fix the border
    // float borderWidth = 0.01 + cos(u_time / 1.5) * 0.005;
    // float d = length(st) - borderWidth;
    // float aa = 0.00025;
    // float outer = 1.0 - smoothstep(paintRadius, paintRadius + aa + 0.01, d);
    // float inner = 1.0 - smoothstep(
    //     paintRadius -  borderWidth,
    //     paintRadius - aa,
    //     d
    // );

    // color = mix(color, vec3(1.0), outer - inner);

    gl_FragColor = vec4(color, 1.0);
}