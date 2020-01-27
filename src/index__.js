import React from "react";
import ReactDOM from "react-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import StudentForm from './StudentForm';

class App extends React.Component {
  
  render() {
    return (
      <StudentForm />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
