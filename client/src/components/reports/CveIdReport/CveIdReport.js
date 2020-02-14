import React, { Component } from 'react'
import axios from 'axios'

import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import {ButtonToolbar, OverlayTrigger, Tooltip} from 'react-bootstrap';

import CveIdReportTable from '../CveIdReport/CveIdReportTable'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faSearch

} from "@fortawesome/free-solid-svg-icons";



export default class CveIdReport extends Component {
constructor(props) {
    super(props);
    this.state={
        TableData:[]
    }
    this.onSearchText='';
    this.CveIdReportData=[
        {key:'2000-001' , number:10},
        {key:'2000-002' , number:7},
        {key:'2000-003' , number:17},
        {key:'1990-004' , number:15}
    ];
    this.signatures=[{id: 1, patternId: 123451, description: "this is FAKE signature", status:'in QA'},
    {id: 2, patternId: 123452, description: "this is FAKE signature", status:'in QA'},
    {id: 3, patternId: 123453, description: "this is FAKE signature", status:'in QA'},
    {id: 4, patternId: 123454, description: "ergerge", status:'in QA'},
    {id: 5, patternId: 123455, description: "this is FAKE signature", status:'in QA'},
    {id: 6, patternId: 123456, description: "this is FAKE signature", status:'in QA'},
    {id: 7, patternId: 123457, description: "this is FAKE signature", status:'in QA'},
    {id: 8, patternId: 123458, description: "this is FAKE signature", status:'in progress'},
    {id: 9, patternId: 123459, description: "this is FAKE signature", status:'in progress'},
    {id: 10, patternId: 1234510, description: "this is FAKE signature", status:'in progress'},
    {id: 11, patternId: 1234511, description: "this is FAKE signature", status:'in progress'},
    {id: 12, patternId: 1234512, description: "this is FAKE signature", status:'in progress'},
    {id: 13, patternId: 1234513, description: "this is FAKE signature", status:'in test'},
    {id: 14, patternId: 1234514, description: "this is FAKE signature", status:'in test'},
    {id: 15, patternId: 1234515, description: "this is FAKE signature", status:'in test'},
    {id: 28, patternId: 2828, description: "this is FAKE signature", status:'in test'},
    {id: 29, patternId: 2929, description: "this is FAKE signature", status:'in test'},
    {id: 30, patternId: 3030, description: "this is FAKE signature", status:'in test'},
    {id: 33, patternId: 36352, description: "this is FAKE signature", status:'in test'},
    {id: 45, patternId: 9875, description: "this is FAKE signature", status:'in test'},]
}

openCveId= key =>{

    const data=this.state.TableData;
    console.log('befor: ',data)
    // if(!data.includes(key)){
    data.map(cveid=>
        cveid.key==key?
            !cveid.hasOwnProperty('signatures')?
            cveid['signatures']=this.signatures.slice(0,cveid.number):
            delete cveid.signatures
            :
            cveid
    )

    this.setState({TableData:data})
    // console.log('after: ',this.state.TableData)
    // console.log('after: ',this.state.TableData[1].signatures)

}
componentWillMount = () =>{
    this.setState({TableData:this.CveIdReportData});

}
onSearch =() =>{
    console.log('onSearchText',this.onSearchText)
    // includes
    // const filteredData=this.CveIdReportData.find(cveid=>cveid.key==this.onSearchText)
    const filteredData=this.CveIdReportData.filter(cveid=>cveid.key.includes(this.onSearchText))
    console.log(filteredData)
    if(filteredData==undefined){
        this.setState({TableData:[]})

    }else{

        this.setState({TableData:filteredData})
    }
}


render() {
  return (
    <>
    <h2 className="ml-3 mb-3">CveId Report</h2>
    <h5 className="ml-3 mb-3">bla bla bla bla bla bla bla</h5>
    <br></br>
    <div className="container ml-3 mb-3">
      <div className="row">
      <div className="form-group has-search">

        <InputGroup>
          <input
            id="searchBox"
            type="text"
            className="form-control form-rounded"
            placeholder="Search"
            onChange  ={e=>{
                this.onSearchText=e.target.value;
                this.onSearch();
            }}
          />
        <ButtonToolbar>
        <OverlayTrigger
          key={'top'}
          placement={'top'}
          overlay={
            <Tooltip id={`tooltip-${'top'}`}>
              You can search by pressing ENTER
            </Tooltip>
          }
        >
          <InputGroupAddon addonType="append" style={{cursor:'pointer'}}>
            <InputGroupText>
            <FontAwesomeIcon icon={faSearch} onClick={this.onSearch}/>
          </InputGroupText>
          </InputGroupAddon>
        </OverlayTrigger>
        </ButtonToolbar>
        </InputGroup>
        </div>
      </div>
      <div className="row">
        <div className="col p-0">
          <CveIdReportTable data={this.state.TableData} openCveId={this.openCveId}/>  
        </div>
      </div>
    </div>
</>
  )}}