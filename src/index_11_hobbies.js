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
          this.state.hobbies.map(function(hobby){
            return <li onClick={function(e){              
              this.setState({
                selectedHobby: hobby,
                selectedHobbies: this.state.selectedHobbies.concat([hobby])
              });
            }.bind(this)}>{hobby}</li>
          }.bind(this))
        }
      </ol>
      <div>
        Selected Hobby is: {this.state.selectedHobby}
      </div>
      <div>
        Selected Hobbies:
        {
          this.state.selectedHobbies.map(function(hobby){
            return <p>{hobby}</p>
          })
        }
      </div>
    </div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
