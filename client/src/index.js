import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import EditUserDashbaord from './components/admin/EditUserDashbaord';
import NewUserDashbaord from './components/admin/NewUserDashbaord';
import AdminDashbaord from './components/admin/AdminDashboard';
import NewRole from './components/admin/NewRole';
import Audit from './components/admin/Audit';
import Roles from './components/admin/RoleList';
import LogIn from './components/admin/LogIn';
import CreateOrEditSignatureWizard from './components/signature/CreateOrEditSignatureWizard';
import SearchSignature from './components/reports/SearchSignature/SearchSignature';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/edit_user">
                        <EditUserDashbaord />
                    </Route>
                    <Route path="/new_user">
                        <NewUserDashbaord />
                    </Route>
                    <Route path="/roles">
                        <Roles />
                    </Route>
                    <Route path="/new_role">
                        <NewRole />
                    </Route>
                    <Route path="/login">
                        <LogIn />
                    </Route>
                    <Route path="/audit">
                        <Audit />
                    </Route>
                    <Route path="/adminDashboard">
                        <AdminDashbaord />
                    </Route>
                    <Route path="/SearchSignature">
                        <SearchSignature />
                    </Route> 
                    <Route path="/createOrEditSignature">
                        <CreateOrEditSignatureWizard />
                    </Route>
                </Switch>
            </BrowserRouter>
             );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
