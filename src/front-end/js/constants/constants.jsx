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
		LABEL: "temp"
	},
    PREASURE: {
    	NAME: "Pressure",
        LABEL: "pressure"
    },
    HUMIDITY: {
        NAME: "Humidity",
        LABEL: "humidity"
    },
    WIND_SPEED: {
    	NAME: "Wind Speed",
		LABEL: "windSpeed"
	}
};