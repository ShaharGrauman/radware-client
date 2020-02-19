import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';
import {getGuestUser, getUser, logout} from '../../api/controllers/auth';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { faTasks, faCopy, faEdit, faUserShield, faUserTag, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import LoginStatus from './LoginStatus';

export default class ApplicationBar extends Component {
    constructor(props) {
        super(props);

        this.guestUser = getGuestUser();
        const loginDetailsCookie = getUser();
        let loginDetails = this.guestUser;
        if (loginDetailsCookie) {
            loginDetails = JSON.parse(loginDetailsCookie);
        }

        this.state = {
            value: 0,
            loginDetails: {
                userId: loginDetails.id,
                username: loginDetails.username,
                roles: loginDetails.roles.map(role => role.name)
            }
        };

        this.topMenuAllItems = [
            { visibleFor: ['manual_qa', 'performance_qa', 'automation_qa'], label: 'QA Dashboard', icon: <FontAwesomeIcon icon={faTasks} size='2x' />, link: '/QaDashboard' },
            { visibleFor: ['researcher'], label: 'Researcher Dashboard', icon: <FontAwesomeIcon icon={faCopy} size='2x' />, link: '/researcher-dashboard' },
            { visibleFor: ['researcher'], label: 'Search Signatures', icon: <FontAwesomeIcon icon={faSearch} size='2x' />, link: '/SearchSignature' },
            { visibleFor: ['admin'], label: 'Users', icon: <FontAwesomeIcon icon={faUserShield} size='2x' />, link: '/users' },
            { visibleFor: ['admin'], label: 'Roles', icon: <FontAwesomeIcon icon={faUserTag} size='2x' />, link: '/admin/roles' },
            { visibleFor: ['admin'], label: 'Audit', icon: <FontAwesomeIcon icon={faEdit} size='2x' />, link: '/audit' }
        ];
        this.topMenuVisibleItems = this.topMenuAllItems.filter(topMenuItem => topMenuItem.visibleFor.some(role => this.state.loginDetails.roles.includes(role)));
    }

    setActiveTab = newValue => {
        this.setState({ value: newValue });
    }

    logout = () => {
        logout();
        this.setState({ loginDetails: this.guestUser });
    }

    render() {
        return (
            <div style={{ marginTop: '70px', marginBottom: '100px' }}>
                <AppBar position='fixed' color='default'>
                    <Tabs value={this.state.value} variant='scrollable' scrollButtons='on' indicatorColor='primary' textColor='primary' aria-label='scrollable force tabs example'>
                        {
                            this.topMenuVisibleItems.map((topMenuItem, index) =>
                                <NavLink to={topMenuItem.link} activeStyle={{ color: '#3F51B5' }} style={{ padding: 'unset', textDecoration: 'unset' }} onClick={() => this.setActiveTab(index)} className='MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary Mui MuiTab-labelIcon'>
                                    <Tab label={topMenuItem.label} icon={topMenuItem.icon} style={{ textTransform: 'unset' }} />
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
