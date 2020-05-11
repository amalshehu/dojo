class Complex {
  a: number
  b: number

  constructor(_a: number, _b: number) {
    this.a = _a
    this.b = _b
  }

  conjugate() {
    return new Complex(this.a, -this.b)
  }

  negate() {
    return new Complex(-this.a, -this.b)
  }

  magnitude() {
    return Math.sqrt(this.a * this.a + this.b * this.b)
  }

  add(num: Complex) {
    return new Complex(this.a + num.a, this.b + num.b)
  }

  scale(s: number) {
    return new Complex(s * this.a, s * this.b)
  }

  multiply(num: Complex) {
    let real = this.a * num.a - this.b * num.b
    let imaginary = this.a * num.b + this.b * num.a
    return new Complex(real, imaginary)
  }
}

export { Complex }
