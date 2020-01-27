import React from "react";

import Table from './Table';

export default class ResearcherDashboard extends React.Component {
  constructor(props){
    super(props);

    this.data = [
        {patternId: 'Giacomo Guilizzoni', description: 'this is a sample description that can be viewed in tha table'},
        {patternId: 'Marco Botton', description: ''},
        {patternId: 'Mariah Maclochlan', description: ''},
        {patternId: 'Valerie Liberty', description: ''}
      ];
  }
  render() {
    return (
      <>
        <h2 className="ml-2 mb-3">Researcher dashboard</h2>
        <div>
          <button type="button" className="ml-2 mr-4 btn btn-secondary">
            New
          </button>
          <button
            className="btn btn-secondary dropdown-toggle mr-4"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Export
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              1
            </a>
            <a className="dropdown-item" href="#">
              2
            </a>
            <a className="dropdown-item" href="#">
              3
            </a>
          </div>

          <button type="button" className="btn btn-secondary">
            Search
          </button>
        </div>
        <div className="ml-2 mt-3">Singatures by Create Date</div>
        <div className="container ml-0">
          <div className="row">
            <div className="col-7">
              <Table data={this.data} />
            </div>
            <div className="col">
              <div className="container ">
                <div className="row">
                  <div className="col">
                    Version status
                    <button
                      type="button"
                      className="mt-3 btn btn-outline-secondary btn-block text-left"
                    >
                      <i className="fas fa-star"></i> In progress
                    </button>
                    <button
                      type="button"
                      className="mt-3 btn btn-outline-secondary btn-block  text-left"
                    >
                      <i className="fas fa-star-half-alt"></i> In test
                    </button>
                    <button
                      type="button"
                      className="mt-3 btn btn-outline-secondary btn-block  text-left"
                    >
                      <i className="fas fa-star-half"></i> In QA
                    </button>
                  </div>
                  <div className="col">
                    Production status
                    <button
                      type="button"
                      className="mt-3 btn btn-outline-secondary btn-block text-left"
                    >
                      <i className="far fa-star"></i> Published
                    </button>
                    <button
                      type="button"
                      className="mt-3 btn btn-outline-secondary btn-block text-left"
                    >
                      <i className="fas fa-exclamation-triangle"></i> Suspended
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
