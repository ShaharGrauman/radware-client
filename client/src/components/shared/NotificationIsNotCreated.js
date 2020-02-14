import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { Link, Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


class NotificationIsNotCreated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewClicked: false,
            isAdmminClicked: false,
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
                <div class="alert alert-danger text-center">
                <i><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon></i>
                    <strong className="ml-2">The network connection is lost please try again</strong>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <button type="button" class="btn btn-outline-primary btn-block" onClick={this.isclickNew}>Create new signature</button>
                    </div>
                    <div class="col-md-12">
                        <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.isclickAdmin}>Researcher dashboard</button>
                    </div>
                </div>
                <div>
                </div>
                {this.state.isNewClicked && <Redirect to='/createOrEditSignature' />}
                {this.state.isAdmminClicked && <Redirect to='/researcher-dashboard' />}
            </div>
        )
    }
}

export default function () {
    return (
        store.addNotification({
            content: NotificationIsNotCreated,
            container: 'top-center',
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 0,
            }
        })
    )
}