import React, { Component } from "react";
import axios from 'axios'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';


import Table from "./Table";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import SeverityRange from "./SeverityRange";
import AttackTypeSelection from "./AttackTypeSelection";
import AttackStatusSelection from "./AttackStatusSelection";
import SearchRefinement from "./SearchRefinement";
import VulnerabilityDefinition from "./VulnerabilityDefinition";
import ScanAtCheckBoxes from "./ScanAtCheckBoxes";
import RefrencesSelection from "./RefrencesSelection";

export default class SearchSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [
        { patternID: "AAA", description: "CCC" },
        { patternID: "AAA", description: "CCC" },
        { patternID: "AAA", description: "CCC" }
      ],
      isRefined: false
    };
    this.data = {
      slider: 2
    };
    this.switchers = [];
  }
  onSearch = async e => {
    
    const response = await axios.get('http://localhost:3001/');
    console.log(response);
  }


  sortArrByKey(arr, key) {
    let sorted = arr.sort();
    console.log(sorted);
    this.setState({ tableData: sorted });
    return sorted;
  }

  update = val => {
    this.data.slider = val;
    console.log(val);
  };

  addSwitcher = switcher => {
    this.switchers.push(switcher);
  }

  switchAll = () => {
    this.switchers.forEach(switcher => switcher());
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 className="mx-md-3 mt-2 mx-lg-5">Search Signatures</h1>
        <form>
        <div className="row mt-3 mx-auto">
          <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
            <div className="form-group has-search">

            <InputGroup>
              <input
                id="searchBox"
                type="text"
                className="form-control form-rounded"
                placeholder="Search"
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                <FontAwesomeIcon icon={faSearch} onClick={this.onSearch}/>
              </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
          {/* <SearchRefinement onChange={this.switchAll}/> */}
          <Button color="secondary" id="toggler" style={{ marginBottom: '1rem' }} onClick={this.switchAll}>
              Refine your search
          </Button>
          </div>
        </div>
        <div>

            <UncontrolledCollapse toggler="#toggler">
              <Card>
                <CardBody>
                <div className="row mx-auto py-2">
                  <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                    <AttackTypeSelection connectTo={this.addSwitcher}/        >

                    <div className="py-3">
                      <SeverityRange slidingRangeV={this.update} connectTo={this.addSwitcher}/>
                    </div       >

                    <AttackStatusSelection connectTo={this.addSwitcher}/>
                  </div       >

                  <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                    <span className="row">
                      <span className="col-12">
                        <VulnerabilityDefinition connectTo={this.addSwitcher}/>
                      </span>
                    </span>
                    <div className="py-3">
                      <ScanAtCheckBoxes connectTo={this.addSwitcher}/>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                    <RefrencesSelection connectTo={this.addSwitcher}/>

                  </div>
                </div       >

                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>

        </form>
        <div className="row mx-auto">
          <div className="col-sm-12 col-md-11 mx-sm-1 mx-md-3 mx-lg-5 py-4">
            <Table data={this.state.tableData} />
            <div className="row">
              <div className="col-2 col-sm-2 col-md-3 col-lg-4 mx-sm-2 mx-md-3 mx-lg-0"></div>
              <div className="col-3 col-sm-3 col-md-2">
                <span className="fas">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={this.props.preOnClick}
                  ></FontAwesomeIcon>{" "}
                  Previous
                </span>
              </div>
              <div className="col-1 col-lg-0 mx-2 mx-sm-2 mx-md-0"></div>
              <div className="col-3 col-sm-2">
                <span className="fas">
                  Next{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    onClick={this.props.nextOnClick}
                  ></FontAwesomeIcon>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}