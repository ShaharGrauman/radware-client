import React from "react";
import ReactDOM from "react-dom";

function Counter(props){
  return <h2>counting {props.count}</h2>;
}

function App() {
  let counter = 0;
  return (
    <div>
      <h1>Counter</h1>
      <Counter count={counter} />
      <button onClick={function(){
        counter++;
        console.log(counter);
      }}>+1</button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
