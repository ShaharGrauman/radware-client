import React, { Component } from 'react';
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap';
import { ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';
import CveIdReportTable from '../CveIdReport/CveIdReportTable'
import { cveidSearch } from '../../../api/controllers/reports';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class CveIdReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TableData: [],
    }
    this.onSearchText = '';
    this.CveIdReportData = [];
    this.signatures = [
      { id: 1, patternId: 123451, description: "this is FAKE signature", status: 'in QA' },
      { id: 2, patternId: 123452, description: "this is FAKE signature", status: 'in QA' },
      { id: 3, patternId: 123453, description: "this is FAKE signature", status: 'in QA' },
      { id: 4, patternId: 123454, description: "ergerge", status: 'in QA' },
      { id: 5, patternId: 123455, description: "this is FAKE signature", status: 'in QA' },
      { id: 6, patternId: 123456, description: "this is FAKE signature", status: 'in QA' },
      { id: 7, patternId: 123457, description: "this is FAKE signature", status: 'in QA' },
      { id: 8, patternId: 123458, description: "this is FAKE signature", status: 'in progress' },
      { id: 9, patternId: 123459, description: "this is FAKE signature", status: 'in progress' },
      { id: 10, patternId: 1234510, description: "this is FAKE signature", status: 'in progress' },
      { id: 11, patternId: 1234511, description: "this is FAKE signature", status: 'in progress' },
      { id: 12, patternId: 1234512, description: "this is FAKE signature", status: 'in progress' },
      { id: 13, patternId: 1234513, description: "this is FAKE signature", status: 'in test' },
      { id: 14, patternId: 1234514, description: "this is FAKE signature", status: 'in test' },
      { id: 15, patternId: 1234515, description: "this is FAKE signature", status: 'in test' },
      { id: 28, patternId: 2828, description: "this is FAKE signature", status: 'in test' },
      { id: 29, patternId: 2929, description: "this is FAKE signature", status: 'in test' },
      { id: 30, patternId: 3030, description: "this is FAKE signature", status: 'in test' },
      { id: 33, patternId: 36352, description: "this is FAKE signature", status: 'in test' },
      { id: 45, patternId: 9875, description: "this is FAKE signature", status: 'in test' },]

    this.dataToTest = {
      tableStyle: {
        style: { borderWidth: "3px", width: '100%' },
        className: 'table table-striped table-hover table-bordered border-dark'
      },
      tableHedaer: [
        { value: 'pattern_id', valueToShow: 'PatterID', style: { width: "100px" }, sort: true },
        { value: 'description', valueToShow: 'description', style: {}, sort: true },
        { value: 'status', valueToShow: 'statussss', style: {}, sort: true },
      ],
      tableData: [
        { id: 1, pattern_id: 123451, description: "this is FAKE signature", status: 'in QA' },
        { id: 2, pattern_id: 123452, description: "this is FAKE signature", status: 'in QA' },
        { id: 3, pattern_id: 123453, description: "this is FAKE signature", status: 'in QA' },
        { id: 4, pattern_id: 123454, description: "ergerge", status: 'in QA' },
        { id: 5, pattern_id: 123455, description: "this is FAKE signature", status: 'in QA' },
        { id: 6, pattern_id: 123456, description: "this is FAKE signature", status: 'in QA' },
        { id: 7, pattern_id: 123457, description: "this is FAKE signature", status: 'in QA' },
        { id: 8, pattern_id: 123458, description: "this is FAKE signature", status: 'in progress' },
        { id: 9, pattern_id: 123459, description: "this is FAKE signature", status: 'in progress' },
        { id: 10, pattern_id: 1234510, description: "this is FAKE signature", status: 'in progress' },
        { id: 11, pattern_id: 1234511, description: "this is FAKE signature", status: 'in progress' },
        { id: 12, pattern_id: 1234512, description: "this is FAKE signature", status: 'in progress' },
        { id: 13, pattern_id: 1234513, description: "this is FAKE signature", status: 'in test' },
        { id: 14, pattern_id: 1234514, description: "this is FAKE signature", status: 'in test' },
        { id: 15, pattern_id: 1234515, description: "this is FAKE signature", status: 'in test' },
        { id: 28, pattern_id: 2828, description: "this is FAKE signature", status: 'in test' },
        { id: 29, pattern_id: 2929, description: "this is FAKE signature", status: 'in test' },
        { id: 30, pattern_id: 303022, description: "this is FAKE signature22", status: 'in test22' },
        { id: 33, pattern_id: 36352, description: "this is FAKE signature", status: 'in test' },
        { id: 45, pattern_id: 9875, description: "this is FAKE signature", status: 'in test' },
      ],
    }
  }

  openCveId = async cveid => {
    const [year, key] = cveid.split('-')
    try {
      const signatures = await cveidSearch(`signature/cveid?year=${year}&serial=${key}`)
      const data = this.state.TableData;
      data.map(cveidData =>
        cveidData.cveid == cveid ? !cveidData.hasOwnProperty('signatures') ? cveidData['signatures'] = signatures :
          delete cveidData.signatures : cveidData
      )
      this.setState({ TableData: data })
    } catch (error) {
      this.setState({
        errorMsg: 'ERROR'
      });
    }
  }
  componentWillMount = () => {
    this.setState({ TableData: this.CveIdReportData });
  }

  onSearch = async () => {
    if (this.onSearchText.length != 0) {
      try {
        const response = await cveidSearch(`signature/cveid?year=${this.onSearchText}`)
        this.setState({ TableData: response });
      } catch (error) {
        this.setState({
          errorMsg: 'ERROR'
        });
      }
    }
  }

  render() {
    return (
      <>
        <h2 className="ml-3 mb-3">CveId Report</h2>
        <br></br>
        <div className="container ml-3 mb-3">
          <div className="row">
            <div className="form-group has-search">
              <InputGroup>
                <input
                  id="searchBox"
                  type="text"
                  className="form-control form-rounded"
                  placeholder="Search"
                  onChange={e => {
                    this.onSearchText = e.target.value;
                  }}
                  onBlur={this.onSearch}
                  onKeyPress={(e) =>
                    e.key == 'Enter' ? this.onSearch() : null
                  }
                />
                <ButtonToolbar>
                  <OverlayTrigger
                    key={'top'}
                    placement={'top'}
                    overlay={
                      <Tooltip id={`tooltip-${'top'}`}>
                        You can search by pressing ENTER
                      </Tooltip>
                    }
                  >
                    <InputGroupAddon addonType="append" style={{ cursor: 'pointer' }}>
                      <InputGroupText>
                        <FontAwesomeIcon icon={faSearch} onClick={this.onSearch} />
                      </InputGroupText>
                    </InputGroupAddon>
                  </OverlayTrigger>
                </ButtonToolbar>
              </InputGroup>
            </div>
          </div>
          <div className="row">
            <div className="col p-0">
              <CveIdReportTable data={this.state.TableData} openCveId={this.openCveId} />
            </div>
          </div>
        </div>
      </>
    )
  }
}
