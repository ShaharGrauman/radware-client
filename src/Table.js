import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

function TableHedaer(props) {
    return (
      <th scope="col">
        {props.header}
        <FontAwesomeIcon
          icon={faSort}
          onClick={() => props.sortOn(props.header)}
        ></FontAwesomeIcon>
      </th>
    );
  }

export default class Table extends React.Component{

    constructor(props) {
        super(props);
        this.props = props;
      }

render(){
    return(

        <table
        className="table table-striped table-hover table-bordered border-dark"
        style={{ borderWidth: "2px" }}
      >
        <thead>
          <tr>
            {Object.keys(this.props.data[0]).map(key => (
              <TableHedaer
                header={key}
                sortOn={() => this.props.sortDataByKey(this.props.data, key)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(entries => (
            <tr>
              {Object.values(entries).map(column => (
                <td>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
        )

        }
}


