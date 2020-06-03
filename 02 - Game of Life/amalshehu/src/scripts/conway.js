import { P5 } from "./index"
import { roundDim, isValidIndex } from "./util"
import { settings } from "./gameConfig"

let isPaused = false
let generation = 0
const state = generateGrid(settings.rows, settings.columns)
const colorMap = { alive: 255, dead: 0 }

function getNeighbours(i, j, m, n) {
  const neighbours = [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ]
  return neighbours.filter(cellIdx => isValidIndex(...cellIdx, m, n))
}

function generateCell(c, x, y, i, j, s) {
  return {
    color: c,
    prevColor: 666,
    nextColor: null,
    location: { x, y },
    gridIdx: { i, j },
    shape: s,
    strength: 0,
    neighbours: getNeighbours(i, j, settings.rows, settings.columns),
  }
}

function drawCell(data) {
  const { prevColor, color, location } = data
  if (prevColor !== color) {
    P5.fill(colorMap[color])
    P5.rect(
      location.x,
      location.y,
      settings.cellWidth,
      settings.cellHeight,
      settings.cellWidth / 10
    )
  }
}

function generateRow(y, n, idx) {
  return Array.from({ length: n }, (x, i) => i).map(j =>
    generateCell("dead", settings.cellWidth * j, y, idx, j, "rect")
  )
}

function drawRow(data) {
  data.map(drawCell)
}

function generateGrid(m, n) {
  return Array.from({ length: m }, (x, i) => i).map(j => {
    return generateRow(settings.cellHeight * j, n, j)
  })
}

function drawGrid(data) {
  data.map(drawRow)
}

function isCellAlive(cellState) {
  return cellState.color !== "dead"
}
function getCellHealth(cellColor, aliveNeighbours) {
  if (
    (cellColor !== "dead" && 2 <= aliveNeighbours && aliveNeighbours <= 3) ||
    (cellColor === "dead" && aliveNeighbours === 3)
  ) {
    // Considering weak / strong as the part of main algo.
    if (aliveNeighbours < 2 || aliveNeighbours > 4) {
      return "weak"
    }
    if (aliveNeighbours === 3) {
      return "strong"
    }
    return "alive"
  }
  return "dead"
}

function conwayPrepareCell(cellState) {
  const { i, j } = cellState.gridIdx
  const neighbourCells = cellState.neighbours.map(nl => state[nl[0]][nl[1]])
  const aliveNeighbours = neighbourCells.filter(isCellAlive).length
  state[i][j] = {
    ...cellState,
    strength: aliveNeighbours,
    nextColor: getCellHealth(cellState.color, aliveNeighbours),
  }
}

function conwayUpdateCell(cellState) {
  const { i, j } = cellState.gridIdx
  state[i][j] = {
    ...cellState,
    prevColor: cellState.color,
    color: cellState.nextColor,
  }
}

function conwayTransformGrid(gridState) {
  gridState.map(rowState =>
    rowState.map(cellState => conwayPrepareCell(cellState))
  )

  gridState.map(rowState =>
    rowState.map(cellState => conwayUpdateCell(cellState))
  )
}

function makeAcron(x, y) {
  const acronArray = [
    [x, y],
    [x, y + 1],
    [x + 2, y + 1],
    [x + 1, y + 3],
    [x, y + 4],
    [x, y + 5],
    [x, y + 6],
  ]
  acronArray.map(acron => {
    const [i, j] = acron
    state[i][j] = {
      ...state[i][j],
      prevColor: state[i][j].color,
      color: "alive",
    }
  })
}

makeAcron(roundDim(settings.rows / 2), roundDim(settings.columns / 2))

function togglePlay() {
  isPaused = !isPaused
}
export function setup(p) {
  colorMap["alive"] = p.color("#673ab7")
  colorMap["strong"] = p.color("#ff1e56")
  colorMap["dead"] = p.color(40)
  const canvas = p.createCanvas(settings.width, settings.height)
  canvas.parent("main")
  P5.frameRate(settings.speed)
  P5.stroke(40)
  P5.pixelDensity(5)
  drawGrid(state, p)
}

export function draw() {
  if (!isPaused) {
    conwayTransformGrid(state)
    drawGrid(state)
    generation += 1
    document.getElementById("time").innerText = (performance.now() / 1000)
      .toFixed(2)
      .toString()
    document.getElementById("generation").innerText = generation.toString()
    document.getElementById("frameRate").innerText = P5.frameRate()
      .toFixed(2)
      .toString()
  }
}

function findCellIndex(x, y) {
  const i = Math.floor(y / cellHeight)
  const j = Math.floor(x / cellWidth)
  return [i, j]
}

function mouseClicked(event) {
  if (isPaused) {
    const { x, y } = canvas.getBoundingClientRect()
    const cellIndex = findCellIndex(event.x - x, event.y - y)
    const [i, j] = cellIndex
    state[i][j] = {
      ...state[i][j],
      prevColor: state[i][j].color,
      color: state[i][j].color === "alive" ? "dead" : "alive",
    }
    drawGrid(state)
  }
  return false
}

function keyPressed(e) {
  if (keyCode === 32) {
    togglePlay()
  }
  window.scrollTo(0)
}
