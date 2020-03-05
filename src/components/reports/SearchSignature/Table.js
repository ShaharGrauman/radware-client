import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

let indx = 0;
const capitalizeFirstLetter = str => str.replace(/^\w/, function (chr) { return chr.toUpperCase(); });

function TableHedaer(props) {
  return (
    <th scope="col" key={indx++}>
      {capitalizeFirstLetter(props.header)}
      <FontAwesomeIcon
        icon={faSort}
        onClick={() => props.sortOn(props.header)}
      ></FontAwesomeIcon>
    </th>
  )
}

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <table
        className="table table-striped table-hover table-bordered border-dark"
        style={{ borderWidth: "3px" }}
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
                <td key={indx++}>{column}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
