import React from "react";
import ReactDOM from "react-dom";

function Student(props) {
  return (
    <div>
      <h2>Student Details</h2>
      <div>Name: {props.name}</div>
      <div>Age: {props.age}</div>
      <div>Course: {props.course}</div>
    </div>
  );
}

function App() {
  return (
    <>
      <Student name="Shahar" age="30" course="JavaScript" />
      <Student name="Mohamand" age="21" course="React" />
      <Student name="Mamun" age="22" course="Node" />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
