const WIDTH = 600
const HEIGHT = 600
const cellSize = 1
const config = {
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: PIXI.utils.string2hex("#363636"),
  resolution: window.devicePixelRatio || 1,
}
const app = new PIXI.Application(config)
const container = new PIXI.Container()

document.body.appendChild(app.view)

for (let i = 0; i < WIDTH ** 2; i++) {
  const x = (i % WIDTH) * cellSize
  const y = Math.floor(i / HEIGHT) * cellSize
  const color = pickMandalbrotColor(x, y)
  if (color !== "#363636") fillPixel(color, x, y)
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
  for (let i = 0; i < 30; i++) {
    if (z.reduce((a, b) => a ** 2 + b ** 2) > 4) return false
    z = nextIteration(z, c) //  z(n+1) = z(n)^2+ c
  }
  return true
}

function pickMandalbrotColor(x, y) {
  const [a, b] = [x, y].map((m) => (m - WIDTH / 2) / (WIDTH / 4))
  return belongsToMandelbrot(a, b) ? "#f79800" : "#363636"
}
