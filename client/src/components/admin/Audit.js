import React from "react";
import Table from '../shared/Table';

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
// import axios from 'axios';

// import { lastUpdates } from './api/audit';
// import { rangeDates } from './api/audit';
// import { rangeDatesId } from './api/audit';

export default class Audit extends React.Component {

    constructor(props) {
        super(props);
        this.data = [
            { id: '1', Email: 'Example1@emaple.com', role: 'Reasearcher', Event: 'update', Lastupdate: '12-12-2019 15:45' },
            { id: '2', Email: 'Example2@emaple.com', role: 'QA', Event: 'new', Lastupdate: '12-10-2019 16:30' },
            { id: '3', Email: 'Example3@emaple.com', role: 'Support', Event: 'Edit', Lastupdate: '18-1-2019 01:30' },
            { id: '4', Email: 'Example4@emaple.com', role: 'Reasearcher', Event: 'Edit', Lastupdate: '01-06-2019 18:54' }
        ];  
        this.roleHeader = ['id' , 'Email' , 'role' , 'Event' , 'Lastupdate'];
    }




    render() {
        return (
            <form >
                <form>
                    <div className=" ">
                        <div className="container mt-5">
                            <div class="row  ">
                                <h1>Audit Search</h1>
                            </div>
                            <label for="basic-url"><h4>Activities</h4></label>

                            <div className="row">
                                <div className="col-md-6">
                                    <ButtonToolbar>
                                        {['Secondary'].map(
                                            variant => (
                                                <DropdownButton
                                                    title={'Show result for all activities'}
                                                    variant={variant.toLowerCase()}
                                                    id={`dropdown-variants-${variant}`}
                                                    key={variant}
                                                >
                                                    <Dropdown.Item eventKey="1"> Signature</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2"> Users</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3"> QA</Dropdown.Item>
                                                    <Dropdown.Item eventKey="4"> Roles</Dropdown.Item>
                                                    <Dropdown.Item eventKey="5">All </Dropdown.Item>
                                                </DropdownButton>
                                            ),
                                        )}
                                    </ButtonToolbar>





                                </div>

                            </div>

                            <label for="basic-url"><h4>Start date</h4></label>

                            <div className="row">
                                <div className="col-md-6">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">From</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="startDate"
                                            class="form-control"
                                            placeholder="00/00/0000"
                                            aria-describedby="basic-addon3"
                                            onChange={this.changeHandler}
                                        />


                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Hour</span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="00:00"
                                            aria-describedby="basic-addon3"
                                        />

                                    </div>
                                </div>
                            </div>
                            <label for="basic-url"><h4>End date</h4></label>

                            <div className="row">
                                <div className="col-md-6">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >To</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="endDate"
                                            class="form-control"
                                            placeholder="00/00/0000"
                                            aria-describedby="basic-addon3"
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon3">Hour</span>
                                        </div>
                                        <input
                                            type="text"
                                            class="form-control"
                                            placeholder="00:00"
                                            aria-describedby="basic-addon3"
                                        //    onChange={this.changeHandler}
                                        />

                                    </div>
                                </div>
                            </div>
                            <label for="basic-url"><h4>Users</h4></label>

                            <div className="row">
                                <div className="col-md-6">
                                    <>
                                        <InputGroup className="mb-3">
                                            <DropdownButton
                                                as={InputGroup.Prepend}
                                                variant="outline-secondary"
                                                title="Search By"
                                                id="input-group-dropdown-1"
                                                onChange={this.changeHandler}
                                            >
                                                <Dropdown.Item href="#">Id</Dropdown.Item>
                                                <Dropdown.Item href="#">Email</Dropdown.Item>
                                                <Dropdown.Item href="#">Role</Dropdown.Item>
                                                <Dropdown.Item href="#">Premissions</Dropdown.Item>

                                            </DropdownButton>
                                            <FormControl aria-describedby="basic-addon1" name='id' onChange={this.changeHandler} />
                                        </InputGroup>

                                    </>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" class="btn btn-secondary" onClick={this.lastUpdateHandler}>Last Updates</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 ">
                                    <button
                                        type="submit"
                                        class="btn btn-secondary mt-2"
                                        onClick={this.submitHandler}>

                                        Search
                                            </button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8">

                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-8">
                                    <label for="basic-url"><h4>Results:</h4></label>

                                </div>
                                <div className="col-md-2">
                                    <button type="button" class="btn btn-secondary mt-2">Export results</button>
                                </div>
                                <div className="col-md-2">
                                    <ButtonToolbar>
                                        {['Secondary'].map(
                                            variant => (
                                                <DropdownButton
                                                    title={'Filter By'}
                                                    variant={variant.toLowerCase()}
                                                    id={`dropdown-variants-${variant}`}
                                                    key={variant}
                                                    className="mt-2"
                                                    onSelect={this.filterHandler}
                                                >
                                                    <Dropdown.Item eventKey="new">New </Dropdown.Item>
                                                    <Dropdown.Item eventKey="update">Updated </Dropdown.Item>
                                                    <Dropdown.Item eventKey="Edit">Edit </Dropdown.Item>
                                                    <Dropdown.Item eventKey="Exported">Exported</Dropdown.Item>
                                                    <Dropdown.Item eventKey="All">All</Dropdown.Item>
                                                </DropdownButton>
                                            ),
                                        )}
                                    </ButtonToolbar>

                                </div>

                            </div>
                            <div className="row">

                                <div className="col-md-1 mt-4">
                                </div>
                                <div className="col-md-10 mt-4">

                                    <Table header = {this.roleHeader} data={this.data} />   {/*  צריך לשלוח PROPS   */}

                                    {/* {console.log(this.state.data[0])} */}

                                    {/* {console.log({ id: 1, Email: 'Example1@emaple.com', role: 'Reasearcher', Event: 'update', Lastupdate: '12-12-2019 15:45' })} */}

                                    {/* {console.log(Object.keys({ id: '1', Email: 'Example1@emaple.com', role: 'Reasearcher', Event: 'update', Lastupdate: '12-12-2019 15:45' }))} */}

                                    {/* {console.log(Object.keys(this.state.data))} */}
                                </div>
                                <div className="col-md-1 mt-4">

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </form>
        )
    }
}