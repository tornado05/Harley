import React from "react";
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup} from "react-bootstrap";
import {CHART_TYPES} from "./../constants/constants.jsx";
import {changeChartType} from "./../actions/chartActions.jsx";

export default class SideNav extends React.Component {
    constructor() {
        super();

        this.handleShowChartClick = this.handleShowChartClick.bind(this);

        this.state = {
            chartType: CHART_TYPES.TEMPERATURE
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
                            >
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Luts'k">Lutsk</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Radio
                                checked={CHART_TYPES.TEMPERATURE === this.state.chartType}
                                name="groupOptions"
                                onChange={()=>{}}
                                onClick={() => this.handleChartType(CHART_TYPES.TEMPERATURE)}
                            >
                                Temperature
                            </Radio>
                            <Radio
                                checked={CHART_TYPES.PREASURE === this.state.chartType}
                                name="groupOptions"
                                onChange={()=>{}}
                                onClick={() => this.handleChartType(CHART_TYPES.PREASURE)}
                            >
                                Pressure
                            </Radio>
                            <Radio
                                checked={CHART_TYPES.WIND_SPEED === this.state.chartType}
                                name="groupOptions"
                                onChange={()=>{}}
                                onClick={() => this.handleChartType(CHART_TYPES.WIND_SPEED)}
                            >
                                Wind speed
                            </Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Select period:</ControlLabel>
                            <DatePicker id="example-datepicker-from"/>
                            <DatePicker id="example-datepicker-to"/>
                        </FormGroup>
                        <Button onClick={this.handleShowChartClick}>
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