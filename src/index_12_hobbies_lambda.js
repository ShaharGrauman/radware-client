import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hobbies: ['Surfing', 'Plumbing', 'Coding'],
      selectedHobby: '',
      selectedHobbies: []
    };
  }

  render() {
    return <div>
      <ol>
        {
          this.state.hobbies.map(hobby => <li onClick={e =>               
              this.setState({
                selectedHobby: hobby,
                selectedHobbies: this.state.selectedHobbies.concat([hobby])
              })
          }>{hobby}</li>)
        }
      </ol>
      <div>
        Selected Hobby is: {this.state.selectedHobby}
      </div>
      <div>
        Selected Hobbies:
        {
          this.state.selectedHobbies.map(hobby => <p>{hobby}</p>)
        }
      </div>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
