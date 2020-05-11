import p5 from "p5"
import React from "react"

export interface IProps {
  renderer: (renderer: p5) => void
  onP5Changed?: (renderer: p5) => void
  isRunning: boolean
  speed?: number
}

export default class P5Wrapper extends React.Component<IProps, {}> {
  public canvas?: p5
  private wrapper: React.RefObject<HTMLDivElement> = React.createRef()


  public componentDidMount() {
    this.setSketch(this.props)
  }

  componentDidUpdate = () => {
  }

  public render() {
    return <div ref={this.wrapper} />
  }

  public changeSketch(renderer: any) {
    const current = this.wrapper.current;
    if (current) {
      if (current.childNodes[0]) {
        current.removeChild(current.childNodes[0])
      }
      this.canvas = new p5(renderer, current)
    }
  }

  private setSketch(props: IProps) {
    const current = this.wrapper.current;
    if (current) {
      if (current.childNodes[0]) {
        current.removeChild(current.childNodes[0])
      }
      this.canvas = new p5(props.renderer, current)
      if (props.onP5Changed) {
        props.onP5Changed(this.canvas)
      }
    }
  }
}
