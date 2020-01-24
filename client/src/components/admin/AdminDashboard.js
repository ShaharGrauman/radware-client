import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from '../Table';

export default class App extends React.Component {
  usersData = [
    {SeqID: 1, Username: 'rawan', Phone: '0524660335', Role: ['Admin'], Status: 'active'},
    {SeqID: 2, Username: 'alex', Phone: '0524660335', Role: ['Researcher', ', QA'], Status: 'active'},
    {SeqID: 3, Username: 'amin', Phone: '0524660335', Role: ['Researcher', ', QA'], Status: 'active'},
    {SeqID: 4, Username: 'ahmad', Phone: '0524660335', Role: ['Researcher', ', QA'], Status: 'active'}
  ];
  tableHeaders = ["SeqID", 'Username ', 'Phone ', "Role ", "Status "];

  render() {
    return (
        <>
      <div>
         
        <div className="ml-3 mb-3">
          <h2>Admin Dashboard</h2>
        </div>
        <div className="ml-2 mb-3">
          <button type="button" className="ml-2 mr-4 btn btn-secondary">New user</button>
          <button type="button" className="btn btn-secondary">Roles Managment</button>
        </div>

        <div className="container ml-0">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" >
              <Table header={this.tableHeaders} data={this.usersData}
                className="col-lg-12 col-md-12 col-sm-12 col-xs-12" ></Table>
            </div>
          </div></div>
      </div>
</>

    );
  }



}

ReactDOM.render(<App />, document.getElementById('root'));


