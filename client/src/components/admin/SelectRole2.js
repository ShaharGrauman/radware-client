import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";


function TableHeader(props) {
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

export default class SelectRole2 extends React.Component {
  constructor(props) {
    super(props);
    
 
  }

  render() {
    return (
        <table class="table table-striped table-hover table-bordered border-dark" style={{textAlign:"center"}}>
        <thead>
            <tr class="m-0">
                <th class="w-50">Roles</th>
                <th class="w-50">Select</th>
            </tr>
        </thead>
        <tbody>
            <tr class="m-0">
                <td class="w-25">Role 1</td>
                <td class="w-25 center" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Role 2</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Role 3</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Role 4</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Role 5</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Role 6</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
        </tbody>
    </table>
    );
  }
}
