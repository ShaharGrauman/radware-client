import React from "react";
import ReactDOM from "react-dom";

function alertStudent(name){
    alert(`You clicked ${name}`);
}

function Student(props) {
  return (
    <div onClick={function(){
        alertStudent(props.name);
    }}>
      <h2>Student Details</h2>
      <div>Name: {props.name}</div>
      <div>Age: {props.age}</div>
      <div>Course: {props.course}</div>
    </div>
  );
}

function App() {
    const students = [
        {name: 'Shahar', age: 30, course: 'JavaScript'},
        {name: 'Muhamad', age: 21, course: 'React'},
        {name: 'Mamun', age: 22, course: 'Node'}
    ];
  return (
    <>
    {
        students.map(function(student){
            return <Student 
                        name={student.name} 
                        age={student.age} 
                        course={student.course} />
        })
    }
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
