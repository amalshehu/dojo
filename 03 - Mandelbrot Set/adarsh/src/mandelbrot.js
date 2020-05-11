// // return number of iterations made on f(z) = z^2 + C

class MandelbortSet {
  constructor(x, y, maxIter) {
    this.x = x
    this.y = y
    this.maxIter = maxIter
  }

  iterate() {
    let iter = 0
    let a = 0
    let b = 0

    for (iter = 0; iter < this.maxIter; iter++) {
      let aSquareMinusbSquare = a * a - b * b
      let twoAB = 2 * a * b
      a = aSquareMinusbSquare + this.x // x is the C in f(z) = z^2 + C
      b = twoAB + this.y // y is the C in f(z) = z^2 + C
      if (sq(a) + sq(b) > 4) {
        // break if the number is diverging
        break
      }
    }
    return iter
  }
}
