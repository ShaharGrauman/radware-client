import React from 'react';
import { withRouter } from 'react-router-dom'
import { getRolesEdit } from '../../api/controllers/admin';
import EditUser from './EditUser';

class EditUserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            user: null,
            id:[]
        }
    }

    async componentDidMount() {
        const id = this.props.match.params;
        this.setState({id});
        const data = await getRolesEdit(id.id);
        this.setState({ user: data });
    }

    render() {
        return (
            <>
                <div className="container">
                    {/* <div className="row mt-2">
                        <div className="col-md-12">
                            <h1>Edit User</h1>
                        </div>
                    </div> */}
                    {
                    this.state.user && 
                        <div className="row">
                            <div className="col-md-12">
                                <EditUser 
                                id={this.state.id}
                                user={this.state.user}
                                />
                            </div>
                        </div>
                    }
                </div>
            </>
        );
    }
}

export default withRouter(EditUserDetails);