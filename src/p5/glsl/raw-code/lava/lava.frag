  #version 100
  precision highp float;

  varying vec2 vTexCoord;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_seed;

  // Corrected Dave Hoskins hash function
  float hash(vec3 p3) {
    p3  = fract(p3 * vec3(0.1031, 0.1030, 0.0973));
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i + vec3(0.0,0.0,0.0)), hash(i + vec3(1.0,0.0,0.0)), f.x),
                   mix(hash(i + vec3(0.0,1.0,0.0)), hash(i + vec3(1.0,1.0,0.0)), f.x), f.y),
               mix(mix(hash(i + vec3(0.0,0.0,1.0)), hash(i + vec3(1.0,0.0,1.0)), f.x),
                   mix(hash(i + vec3(0.0,1.0,1.0)), hash(i + vec3(1.0,1.0,1.0)), f.x), f.y), f.z);
  }

  // HSB to RGB Conversion
  vec3 hsb2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  float random(float x) {
    return fract(sin(x) * 43758.5453123);
  }

  void main() {
    // Map our texture space directly back to real pixel coordinates
    vec2 pos = vTexCoord * u_resolution;

    float offset = random(u_seed);

    vec3 noisePos = vec3(
        pos.x * 0.0025,
        pos.y * 0.0025,
        (u_time + offset) * 0.0025
    );
    
    // Generates a perfectly smooth noise value between 0.0 and 1.0
    float n = noise(noisePos);

    // Pass the noise directly into the Hue component
    vec3 hsbColor = vec3(n, 1.0, 1.0);
    vec3 rgbColor = hsb2rgb(hsbColor);

    gl_FragColor = vec4(rgbColor, 1.0);
  }