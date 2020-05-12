import { config, WIDTH, HEIGHT, scaleFactor, cellSize } from "../../config"
import {
  Graphics,
  utils,
  Application,
  Container,
  Text,
  TextStyle,
} from "pixi.js"

const app = new Application(config)
const container = new Container()
const { renderer, stage } = app
let loopCount = 0
initGraphics()
// const loopText = addText()

function addText() {
  const style = new TextStyle({
    fill: ["#ffffff", "#00ff99"],
    stroke: "#4a1850",
  })
  const text = new Text(`Loop: ${loopCount}`, style)
  text.x = 50
  text.y = 200
  app.stage.addChild(text)
  return text
}

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
  //   loopText.text = `Loop: ${loopCount++}`
}
