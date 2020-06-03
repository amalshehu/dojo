import { setup, draw } from "./conway"

export const sketch = s => {
  s.setup = () => setup(s)
  s.draw = () => draw(s)
}
