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

const width = 600
let B = 2

let xcenter = 0
let ycenter = 0

let minCover = Math.min(B - Math.abs(xcenter), B - Math.abs(ycenter))
let start_points = [xcenter - minCover, ycenter + minCover]
let step = minCover / (width / 2)

function setup() {
  createCanvas(width, width)
  noLoop()
}

function draw() {
  background('#1a1a1a')

  console.log(minCover, start_points, step)

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

      // stroke(0, 0, 0, wg * 5 * 2.55)
      // if (ds <= 4) {
      //   stroke(255, 255, 255)
      // }
      // point(i, j)
    }
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < width) {
    B = B / 2
    xcenter = start_points[0] + step * mouseX
    ycenter = start_points[1] - step * mouseY

    minCover = Math.min(B - Math.abs(xcenter), B - Math.abs(ycenter))
    start_points = [xcenter - minCover, ycenter + minCover]
    step = minCover / (width / 2)

    redraw()
  }
}

function app() {
  const boundaryInp = document.getElementById('boundary')
  const xcenterInp = document.getElementById('xcenter')
  const ycenterInp = document.getElementById('ycenter')

  const updateAndRedraw = (e) => {
    B = parseFloat(boundaryInp.value)
    xcenter = parseFloat(xcenterInp.value)
    ycenter = parseFloat(ycenterInp.value)

    minCover = Math.min(B - Math.abs(xcenter), B - Math.abs(ycenter))
    start_points = [xcenter - minCover, ycenter + minCover]
    step = minCover / (width / 2)
    redraw()
  }

  boundaryInp.addEventListener('change', updateAndRedraw)
  xcenterInp.addEventListener('change', updateAndRedraw)
  ycenterInp.addEventListener('change', updateAndRedraw)
}

app()
