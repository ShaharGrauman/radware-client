import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CreateOrEditSignatureWizard from '../signature/CreateOrEditSignatureWizard';
import ResearcherDashboard from '../reports/SearchSignature/ResearcherDashboard';
import SearchSignature from '../reports/SearchSignature/SearchSignature';
import AdminDashboard from '../admin/AdminDashboard';
import Audit from '../admin/Audit';
import { faThermometerHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewUserDashboard from '../admin/NewUserDashboard';
import RolesDashboard from '../admin/RolesDashboard';

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
        this.state = {
            value: 0
        };
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

    render() {
        return (
            <div className={this.classes.root} style={{ marginTop: '70px' }}>
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
                        <Tab label="Create OR EDIT SIGNATURE" icon={<PhoneIcon />} {...this.a11yProps(0)} />
                        <Tab label="RESEARCHER DASHBOARD" icon={<FavoriteIcon />} {...this.a11yProps(1)} />
                        <Tab label="SEARCH SIGNATURE" icon={<PersonPinIcon />} {...this.a11yProps(2)} />
                        <Tab label="ADMIN DASHBOARD" icon={<HelpIcon />} {...this.a11yProps(3)} />
                        <Tab label="AUDIT" icon={<ShoppingBasket />} {...this.a11yProps(4)} />
                        <Tab label="NEW USER DASHBOARD" icon={<FontAwesomeIcon icon={faThermometerHalf} size="2x" />} {...this.a11yProps(5)} />
                        <Tab label="ROLES DASHBOARD" icon={<ThumbUp />} {...this.a11yProps(6)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <CreateOrEditSignatureWizard />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <ResearcherDashboard />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <SearchSignature />
                </TabPanel>
                <TabPanel value={this.state.value} index={3}>
                    <AdminDashboard />
                </TabPanel>
                <TabPanel value={this.state.value} index={4}>
                    <Audit />
                </TabPanel>
                <TabPanel value={this.state.value} index={5}>
                    <NewUserDashboard />
                </TabPanel>
                <TabPanel value={this.state.value} index={6}>
                    <RolesDashboard />
                </TabPanel>
            </div>
        );
    }
}


