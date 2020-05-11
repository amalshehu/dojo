import p5 from "p5"
import { config } from "./config"
import { willConverge } from "./mandlebrot"

const sketch = s => {
  s.setup = () => {
    s.createCanvas(config.width, config.height)
    s.background(23)
    s.noLoop()
  }

  const state = {
    scaleFactor: 1,
    shiftX: -3.5,
    shiftY: -2,
  }

  s.draw = () => {
    console.log("draw")

    drawPoints(32)
    // drawInLayers(23)
  }

  const drawInLayers = (n: number) => {
    for (let i = 0; i < n; i++) {
      drawPoints(i)
    }
  }

  const drawPoints = (n: number) => {
    let width = config.width
    let height = config.height

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        drawPoint(
          i,
          j,
          width,
          height,
          state.scaleFactor,
          `rgba(255, 255, 255, 0.8)`,
          n,
          state.shiftX,
          state.shiftY
        )
      }
    }
  }

  s.mouseClicked = () => {
    state.scaleFactor *= 1.5
    let { shiftX, shiftY, scaleFactor } = state

    let multiplier = 2 / scaleFactor
    let _x = (s.mouseX / config.height) * multiplier + state.shiftX
    let _y = (s.mouseY / config.height) * multiplier + state.shiftY

    state.shiftX = _x
    state.shiftY = _y

    s.background(23)
    s.redraw()
  }

  const drawPoint = (
    x: number,
    y: number,
    width: number = config.width,
    height: number = config.height,
    scaleFactor: number = 1,
    color: string = "rgba(255, 255, 255)",
    n: number = 20,
    coordinateXStart: number = config.coordinateXStart,
    coordinateYStart: number = config.coordinateYStart
  ) => {
    let multiplier = 4 / scaleFactor
    let _x = (x / height) * multiplier + coordinateXStart
    let _y = (y / height) * multiplier + coordinateYStart

    if (willConverge([_x, _y], n)) {
      s.stroke(color)
      s.point(x, y)
    }
  }
}

new p5(sketch)
