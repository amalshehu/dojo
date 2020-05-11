function roundDim(val) {
  return Math.round(val)
}

const canvasDiv = document.getElementById("main")
const width = roundDim(canvasDiv.offsetWidth)
const height = roundDim(canvasDiv.offsetHeight)

// const [width, height] = [1000, 1000]
const [rows, columns] = [roundDim(height / 20), roundDim(width / 20)]
const speed = 60
const cellWidth = roundDim(width / columns)
const cellHeight = roundDim(height / rows)
let isPaused = false
let generation = 0
const state = generateGrid(rows, columns)

const colorMap = { alive: 255, dead: 0 }

function deadOrAlive() {
  return "dead"
}

function isValidIndex(i, j, m, n) {
  return i >= 0 && i < m && j >= 0 && j < n
}

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
  return neighbours.filter((cellIdx) => isValidIndex(...cellIdx, m, n))
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
    neighbours: getNeighbours(i, j, rows, columns),
  }
}

function drawCell(data) {
  const { prevColor, color, location, gridIdx, shape, strength } = data
  if (prevColor !== color) {
    fill(colorMap[color])
    window[shape](location.x, location.y, cellWidth, cellHeight, cellWidth / 10)
  }
}

//row

function generateRow(y, n, idx) {
  return Array.from({ length: n }, (x, i) => i).map((j) => {
    return generateCell(deadOrAlive(), cellWidth * j, y, idx, j, "rect")
  })
}

function drawRow(data) {
  data.map(drawCell)
}

//grid

function generateGrid(m, n) {
  return Array.from({ length: m }, (x, i) => i).map((j) => {
    return generateRow(cellHeight * j, n, j)
  })
}

function drawGrid(data) {
  data.map(drawRow)
}

//conway

function isCellAlive(cellState) {
  return cellState.color !== "dead"
}
function updateConwayColor(cellColor, aliveNeighbours) {
  if (
    (cellColor !== "dead" && 2 <= aliveNeighbours && aliveNeighbours <= 3) ||
    (cellColor === "dead" && aliveNeighbours === 3)
  ) {
    if (aliveNeighbours < 2 || aliveNeighbours > 4) {
      return "weak"
    } else if (aliveNeighbours === 3) {
      return "strong"
    }
    return "alive"
  }

  return "dead"
}

function conwayPrepareCell(cellState) {
  const { i, j } = cellState.gridIdx
  const neighbourCells = cellState.neighbours.map((nl) => state[nl[0]][nl[1]])
  const aliveNeighbours = neighbourCells.filter(isCellAlive).length
  state[i][j] = {
    ...cellState,
    strength: aliveNeighbours,
    nextColor: updateConwayColor(cellState.color, aliveNeighbours),
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
  gridState.map((rowState) =>
    rowState.map((cellState) => conwayPrepareCell(cellState))
  )

  gridState.map((rowState) =>
    rowState.map((cellState) => conwayUpdateCell(cellState))
  )
}

//p5

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
  acronArray.map((acron) => {
    const [i, j] = acron
    state[i][j] = {
      ...state[i][j],
      prevColor: state[i][j].color,
      color: "alive",
    }
  })
}

// Starting position with 4 acrons

makeAcron(roundDim(rows / 2), roundDim(columns / 2))
// makeAcron(roundDim((3 * rows) / 4), roundDim((3 * columns) / 4))
// makeAcron(roundDim(rows / 4), roundDim((3 * columns) / 4))
// makeAcron(roundDim((3 * rows) / 4), roundDim(columns / 4))

function togglePlay() {
  isPaused = !isPaused
}
function setup() {
  colorMap["alive"] = color("#673ab7")
  colorMap["strong"] = color("#ff1e56")
  colorMap["dead"] = color(40)
  const canvas = createCanvas(width, height)
  canvas.parent("main")
  frameRate(speed)
  stroke(40)
  pixelDensity(5)
  drawGrid(state)
}

function draw() {
  if (!isPaused) {
    conwayTransformGrid(state)
    drawGrid(state)
    generation += 1
    document.getElementById("time").innerText = (performance.now() / 1000)
      .toFixed(2)
      .toString()
    document.getElementById("generation").innerText = generation.toString()
    document.getElementById("frameRate").innerText = window
      .frameRate()
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
