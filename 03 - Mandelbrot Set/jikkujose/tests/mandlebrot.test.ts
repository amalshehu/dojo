import { mandlebrot, iterate, willConverge } from "../src/mandlebrot"

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

test("iterate 2 times from [-1, 0]", () => {
  expect(iterate([-1, 0], 2)).toEqual([0, 0])
})

test("iterate 3 times from [-1, 0]", () => {
  expect(iterate([-1, 0], 3)).toEqual([-1, 0])
})

test("iterate 3 times from [1, 0]", () => {
  expect(iterate([1, 0], 3)).toEqual([5, 0])
})

test("iterate 1 times from [1.2, 1]", () => {
  expect(iterate([1.2, 1], 1)).toEqual([1.2, 1])
})

test("iterate 2 times from [1.2, 1]", () => {
  expect(iterate([1.2, 1], 2)).toEqual([1.64, 3.4])
})

test("iterate 3 times from [-0.75, 1]", () => {
  expect(iterate([-0.75, 1], 3)[0]).toBeCloseTo(0.41015625, 5)
  expect(iterate([-0.75, 1], 3)[1]).toBeCloseTo(2.1875, 5)
})

test("iterate 4 times from [-0.75, 1]", () => {
  expect(iterate([-0.75, 1], 4)[0]).toBeCloseTo(-5.36693, 5)
  expect(iterate([-0.75, 1], 4)[1]).toBeCloseTo(2.79443, 5)
})

test("iterate 2 times from [2.1, 1.3]", () => {
  expect(iterate([2.1, 1.3], 2)[0]).toBeCloseTo(4.82, 5)
  expect(iterate([2.1, 1.3], 2)[1]).toBeCloseTo(6.76, 5)
})

test("test for convergence for [-1, 0] @ 20th iteration", () => {
  expect(willConverge([-1, 0], 20)).toEqual(true)
})

test("test for convergence for [-0.75, 1] @ 6th iteration", () => {
  expect(willConverge([-0.75, 1], 3)).toEqual(false)
})
