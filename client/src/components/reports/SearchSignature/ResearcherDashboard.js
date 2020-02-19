import React from "react";

import axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import {Badge} from 'react-bootstrap'; 
import { Redirect } from 'react-router-dom';

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
      signaturesCountByStatus:[{Count:0},{Count:0},{Count:0},{Count:0},{Count:0}],
      in_progress:true,
      in_test:true,
      inQa:true,
      Published:true,
      suspended:true,
      all:true,
      currentButton:'all',
      clickedButton:'',
      errorMsg:'',
      searchClicked: false,
      createOrEditSignatureClicked: false
    }
    this.urlDetails={
      page: 1 ,
      size: 20,
    };
  }

  renderRedirect = page => {
    if (page === "search") {
      this.setState({
        searchClicked: true
      });
    }
    if (page === "createOrEditSignature") {
      this.setState({
        createOrEditSignatureClicked: true
      });
    }
}

  componentDidMount() {
      try{
        axios.get(`http://localhost:3001/signature/researcher`).then(res=>{
          this.setState({hasNext:res.hasNext,hasPrev:res.hasPrev})
          console.log(res.data.signatureData);
          if(res.data.signatureData.length == 0){
            this.setState({data: [
              { patternID: '', description: '' }
             
            ]});         
          }else{
            this.setState({signaturesCountByStatus:res.data.signaturesCountByStatus})
            console.log(res.data.signaturesCountByStatus);
            console.log(this.state.signaturesCountByStatus[1].Count );
            this.setState({data:res.data.signatureData});
          }
          
          })
        }catch(error){
                this.setState({
                  errorMsg: 'Error'
                });
            }
  }

  loadData(filter){
    let requestURL;
    this.setState({currentButton:filter});
    console.log("current:"+this.state.currentButton);
    if(this.state.currentButton == filter){//to return to all when double clicking
      this.setState({currentButton:"all"}); // to set currentButton to all when clicking twice at button
      requestURL=`http://localhost:3000/signature/researcher`;
      this.setState({dataFilter:"All Signatures"}); 
    }else{
      requestURL=`http://localhost:3000/signature/researcher?status=${filter}`;
      Object.keys(this.urlDetails).forEach(key=>requestURL=requestURL.concat(`&${key}=${this.urlDetails[key]}`))
      requestURL.slice(1)
    }
   
    console.log(requestURL)
    const isClicked=this.state[filter]
    // if(isClicked&&filter!='all'){
    //   this.setState({dataFilter:`${filter} Signature`,[filter]:false})
    //   this.setState({dataFilter:`${filter} Signature`,[filter]:true})
    // }else{
    //  this.setState({dataFilter:`All Signature`,[filter]:true})
    //  filter='';
    // }
    try{
    axios.get(requestURL).then(res=>{
      this.setState({hasNext:res.hasNext,hasPrev:res.hasPrev})
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
    this.urlDetails.page =1;
    this.setState({clickedButton:value});
    this.setState({dataFilter:`${value} Signatures`});
    console.log("clicked:"+this.state.clickedButton);
    
    // console.log(currentButton,value)
    // let current = this.state.currentButton;
    // if (current === value) {
    //   current = 'all';
    //   this.state.dataFilter="all sig"
    // }
    // else current=value;
    // this.loadData(value);
    // this.setState({currentButton:current});
  
  }

  render() {

    return (
      <div className='mx-3'>
        {this.state.searchClicked && <Redirect to='/SearchSignature' />}
        {this.state.createOrEditSignatureClicked && <Redirect to='/createOrEditSignature' />}
        <h2 className="ml mb-3">Researcher dashboard</h2>
        <div className='row'>
        <div className='ml-2 mr-4'>
          <button type="button" className="ml-2 mr-4 btn btn-secondary" onClick={() => this.renderRedirect("createOrEditSignature")}>
            New
          </button>
          
          {/* <div class="dropdown">
          <button class="dropbtn" onclick="myFunction()">Export
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-content" id="myDropdown">
            <a href="#">QA</a>
            <a href="#">Testing</a>
            <a href="#">Git</a>
          </div>
          </div>  */}
          {/* <button
            className="btn btn-secondary dropdown-toggle mr-4"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
            // onClick={this.myFunction()}
          >
            Export
          </button> */}
          <button type="button"
                            onClick={() => this.renderRedirect("search")}
                            className="ml-2 mr-4 btn btn-secondary">Search</button>

         </div>

          {/* <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              QA
            </a>
            <a className="dropdown-item" href="#">
              Testing
            </a>
            <a className="dropdown-item" href="#">
              Git
            </a>
          </div> */}
          <div className='ml-2 mr-4'> 
          <Dropdown >
          <Dropdown.Toggle className="btn btn-secondary dropdown-toggle mr-4" id="dropdown-basic">
            Export
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">QA</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Testing</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Git</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
        </div>
        <div className="ml-2 mt-3 mx-">
        <h5 className=" mb-2">{this.state.dataFilter} by Create Date</h5>

          {/* {this.state.dataFilter} by Create Date */}
          </div>
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
                    if(this.urlDetails.page == 1){
                      this.state.hasPrev = false;
                    }
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
                  this.state.hasPrev = true;
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
                      className={this.state.clickedButton==="inProgress"&&this.state.currentButton=="in_progress" ?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={
                        ()=>{
                        this.selectButton("inProgress");
                        this.loadData("in_progress");
                        // this.setState({this.urlDetails.page:1});
                        }
                      }
                    
                    >
                      <i className="fas fa-star"></i> In progress 
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[1].Count} </Badge>
                    </button>
                    <button
                      type="button"
                      className={this.state.clickedButton==="inTest"&&this.state.currentButton=="in_test"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>
                          {
                            this.selectButton("inTest");
                            this.loadData("in_test");
                            
                            // this.setState({this.urlDetails.page:1});
                            }
                      }
                    
                    >
                      <i className="fas fa-star-half-alt"></i> In test
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[3].Count} </Badge>
                    </button>
                    <button
                      type="button"
                      className={this.state.clickedButton==="inQa"&&this.state.currentButton=="inQa"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>
                        { 
                        this.selectButton("inQa");
                        this.loadData("inQa");
                        // this.setState({this.urlDetails.page:1});
                        }
                      }
                                          >
                      <i className="fas fa-star-half"></i> In QA
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[2].Count} </Badge>
                    </button>
                  </div>
                  <div className="col">
                    Production status
                    <button
                      type="button"
                      className={this.state.clickedButton==="Published"&&this.state.currentButton=="Published"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>
                        {
                          this.selectButton("Published");
                          this.loadData("Published");
                          // this.setState({this.urlDetails.page:1});
                        }
                      }
                    >
                      <i className="far fa-star"></i> Published
                      <Badge pill variant="info" className=" ml-3"> {this.state.signaturesCountByStatus[0].Count} </Badge>
                    </button>
                    <button

                        type="button"
                      className={this.state.clickedButton==="Suspended"&&this.state.currentButton=="Suspended"?"outline- mt-3 btn btn-secondary btn-block  text-left":"outline- mt-3 btn btn-outline-secondary btn-block  text-left"}
                      onClick={()=>
                        {
                          this.selectButton("Suspended");
                          this.loadData("Suspended");
                          // this.setState({this.urlDetails.page:1});
                        }
                      }

                    >
                      <i className="fas fa-exclamation-triangle"></i> Suspended 
                      
                      <Badge pill variant="info" className=" ml-3"> 0 </Badge>
                      
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

