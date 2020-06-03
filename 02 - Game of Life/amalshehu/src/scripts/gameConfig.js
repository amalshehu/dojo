import { roundDim } from "./util"

const canvasDiv = document.getElementById("main")

const width = 1000 || roundDim(canvasDiv.offsetWidth)
const height = 1000 || roundDim(canvasDiv.offsetHeight)
const [rows, columns] = [roundDim(height / 20), roundDim(width / 20)]
const speed = 60
const cellWidth = roundDim(width / columns)
const cellHeight = roundDim(height / rows)
const settings = {
  width,
  height,
  rows,
  columns,
  speed,
  cellWidth,
  cellHeight,
}
export { settings }
