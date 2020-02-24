import React from 'react';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


export default class NotificationIsCreated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewClicked: false,
            isAdmminClicked: false
        }
    }
    isclickNew = () => {
        this.setState({ isNewClicked: this.state.isNewClicked = true })
    }
    isclickAdmin = () => {
        this.setState({ isAdmminClicked: this.state.isAdmminClicked = true })
    }
    render() {
        return (
            <div>
                <div class="alert alert-success text-center">
                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                    <strong className="ml-2">{`${this.props.page}`} created successfully</strong>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={this.isclickNew}>Create New {`${this.props.page}`}</button>
                    </div>
                    <div class="col-md-12">
                        <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.isclickAdmin}>Admin dashboard</button>
                    </div>
                </div>
                <div>
                </div>
                {this.state.isNewClicked && <Redirect to='/newuser' />}
                {this.state.isAdmminClicked && <Redirect to='/users' />}
            </div>
        )
    }
}

