import React from 'react';

import RoleList from './RolesDashboard';
import Register from './Register';

export default class EditUserDashbaord extends React.Component {
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
                            <Register/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
