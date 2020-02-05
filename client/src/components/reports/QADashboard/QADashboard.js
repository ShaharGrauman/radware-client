import React , { useState } from "react";
import {Dropdown, ButtonGroup, Button} from 'react-bootstrap';
import {Container,Col,Row} from 'react-bootstrap';
import axios from 'axios';

import QATable from './QATable';
import './QADashboard.css';



export default class QADashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            signature : {
                
                        seq_id:1, 
                        patternID: "AAA", 
                        URI: true,
                        headers: true,
                        body:true, 
                        parameters: true, 
                        file: false,
                        manual: "passed",
                        performance: "init", 
                        automation: 'init'
                    
            },
            data : [
                // {
                //     seq_id:1, 
                //     patternID: "AAA", 
                //     URI: true,
                //     headers: true,
                //     body:true, 
                //     parameters: true, 
                //     file: false,
                //     manual: "passed",
                //     performance: "init", 
                //     automation: 'init'
                // },
    
                // {
                //     seq_id:2, 
                //     patternID: "BBB", 
                //     URI: false,
                //     headers: true,
                //     body:true,  
                //     parameters: true, 
                //     file: true, 
                //     manual: "init",
                //     performance: "failed", 
                //     automation: 'passed'
                // },
    
                // {
                //     seq_id:3, 
                //     patternID: "CCC", 
                //     URI: true,
                //     headers: false, 
                //     body:true, 
                //     parameters: false, 
                //     file: true, 
                //     manual: "init",
                //     performance: "init", 
                //     automation: 'failed'
                // },
                // {
                //     seq_id:4, 
                //     patternID: "DDD", 
                //     URI: false,
                //     headers: false, 
                //     body:false, 
                //     parameters: false, 
                //     file: true, 
                //     manual: "init",
                //     performance: "passed", 
                //     automation: 'init'
                // },
                // {
                //     seq_id:5, 
                //     patternID: "DDD", 
                //     URI: false,
                //     headers: true, 
                //     body:false, 
                //     parameters: true, 
                //     file: false, 
                //     manual: "failed",
                //     performance: "failed", 
                //     automation: 'init'
                // },
                // {
                //     seq_id:6, 
                //     patternID: "DDD", 
                //     URI: false,
                //     headers: true, 
                //     body:false, 
                //     parameters: true, 
                //     file: false, 
                //     manual: "init",
                //     performance: "init", 
                //     automation: 'failed'
                // },
                // {
                //     seq_id:7, 
                //     patternID: "DDD", 
                //     URI: false,
                //     headers: true, 
                //     body:false, 
                //     parameters: true, 
                //     file: false, 
                //     manual: "failed",
                //     performance: "failed", 
                //     automation: 'failed'
                // }
            ]

        }

        this.role=['performance','automation','manual']       
        // this.role=['manual','performance','automation']       
    }
    
    componentDidMount() {
        this.loadData();
      }
      
    loadData(){
        let requestURL=`http://localhost:3001/qaDashboard`;
        try{
        axios.get(requestURL).then(res=>{
          console.log(res);
          this.setState({data:res.data});
          })
        }catch(error){
                this.setState({
                  errorMsg: 'Error'
                });
            }
      } 

      handleChange = event => {
        this.setState({ signature: event.target.value });
        console.log(this.state.signature);
      }
    
    //   handleSubmit = event => {
    //     event.preventDefault();
    
    //     const signature = this.state.sig; 


    
    //     axios.put(`http://localhost:3001/qaDashboard/${id}`, this.state.data[])
    //       .then(res => {
    //         console.log(res);
    //         console.log(res.data);
    //       })
    //   }

      updateData(id){
        let requestURL=`http://localhost:3001/qaDashboard/${id}`;
        try{
            axios.put(requestURL, 
                {
                    "id": 1,
                    "user_id": 1,
                    "attack_id": 1,
                    "pattern_id": 123451,
                    "type": "vuln",
                    "creation_time": "17:04:44",
                    "creation_date": "2020-01-15",
                    "status": "in_progress",
                    "in_qa_internal_status_manual": "failed",
                    "in_qa_internal_status_performance": "failed",
                    "in_qa_internal_status_automation": "failed",
                    "vuln_data": "vuln data for this signature is: ",
                    "keep_order": false,
                    "start_break": null,
                    "end_break": null,
                    "right_index": null,
                    "scan_uri": null,
                    "scan_header": null,
                    "scan_body": null,
                    "scan_parameters": null,
                    "scan_file_name": null,
                    "severity": "low",
                    "description": "this is FAKE signature",
                    "test_data": "this is FAKE test_data",
                    "attackId": 1,
                    "userId": 1
                }, 
            {headers: {"Content-Type": "text/plain"}}
    )
    .then(r => console.log(r))
    .catch(e => console.log(e));
        }catch(error){
                this.setState({
                  errorMsg: 'Error'
                });
            }
      } 

    render() 
    {
        if(this.state.data.length==0){
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
            
        // if(this.state.data.length==0){
        //         this.loadData()
        // }
        return (
            <>
                <h2 className="ml-2 mb-3">QA dashboard</h2>
                <h5 className="ml-2 mb-3">Update signatures status at QA (signatures in QA status)</h5>
                <div className="container ml-0 mt-2">
                    <div className="row">
                        <div className="col">
                            <QATable data={this.state.data}  role={this.role}/>
                        </div>
                    </div>
                </div>
                <Container>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={2}>
                        <button className="btn btn-secondary " type="submit" width="50px" onClick={this.updateData(1)}>Update selected</button>
                        
                        </Col>
                        <Col xs={2}>

                        <Dropdown as={ButtonGroup}>
                    <Button variant="secondary " onClick={()=>{
                        if (window.confirm(`Are you sure you want to check all signature status to passed`)){                               
                            this.state.data.forEach(signature => {
                                this.role.forEach(role=>
                                    signature[role]='passed'
                                    )        
                            });
                            this.setState({})
                        }}}>ALL PASSED</Button>  
                      <Dropdown.Toggle split variant="secondary ml-1" id="dropdown-split-basic" />
                      <Dropdown.Menu>
                      {this.role.map((role,index)=>
                          <Dropdown.Item href={`#/action-${index}`} onClick={()=>{
                            if (window.confirm(`Are you sure you want to check all signature status in ${role} passed`)){                               
                            this.state.data.forEach(signature => {
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
                                    this.state.data.forEach(signature => {
                                        this.role.forEach(role=>
                                            signature[role]='failed'
                                            )        
                                    });
                                    this.setState({})
                                }}}>ALL FAILED</Button>  
                              <Dropdown.Toggle split variant="secondary ml-1" id="dropdown-split-basic"  size="sm" />
                              <Dropdown.Menu>
                              {this.role.map((role,index)=>
                                  <Dropdown.Item  href={`#/action-${index}`} onClick={()=>{
                                    if (window.confirm(`Are you sure you want to check all signature status in ${role} failed`)){
                                    this.state.data.forEach(signature => {
                                        signature[role]='failed'
                                    });
                                    this.setState({})
                                  }}}>{role}</Dropdown.Item>
                              )}
                              </Dropdown.Menu>
                        </Dropdown>

                        </Col>
                    </Row>
                </Container>                
            </>);

           
    }
    }


}

