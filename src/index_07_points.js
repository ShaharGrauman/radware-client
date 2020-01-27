import React from "react";
import ReactDOM from "react-dom";

function Point(props) {
  return (
    <div>
      ({props.x}, {props.y})
    </div>
  );
}

function App() {
  const points = [
    { x: 5, y: 5 },
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 7, y: 7 }
  ];

  return (
    <div>
      <button onClick={function() {
        console.log(points);
        points[0].x++;
        points[0].y++;
      }}>Add 1 to random point</button>

      {points.map(function(point) {
        return <Point x={point.x} y={point.y} />;
      })}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
