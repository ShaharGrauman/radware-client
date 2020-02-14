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

    this.openCveId=this.props.openCveId;
}
render() {
return (

<div className="table-responsive ml-0 ">
    <table class="table table-hover table-bordered">
        <thead className='thead-dark'>
            <tr>
                <th scope="col" className="Centered" onClick={()=>{
                    this.props.data.forEach(cveId=>this.openCveId(cveId.key))
                    this.state.openOrClose==this.closeIcon?
                    this.setState({openOrClose:this.openIcon}):
                    this.setState({openOrClose:this.closeIcon})
                }}>
                    {this.state.openOrClose} 
                </th>
                <th scope="col" colspan="2" className="Centered">CveId</th>
                <th scope="col" colspan="2" className="Centered">Number</th>
            </tr>
        </thead>
        <tbody>
            {this.props.data.map(cveId=>(
            <>
            <tr  onClick={()=>this.openCveId(cveId.key)}>
                <th scope="row" className="Centered" style={{cursor:'pointer'}} >
                    <FontAwesomeIcon icon={cveId.hasOwnProperty('signatures')?faWindowMinimize:faPlus}/>

                </th>
                {Object.values(cveId).slice(0,2).map(item=>
                <td colspan="2" className="Centered" >{item}</td>
                    )}
            </tr>
            {cveId.hasOwnProperty('signatures')?
            <>
            <tr className='table-active'>
                <th scope="row" className="Centered" style={{fontWeight: 'bold'}}>CveId</th>
                <td className="Centered" style={{fontWeight: 'bold'}}>PatterId</td>
                <td className="Centered" style={{fontWeight: 'bold'}}>Descr</td>
                <td className="Centered" style={{fontWeight: 'bold'}}>Status</td>
                <td className="Centered" style={{fontWeight: 'bold'}}>Edit</td>
            </tr>
            
            {cveId['signatures'].map(sig=>
                <tr>
               <th scope="row" className="Centered">{cveId.key}</th>
               {Object.values(sig).slice(1).map(item=>
                    <td className="Centered ">{item}</td>
                    )}
               <td className="Centered">
                <Link to="/Export/QA">
                  <FontAwesomeIcon 
                    className="fa-lg float-left" 
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
