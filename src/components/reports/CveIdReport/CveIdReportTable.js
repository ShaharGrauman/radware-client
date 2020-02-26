import React, { Component } from 'react'
import { Link } from 'react-router-dom';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faWindowMinimize,
    faEdit

} from "@fortawesome/free-solid-svg-icons";

export default class CveIdReportTable extends Component {
constructor(props) {
    super(props);
    this.openIcon=<FontAwesomeIcon icon={faPlus}/>   
    this.closeIcon=<FontAwesomeIcon icon={faWindowMinimize}/>

    this.state={
        openOrClose:this.openIcon
    }
    this.totalSignatures=0;
    this.props.data.forEach(cveIdData=>this.totalSignatures=this.totalSignatures+cveIdData.quantity)
    this.openCveId=this.props.openCveId;
    
}
render() {
    
    // this.props.data.forEach(cveId=>this.totalSignatures=this.totalSignatures+cveId.number)
return (

<div className=" ml-0 ">
    {/* <table class="table table-hover table-bordered"> */}
    <table
        className="table table-striped table-hover table-bordered border-dark"
        style={{ borderWidth: "3px" }}
      >
        <thead >
            <tr>
                {/* <th scope="col" className="Centered" style={{cursor:'pointer'}} onClick={()=>{
                    this.props.data.forEach(cveId=>this.openCveId(cveId.key))
                    this.state.openOrClose==this.closeIcon?
                    this.setState({openOrClose:this.openIcon}):
                    this.setState({openOrClose:this.closeIcon})
                }}>
                    {this.state.openOrClose} 
                </th> */}
                <th scope="col" className="Centered"></th>
                <th scope="col" colspan="2" className="Centered">CveId</th>
                
                <th scope="col" colspan="2" className="Centered">{`Number (Total=${this.totalSignatures})`}</th>
            </tr>
        </thead>
        <tbody>
            {this.props.data.map(cveIdData=>(
            <>
            <tr  onClick={()=>this.openCveId(cveIdData.cveid)}>
                <th scope="row" className="Centered" style={{cursor:'pointer'}} >
                    <FontAwesomeIcon icon={cveIdData.hasOwnProperty('signatures')?faWindowMinimize:faPlus}/>
                </th>
                {Object.values(cveIdData).slice(0,2).map(item=>
                <td colspan="2" className="Centered" style={{cursor:'pointer'}}>{item}</td>
                    )}
            </tr>
            {cveIdData.hasOwnProperty('signatures')?
            <>
            <tr className='table-active'>
                <th scope="row" className="Centered" style={{fontWeight: 'bold'}}>CveId</th>
                <td className="Centered" style={{fontWeight: 'bold'}}>PatterId</td>
                <td className="Centered" style={{fontWeight: 'bold'}}>Descr</td>
                <td className="Centered" style={{fontWeight: 'bold'}}>Status</td>
                <td className="Centered" style={{fontWeight: 'bold'}}>Edit</td>
            </tr>
            
            {cveIdData['signatures'].map(sig=>
                <tr>
               <th scope="row" className="Centered">{cveIdData.cveid}</th>
               {Object.values(sig).slice(1).map(item=>
                    <td className="Centered ">{item}</td>
                    )}
               <td className="Centered">

                <Link to={`/createOrEditSignature/${sig.id}`}>
                  <FontAwesomeIcon 
                    className="fa-lg" 
                    icon={faEdit}  
                    style={{ color: 'blue',cursor:'pointer' }}
                  ></FontAwesomeIcon>
                </Link>

                </td>
                </tr>
               )}
                
            </>
            :
            null
            }
            </>//the main map
            ))}
        </tbody>
    </table>


</div>

)
}
}
