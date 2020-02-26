import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { Redirect ,useHistory} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CreateOrEditSignatureWizard from './CreateOrEditSignatureWizard';

export default class NotificationIsCreated extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNewClicked: false,
            isAdmminClicked: false,
        }
    }
    isclickNew = () => {
        this.setState({ isNewClicked:true })
    }
    isclickAdmin = () => {
        this.setState({ isAdmminClicked:true })
    }
    
    render() {
        return (
            <div>
                <div class="row align-items-center  border border-danger p-4">

                    <div class="col-md-3 mt-3 mb-2">

                    </div>

                    <div class="col-md-6 mt-3 mb-4">
                        {
                            this.props.isCreateSignature ?
                                <div class="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">Signature created successfully</strong>
                                </div> :null
                        }
                        {
                             this.props.isErrorSignature ? 
                             <div class="alert alert-danger text-center">
                                 <i><FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon></i>
                                 <strong className="ml-2">{this.props.errors}</strong>
                             </div>:null
                        }
                        {
                            this.props.isUpdatSignature ?
                                <div class="alert alert-success text-center">
                                    <i><FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon></i>
                                    <strong className="ml-2">Signature updated successfully</strong>
                                </div> : null
                        }
                        <div>
                            <button type="button" class="btn btn-outline-primary btn-block mb-2" onClick={this.isclickNew}>Create new signature</button>
                        </div>
                        <div>
                            <button type="button" class="btn btn-outline-secondary btn-block" onClick={this.isclickAdmin}>Researcher dashboard</button>
                        </div>
                    </div>
                    <div>
                        {this.state.isAdmminClicked && <Redirect to='/researcher-dashboard/'/>}
                        {this.state.isNewClicked && <Redirect to='/createOrEditSignature/'/>}
                    </div>
                
                </div>
            </div>

        )
    }
}
