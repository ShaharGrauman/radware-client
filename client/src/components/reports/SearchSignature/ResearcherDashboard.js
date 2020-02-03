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
      hasNext:true,
      hasPrev:false,
      dataFilter:'All Singatures ',  
      data : [
        { patternID: '', description: ''},
        

      ] ,
      // page:1,
      in_progress:true,
      in_test:true,
      inQa:true,
      Published:true,
      suspended:true,
      all:true,
      currentButton:'all',
      clickedButton:'',
      errorMsg:''
    }
    this.urlDetails={
      page: 1 ,
      size: 20,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(filter){
    let requestURL;
    if (this.state.currentButton == 'all'){
      requestURL=`http://localhost:3001/signature/researcher`;
    }else{
      requestURL=`http://localhost:3001/signature/researcher?status=${filter}`;
      Object.keys(this.urlDetails).forEach(key=>requestURL=requestURL.concat(`&${key}=${this.urlDetails[key]}`))
      requestURL.slice(1)
    }
   
    console.log(requestURL)
    const isClicked=this.state[filter]
    if(isClicked&&filter!='all'){
      this.setState({dataFilter:`${filter} Signature`,[filter]:false})
      this.setState({dataFilter:`${filter} Signature`,[filter]:true})
    }else{
     this.setState({dataFilter:`All Signature`,[filter]:true})
     filter='';
    }
    try{
    axios.get(requestURL).then(res=>{
      console.log(res.data.signatureData);
      if(res.data.signatureData.length == 0){
        this.setState({data: [
          { patternID: '', description: '' }
         
        ]});         
      }else{
        this.setState({data:res.data.signatureData});
      }
      
      })
    }catch(error){
            this.setState({
              errorMsg: 'Error'
            });
        }

  } 
  
  selectButton=(value)=>{
    // console.log(currentButton,value)
    let {currentButton}=this.state;
    if (currentButton === value) {
      currentButton = 'all';
      this.state.dataFilter="all sig"
    }
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
          <Link to="/SearchSignature">Search</Link>
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

        </div>
        <div className="ml-2 mt-3 mx-">{this.state.dataFilter} by Create Date</div>
        <div className="container ml-0">
          <div className="row">
            <div className="col-7">
            <div className="row">
              <Table data= {this.state.data}/>
            </div>
            <div className="row mx-auto">
          <div className="col">
            <div className="row">
              <div className="col-2"></div>
              <div className="col-3 col-sm-3 col-md-2" >
                {this.state.hasPrev?
                  <span className="fas" onClick={()=>{
                    this.urlDetails.page--;
                    this.loadData(this.state.currentButton);
                  }}>
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                  ></FontAwesomeIcon>{" "}
                  Previous
                </span>
                : null  
              }

              </div>
              <div className="col "></div>
              <div className="col-3 col-sm-2">
              {this.state.hasNext?
                <span className="fas" onClick={()=>{
                  this.urlDetails.page++;
                  this.loadData(this.state.currentButton);
                }}>
                  Next
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    onClick={this.props.nextOnClick}
                  ></FontAwesomeIcon>
                </span>          
            :null
            }

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
                      onClick={()=>this.selectButton("in_progress")}
                    
                    >
                      <i className="fas fa-star"></i> In progress
                    </button>
                    <button
                      type="button"
                      className={this.state.currentButton==="inTest"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>this.selectButton("in_test")}
                    
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

