import React from 'react';
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom';
import RoleList from './RolesDashboard';
import RegisterEdit from './RegisterEdit';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
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
        console.log('id : ', id);
        const data = await getRolesEdit(id.id);
        // const {data} = await axios.get(`http://localhost:3001/users/${id.id}`);
        this.setState({ user: data });
        // console.log(this.state.user)
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