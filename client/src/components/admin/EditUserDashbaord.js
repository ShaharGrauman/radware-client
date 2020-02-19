import React from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import RoleList from './RolesDashboard';
import RegisterEdit from './RegisterEdit';
import axios from 'axios';
import { getRolesEdit } from '../../api/controllers/admin';

class EditUserDashbaord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            user: [],
            id:[]
        }
    }

    async componentWillMount() {
        const id = this.props.match.params;
        this.setState({id});
        const data = await getRolesEdit(id.id);
        this.setState({ user: data });
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <h1>Edit User</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <RegisterEdit 
                            id={this.state.id}
                            user={this.state.user}
                             />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(EditUserDashbaord);