import React from "react";
import ReactDOM from "react-dom";

//Function Component
function Counter(props) {
  return <h2>counting {props.count}</h2>;
}

//Class Component
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {counter: 0};
  }
  
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <Counter count={this.state.counter} />
        <button onClick={function() {
            this.setState({counter: this.state.counter+1});
            console.log(this.state.counter);
          }.bind(this)}
        >
          +1
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
