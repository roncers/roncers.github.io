  #version 100
  precision highp float;

  varying vec2 vTexCoord;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform float u_seed;

  vec3 getFlagColor(int index) {
    if (index == 0) return vec3(0.384,0.278,0.667);
    if (index == 1) return vec3(0.059,0.639,0.694);
    if (index == 2) return vec3(0.635,0.98,0.639);
    if (index == 3) return vec3(0.443,0.38,0.937);
    return vec3(0.886,0.451,0.588);
  }

  void main() {

    vec2 uv = gl_FragCoord.xy/u_resolution;
    const int arrayLength = 5;
    
    vec3 finalFlag = vec3(0.0);
    float rangeIni = 0.;
    float rangeStep = 1. / float(arrayLength);

    float range;
    
    for (int i = 0; i < arrayLength; i++) {
        vec3 currentColor = getFlagColor(i);
        range = step(rangeIni, uv.x);
        rangeIni += rangeStep + cos(float(i) * 2. + u_time);
        finalFlag = mix(finalFlag, currentColor, range);
    }
    
    gl_FragColor = vec4(finalFlag, 1.0);
  }