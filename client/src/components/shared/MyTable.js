import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
let index = 0;


function TableHeader(props) {
  return (
    <th scope="col">
      {props.header.value}
      <FontAwesomeIcon
        className="ml-1"
        icon={faSort}
        hidden={!props.header.toSort}
        onClick={() => props.sortOn(props.header)}
      ></FontAwesomeIcon>
    </th>
  );
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <table className="table table-striped table-hover table-bordered border-dark"
        style={{ borderWidth: "3px" }}>
        <thead className="thead font-weight-normal">
          <tr>
            {this.props.header.map(key => (
              <TableHeader
                header={key}
                sortOn={(header) => this.props.sortDataByKey(header)}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(entries => (
            <tr>
              {Object.values(entries).map(column => (
                <td style={{width: "100px"}}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
