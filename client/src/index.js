import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import EditUserDashbaord from '.components/admin/EditUserDashbaord';
import NewUserDashbaord from '.components/admin/NewUserDashbaord';
import AdminDashbaord from './components/AdminDashboard';
import NewRole from './components/admin/NewRole';
import Audit from './components/admin/Audit';
import Roles from './components/admin/RoleList';
import LogIn from './components/admin/LogIn';

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
                    <Route path="/">
                        <AdminDashbaord />
                    </Route>
                </Switch>
            </BrowserRouter>
             );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
