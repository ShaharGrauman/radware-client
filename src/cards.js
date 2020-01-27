import React from "react";
import ReactDOM from "react-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import User from './User';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [{
        id: 1,
        name: "Mustafa",
        avatar: "images/avatar.jpg",
        score: 24,
        description: "Marhaba, I love Avatars...",
        lastUpdateTime: new Date().toLocaleString("he-IL")
      },
      {
        id: 2,
        name: "Suhir",
        avatar: "images/avatar.jpg",
        score: 19,
        description: "Hello, I love Avatars...",
        lastUpdateTime: new Date().toLocaleString("he-IL")
      },
      {
        id: 3,
        name: "Shahar",
        avatar: "images/avatar2.png",
        score: 11,
        description: "Shalom, I love Avatars...",
        lastUpdateTime: new Date().toLocaleString("he-IL")
      },
      {
        id: 4,
        name: "Muhamad",
        avatar: "images/avatar2.png",
        score: 10,
        description: "Ahalan, I love Avatars...",
        lastUpdateTime: new Date().toLocaleString("he-IL")
      }]
    };
  }

  onVote = userId => {
    console.log(userId);
  }

  render() {
    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-7">
            <img src="images/weneedyou.jpg"></img>
          </div>
          <div className="col-md-5">
            {
              this.state.users.map(user => (
                <User 
                  id={user.id}
                  name={user.name}
                  description={user.description}
                  avatar={user.avatar}
                  score={user.score}
                  lastUpdateTime={user.lastUpdateTime}
                  onVote={this.onVote} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
