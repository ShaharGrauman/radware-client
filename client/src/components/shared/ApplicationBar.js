import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { faThermometerHalf, faPlus, faCopy, faEdit, faUserShield, faUserFriends, faUserTag, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import CreateOrEditSignatureWizard from '../signature/CreateOrEditSignatureWizard';
import ResearcherDashboard from '../reports/SearchSignature/ResearcherDashboard';
import AdminDashboard from '../admin/AdminDashboard';
import Audit from '../admin/Audit';
import NewUserDashboard from '../admin/NewUserDashboard';
import RolesDashboard from '../admin/RolesDashboard';
import SearchSignature from '../reports/SearchSignature/SearchSignature';
import QADashboard from '../reports/QADashboard/QADashboard';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

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
            value: 0,
            loginDetails: {
                userId: loginDetails.id,
                username: loginDetails.username,
                roles: loginDetails.roles.map(role => role.name)
            }
        };

        this.topMenuAllItems = [
            { visibleFor: ['manual_qa', 'performance_qa', 'automation_qa'], label: 'QA Dashboard', icon: <FontAwesomeIcon icon={faCopy} size="2x" />, component: <QADashboard /> },
            { visibleFor: ['researcher'], label: 'Researcher Dashboard', icon: <FontAwesomeIcon icon={faCopy} size="2x" />, component: <ResearcherDashboard /> },
            { visibleFor: ['researcher'], label: 'Search Signatures', icon: <FontAwesomeIcon icon={faSearch} size="2x" />, component: <SearchSignature /> },
            { visibleFor: ['admin'], label: 'Users', icon: <FontAwesomeIcon icon={faUserShield} size="2x" />, component: <AdminDashboard /> },
            { visibleFor: ['admin'], label: 'Roles', icon: <FontAwesomeIcon icon={faUserTag} size="2x" />, component: <RolesDashboard /> },
            { visibleFor: ['admin'], label: 'Audit', icon: <FontAwesomeIcon icon={faEdit} size="2x" />, component: <Audit /> }
        ];

        this.topMenuVisibleItems = this.topMenuAllItems.filter(topMenuItem => topMenuItem.visibleFor.some(role => this.state.loginDetails.roles.includes(role)));

        Promise.all([this.getStatuses(), this.getAttacks()]).then(([statuses, attacks]) => {
            this.statuses = statuses;
            this.attacks = attacks;
        });
    }

    a11yProps = index => {
        return {
            id: `scrollable-force-tab-${index}`, 'aria-controls': `scrollable-force-tabpanel-${index}`,
        };
    }

    classes = makeStyles(theme => (
        { root: { flexGrow: 1, width: '100%', backgroundColor: theme.palette.background.paper } }
    ));

    setValue = newValue => {
        this.setState({ value: newValue });
    }

    handleChange = (event, newValue) => {
        this.setValue(newValue);
    };

    logout = () => {
        this.setState({ loginDetails: this.guestUser });
        localStorage.removeItem('loginDetails');
        window.location.reload();
    }

    getStatuses = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:3001/getStatuses').then(response => resolve(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }

    getAttacks = () => {
        return new Promise((resolve, reject) => {
            try {
                axios.get('http://localhost:3001/getAttacks').then(response => resolve(response.data));
            } catch (error) {
                reject(error);
            }
        });
    }

    render() {
        return (
            <div style={{ marginTop: '70px' }}>
                <AppBar position="fixed" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                        aria-label="scrollable force tabs example"
                    >
                        {
                            this.topMenuVisibleItems.map((topMenuItem, index) =>
                                <Tab label={topMenuItem.label} icon={topMenuItem.icon} {...this.a11yProps(index)} />)
                        }
                        <div style={{ paddingLeft: '20px', display: 'table', height: '70px' }}>
                            <div style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                                {
                                    this.state.loginDetails.username && <span>
                                        Welcome, {this.state.loginDetails.username}
                                        <br />
                                        <a href="#" onClick={this.logout}>Logout</a>
                                    </span>
                                }
                                {
                                    !this.state.loginDetails.username && <span>
                                        Welcome, Guest
                                        <br />
                                        <a href="login">Login</a>
                                    </span>
                                }
                            </div>
                        </div>
                    </Tabs>
                </AppBar>
                <div style={{ marginTop: '50px' }}>
                    {
                        this.topMenuVisibleItems.map((topMenuItem, index) =>
                            <TabPanel value={this.state.value} index={index}>
                                {topMenuItem.component}
                            </TabPanel>
                        )
                    }
                </div>
            </div >
        );
    }
}


