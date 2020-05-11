const WIDTH = 600
const HEIGHT = 600
const cellSize = 1

const app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: PIXI.utils.string2hex("#363636"),
  resolution: window.devicePixelRatio || 1,
})

document.body.appendChild(app.view)
const container = new PIXI.Container()
app.stage.addChild(container)

for (let i = 0; i < WIDTH ** 2; i++) {
  const g = new PIXI.Graphics()
  const x = (i % WIDTH) * cellSize
  const y = Math.floor(i / HEIGHT) * cellSize
  const color = pickMandalbrotColor(x, y)
  if (color !== "#363636") {
    g.beginFill(PIXI.utils.string2hex(color))
    g.drawRect(x, y, cellSize, cellSize)
    g.endFill()
    container.addChild(g)
  }
}

function distanceSquare([a, b] = c) {
  return a ** 2 + b ** 2
}

function complexSquare([a, b] = z) {
  return [a ** 2 - b ** 2, 2 * a * b]
}

function nextIteration(z, [c1, c2] = c) {
  const [x, y] = complexSquare(z)
  return [x + c1, y + c2]
}

function belongsToMandelbrot(x, y) {
  let z = [0, 0]
  const c = [x, y]
  for (let i = 0; i < 20; i++) {
    if (distanceSquare(z) > 4) {
      return false
    }
    z = nextIteration(z, c)
  }
  return true
}

function pickMandalbrotColor(x, y) {
  const [a, b] = [x, y].map((m) => (m - WIDTH / 2) / (WIDTH / 4))
  return belongsToMandelbrot(a, b) ? "#f79800" : "#363636"
}
