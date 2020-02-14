import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { faCopy, faEdit, faUserShield, faUserTag, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginStatus from './LoginStatus';

export default class ApplicationBar extends Component {
    constructor(props) {
        super(props);

        this.guestUser = { userId: null, username: null, roles: [] };
        const lsLoginDetails = localStorage.getItem('loginDetails');
        let loginDetails = this.guestUser;
        if (lsLoginDetails) {
            loginDetails = JSON.parse(lsLoginDetails);
        }

        this.state = {
            loginDetails: {
                userId: loginDetails.id,
                username: loginDetails.username,
                roles: loginDetails.roles.map(role => role.name)
            }
        };

        this.topMenuAllItems = [
            { visibleFor: ['manual_qa', 'performance_qa', 'automation_qa'], label: 'QA Dashboard', icon: <FontAwesomeIcon icon={faCopy} size="2x" />, link: '/QaDashboard' },
            { visibleFor: ['researcher'], label: 'Researcher Dashboard', icon: <FontAwesomeIcon icon={faCopy} size="2x" />, link: '/researcher-dashboard' },
            { visibleFor: ['researcher'], label: 'Search Signatures', icon: <FontAwesomeIcon icon={faSearch} size="2x" />, link: '/SearchSignature' },
            { visibleFor: ['admin'], label: 'Users', icon: <FontAwesomeIcon icon={faUserShield} size="2x" />, link: '/users' },
            { visibleFor: ['admin'], label: 'Roles', icon: <FontAwesomeIcon icon={faUserTag} size="2x" />, link: '/admin/roles' },
            { visibleFor: ['admin'], label: 'Audit', icon: <FontAwesomeIcon icon={faEdit} size="2x" />, link: '/audit' }
        ];
        this.topMenuVisibleItems = this.topMenuAllItems.filter(topMenuItem => topMenuItem.visibleFor.some(role => this.state.loginDetails.roles.includes(role)));
    }

    setActiveTab = newValue => {
        this.setState({ value: newValue });
    }

    logout = () => {
        this.setState({ loginDetails: this.guestUser });
        localStorage.removeItem('loginDetails');
    }

    render() {
        return (
            <div style={{ marginTop: '70px', marginBottom: '100px' }}>
                <AppBar position="fixed" color="default">
                    <Tabs value={this.state.value} variant="scrollable" scrollButtons="on" indicatorColor="primary" textColor="primary" aria-label="scrollable force tabs example">
                        {
                            this.topMenuVisibleItems.map((topMenuItem, index) =>
                                <NavLink to={topMenuItem.link} activeStyle={{ color: "blue" }} onClick={() => this.setActiveTab(index)} className="MuiButtonBase-root MuiTab-root MuiTab-textColorInherit MuiTab-labelIcon PrivateTabIndicator-root-74 PrivateTabIndicator-colorPrimary-75">
                                    <Tab label={topMenuItem.label} icon={topMenuItem.icon} />
                                </NavLink>
                            )
                        }
                        <LoginStatus loginDetails={this.state.loginDetails} logout={this.logout} />
                    </Tabs>
                </AppBar>
            </div >
        );
    }
}
