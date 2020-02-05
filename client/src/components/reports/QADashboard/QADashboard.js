import React from "react";
import axios from 'axios'

import {Dropdown, ButtonGroup, Button} from 'react-bootstrap';
import {Container,Col,Row} from 'react-bootstrap';


import QATable from './QATable';
import './QADashboard.css';


export default class QADashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data : [
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
            ]

        };
        
        this.role=['manual','performance','automation']       
        // this.role=['manual','performance','automation']       
    }

    async componentDidMount() {
        try{
            const {data} = await axios.get('http://localhost:3000/Qa/dashboard');
            this.setState({data:data})
            // console.log(this.state.data)
        }catch(error){
              window.alert('Error');       
          }
    }

    updateData = async e=>{
        const urlBody=[];
        if(window.confirm('are you sure you want to update signatures!')){
        this.state.data.forEach(signature=>{
            const oneSigUpdate={id:signature.id}
            this.role.forEach(role=>{
                oneSigUpdate[role]=signature[role]
            })
            urlBody.push(oneSigUpdate)
            // urlBody.push({id:signature.seq_id,manual:signature.manual,performance:signature.performance,automation:signature.automation})
        })
        
        try{
            console.log(JSON.stringify(urlBody));
          await axios.put('http://localhost:3000/Qa/dashboard',JSON.stringify(urlBody),{headers: {"Content-Type": "application/json"}});
        }catch(error){
            window.alert('Error');       
        }
        // console.log(urlBody)
    }
    } 

    render() {
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
                        <button className="btn btn-secondary " type="submit" width="50px" onClick={this.updateData}>Update selected</button>
                        
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
                          <Dropdown.Item  onClick={()=>{
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
                                  <Dropdown.Item  onClick={()=>{
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

