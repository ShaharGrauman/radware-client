import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck , faSort ,faTimes} from '@fortawesome/free-solid-svg-icons';

import QaStatuseUpdate from './QaStatuseUpdate';
import  './QADashboard.css';

class QATable extends Component {
constructor(props) {
    super(props);

    this.sortIcon=<FontAwesomeIcon icon={faSort}></FontAwesomeIcon> 
    this.trueIcon=<FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
    this.falseIcon=<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
    this.falseIconRed=<FontAwesomeIcon icon={faTimes} style={{color: 'red'}}></FontAwesomeIcon>
    this.role=this.props.role    
}

render() {
return (
    <div>
    <table className="table table-striped table-hover table-bordered border-dark" style={{ borderWidth: "3px",width:'105%' }}>
      <thead>
          <tr>
              {Object.keys(this.props.data[0]).slice(1).map((key,index)=>
              <th scope="col" key={index}>
                  {key!='patternID'?key:<div>{key}{this.sortIcon}</div>}
                </th>
                )}
          </tr>
      </thead>
      <tbody>
          {
              this.props.data.map((item,index) =>(
                <tr key={index}>
                {Object.values(item).slice(1,7).map((column,index) => (
                    <td key={index}>
                      {(()=>{
                        switch(column){
                            case 1:
                                return this.trueIcon;
                            case 0:
                                return this.falseIcon;
                            case null:
                                return this.falseIconRed;
                            default:
                                return column;
                        }
                      })()
                    }
                    </td>
                ))}
                {(Object.entries(item).slice(7)).map((status,index)=>(
                    <td key={index}>
                    {this.role.includes(status[0])?(
                        // console.log(status[0]),
                    <QaStatuseUpdate role={status[0]} signature={item} val={item[status[0]]}/>):
                    status[1]}
                    </td>
                ))}
                </tr>
              ))
          }
      </tbody>
    </table>
</div>
  );
        
}
}
 
export default QATable;