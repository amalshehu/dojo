export const MANDEL_VERTEX_SHADER = `
  precision highp float; 
  varying vec2 pos;
  attribute vec3 aPosition;
  void main() { 
    vec4 temp = vec4(aPosition,1.0);
    pos = temp.xy; 
    gl_Position = temp;
  }
`

export const MANDEL_FRAGMENT_SHADER = `
  precision highp float; 
  varying vec2 pos;
  const int max = 1000;
  uniform vec2 offset;
  uniform float zoom;

  void main() {
    vec2 c = offset + pos * zoom;
    vec2 z = c;
    float n = 0.0;
    for (int i = 0; i < max; i++){
      if(z.x*z.x+z.y*z.y > 3.0) {
        n = float(max - i)/float(max);
        break;
      }
      z = vec2(z.x*z.x-z.y*z.y, 2.0*z.x*z.y) + c;
    }
    gl_FragColor = vec4(n,n,n, 1.0);
  }
  `
