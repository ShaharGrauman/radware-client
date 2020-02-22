import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
let indx = 0;
const capitalizeFirstLetter = str => str.replace(/^\w/, function (chr) {return chr.toUpperCase();});



export default class ReportsTable extends React.Component {
  constructor(props) {
    super(props);
    this.sas = props;
    
    this.data={
        tableStyle:{ //for the <table>
            style:{},
            className:''
        },
        tableHedaer:[],//array of objects to show in hedaer [{value:patern_id , valueToShow:PatterID , style{} , sort:true}]
        pagination:20, //local pagination
        tableData:{}
    }

  }
  TableHedaer=(header,isSort,headerValue)=> {
  return (
    <th scope="col"
    onClick={()=> this.props.sortOn(headerValue)}
    > 
      {capitalizeFirstLetter(header)}
      {isSort&typeof (this.props.sortOn) === "function"?
      <FontAwesomeIcon
        icon={faSort}
      ></FontAwesomeIcon>
      :
      null
    }
    </th>
  );
  }
  render() {
return (
    <>
    <table
    className={
        this.props.data.hasOwnProperty('tableStyle')?
        this.props.data.tableStyle.className
        :
        "table table-striped table-hover table-bordered border-dark"
    }
    style={
        this.props.data.hasOwnProperty('tableStyle')?
        this.props.data.tableStyle.style
        :
        { borderWidth: "3px",width:'50%' }
    }
    >
        <thead>
          <tr>
            {this.props.data.hasOwnProperty('tableHedaer')?
             this.props.data.tableHedaer.map(header=>
                this.TableHedaer(header.valueToShow,header.sort,header.value)
                )
            :
            Object.keys(this.props.data.tableData.length !== 0 && this.props.data.tableData[0]).map(key => (
                this.TableHedaer(key,true,key)
            ))
            }
        
          </tr>
        </thead>
        <tbody>
          {this.props.data.tableData.map(entries => (
            <tr style={{}} >
            {this.props.data.hasOwnProperty('tableHedaer')?
              this.props.data.tableHedaer.map(header=>
                <td style={header.style} >{entries[header.value]}</td>
            )
            :
            Object.values(entries).map(column => (
                <td >{column}</td>
              ))
            }
            </tr>
          ))}
          
        </tbody>
      </table>
      </>
);
}
}
