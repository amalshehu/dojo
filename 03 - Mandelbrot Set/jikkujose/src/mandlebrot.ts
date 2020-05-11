import { config } from "./config"

export const mandlebrot = ([x, y], [cX, cY]) => {
  return [x * x - y * y + cX, 2 * x * y + cY]
}

export const willConverge = ([cX, cY], n = config.iterationCount) => {
  let x = 0,
    y = 0,
    radiusSquare = 0

  for (let i = 0; i < n; i++) {
    ;[x, y] = mandlebrot([x, y], [cX, cY])
    radiusSquare = x * x + y * y

    if (radiusSquare > 4) {
      return false
    }
  }

  return true
}
