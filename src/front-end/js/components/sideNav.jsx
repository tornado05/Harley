import React from 'react';
import DatePicker from 'react-bootstrap-date-picker';
import { FormGroup, ControlLabel, FormControl, Radio, Button, ButtonGroup } from 'react-bootstrap';

export default class SideNav extends React.Component {
    constructor() {
        super();
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
                                <option value="Luts'k">Luts'k</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup>
                            <Radio name="groupOptions">Temperature</Radio>
                            <Radio name="groupOptions">Pressure</Radio>
                            <Radio name="groupOptions">Wind speed</Radio>
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Select period:</ControlLabel>
                            <DatePicker id="example-datepicker-from"/>
                            <DatePicker id="example-datepicker-to"/>
                        </FormGroup>
                        <Button type="submit">
                            Show
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}