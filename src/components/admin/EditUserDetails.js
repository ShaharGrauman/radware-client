import React from 'react';
import EditUser from './EditUser';
import { withRouter } from 'react-router-dom'
import { getRolesEdit } from '../../api/controllers/admin';

class EditUserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            user: null,
            id: []
        }
    }

    async componentDidMount() {
        const id = this.props.match.params;
        this.setState({ id });
        const data = await getRolesEdit(id.id);
        this.setState({ user: data });
    }

    render() {
        return (
            <div className="container" >
                {
                    this.state.user && <div className="row">
                        <EditUser
                            id={this.state.id}
                            user={this.state.user}
                        />
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(EditUserDetails);