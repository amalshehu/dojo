import { config } from "./config"

export const coordinateTranslator = (
  x: number,
  y: number,
  scaleFactor: number = 1,
  shiftX = 0,
  shiftY = 0
) => {
  let aspectRatio = config.width / config.height
  const multiplier = 4.2 / scaleFactor

  let _y = (y / config.height) * multiplier
  let _x = (x / config.height) * multiplier

  let _shiftX = (aspectRatio * multiplier) / 2 + shiftX
  let _shiftY = multiplier / 2 + shiftY

  return [_x - _shiftX, _y - _shiftY]
}
