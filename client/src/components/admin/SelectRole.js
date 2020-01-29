import React from "react";

function TableHeader(props) {
  return (
    <th scope="col">
      {props.header}
    </th>
  );
}

export default class SelectRole extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <table class="table table-striped table-hover table-bordered border-dark" style={{textAlign:"center"},{ borderWidth: "3px" }}>
        <thead>
            <tr className="m-0 thead font-weight-normal">
                <th class="w-50">Roles</th>
                <th class="w-50">Select</th>
            </tr>
        </thead>
        <tbody>
            <tr class="m-0">
                <td class="w-25">Researcher</td>
                <td class="w-25 center" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Support</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Manual QA</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Performance QA</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
            <tr class="m-0">
                <td class="w-25">Automation QA</td>
                <td class="w-25" ><input type="checkbox" name="myTextEditBox" value="checked" /></td>
            </tr>
        </tbody>
    </table>
    );
  }
}
