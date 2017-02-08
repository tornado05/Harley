export const CHART_TYPES = {
	TEMPERATURE: "Temperature",
	PREASURE: "Preasure",
    HUMIDITY: "Humidity",
	WIND_SPEED: "Wind Speed"
};

export const ACTION_TYPES = {
	TEST: "test",
	CHANGE_CHART_TYPE: "change_chart_type",
	SET_WEATHER_DATA: "set_weather_data",
    GET_CURRENT_WEATHER_DATA: "get_current_weather_data"
};

export const CHART_PARAMS = {
    TEMPERATURE: {
    	NAME: "Temperature",
		LABEL: "temp",
		UNITS: "C",
		MIN: 30,
		MAX: -30
	},
    PREASURE: {
    	NAME: "Pressure",
        LABEL: "pressure",
        UNITS: "mmHg",
        MAX: 1200
    },
    HUMIDITY: {
        NAME: "Humidity",
        LABEL: "humidity",
        UNITS: "%",
        MAX: 100
    },
    WIND_SPEED: {
    	NAME: "Wind Speed",
		LABEL: "windSpeed",
        UNITS: "meter/sec",
        MAX: 50
	}
};