import React from "react";
import ReactDOM from "react-dom";
import Table from '../../shared/Table';


import axios from 'axios';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowLeft,
  faSearch
} from "@fortawesome/free-solid-svg-icons";


export default class Export extends React.Component {



    constructor(props) {
        super(props)
        this.state = {
            data : [
                { PatternID: '', Description: '', Select: <input class="form-check-input-xl" type="checkbox" value="" /> }
            ],
            hasNext:true,
            hasPrev:false,
            exportTo:'QA',
            type:'',
            putData:[],
            date:'',
            status:'',
            errorMsg:''
        };

        this.urlDetails={
            page: 1 ,
            size: 2,
          };
        this.handleChange=this.handleChange.bind(this);
        this.updateData=[];

    }

    handleChange=(event,value,p)=>{
       // alert(p)
      // alert(value)
      if(value === true)
      {
          this.updateData.push(p);
          console.log(this.updateData)

      }else{
          var index = this.updateData.indexOf(p); 
          this.updateData.splice(index, 1);
          console.log(this.updateData)
      }

      } 

    //updateData(put)
   
    updateD=async(e)=>{
        this.setState({putData:this.updateData});
        console.log(this.state.putData)
        e.preventDefault();
        try{
          const {data} = await axios.put('http://localhost:3001/login', 
                                            this.state.putData, 
                                            {withCredentials: true});
          console.log(data);
          this.setState({errorMsg: ''});
          
          //Redirect to role page
        
        }catch(error){
            this.setState({
              errorMsg: 'ERORR 400'
            });
        }
    }

    componentWillMount() {
        this.loadData();
      }

    loadData(){

        let requestURL=`http://localhost:3001/signature/export?sortby=id&orderby=asc&exportto=${this.state.exportTo}`;
 

        Object.keys(this.urlDetails).forEach(key=>requestURL=requestURL.concat(`&${key}=${this.urlDetails[key]}`))
        requestURL.slice(1)
        console.log(requestURL)
    
        try{
        axios.get(requestURL).then(res=>{
          console.log(res.data.signatureData);
          if(res.data.signatureData.length == 0){
            this.setState({data: [
              { patternID: '', description: '' , Select: <input class="form-check-input-xl" type="checkbox" value="" />}
             
            ]});         
          }else{
            const tempdata=[];
            //this.setState({data:res.data.signatureData});
            for (var i=0; i < res.data.signatureData.length ; i++){
                let t =res.data.signatureData[i].pattern_id
                tempdata.push({PatternID: res.data.signatureData[i].pattern_id,
                Description: res.data.signatureData[i].description,
                Select: <input class="form-check-input-xl" 
                type="checkbox" 
                onChange={event => this.handleChange(event,event.target.checked,t)}/>
                });
            }
            console.log(tempdata);
            this.setState({data:tempdata})
          }
          this.setState({date:res.data.date})
          this.setState({status:res.data.status})
          this.setState({hasNext:res.data.hasNext})
          this.setState({hasPrev:res.data.hasPrev})

          
          })
        }catch(error){
                this.setState({
                  errorMsg: 'Error'
                });
            }
    
      } 


    render() {
        
        return (
            
            <>
    
            
                <div className="container mt-4 font-italic">
                    <div class="row   ">
                        <h1>Export</h1>
                    </div>         
                    <div className="row">
                    <div className="col-md-4">
                        <h6>Export to {this.state.exportTo} ({this.state.status} signatures)</h6>
                    </div>
                    <div className="col-md-4">
                        <h6>Last Export to {this.state.exportTo} was at  {this.state.date}</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col"></div>
                </div>        
                       <Table data={this.state.data} />
                       <div className="row">
                <div className="col-2 col-sm-2 col-md-3 col-lg-4 mx-sm-2 mx-md-3 mx-lg-0"></div>
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
              <div className="col-1 col-lg-0 mx-2 mx-sm-2 mx-md-0"></div>
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
            </div>
    
            <div className="row"></div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3"></div>
                <div className="col-3">
                <button className="btn btn-secondary" onClick={this.updateD} >Export to {this.state.experto}</button>   
                </div>
                </div> 
                </div> 
            </>
        )

    }

}

