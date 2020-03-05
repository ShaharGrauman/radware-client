import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import EditUserDetails from './components/admin/EditUserDetails';
import AdminDashbaord from './components/admin/AdminDashboard';
import NewRole from './components/admin/NewRole';
import Audit from './components/admin/Audit';
import RolesDashboard from './components/admin/RolesDashboard';
import LogIn from './components/admin/LogIn';
import SearchSignature from './components/reports/SearchSignature/SearchSignature';
import QaDashboard from './components/reports/QADashboard/QADashboard';
import CveIdReport from './components/reports/CveIdReport/CveIdReport';
import ResetPassword from './components/admin/ResetPassword';
import CreateOrEditSignatureWizard from './components/signature/CreateOrEditSignatureWizard';
import CreatetSignature from './components/signature/CreatetSignature'
import ResearcherDashboard from './components/reports/SearchSignature/ResearcherDashboard';
import Export from './components/reports/SearchSignature/Export';
import AttacksOrSeverityChart from './components/reports/AttacksOrSeverityChart/AttacksOrSeverityChart';
import ApplicationBar from './components/shared/ApplicationBar';
import EditRole from './components/admin/EditRole';
import Register from './components/admin/Register';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <ApplicationBar />
                <Switch>
                    <Route path="/edit_user/:id">
                        <EditUserDetails />
                    </Route>
                    <Route path="/editrole/:id">
                        <EditRole />
                    </Route>
                    <Route path="/newuser">
                        <Register />
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
                        <SearchSignature />
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
                    <Route path="/createSignature"> 
                        <CreatetSignature/>
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
                    <Route path="/chart/:type">
                        <AttacksOrSeverityChart />
                    </Route> 
                    <Route path="/resetPassword">
                        <ResetPassword />
                    </Route>
                    <Route path="/admin/login">
                        <LogIn />
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
