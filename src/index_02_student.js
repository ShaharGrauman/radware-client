import React from "react";
import ReactDOM from "react-dom";

function Student() {
  return (
    <div>
      <h2>Student Details</h2>
      <div>Name: Shahar</div>
      <div>Age: 27</div>
      <div>Course: JavaScript</div>
    </div>
  );
}

function App() {
  return (
    <>
      <Student />
      <Student />
      <Student />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
