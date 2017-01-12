'use strict';
var app = app || {};

$(function () {
    /**
     * Initialize of Application
     */
    window.WeatherApplication = new app.appView();

    /**
     * Shows max value from array.
     * Necessary for correct work of weatherDataService
     *
     * @param array
     * @returns {number}
     */
    Array.max = function( array ){
        return Math.max.apply( Math, array );
    };
    /**
     * Shows min value from array.
     * Necessary for correct work of weatherDataService
     *
     * @param array
     * @returns {number}
     */
    Array.min = function( array ){
        return Math.min.apply( Math, array );
    };
    
});
