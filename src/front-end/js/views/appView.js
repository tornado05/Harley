'use strict';

var app = app || {};

app.appView = Backbone.View.extend({
    el: '#app',

    initialize: function () {
       this.render();
    },

    render: function () {
        this.$el.find('.content').html(templates.render('hello', {name: 'Harley'}));
        this.map();
    },
    
    map: function(){
        var ourMap = L.map('map').setView([50.618778, 26.259055], 14);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.pirates',
            accessToken: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg'
        }).addTo(ourMap);
    }

});
