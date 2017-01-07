'use strict';
var app = app || {};

$(function () {
    /**
     * Initialize of Application
     */
    window.WeatherApplication = new app.appView();

    /**
     * Initialization of materialize menu button
     */
    $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
            draggable: true // Choose whether you can drag to open on touch screens
        }
    );

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
