import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hobbies: ["Surfing", "Plumbing", "Coding"],
      selectedHobby: "",
      selectedHobbies: []
    };

    this.newHobby = '';

    this.onNewHobby = this.onNewHobby.bind(this);
    //this.addNewHobby = this.addNewHobby.bind(this);
  }

  onNewHobby(e){
    this.newHobby = e.target.value;
  }

  addNewHobby = () => {
    this.setState({
      hobbies: this.state.hobbies.concat([this.newHobby])
    });
  }

  render() {
    return (
      <div>
        <ol>
          {this.state.hobbies.map(hobby => (
            <li
              onClick={e =>
                this.setState({
                  selectedHobby: hobby,
                  selectedHobbies: this.state.selectedHobbies.concat([hobby])
                })
              }
            >
              {hobby}
            </li>
          ))}
        </ol>
        <div>Selected Hobby is: {this.state.selectedHobby}</div>
        <div>
          Selected Hobbies:
          {this.state.selectedHobbies.map(hobby => (
            <p
              onClick={e => {
                const filteredHobbies = this.state.selectedHobbies.filter(
                  hby => hby != hobby
                );
                this.setState({ selectedHobbies: filteredHobbies });
              }}
            >
              {hobby}
            </p>
          ))}
          <div>
            <input type="text" onChange={this.onNewHobby}></input>
            <button onClick={this.addNewHobby}>Add</button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
