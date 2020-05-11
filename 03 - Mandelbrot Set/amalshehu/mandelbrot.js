const WIDTH = 1000
const HEIGHT = 1000
const cellSize = 1
const config = {
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: PIXI.utils.string2hex("#DAF7A6"),
  antialias: true,
  resolution: window.devicePixelRatio || 1,
}
const app = new PIXI.Application(config)
const container = new PIXI.Container()

container.filters = [new PIXI.filters.NoiseFilter()]
app.stage.scale.x = 1.3
app.stage.scale.y = 1.3

document.body.appendChild(app.view)
for (let i = 0; i < WIDTH ** 2; i++) {
  const x = (i % WIDTH) * cellSize
  const y = Math.floor(i / HEIGHT) * cellSize
  const color = pickMandelbrotColor(x, y)
  if (color !== "#DAF7A6") fillPixel(color, x, y)
}

function fillPixel(color, x, y) {
  const graphics = new PIXI.Graphics()
    .beginFill(PIXI.utils.string2hex(color))
    .drawRect(x, y, cellSize, cellSize)
    .endFill()
  container.addChild(graphics)
  app.stage.addChild(container)
}


function nextIteration(z, [c1, c2] = c) {
  const [x, y] = z.reduce((a, b) => [a ** 2 - b ** 2, 2 * a * b])
  return [x + c1, y + c2]
}

function belongsToMandelbrot(x, y) {
  let z = [0, 0]
  const c = [x, y]
  for (let i = 0; i < 100; i++) {
    if (z.reduce((a, b) => a ** 2 + b ** 2) > 4) return false
    z = nextIteration(z, c) //  z(n+1) = z(n)^2+ c
  }
  return true
}

function pickMandelbrotColor(x, y) {
  const [a, b] = [x, y].map((m) => (m - WIDTH / 2) / (WIDTH / 4))
  return belongsToMandelbrot(a, b) ? "#C70039" : "#DAF7A6"
}
