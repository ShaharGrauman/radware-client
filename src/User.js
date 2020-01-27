import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-4">
            <img src={this.props.avatar} className="card-img" alt={this.props.name}></img>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <p className="card-text">
                <FontAwesomeIcon 
                    icon={faArrowAltCircleUp}
                    onClick={(e) => this.props.onVote(this.props.id)}
                ></FontAwesomeIcon>(
                {this.props.score})
              </p>
              <p className="card-text">{this.props.description}</p>
              <p className="card-text">
                <small className="text-muted">
                  Last updated {this.props.lastUpdateTime}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
