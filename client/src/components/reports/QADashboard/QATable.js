import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QaStatuseUpdate from './QaStatuseUpdate';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faTimes} from '@fortawesome/free-solid-svg-icons';
import { faCheck} from '@fortawesome/free-solid-svg-icons';

import  './QADashboard.css';

class QATable extends Component {
constructor(props) {
    super(props);
    this.state = {
        checkedOption: this.props.checkedOption
    }
    this.role=["manual",'performance','automation']       
}

render() { 
    
return (
    <div className="table-responsive">
    <table data={this.data} className="table table-striped table-sm border border-dark" >
      <thead>
          <tr>
              <th scope="col" className="border-secondary border-right">PatternID 
                  <FontAwesomeIcon icon={faSort}></FontAwesomeIcon></th>
              <th scope="col" className="border-secondary border-right">URI</th>
              <th scope="col" className="border-secondary border-right">Headers</th>
              <th scope="col" className="border-secondary border-right">Body</th>
              <th scope="col" className="border-secondary border-right">Parameters</th>
              <th scope="col" className="border-secondary border-right">File</th>
              <th scope="col" className="border-secondary border-right">Manual QA</th>
              <th scope="col" className="border-secondary border-right">Performance</th>
              <th scope="col" className="border-secondary border-right">Automation</th>
          </tr>
      </thead>
      <tbody>
          {
              this.props.data.map(item => (
                <tr key={item.patternID} >
                    <td scope="row" className="border-secondary border-right border-top-0 font-weight-normal">
                        {item.patternID}
                    </td>
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal">
                    {item.URI=="true"?
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        :
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    }
                    </td>
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal">
                        {item.headers=="true"?
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        }
                    </td>
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal">
                        {item.body=="true"?
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        }                                </td>
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal">
                        {item.parameters=="true"?
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        }                                    </td>
                    <td scope="row" className="Centered border-secondary border-right border-top-0 font-weight-normal">
                        {item.file=="true"?
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            :
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        }     
                    </td>
                    <td scope="row" className="border-secondary border-right border-top-0 font-weight-normal">
                        {
                        this.role.includes('manual')?
                          <QaStatuseUpdate role="manual" key={item.patternID} value={item.patternID} checkedOption={this.props.checkedOption} />:
                          item.manualQa

                        }
                    </td>
                    <td scope="row" className="border-secondary border-right border-top-0 font-weight-normal">
                        {
                        this.role.includes('performance')?
                          <QaStatuseUpdate role="performance" key={item.patternID} value={item.patternID} checkedOption={this.props.checkedOption} />:
                          item.performance

                        }
                    </td>
                    <td scope="row" className="border-secondary border-right border-top-0 font-weight-normal">
                        {
                        this.role.includes('automation')?
                          <QaStatuseUpdate role="automation" key={item.patternID} value={item.patternID} checkedOption={this.props.checkedOption} />:
                          item.automation
                        }
                    </td>
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