import React from "react";
import ReactDOM from "react-dom";

function Point(props) {
  return (
    <div>
      ({props.x}, {props.y})
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      point: { x: 5, y: 5 }
    };
  }

  render() {
    return (
      <div>
        <button
          onClick={function() {
            this.setState({
              point: { 
                x: this.state.point.x+1, 
                y: this.state.point.y+1  
              }
            })
          }.bind(this)}
        >
          Add 1 to random point
        </button>

        <Point x={this.state.point.x} y={this.state.point.y} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
