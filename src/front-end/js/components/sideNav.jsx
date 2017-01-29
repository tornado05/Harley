import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup } from 'react-bootstrap';
import {CHART_TYPES} from './../constants/constants.jsx';

export default class SideNav extends React.Component {
    constructor() {
        super();

        this.showChart = this.showChart.bind(this);
        this.setChartType = this.setChartType.bind(this);

        this.state = {
            chartType: CHART_TYPES.TEMPERATURE
        }
    }

    showChart () {
        if (this.props.changeChartType) {
            this.props.changeChartType(this.state.chartType);
        }
    }

    setChartType (type) {
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
                            <FormControl componentClass="select" placeholder="select">
                                <option value="Rivne">Rivne</option>
                                <option value="Kiev">Kiev</option>
                                <option value="Luts'k">Lutsk</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Radio 
                                name="groupOptions" 
                                onClick={() => this.setChartType(CHART_TYPES.TEMPERATURE)}
                                checked={CHART_TYPES.TEMPERATURE === this.state.chartType}
                                onChange={()=>{}}
                            >
                                Temperature
                            </Radio>
                            <Radio 
                                name="groupOptions"
                                onClick={() => this.setChartType(CHART_TYPES.PREASURE)}
                                checked={CHART_TYPES.PREASURE === this.state.chartType}
                                onChange={()=>{}}
                            >
                                Pressure
                            </Radio>
                            <Radio 
                                name="groupOptions"
                                onClick={() => this.setChartType(CHART_TYPES.WIND_SPEED)}
                                checked={CHART_TYPES.WIND_SPEED === this.state.chartType}
                                onChange={()=>{}}
                            >
                                Wind speed
                            </Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Select period:</ControlLabel>
                            <DatePicker id="example-datepicker-from"/>
                            <DatePicker id="example-datepicker-to"/>
                        </FormGroup>
                        <Button onClick={this.showChart}>
                            Show
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}