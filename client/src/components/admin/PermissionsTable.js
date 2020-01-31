import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

/**
 * Permissions aren't dynamic because it has to be supported in client and server.
 * If permissions were dynamic, then how can we force its usage without changing the code?
 * So when a new permission is needed, it must be added here and whenever necessary on client/server code
 */
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

export default class PermissionsTable extends React.Component {
  constructor(props) {
    super(props);
    
 
  }

  render() {
    return (
        <table class="table table-striped table-hover table-bordered border-dark" style={{textAlign:"center"}}>
        <thead>
            <tr class="m-0">
                <th class="w-50">Avaliable permissions</th>
                <th class="w-50">Select</th>
            </tr>
        </thead>
        <tbody>
            <tr class="m-0">
                <td class="w-25">New signature</td>
                <td class="w-25 center" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Search signature	</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Export</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Permission 1</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
  
            <tr class="m-0">
                <td class="w-25">Permission 2</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
        </tbody>
    </table>
    );
  }
}
