import React from "react";
import axios from 'axios'

import {Dropdown, ButtonGroup, Button} from 'react-bootstrap';
import {Container,Col,Row} from 'react-bootstrap';

import { BrowserRouter, Switch, Route } from 'react-router-dom';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft
} from "@fortawesome/free-solid-svg-icons";


import QATable from './QATable';
import './QADashboard.css';


export default class QADashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            updateSelectedButton:'Update selected',
            hasNext:'true',
            hasPrev:'false',
            page:1,
            dataToShow:[]

        };
        this.data = [
            // {
            //     seq_id:1, 
            //     patternID: "AAA", 
            //     URI: 1,
            //     headers: 1,
            //     body:1, 
            //     parameters: 1, 
            //     file: 0,
            //     manual: "passed",
            //     performance: "init", 
            //     automation: 'init'
            // },

            // {
            //     seq_id:2, 
            //     patternID: "BBB", 
            //     URI: 0,
            //     headers: 1,
            //     body:1,  
            //     parameters: 1, 
            //     file: 1, 
            //     manual: "init",
            //     performance: "failed", 
            //     automation: 'passed'
            // },

            // {
            //     seq_id:3, 
            //     patternID: "CCC", 
            //     URI: 1,
            //     headers: 0, 
            //     body:1, 
            //     parameters: 0, 
            //     file: 1, 
            //     manual: "init",
            //     performance: "init", 
            //     automation: 'failed'
            // },
            // {
            //     seq_id:4, 
            //     patternID: "DDD", 
            //     URI: 0,
            //     headers: 0, 
            //     body:0, 
            //     parameters: 0, 
            //     file: 1, 
            //     manual: "init",
            //     performance: "passed", 
            //     automation: 'init'
            // },
            // {
            //     seq_id:5, 
            //     patternID: "DDD", 
            //     URI: 0,
            //     headers: 1, 
            //     body:0, 
            //     parameters: 1, 
            //     file: 0, 
            //     manual: "failed",
            //     performance: "failed", 
            //     automation: 'init'
            // },
            // {
            //     seq_id:6, 
            //     patternID: "DDD", 
            //     URI: 0,
            //     headers: 1, 
            //     body:0, 
            //     parameters: 1, 
            //     file: 0, 
            //     manual: "init",
            //     performance: "init", 
            //     automation: 'failed'
            // },
            // {
            //     seq_id:7, 
            //     patternID: "DDD", 
            //     URI: 0,
            //     headers: 1, 
            //     body:0, 
            //     parameters: 1, 
            //     file: 0, 
            //     manual: "failed",
            //     performance: "failed", 
            //     automation: 'failed'
            // }
        ];
        this.size=15;
        this.role=['manual','performance','automation']       
        // this.role=['manual','performance','automation']       
    }

    async componentDidMount() {
        try{
            const {data} = await axios.get('http://localhost:3000/Qa/dashboard');
            this.data=data.sort((a,b)=>a.patternID-b.patternID);
            console.log(this.data)
            this.setState({dataToShow:data.slice(0,this.size),page:1})
            // console.log(this.state.data)
        }catch(error){
              window.alert('Error');       
          }
    }

    updateData = async e=>{
        const urlBody=[];
        this.data.forEach(signature=>{
            const oneSigUpdate={id:signature.id}
            this.role.forEach(role=>{
                oneSigUpdate[role]=signature[role]
            })
            urlBody.push(oneSigUpdate)
            // urlBody.push({id:signature.seq_id,manual:signature.manual,performance:signature.performance,automation:signature.automation})
        })
        
        try{
            // console.log(JSON.stringify(urlBody));
          const {data:msg}=await axios.put('http://localhost:3000/Qa/dashboard',JSON.stringify(urlBody),{headers: {"Content-Type": "application/json"}});
          this.setState({updateSelectedButton:msg})
          //   console.log(msg,this.state.msg)
        }catch(error){
            this.setState({updateSelectedButton:'Error in update'})
            window.alert('Error');       
        }
        // console.log(urlBody)
    } 

    render() {
        if(this.data.length==0){
            return (
                <>
                <h2 className="ml-2 mb-3">QA dashboard</h2>
                <h5 className="ml-2 mb-3">Update signatures status at QA (signatures in QA status)</h5>
                <br></br>
                <div className="container ml-0 mt-2">
                    <div className="row">
                        <div className="col">
                            <QATable data={[{                
                                    seq_id:0, 
                                    patternID: "THERE", 
                                    URI:'IS' ,
                                    headers:'NO', 
                                    body:'SIGNATURES', 
                                    parameters: 'TO', 
                                    file: 'UPDATE', 
                                    manual: ':)',
                                    performance: ':)', 
                                    automation: ':)'
                                }]}  role={['']}/>
                        </div>
                    </div>
                </div>
                </>
            )
        }else{
        return (
            <>
                <h2 className="ml-2 mb-3">QA dashboard</h2>
                <h5 className="ml-2 mb-3">Update signatures status at QA (signatures in QA status)</h5>
                <div className="container ml-0 mt-2">
                    <div className="row">
                        <div className="col">
                        <QATable data={this.state.dataToShow}  role={this.role}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-1 col-sm-1 col-md-2 col-lg-3 mx-sm-1 mx-md-2 mx-lg-0"></div>
                      <div className="col-3 col-sm-3 col-md-2 ml-5 " >
                        {this.state.page>1?
                          <span className="fas" className="noselect ml-5"  onClick={()=>{
                            const newPage=this.state.page-1
                            this.setState({dataToShow:this.data.slice((newPage-1)*this.size,newPage*this.size)})
                            this.setState({page:newPage});
                        
                          }}>
                          <FontAwesomeIcon
                            icon={faArrowLeft}
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
                      {this.size*this.state.page<this.data.length?
                        <span className="fas" onClick={()=>{
                          const newPage=this.state.page+1
                          this.setState({dataToShow:this.data.slice((newPage-1)*this.size,newPage*this.size)})
                        
                          this.setState({page:newPage});
                        }}>
                          Next{" "}
                          <FontAwesomeIcon
                            icon={faArrowRight}
                          ></FontAwesomeIcon>
                        </span>          
                    :null
                    }

              </div>
            </div>
                </div>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={2}>
                        <button className="btn btn-secondary " type="submit" width="50px" onClick={()=>{
                            if(window.confirm('are you sure you want to update signatures!')){
                                this.setState({updateSelectedButton:'loading...'});                    
                                this.updateData();
                                setTimeout(()=>
                                    this.setState({updateSelectedButton:'Update Selecte'})
                                , 3000);

                            }}}>
                            {this.state.updateSelectedButton}
                        </button>
                        
                        </Col>
                        <Col xs={2}>

                        <Dropdown as={ButtonGroup}>
                    <Button variant="secondary " onClick={()=>{
                        if (window.confirm(`Are you sure you want to check all signature status to passed`)){                               
                            this.data.forEach(signature => {
                                this.role.forEach(role=>
                                    signature[role]='passed'
                                    )        
                            });
                            this.setState({})
                        }}}>ALL PASSED</Button>  
                      <Dropdown.Toggle split variant="secondary ml-1" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                      {this.role.map((role,index)=>
                          <Dropdown.Item  onClick={()=>{
                            if (window.confirm(`Are you sure you want to check all signature status in ${role} passed`)){                               
                            this.data.forEach(signature => {
                                signature[role]='passed'
                            });
                            this.setState({})
                          }}}>{role}</Dropdown.Item>
                      )}
                      </Dropdown.Menu>
                    </Dropdown>
                        </Col>
                        <Col xs={2}>
                            
                        <Dropdown as={ButtonGroup}>
                            <Button variant="secondary" onClick={()=>{
                                     if (window.confirm(`Are you sure you want to check all signature status to failed`)){                               
                                    this.data.forEach(signature => {
                                        this.role.forEach(role=>
                                            signature[role]='failed'
                                            )        
                                    });
                                    this.setState({})
                                }}}>ALL FAILED</Button>  
                              <Dropdown.Toggle split variant="secondary ml-1" id="dropdown-split-basic"  size="sm" />
                              <Dropdown.Menu>
                              {this.role.map((role,index)=>
                                  <Dropdown.Item  onClick={()=>{
                                    if (window.confirm(`Are you sure you want to check all signature status in ${role} failed`)){
                                    this.data.forEach(signature => {
                                        signature[role]='failed'
                                    });
                                    this.setState({})
                                  }}}>{role}</Dropdown.Item>
                              )}
                              </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                    </Row>
            </>);      
    }
    }
}

