  precision highp float;
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;
  
  varying vec2 vTexCoord;
  
  uniform mat4 uProjectionMatrix;
  uniform mat4 uModelViewMatrix;

  void main() {
    vTexCoord = aTexCoord;
    // This accurately maps p5 pixel geometry to WebGL clip space
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
  }