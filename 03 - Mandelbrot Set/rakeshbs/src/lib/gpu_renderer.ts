import * as p5 from "p5"
import { MANDEL_VERTEX_SHADER, MANDEL_FRAGMENT_SHADER } from "./shaders"

export default function(renderer: p5) {
  const MAX_ITERATIONS = 50
  let scale = 1.0
  let viewPortX = -0.5
  let viewPortY = 0
  let viewPortWidth = 3
  let viewPortHeight = viewPortWidth
  let mandelShader: p5.Shader

  renderer.preload = () => {}

  renderer.setup = () => {
    let size = Math.min(window.innerWidth / 1.5, window.innerHeight / 1.5)
    renderer.createCanvas(size, size, renderer.WEBGL)
    mandelShader = renderer.createShader(
      MANDEL_VERTEX_SHADER,
      MANDEL_FRAGMENT_SHADER
    )

    scale = 1.0
    viewPortX = 0
    viewPortY = 0
    viewPortWidth = 3
    viewPortHeight = viewPortWidth
  }

  let frames = 0

  renderer.draw = () => {
    renderer.shader(mandelShader)
    renderer.noStroke()
    let offset = [-0.74364388703, 0.13182]
    mandelShader.setUniform("offset", offset)
    let zoom = renderer.exp(-5 + 6 * renderer.sin((1.5 * frames) / 300))
    mandelShader.setUniform("zoom", zoom)
    let k = 1
    renderer.quad(-k, -k, k, -k, k, k, -k, k)
    if (frames % 100 === 0) {
      console.log("FPS :" + renderer.frameRate())
    }
    frames++
  }

  renderer.windowResized = () => {
    let size = Math.min(window.innerWidth, window.innerHeight)
    renderer.resizeCanvas(size, size)
  }
}
