import React from "react";

import axios from 'axios';


import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

import Table from '../../shared/Table';

export default class ResearcherDashboard extends React.Component {
 state={currentButton:"all"}

  constructor(props){
    super(props);
    this.state={
      dataFilter:'All Singatures ',
      data : [
        {patternId: '', description: ''},

      ],
      inProgress:true,
      inTest:true,
      inQa:true,
      publish:true,
      suspend:true,
      all:true,
      errorMsg:''
    }

  }
  loadData= async(filter)=>{
    
    const isClicked=this.state[filter]
    if(isClicked&&filter!='all'){
      this.setState({dataFilter:`${filter} Signature`,[filter]:false})
      this.setState({dataFilter:`${filter} Signature`,[filter]:true})
    }else{
     this.setState({dataFilter:`All Signature`,[filter]:true})
     filter='';
    }
    try{
      const {data} = await axios.get(`http://localhost:3001/signature/${filter}`, 
                                        this.state, 
                                        {withCredentials: true});
      console.log('loadData',filter,data);
      this.setState({data: data});
            
    
    }catch(error){
        this.setState({
          errorMsg: 'Inalid email or password'
        });
    }
  }
  selectButton=(value)=>{
    let {currentButton}=this.state;
    if (currentButton === value) currentButton = 'all';
    else currentButton=value;
    this.loadData(value);
    this.setState({currentButton});
  
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
        <div className="ml-2 mt-3">{this.state.dataFilter} by Create Date</div>
        <div className="container ml-0">
          <div className="row">
            <div className="col-7">
            <div className="row">
              <Table data={this.state.data} />
            </div>
            <div className="row mx-auto">
          <div className="col">
            <div className="row">
              <div className="col-2"></div>
              <div className="col" onClick={()=>console.log('Prev')}>
                <span className="fas">
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    
                  ></FontAwesomeIcon>{" "}
                  Previous
                </span>
              </div>
              <div className="col "></div>
              <div className="col" onClick={()=>console.log('Next')}>
                <span className="fas">
                  Next{" "}
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    
                  ></FontAwesomeIcon>
                </span>
              </div>
              <div className="col-2"></div>

            </div>
          </div>
        </div>

            </div>
            <div className="col">
              <div className="container ">
                <div className="row">
                  <div className="col">
                    Version status
                    <button
                      type="button"
                      className={this.state.currentButton==="inProgress"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>this.selectButton("inProgress")}
                    
                    >
                      <i className="fas fa-star"></i> In progress
                    </button>
                    <button
                      type="button"
                      className={this.state.currentButton==="inTest"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>this.selectButton("inTest")}
                    
                    >
                      <i className="fas fa-star-half-alt"></i> In test
                    </button>
                    <button
                      type="button"
                      className={this.state.currentButton==="inQa"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>this.selectButton("inQa")}
                                          >
                      <i className="fas fa-star-half"></i> In QA
                    </button>
                  </div>
                  <div className="col">
                    Production status
                    <button
                      type="button"
                      className={this.state.currentButton==="Published"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>this.selectButton("Published")}
                    >
                      <i className="far fa-star"></i> Published
                    </button>
                    <button

                        type="button"
                      className={this.state.currentButton==="Suspended"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>this.selectButton("Suspended")}

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
