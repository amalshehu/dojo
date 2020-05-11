// p5 setup with a canvas and image
function setup() {
  origin = [-0.6, 0]
  range = 3
  maxIter = 100
  canvas = createCanvas(700, 700)
  canvas.parent("sketch-holder")
  pixelDensity(1)
  rectMode(origin)
  img = createImage(width, height)
  renderImage(img, origin, range)
}

// Draw Image in the canvas
function draw() {
  image(img, 0, 0)
  if (isMouseInside()) {
    // Show a small rectangle around the pointer for UX
    rectMode(CENTER)
    noFill()
    stroke(233, 236, 240)
    rect(mouseX, mouseY, 100, 100)
  }
}

// Is mouse inside the canvas/image
// Here width is same for both canvas and Image
function isMouseInside() {
  return mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height
}

// Reset on double click
function doubleClicked() {
  origin = [-0.6, 0]
  range = 3
  renderImage(img, origin, range)
}

// Zoom-in on single click
function mouseClicked() {
  if (isMouseInside()) {
    // origin mapped from mouse cliked co-ordinates to custom range to zoom
    origin = [
      map(mouseX, 0, width, origin[0] - range / 2.0, origin[0] + range / 2.0),
      map(mouseY, 0, height, origin[1] - range / 2.0, origin[1] + range / 2.0),
    ]
    // range is reduced to 1/3rd for zoom function
    range = range / 3.0
    renderImage(img, origin, range)
  }
}

// Select color based on maxIter before function diverges
function setColor(iter, color1, color2) {
  if (iter == maxIter) {
    return color(0, 0, 0)
  } else {
    return lerpColor(color1, color2, map(iter, 0, maxIter, 0, 1))
  }
}

// Change pixel color with black or lerpColor(blend of 2 colors)
function setImagePixels(i, j, color) {
  let pix = 4 * (i * width + j)
  img.pixels[pix + 0] = color.levels[0]
  img.pixels[pix + 1] = color.levels[1]
  img.pixels[pix + 2] = color.levels[2]
  img.pixels[pix + 3] = 255
}

// Render MandelBrot Set image after computation
function renderImage(img, origin, range) {
  let x, y
  img.loadPixels()
  for (let j = 0; j < width; j++) {
    for (let i = 0; i < height; i++) {
      x = map(j, 0, width, origin[0] - range / 2.0, origin[0] + range / 2.0)
      y = map(i, 0, height, origin[1] - range / 2.0, origin[1] + range / 2.0)
      let iter = new MandelbortSet(x, y, maxIter).iterate()
      let col = setColor(iter, color(34, 45, 90), color(204, 255, 102))
      setImagePixels(i, j, col)
    }
  }
  img.updatePixels()
}
