import React, { Component } from "react";
import axios from 'axios'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';




// import MultiSelectField from './MultiSelectField'

import Table from "../../shared/Table";


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
import { object } from "prop-types";


export default class SearchSignature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasNext:true,
      hasPrev:false,
      page: 1,
      tableData: [
        { patternID: "AAA", description: "CCC" },
        { patternID: "AAA", description: "CCC" },
        { patternID: "AAA", description: "CCC" }
      ],
      isRefined: false,
      errorMsg:''
    };
    this.urlDetails={
      page: 1 ,
      size: 20,
    };
    this.data = {
      slider: 2
    };
    this.switchers = [];
  }
  onSearch = async e=> {
    let requestURL='http://localhost:3000/search';
    Object.keys(this.urlDetails).forEach(key=>{
      if(Array.isArray(this.urlDetails[key])){
        this.urlDetails[key].forEach(value=>
          requestURL=requestURL.concat(`&${key}=${value}`)
          )
      }else{
      requestURL=requestURL.concat(`&${key}=${this.urlDetails[key]}`)
      }
      })
    requestURL.slice(1)
    console.log(requestURL)
    
    // try{
    //   const {data} = await axios.get(requestURL,{withCredentials: true});
    //   this.setState({errorMsg: '',role:data.role});
    
    // }catch(error){
    //   this.setState({
    //     errorMsg: 'Inalid email or password'
    //   });
    // }

    // const response = await axios.get('http://localhost:3001/');
  }


  sortArrByKey(arr, key) {
    let sorted = arr.sort();
    this.setState({ tableData: sorted });
    return sorted;
  }

  update = val => {
    this.data.slider = val;
  };

  addSwitcher = switcher => {
    this.switchers.push(switcher); 
  }
  switchAll = () => {
    this.switchers.forEach(switcher => switcher());
  }


  urlUpdate= (key , value) =>{
    if(value==""){
      delete this.urlDetails[key]
    }
    else{
    this.urlDetails[key]=value;
  }
  }

  onSelect = (key, value) => {
    this.urlUpdate(key, value);
  }
  onEnter = e =>{
    if(e.key=='Enter'){
      this.onSearch()
    }

  }

  render() {
    return (      //onKeyPress={(e)=>e.key=='Enter'?this.onSearch:null}
      <div className="container-fluid" onKeyPress={this.onEnter}>
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
                onBlur  ={e=>this.urlUpdate('description',e.target.value)}
              />
              <InputGroupAddon addonType="append" style={{cursor:'pointer'}}>
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
                    <AttackTypeSelection connectTo={this.addSwitcher} onSelect={this.urlUpdate}/>

                    <div className="py-3">
                      <SeverityRange slidingRangeV={this.update} connectTo={this.addSwitcher} onSelect={this.urlUpdate}/>
                    </div >
                    <AttackStatusSelection connectTo={this.addSwitcher} onSelect={this.urlUpdate}/>
                  </div>

                  <div className="col-12 col-sm-6 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                    <span className="row">
                      <span className="col-12">
                        <VulnerabilityDefinition connectTo={this.addSwitcher} onSelect={this.urlUpdate}/>
                      </span>
                    </span>
                    <div className="py-3">
                      <ScanAtCheckBoxes connectTo={this.addSwitcher} onSelect={this.urlUpdate}/>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-5 col-lg-3 mx-md-3 mx-lg-5">
                    <RefrencesSelection connectTo={this.addSwitcher} onSelect={this.urlUpdate}/>

                  </div>
                </div>

                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>

        </form>
        <div className="row mx-auto">
          <div className="col-sm-12 col-md-11 mx-sm-1 mx-md-3 mx-lg-5 py-4">
            <Table data={this.state.tableData} />
            <div className="row">
              <div className="col-1 col-sm-1 col-md-2 col-lg-3 mx-sm-1 mx-md-2 mx-lg-0"></div>
              <div className="col-3 col-sm-3 col-md-2 ml-5 " >
                {this.state.hasPrev?
                  <span className="fas" className="noselect ml-5"  onClick={()=>{
                    this.urlDetails.page--;
                    this.setState({page:this.urlDetails.page});
                    this.onSearch();
                    if(this.urlDetails.page==1){
                      this.setState({hasPrev:false})
                    }
                  }}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    onClick={this.props.preOnClick}
                  ></FontAwesomeIcon>{" "}
                  Previous
                </span>
                : null  
              }

              </div>
              <div className="col-1 col-lg-0 mx-2 mx-sm-2 mx-md-0">
            <span class="badge badge-secondary">{this.state.page}</span>

              </div>
              <div className="col-3 col-sm-2">
              {this.state.hasNext?
                <span className="fas" onClick={()=>{
                this.setState({hasPrev:true});
                this.urlDetails.page++;
                this.setState({page:this.urlDetails.page});
                this.onSearch();
                }}>
                  Next{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    onClick={this.props.nextOnClick}
                  ></FontAwesomeIcon>
                </span>          
            :null
            }

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
