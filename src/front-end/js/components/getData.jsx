import React    from 'react';
import axios    from 'axios';

export default class FetchDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: []
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/weather/v01/configs`)
            .then(res => {

                const cities = res.data.cities;
                console.log(cities);
                this.setState({ cities });
                console.log('**************');
                console.log(this.state);
                console.log('**************');
                console.log(this.state.cities);
                console.log('**************');
                this.state.cities.forEach(city => console.log(city.name));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <h2>Cities</h2>
                <ul>
                    {this.state.cities.forEach(city =>
                        <li key={city.name}>{city.name}</li>
                    )}
                </ul>
            </div>
        );
    }
}
