import React from "react";
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup} from "react-bootstrap";
import {CHART_TYPES} from "./../constants/constants.jsx";
import { changeChartType, changeCity, changeDateFrom, changeDateTo, changeStatType } from "./../actions/chartActions.jsx";
import { getStatisticsData } from "./../actions/dataActions.jsx";

export default class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.handleShowChartClick = this.handleShowChartClick.bind(this);
        this.handleChartType = this.handleChartType.bind(this);
        this.handleSetInputData = this.handleSetInputData.bind(this);
        this._setRadioData = this._setRadioData.bind(this);
        this.handleSetDateFrom = this.handleSetDateFrom.bind(this);
        this.handleSetDateTo = this.handleSetDateTo.bind(this);
        this.handleGetFormData = this.handleGetFormData.bind(this);

        this.state = props.chartState;
        console.log("nav state", this.state);
    }

    handleShowChartClick () {
        changeChartType(this.state.chartType);
    }

    handleChartType (type) {
        this.setState({
            chartType: type
        });
    }

    /**
     *
     * TODO: Need to replace this by react-redux-form
     *
     */


    handleSetInputData (event) {
        changeCity(event.target.value);
    }
    _setRadioData (event) {
        changeStatType(event.target.value);
    }

    handleSetDateFrom (value) {
        changeDateFrom(value);
    }
    handleSetDateTo (value) {
        changeDateTo(value);
    }

    handleGetFormData () {
        changeChartType(this.state.chartType);
        getStatisticsData(this.state.periodFrom, this.state.periodTo, this.state.cityName);
    }

    render () {
        return (
            <div className={this.props.className}>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <form>
                        <h3 className="">Show information</h3>
                        <FormGroup>
                            <ControlLabel>Select city:</ControlLabel>
                            <FormControl
                                componentClass="select"
                                onChange={this.handleSetInputData}
                                placeholder="select"
                            >
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Luts'k">Lutsk</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Radio
                                checked = {CHART_TYPES.TEMPERATURE === this.state.chartType}
                                name="groupOptions"
                                onChange={() => this.handleChartType(CHART_TYPES.TEMPERATURE)}
                            >
                                Temperature
                            </Radio>
                            <Radio
                                checked = {CHART_TYPES.PREASURE === this.state.chartType}
                                name="groupOptions"
                                onChange={() => this.handleChartType(CHART_TYPES.PREASURE)}
                            >
                                Pressure
                            </Radio>
                            <Radio
                                checked = {CHART_TYPES.WIND_SPEED === this.state.chartType}
                                name="groupOptions"
                                onChange={() => this.handleChartType(CHART_TYPES.WIND_SPEED)}
                            >
                                Wind speed
                            </Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Select period:</ControlLabel>
                            <DatePicker
                                id = "example-datepicker-from"
                                onChange = {this.handleSetDateFrom}
                            />
                            <DatePicker
                                id = "example-datepicker-to"
                                onChange = {this.handleSetDateTo}
                            />
                        </FormGroup>
                        <Button onClick={this.handleGetFormData}>
                            Show
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

SideNav.propTypes = {
    className: React.PropTypes.string,
    chartState: React.PropTypes.object
};