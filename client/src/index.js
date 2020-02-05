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

import CreateOrEditSignatureWizard from './components/signature/CreateOrEditSignatureWizard';
import ResearcherDashboard from './components/reports/SearchSignature/ResearcherDashboard';
import Export from './components/reports/SearchSignature/Export';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/edit_user">
                        <EditUserDashbaord />
                    </Route>
                    <Route path="/newuser">
                        <NewUserDashbaord />
                    </Route>
                    <Route path="/roleslist">
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
                    <Route path="/researcher-dashboard">
                        <ResearcherDashboard />    
                    </Route>    
                    <Route path="/SearchSignature">
                        <SearchSignature />
                    </Route> 
                    <Route path="/Export">
                        <Export />
                    </Route> 
                    <Route path="/">
                        <AdminDashbaord />
                    </Route>
                </Switch>
            </BrowserRouter>
             );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
