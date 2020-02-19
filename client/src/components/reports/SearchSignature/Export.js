import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import {withRouter} from "react-router-dom"
import Table from '../../shared/Table';


import axios from 'axios';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faCheck,
  faTimes
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
    this.serverData=[];
    // this.checkedSig=[]

    //<input class="form-check-input-xl" type="checkbox" value="" />
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
      this.trueIcon=<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
      this.falseIcon=<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
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
  // console.log('params',this.props.match.params)
  console.log('params',this.exportTo)
}

addingChechBoxToTable=(props)=> {
  const tableData=this.state.tableData;
  console.log(tableData);
  if(tableData.length!=0){
  tableData.map(signatur=>{
    signatur['select']=
    <div>

      {
        this.state.checkedSig.includes(`${signatur.id}`)?
        // this.state.stam==1?
          <input class="form-check-input-xl" type="checkbox" value={signatur.id} onChange={this.onCheckBoxClick} key={signatur.id} defaultChecked />
        :
          <input class="form-check-input-xl" type="checkbox" value={signatur.id} onChange={this.onCheckBoxClick} key={signatur.id} />
      }
    </div>
  })
  tableData.forEach(sig=>{
    delete sig.id
    })
  this.setState({tableData:tableData})
}
}
onCheckBoxClick = e =>{
  // console.log('onCheckBoxClick',e.target.checked)
  let checkedSig=this.state.checkedSig;
  const index = checkedSig.indexOf(`${e.target.value}`);
  console.log('index',index)
  index==-1?
  checkedSig.push(e.target.value)
    :
  checkedSig.splice(index,1)

  this.setState({checkedSig:checkedSig})
  console.log(this.state.checkedSig)

}

loadData =async () =>{
  this.setState({isLoading:true})
  let requestURL=``;
  Object.keys(this.urlDetails).forEach(key=>requestURL=requestURL.concat(`&${key}=${this.urlDetails[key]}`))
  requestURL.slice(1)
  requestURL='http://localhost:3000/signature/export?'.concat(requestURL.slice(1))
  console.log(requestURL)

  try{
    const {data} = await axios.get(requestURL,{withCredentials: true});
    this.serverData=data;
    console.log('data',data)
    // this.setState({hasNext:data.hasNext})
    let newData=data.signatureData.map(sig=>(
      {
        id: sig.id,
        patternID: sig.pattern_id,
        Description: sig.description,
        Status:sig.status,
        TestData: sig.test_data?this.trueIcon:this.falseIcon
      }
    ));
    // this.setState({hasNext:data.hasNext})
    if(newData.length==0){
      newData=[{patternID: "NO RESULTS FOUND !", description: "NO RESULTS FOUND !", status:'NO RESULTS FOUND !', select:'' }]
      this.exportDetails.lastExport='';
      this.setState({tableData:newData, errorMsg: ''});
    }else{
    this.exportDetails.lastExport=data.date;
    this.setState({tableData:newData});
    this.addingChechBoxToTable();
    }
  }catch(error){
    this.setState({
      errorMsg: 'Inalid email or password'
    });
  }

this.setState({isLoading:false})
}

export=async ()=>{
  this.setState({isLoading:true})

  try{
    console.log('url',`http://localhost:3000/signature/export/${this.exportType}`)
    console.log(this.state.isAllChecked)
    console.log('body',this.state.isAllChecked?'All':JSON.stringify(this.state.checkedSig))
    axios.post(`http://localhost:3000/signature/export/${this.exportType}`,
    this.state.isAllChecked?'All':JSON.stringify(this.state.checkedSig),
    {responseType: 'blob'})
    .then((response) => {
       var fileURL = window.URL.createObjectURL(new Blob([response.data]));
       var fileLink = document.createElement('a');
    
       fileLink.href = fileURL;
       fileLink.setAttribute('download', 'file.xml');
       document.body.appendChild(fileLink);
     
       fileLink.click();
      });
    }catch(error){

    this.setState({
      errorMsg: 'ERROR'
    });
  }

  this.setState({isLoading:false,isAllChecked:false})
}

render() {
    
return (
    <>
      <div className="container ml-0 mt-2 font-italic">

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


      <div className="row mb-3 ">
        <div className="col-12 ">
          <Table data={this.state.tableData} key='5'/>

      <div className="row mb-3">
        <div className="col-3 "></div>

        <div className="col-2">
          {this.state.hasPrev?
              <span className="fas" className="noselect ml-5" style={{cursor:'pointer' }}  onClick={()=>{
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

        <div className="col-1 mx-2">
          {this.state.isLoading?
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          :
          <span class="badge badge-secondary">{this.state.page}</span>
        }
        </div>

        <div className="col-3">
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
        </div>{/*row next prev */}
      </div> {/*col table + row next/prev */}
      </div> {/*row table + next/prev */}
      
      <div className="row mb-3 ">
        <div className="col-3 ">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='xml'
            this.export();
            }} >Export to {this.urlDetails.exportto}</button>
        </div>
        <div className="col-3 ">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='xml'
            this.state.isAllChecked=true
            this.export();

          }} >Export all to {this.urlDetails.exportto}</button>
        </div>
        <div className="col-3 ">
          <button className="btn btn-secondary" onClick={()=>{
            this.exportType='text'
            this.export();

          }} >Export to test data</button>
        </div>
        <div className="col-3 ">
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