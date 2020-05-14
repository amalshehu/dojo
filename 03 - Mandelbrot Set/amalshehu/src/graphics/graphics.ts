import { config, WIDTH, HEIGHT, scaleFactor, cellSize } from "../../config"
import { Graphics, utils, Application, Container } from "pixi.js"

const app = new Application(config)
const container = new Container()
const { renderer, stage } = app

initGraphics()

function initGraphics() {
  document.body.appendChild(app.view)
  renderer.autoDensity = true
  renderer.resize(WIDTH, HEIGHT)
  stage.scale.x = scaleFactor
  stage.scale.y = scaleFactor
  stage.addChild(container)
}

export function fillPixel(color, x, y) {
  const graphics = new Graphics()
    .beginFill(utils.string2hex(color))
    .drawRect(x, y, cellSize, cellSize)
    .endFill()
  container.addChild(graphics)
}
