import React from "react";
import p5 from "p5";
import gpuRenderer from "./lib/gpu_renderer"
import cpuRenderer from "./lib/cpu_renderer"
import P5Wrapper from "./lib/wrapper";
import "./App.css"

export interface AppState {
  isRunning: boolean
  isWebGL: boolean
}

class App extends React.Component<{}, AppState> {
  p5Ref = React.createRef<P5Wrapper>()

  constructor(props: any) {
    super(props);
    this.state = {
      isRunning: true,
      isWebGL: true
    }
  }

  getRenderer = () => {
    if (this.state.isWebGL) {
      return gpuRenderer
    }
    return cpuRenderer
  }

  getText = () => {
    if (this.state.isWebGL) {
      return "Just Watch"
    } else 
      return "Click on any point to zoom. Press any key to reset. Wait a while to finish processing"
  }


  render() {
    return (
      <div>
        <div>
          {this.getText()}
        </div>
        <div>
          <P5Wrapper renderer={this.getRenderer()} onP5Changed={this.onP5Changed} 
            ref={this.p5Ref}
            isRunning ={this.state.isRunning} />
        </div>
      </div>
    )
  }

  private onP5Changed = (p: p5) => {
    console.log(p)
  };
}

export default App;
