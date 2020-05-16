function mandelbrot(z, c, i) {
  const xx = z[0] * z[0]
  const yy = z[1] * z[1]
  const xy = z[0] * z[1]

  const nz = [xx - yy + c[0], 2 * xy + c[1]]
  if (xx + yy > 4 || i === 0) {
    return [i, xx + yy]
  }

  return mandelbrot(nz, c, i - 1)
}

const width = 800
let B = 2

let start_points = [-B, B]
let step = B / (width / 2)

function setup() {
  createCanvas(width, width)
  noLoop()
}

function draw() {
  background('#000000')

  scale(1)
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      const x = start_points[0] + step * i
      const y = start_points[1] - step * j

      const z = [0, 0]
      const c = [x, y]
      const [wg, ds] = mandelbrot(z, c, 19)

      stroke(213, 255, 0, (20 - wg) * 5 * 2.55)
      if (ds <= 4) {
        stroke(255, 255, 255)
      }
      point(i, j)
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < width) {
    const x = start_points[0] + step * mouseX
    const y = start_points[1] - step * mouseY

    B = B * 0.9
    step = B / (width / 2)

    start_points[0] = x - step * mouseX
    start_points[1] = y + step * mouseY

    redraw()
  }
}
