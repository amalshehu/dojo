import { mandlebrot, willConverge } from "../src/mandlebrot"

test("start with [0, 0] when c is [0, 0]", () => {
  expect(mandlebrot([0, 0], [0, 0])).toEqual([0, 0])
})

test("start with [0, 0] when c is [1, 0]", () => {
  expect(mandlebrot([0, 0], [1, 0])).toEqual([1, 0])
})

test("start with [0, 0] when c is [-1, 0]", () => {
  expect(mandlebrot([0, 0], [-1, 0])).toEqual([-1, 0])
})

test("start with [-1, 0] when c is [-1, 0]", () => {
  expect(mandlebrot([-1, 0], [-1, 0])).toEqual([0, 0])
})

test("start with [0, 0] when c is [10, 10]", () => {
  expect(mandlebrot([0, 0], [10, 10])).toEqual([10, 10])
})

test("start with [1, 1] when c is [1, 1]", () => {
  expect(mandlebrot([1, 1], [1, 1])).toEqual([1, 3])
})

test("start with [2, 3] when c is [4, 5]", () => {
  expect(mandlebrot([2, 3], [4, 5])).toEqual([-1, 17])
})

test("test for convergence for [-1, 0] @ 20th iteration", () => {
  expect(willConverge([-1, 0], 20)).toEqual(true)
})

test("test for convergence for [-0.75, 1] @ 6th iteration", () => {
  expect(willConverge([-0.75, 1], 3)).toEqual(false)
})
