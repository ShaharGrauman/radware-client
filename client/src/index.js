import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import EditUserDashbaord from './components/admin/EditUserDashbaord';
import NewUserDashbaord from './components/admin/NewUserDashboard';
import AdminDashbaord from './components/admin/AdminDashboard';
import NewRole from './components/admin/NewRole';
import Audit from './components/admin/Audit';
import RolesDashboard from './components/admin/RolesDashboard';
import LogIn from './components/admin/LogIn';
// import CreateOrEditSignatureWizard from './components/signature/CreateOrEditSignatureWizard';
import SearchSignature from './components/reports/SearchSignature/SearchSignature';
// import ControlSteps from '../components/shared/ControlSteps';
import QaDashboard from './components/reports/QADashboard/QADashboard'
import CveIdReport from './components/reports/CveIdReport/CveIdReport'

import ResetPassword from './components/admin/ResetPassword';
import CreateOrEditSignatureWizard from './components/signature/CreateOrEditSignatureWizard';
import ResearcherDashboard from './components/reports/SearchSignature/ResearcherDashboard';
import Export from './components/reports/SearchSignature/Export';
import ApplicationBar from './components/shared/ApplicationBar';

import ReactNotifications from 'react-notifications-component'; 

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/edit_user/:id">
                        <EditUserDashbaord />
                    </Route>
                    <Route path="/newuser">
                        <NewUserDashbaord />
                    </Route>
                    <Route path="/admin/roles">
                        <RolesDashboard />
                    </Route>
                    <Route path="/newrole">
                        <NewRole />
                    </Route>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                    <Route path="/audit">
                        <Audit />
                    </Route>
                    <Route path="/researcher">
                        <Audit />
                    </Route>
                    <Route path="/support">
                        <NewRole />
                    </Route>
                    <Route path="/users">
                        <AdminDashbaord />
                    </Route>
                    <Route path="/resetpassword">
                        <ResetPassword />    
                    </Route>  
                     <Route path="/SearchSignature">
                        <SearchSignature />
                    </Route> 
                    <Route path="/researcher-dashboard">
                        <ResearcherDashboard />    
                    </Route>    
                    <Route path="/createOrEditSignature/:id">
                        <CreateOrEditSignatureWizard />
                    </Route>
                    <Route path="/createOrEditSignature">
                        <CreateOrEditSignatureWizard />
                    </Route>
                    <Route path="/QaDashboard">
                        <QaDashboard />
                    </Route> 
                    <Route path="/Export/:type">
                        <Export />
                    </Route> 
                    <Route path="/CveIdReport">
                        <CveIdReport />
                    </Route> 
                    <Route path="/resetPassword">
                        <ResetPassword />
                    </Route>
                    <Route path="/">
                        <ApplicationBar />
                    </Route>
                </Switch>
            </BrowserRouter>
             );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
