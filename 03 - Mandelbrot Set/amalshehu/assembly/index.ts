// The entry file of your WebAssembly module.
export function add(a: i32, b: i32): i32 {
  // console.log(a + b)
  return a + b
}

export function nextIteration(z1: f64, z2: f64, c1: f64, c2: f64): string {
  const a = z1
  const b = z2
  const x = a ** 2 - b ** 2
  const y = 2 * a * b
  var arr = new Array<f64>(2)
  arr[0] = x + c1
  arr[1] = y + c2
  return arr.toString()
}

// function belongsToMandelbrot(x, y) {
//   let z = [0, 0]
//   const c = [x, y]
//   for (let i = 0; i < 20; i++) {
//     if (
//       z.reduce((a, b) => {
//         return a ** 2 + b ** 2
//       }, 0) >= 4
//     )
//       return false
//     z = nextIteration(z, c) //  z(n+1) = z(n)^2+ c
//   }
//   return true
// }
