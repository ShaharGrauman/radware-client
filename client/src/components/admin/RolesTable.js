import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAngleDoubleLeft,faAngleDoubleRight, faHandPointLeft } from "@fortawesome/free-solid-svg-icons";

/* Table of Roles */
export default class RolesTable extends React.Component {

    tab1_To_tab2 = () => {
        var table1 = document.getElementById("table1"),
            table2 = document.getElementById("table2"),
            checkboxes = document.getElementsByName("check-tab1");
        console.log("Val 1 = " + checkboxes.length);

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                /* Create new row and cells */
                var newRow = table2.insertRow(table2.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1);

                /* Add values to the cells */
                cell1.innerHTML = table1.rows[i + 1].cells[0].innerHTML;
                cell2.innerHTML = "<input type='checkbox' name='check-tab2'>";

                /* Remove the transfered rows from the first table [table1] */
                var index = table1.rows[i + 1].rowIndex;
                table1.deleteRow(index);
                i--;
                /* We have deleted some rows so the checkboxes.length have changed 
                so we have to decrement the value of i */
                console.log(checkboxes.length);
            }
        }
    }

    tab2_To_tab1 = () => {
        var table1 = document.getElementById("table1"),
            table2 = document.getElementById("table2"),
            checkboxes = document.getElementsByName("check-tab2");
        console.log("Val 1 = " + checkboxes.length);

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                /* Create new row and cells */
                var newRow = table1.insertRow(table1.length),
                    cell1 = newRow.insertCell(0),
                    cell2 = newRow.insertCell(1);

                /* Add values to the cells */
                cell1.innerHTML = table2.rows[i + 1].cells[0].innerHTML;
                cell2.innerHTML = "<input type='checkbox' name='check-tab1'>";

                /* Remove the transfered rows from the first table [table1] */
                var index = table2.rows[i + 1].rowIndex;
                table2.deleteRow(index);
                i--;
                /* We have deleted some rows so the checkboxes.length have changed 
                so we have to decrement the value of i */
                console.log(checkboxes.length);
            }
        }
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="tab">
                        <table className="table table-striped table-hover table-bordered border-dark" id="table1" border="1">
                            <tr>
                                <th>Roles</th>
                                <th>Select</th>
                            </tr>
                            <tr>
                                <td>Role 1</td>
                                <td><input type="checkbox" name="check-tab1" /></td>
                            </tr>
                            <tr>
                                <td>Role 2</td>
                                <td><input type="checkbox" name="check-tab1" /></td>
                            </tr>
                            <tr>
                                <td>Role 3</td>

                                <td><input type="checkbox" name="check-tab1" /></td>
                            </tr>
                            <tr>
                                <td>Role 4</td>

                                <td><input type="checkbox" name="check-tab1" /></td>
                            </tr>
                            <tr>
                                <td>Role 5</td>
                                <td><input type="checkbox" name="check-tab1" /></td>
                            </tr>
                        </table>
                    </div>
                    {/* <div className="tab tab-btn mt-6">
                        <button onClick={
                            this.tab1_To_tab2
                        }><FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>

                        </button>
                        <button onClick={
                            this.tab2_To_tab1
                        }><FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon></button>
                    </div>
                    <div className="tab">
                        <table className="table table-striped table-hover table-bordered border-dark" id="table2" border="1">
                            <tr>
                                <th>Roles</th>
                                <th>Select</th>
                            </tr>
                        </table>
                    </div>*/}
                </div> 
            </>

        );
    }
}

