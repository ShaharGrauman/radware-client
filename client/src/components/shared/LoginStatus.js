import React, { Component } from 'react';

export default class LoginStatus extends Component {
    render() {
        return (
            <div style={{ paddingLeft: '20px', display: 'table', height: '70px' }}>
                <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                    {
                        this.props.loginDetails.username && <span>
                            Welcome, {this.props.loginDetails.username}
                            <br />
                            <a href="/" onClick={this.props.logout}>Logout</a>
                        </span>
                    }
                    {
                        !this.props.loginDetails.username && <span>
                            Welcome, Guest
                            <br />
                            <a href="login">Login</a>
                        </span>
                    }
                </div>
            </div>
        );
    }
}
