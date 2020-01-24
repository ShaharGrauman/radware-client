import React from 'react';

import RoleList from './RoleList';

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
                            <form>
                                <label>Personal info</label>
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" placeholder="Search by name" />
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">
                                            Search
                                </button>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label for="Fname">First name :</label>
                                    <input className="form-control" type="text" name="firstname" id="Fname" />
                                </div>

                                <div className="form-group">
                                    <label for="Lname">Last name :</label>
                                    <input className="form-control" type="text" name="lastname" id="Lname" />
                                </div>

                                <div className="form-group">
                                    <label for="PhoneEdit"> Phone :</label>
                                    <input className="form-control" type="text" name="phone" id="PhoneEdit" />
                                </div>

                                <div className="form-group">
                                    <label for="emailEdit">Email address :</label>
                                    <input type="email" className="form-control" id="emailEdit" aria-describedby="emailHelp" placeholder="name@example.com" disabled />
                                </div>

                                <div className="form-group">
                                    <label for="passEdit">Password :</label>
                                    <input type="password" className="form-control" id="passEdit" />
                                    <a href=" "> Reset password</a>
                                </div>

                                <p>Select role :</p>
                                <div>
                                    <RoleList />
                                </div>
                            </form>

                            <button type="button" className="btn btn-secondary btn-block">Save</button>
                            <button type="button" className="btn btn-secondary  btn-block mb-2">Cancel</button>

                            <div>
                                <button type="button" className="col-sm-4 btn btn-outline-danger justify-content-center btn mb-2"> Delete user</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
