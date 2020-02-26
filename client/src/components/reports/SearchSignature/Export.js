import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {withRouter} from "react-router-dom"
import Table from '../../shared/Table';
import  ReportsTable from '../ReportsTable'

import {getExportSignatures, exportSignaturesTofile,exportAllSignaturesTofile} from '../../../api/controllers/reports';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faEdit,
  faCheckSquare,
  faSquare
} from "@fortawesome/free-solid-svg-icons";

class Export extends React.Component {

constructor(props) {
    super(props)
    this.state = {
        tableData : [
            {PatternID: '', Description: '', select:'' }
        ],
        hasNext:true,
        hasPrev:false,
        page:1,
        isLoading:true,
        isAllChecked:false,
        checkedSig:[]
    };
    this.serverData={signatureData:[]};

    this.exportDetails={
      to:'',
      type:'',
      lastExport:''
    }
    this.urlDetails={
        sortby:'id',
        page: 1 ,
        size: 10,
        exportto:'QA'
      }
      this.exportType='';
}

componentWillMount =()=>{
  this.exportDetails.to=this.props.match.params.type;
  this.urlDetails.exportto=this.props.match.params.type;
  switch(this.exportDetails.to){
    case 'QA':
      this.exportDetails.type='published, in QA'
      break;
      case 'Git':
        this.exportDetails.type='published'
        break;
        case 'Testing':
          this.exportDetails.type='in testing'
      break;
  }
  this.loadData();
}

onCheckBoxClick = id =>{

  let checkedSig=this.state.checkedSig;
  const index = checkedSig.indexOf(`${id}`);
  index==-1?
  checkedSig.push(`${id}`)
    :
  checkedSig.splice(index,1)

  this.setState({checkedSig:checkedSig})
}

loadData =async () =>{
  this.setState({isLoading:true})
  let requestURL=``;
  Object.keys(this.urlDetails).forEach(key=>requestURL=requestURL.concat(`&${key}=${this.urlDetails[key]}`))
  requestURL.slice(1)
  requestURL='/signature/export?'.concat(requestURL.slice(1))
  console.log('requestURL',requestURL)

  
    const data = await getExportSignatures(requestURL);
    this.serverData=data;
    // this.setState({hasNext:data.hasNext})
    let newData=data.signatureData.map(sig=>(
      {      
        ...sig,
        TestData: sig.test_data?this.trueIcon:this.falseIco,
        Edit:<Link to={`/createOrEditSignature/${sig.id}`}>
              <FontAwesomeIcon 
                className="fa-lg float-left" 
                icon={faEdit}  
                style={{ color: 'blue',cursor:'pointer' }}
                ></FontAwesomeIcon>
              </Link>
    }
    ));
    console.log('newdata',newData)
    // this.setState({hasNext:data.hasNext})
    if(newData.length==0){
      newData=[{patternID: "NO RESULTS FOUND !", description: "NO RESULTS FOUND !", status:'NO RESULTS FOUND !', select:'' }]
      this.exportDetails.lastExport='';
      this.setState({tableData:newData, errorMsg: ''});
    }else{
    this.exportDetails.lastExport=data.date;
    this.setState({tableData:newData});
    }
  

this.setState({isLoading:false})
}

export=async ()=>{
  this.setState({isLoading:true})

  try{
    const response=[]
    !this.state.isAllChecked?
     response= await exportSignaturesTofile(this.exportType,
        {"id":this.state.checkedSig.map(id=>parseInt(id))})
      :
      response= await exportSignaturesTofile(`${this.exportType}?exportTo=${this.exportDetails.to}`)
      console.log('response',response)

       var fileURL = window.URL.createObjectURL(new Blob([response]));
       var fileLink = document.createElement('a');
    
       fileLink.href = fileURL;
       fileLink.setAttribute('download', 'file.txt');
       document.body.appendChild(fileLink);
     
       fileLink.click();
      
    }catch(error){

    this.setState({
      errorMsg: 'ERROR'
    });
  }

  this.setState({isLoading:false,isAllChecked:false})
}

render() {
  this.state.tableData.forEach(sig=>{
    
    this.state.checkedSig.includes(`${sig.id}`)?
        sig['select']=<div className="Centered fa-lg" value={sig.id} onClick={()=>this.onCheckBoxClick(sig.id)}><FontAwesomeIcon icon={faCheckSquare}/></div>
        :
        sig['select']=<div className="Centered fa-lg" value={sig.id} onClick={()=>this.onCheckBoxClick(sig.id)}><FontAwesomeIcon icon={faSquare}/></div>
      
    })

    console.log(this.state.tableData)
    const testData={
      tableStyle:{ //for the <table>
        style:{ borderWidth: "3px",width:'100%' },
        className:'table table-striped table-hover table-bordered border-dark'
      },
      
      tableHeader:[
        {value:'pattern_id' , valueToShow:'PatterID' , style:{width: "10%"}, sort:true},
        {value:'description' , valueToShow:'description' , style:{width: "40%"} , sort:true},
        {value:'status' , valueToShow:'status' , style:{width: "15%"} , sort:false},
        {value:'TestData' , valueToShow:'TestData' , style:{width: "10%"} , sort:false},
        {value:'Edit' , valueToShow:'Edit' , style:{width: "10%"} , sort:false},
        {value:'select' , valueToShow:'Select' , style:{width: "10%",paddingRight: "0px",paddingLeft: '0px'} , sort:false},
      ],
      tableData:this.state.tableData

    }

    
    
return (
    <>
      <div className="container-fluid ml-0 mt-2 font-italic">

      <div className="row mb-3">
        <div className="col">
          <h2>Export </h2>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-6 ">
            <h5>Export to {this.exportDetails.to} ( {this.exportDetails.type} signatures) </h5>
        </div>
        <div className="col-6">
            <h5>Last Export to {this.exportDetails.to} was at  {this.exportDetails.lastExport}</h5>
        </div>
      </div>


      <div className="row mb-3  ">
        <div className="col-12">
          {/* <Table data={this.state.tableData} key='5'/> */}
          <ReportsTable data={testData } sortOn={(key)=>console.log('sort is clicked by:',key)}/>


      <div className="row mb-3">
        <div className="col-3 "></div>

        <div className="col-2 Centered">
          {this.state.hasPrev?
              <span className="fas" className="noselect " style={{cursor:'pointer' }}  onClick={()=>{
                this.urlDetails.page--;
                this.setState({page:this.urlDetails.page});
                this.loadData();
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
        </div>{/*Div HasPrev*/}

        <div className="col-1 mx-1 Centered">
          {this.state.isLoading?
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          :
          <span class="badge badge-secondary">{this.state.page}</span>
        }
        </div>

        <div className="col-2 Centered">
          {this.state.hasNext?
            <span className="fas" style={{cursor:'pointer' }} onClick={()=>{
            this.setState({hasPrev:true});
            this.urlDetails.page++;
            this.setState({page:this.urlDetails.page});
             this.loadData();
            
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

        <div className="col">

        <button className="btn btn-secondary float-right pr-2" onClick={()=>{
          this.setState({checkedSig:[]})
        }} >Reset all</button>
        </div>
        
        <div className="col-2 align-self-end">
        <button className="btn btn-secondary float-right pl-1" onClick={()=>{
          const newCheckedSig =this.state.checkedSig;
          this.serverData.signatureData.forEach(sig=>
            !this.state.checkedSig.includes(`${sig.id}`)?
            newCheckedSig.push(`${sig.id}`)
            :null)
          this.setState({checkedSig:newCheckedSig})
          console.log('select all:',this.state.checkedSig)
        }} >Select page</button>
          
        </div>
        
        </div>{/*row next prev */}
      </div> {/*col table + row next/prev */}
      </div> {/*row table + next/prev */}
      
      <div className="row mb-3 ">
        <div className="col-3 Centered">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='xml'
            this.export();
            }} >Export to {this.urlDetails.exportto}</button>
        </div>
        <div className="col-3 Centered">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='xml'
            this.state.isAllChecked=true
            this.export();
            this.state.isAllChecked=false

          }} >Export all to {this.urlDetails.exportto}</button>
        </div>

        <div className="col-3 Centered">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='text'
            this.export();

          }} >Export to test data</button>
        </div>
        <div className="col-3 Centered">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='text'
            this.state.isAllChecked=true
            this.export();

          }} >Export all to test data</button>
        </div>


      </div>
      <div>
    </div>
      </div>
    </>
)}
}

export default withRouter(Export)