import * as p5 from "p5"
import { Complex } from "./complex"

export default function(renderer: p5) {
  const MAX_ITERATIONS = 350
  let scale = 1.0
  let viewPortX = -0.5
  let viewPortY = 0
  let viewPortWidth = 3
  let viewPortHeight = viewPortWidth
  let pivot = new Complex(0, 0)

  renderer.setup = () => {
    let size = Math.min(window.innerHeight, window.innerHeight)
    renderer.pixelDensity(1.0)
    renderer.createCanvas(size, size)
    renderer.noLoop()
    scale = 1.0
    viewPortX = 0
    viewPortY = 0
    viewPortWidth = 3
    viewPortHeight = viewPortWidth
  }

  let checkConvergence = (n: Complex): number => {
    let z = n
    let i = 0
    for (i = 0; i < MAX_ITERATIONS; i++) {
      z = z.multiply(z).add(n)
      if (z.magnitude() > 5.0) break
    }
    return i
  }

  renderer.keyPressed = () => {
    scale = 1.0
    pivot = new Complex(0, 0)
    renderer.redraw()
  }

  renderer.mouseClicked = _ => {
    let posX = renderer.map(
      renderer.mouseX,
      0,
      renderer.width,
      (viewPortX - viewPortWidth / 2) * scale + pivot.a,
      (viewPortX + viewPortWidth / 2) * scale + pivot.a
    )
    let posY = renderer.map(
      renderer.mouseY,
      0,
      renderer.height,
      (viewPortY - viewPortHeight / 2) * scale + pivot.b,
      (viewPortY + viewPortHeight / 2) * scale + pivot.b
    )
    let point = new Complex(posX, posY)
    pivot = point
    scale = 0.4 * scale
    renderer.redraw()
  }

  renderer.draw = () => {
    renderer.background(255)

    let density = renderer.pixelDensity()
    let width = renderer.width
    let height = renderer.height
    let xmin = viewPortX - viewPortWidth / 2
    let xmax = viewPortX + viewPortWidth / 2
    let ymin = viewPortY - viewPortHeight / 2
    let ymax = viewPortY + viewPortHeight / 2
    let dx = (xmax - xmin) / (width * density)
    let dy = (ymax - ymin) / (height * density)
    renderer.loadPixels()
    let x = xmin
    let y = ymin

    for (let i = 0; i < width * density; i++) {
      y = ymin
      for (let j = 0; j < height * density; j++) {
        let c = new Complex(x, y).scale(scale).add(pivot)
        let iterations = checkConvergence(c)
        let bright = 255 - renderer.map(iterations, 0, MAX_ITERATIONS, 0, 255)
        let pos = 4 * (j * width * density + i)
        renderer.pixels[pos] = bright
        renderer.pixels[pos + 1] = bright
        renderer.pixels[pos + 2] = bright
        renderer.pixels[pos + 3] = 255
        y += dy
      }
      x += dx
    }
    renderer.updatePixels()
  }

  let HSVtoRGB = (h: number, s: number, v: number) => {
    let r = 0,
      g = 0,
      b = 0,
      i,
      f,
      p,
      q,
      t
    i = Math.floor(h * 6)
    f = h * 6 - i
    p = v * (1 - s)
    q = v * (1 - f * s)
    t = v * (1 - (1 - f) * s)
    switch (i % 6) {
      case 0: {
        r = v
        g = t
        b = p
        break
      }
      case 1: {
        r = q
        g = v
        b = p
        break
      }
      case 2: {
        r = p
        g = v
        b = t
        break
      }
      case 3: {
        r = p
        g = q
        b = v
        break
      }
      case 4: {
        r = t
        g = p
        b = v
        break
      }
      case 5: {
        r = v
        g = p
        b = q
        break
      }
    }
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }
}
