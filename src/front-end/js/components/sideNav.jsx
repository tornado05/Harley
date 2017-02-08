import React from "react";
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup} from "react-bootstrap";
import {CHART_TYPES} from "./../constants/constants.jsx";
import {changeChartType, changeCity, changeDateFrom, changeDateTo, changeStatType} from "./../actions/chartActions.jsx";
import { getStatisticsData } from "./../actions/dataActions.jsx";

export default class SideNav extends React.Component {
    constructor() {
        super();

        this.handleShowChartClick = this.handleShowChartClick.bind(this);
        this._setInputData = this._setInputData.bind(this);
        this._setRadioData = this._setRadioData.bind(this);
        this._setDateFrom = this._setDateFrom.bind(this);
        this._setDateTo = this._setDateTo.bind(this);

        let value = new Date().toISOString();
        this.state = {
            chartType: CHART_TYPES.TEMPERATURE,
            cityName: 'Rivne',
            periodFrom: value,
            periodTo: value,
            statType: CHART_TYPES.TEMPERATURE
        }
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


    _setInputData (event) {
        // this.setState({cityName: event.target.value});
        changeCity(event.target.value);
    }
    _setRadioData (event) {
        // this.setState({statType: value});
        changeStatType(event.target.value);
    }
    _setDateFrom (value) {
        // this.setState({periodFrom: value});
        changeDateFrom(value);
    }
    _setDateTo (value) {
        // this.setState({periodTo: value});
        changeDateTo(value);
    }

    _getFormData () {
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
                                placeholder="select"
                                onChange={this._setInputData}
                            >
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Luts'k">Lutsk</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Radio
                                value = {CHART_TYPES.TEMPERATURE}
                                name="groupOptions"
                                onChange={this._setRadioData}
                            >
                                Temperature
                            </Radio>
                            <Radio
                                value = {CHART_TYPES.PREASURE}
                                name="groupOptions"
                                onChange={this._setRadioData}
                            >
                                Pressure
                            </Radio>
                            <Radio
                                value = {CHART_TYPES.WIND_SPEED}
                                name="groupOptions"
                                onChange={this._setRadioData}
                            >
                                Wind speed
                            </Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Select period:</ControlLabel>
                            <DatePicker id="example-datepicker-from"
                                        value={this.state.value}
                                        onChange={this._setDateFrom}
                            />
                            <DatePicker id="example-datepicker-to"
                                        value={this.state.value}
                                        onChange={this._setDateTo}
                            />
                        </FormGroup>
                        <Button onClick={this._getFormData}>
                            Show
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

SideNav.propTypes = {
    className: React.PropTypes.string
};