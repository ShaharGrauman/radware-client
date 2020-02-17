import React from "react";
import Table from '../shared/Table';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

export default class Audit extends React.Component {

    constructor(props) {
        super(props);
        this.data = [
            { Username: 'Example1@emaple.com', Event: 'Reasearcher', Description: 'update', Lastupdate: '12-12-2019 15:45' },
            { Username: 'Example1@emaple.com', Event: 'Reasearcher', Description: 'update', Lastupdate: '12-12-2019 15:45' },
            { Username: 'Example1@emaple.com', Event: 'Reasearcher', Description: 'update', Lastupdate: '12-12-2019 15:45' },
            { Username: 'Example1@emaple.com', Event: 'Reasearcher', Description: 'update', Lastupdate: '12-12-2019 15:45' }
        ];
        this.roleHeader = ['Username', 'Event', 'Description', 'Lastupdate'];
    }

    render() {
        return (
            <form >
                <form>
                    <div className="">
                        <div className="container mt-5">
                            <div className="row  ">
                                <h1>Audit Search</h1>
                            </div>
                            {/* <label for="basic-url"><h4>Activities</h4></label> */}

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
                                                    <Dropdown.Item eventKey="1"> Event1</Dropdown.Item>
                                                    <Dropdown.Item eventKey="2"> Event2</Dropdown.Item>
                                                    <Dropdown.Item eventKey="3"> Event3</Dropdown.Item>
                                                    <Dropdown.Item eventKey="4"> Event4</Dropdown.Item>
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
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon3">From</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="startDate"
                                            className="form-control"
                                            placeholder="00/00/0000"
                                            aria-describedby="basic-addon3"
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon3">Hour</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="00:00"
                                            aria-describedby="basic-addon3"
                                        />
                                    </div>
                                </div>
                            </div>
                            <label for="basic-url"><h4>End date</h4></label>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" >To</span>
                                        </div>
                                        <input
                                            type="text"
                                            name="endDate"
                                            className="form-control"
                                            placeholder="00/00/0000"
                                            aria-describedby="basic-addon3"
                                            onChange={this.changeHandler}
                                        />
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon3">Hour</span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="00:00"
                                            aria-describedby="basic-addon3"
                                        />

                                    </div>
                                </div>
                            </div>
                            <label for="basic-url"><h4>Users</h4></label>

                            <div className="row">
                                <div className="col-md-6">
                                    <>
                                        <InputGroup className="mb-3">
                                            
                                           <FormControl aria-describedby="basic-addon1" name='id' onChange={this.changeHandler} />
                                        </InputGroup>

                                    </>
                                </div>
                                <div className="col-md-6 ">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={this.submitHandler}>
                                        Search
                                            </button>
                                </div>
                            </div>

                             <div className="row">

                                <div className="col-md-8">
                                    <label for="basic-url"><h4>Results:</h4></label>

                                </div>


                            </div>
                            <div className="row">
                                <div className="col-md-10 mt-4">

                                    <Table header={this.roleHeader} data={this.data} />


                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </form>
        )
    }
}