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
    this.role=this.props.role    
    this.data=this.props.data
}

render() {

return (
    <div className="table-responsive">
    <table className="table table-striped table-sm border border-dark" >
      <thead>
          <tr>
              {Object.keys(this.data[0]).slice(1).map((key,index)=>
              <th scope="col" className="border-secondary border-right" key={index}>
                  {key!='patternID'?key:<div>{key}{this.sortIcon}</div>}
                </th>
                )}
          </tr>
      </thead>
      <tbody>
          {
              this.data.map((item,index) =>(
                <tr key={index}>
                {Object.values(item).slice(1,7).map((column,index) => (
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal" key={index}>
                      {(()=>{
                        switch(column){
                            case true:
                                return this.trueIcon;
                            case false:
                                return this.falseIcon;
                            default:
                                return column;
                        }
                      })()
                    }
                    </td>
                ))}

                {(Object.entries(item).slice(7)).map((status,index)=>(
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal" key={index}>
                    {this.role.includes(status[0])?
                    <QaStatuseUpdate role={status[0]} signature={item} val={item[status[0]]}/>:
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