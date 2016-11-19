'use strict';

var app = app || {};

app.appView = Backbone.View.extend({
    el: '#app',

    currentData: new app.currentWeatherCollection(),

    initialize: function () {
        this.currentData.fetch();
        this.listenTo(this.currentData, 'update', this.render)
    },

    render: function () {
        //this.$el.find('.content').html(templates.render('hello', {name: 'Harley'}));
        this.map();
        this.charts();

    },
    
    map: function(){
        var ourMap = L.map('map').setView([50.618778, 26.259055], 14);
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.pirates',
            accessToken: 'pk.eyJ1IjoiZHJvYmVueXVrIiwiYSI6ImNpdXp3aDczZTAwM2wyb3IzbXF0OTZ5YjgifQ.2WbUs9CJ8XuPlG3coCxBbg'
        }).addTo(ourMap);
        var coords = this.currentData.models[0].get('coords');
        console.log(coords);
        var message = [
            "Data from <b>" + this.currentData.models[0].get('sourceAPI') + '</b><br/>',
            "Temperature: " + this.currentData.models[0].get('temp') + '&deg;C <br/>',
            "Pressure: " + this.currentData.models[0].get('pressure') + 'mm<br/>'
        ].join('');
        var popup = L.popup()
            .setLatLng([coords.lat, coords.lon])
            .setContent(message)
            .openOn(ourMap);
    },

    charts: function(){
        var arrTemp = [];//temp rivne
        var arrDate = [];
        for(var i = 0; i < this.currentData.length; ++i){
            arrTemp.push(this.currentData.models[i].get('temp'));
        };
        for(var i = 0; i < this.currentData.length; ++i){
            arrDate.push(this.currentData.models[i].get('date'));
        };
        
        var ctx = this.$el.find("#myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: arrDate,
                datasets: [{
                    label: 'Rivne',
                    data: arrTemp,//temp rivne
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1
                },
                    {
                        label: 'Lutsk',
                        data: [4, 6, 3, 11, 12, 13,6,13,13,11,9,3],
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        borderColor: 'rgba(0,0,132,1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lviv',
                        data: [11, 1, 3, 5, 12, 3,6,3,7,11,10,13],
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        borderColor: 'rgba(0,99,132,1)',
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        var ctx1 = this.$el.find("#myChart1");
        var myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: 'Rivne',
                    data: [12, 19, 3, 5, 2, 3,6,3,7,5,9,3],
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 1
                },
                    {
                        label: 'Lutsk',
                        data: [4, 6, 3, 15, 12, 13,6,13,17,15,9,3],
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        borderColor: 'rgba(0,0,132,1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Lviv',
                        data: [12, 1, 3, 5, 12, 3,6,3,7,15,10,13],
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        borderColor: 'rgba(0,99,132,1)',
                        borderWidth: 1
                    }]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        var ctx2 = this.$el.find("#myChart2");
        var myChart2 = new Chart(ctx2, {
            type: 'radar',
            data: {
                labels: ["Temperature", "Humidity", "Clouds", "Wind_Speed", "Wind_Deg", "Rain"],
                datasets: [
                    {
                        label: "Rivne",
                        backgroundColor: "rgba(0, 0, 255, 0.5)",
                        borderColor: "rgba(0,0,0,1)",
                        pointBackgroundColor: "rgba(0, 0, 255, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(179,181,198,1)",
                        data: [12, 59, 90, 81, 56, 55]
                    },
                    {
                        label: "Lutsk",
                        backgroundColor: "rgba(0, 255, 0, 0.5)",
                        borderColor: "rgba(0,0,132,1)",
                        pointBackgroundColor: "rgba(0, 255, 0, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [13, 48, 40, 19, 96, 27]
                    },
                    {
                        label: "Lviv",
                        backgroundColor: "rgba(0, 0, 255, 0.5)",
                        borderColor: "rgba(0,99,132,1)",
                        pointBackgroundColor: "rgba(0, 0, 255, 1)",
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: "rgba(255,99,132,1)",
                        data: [15, 68, 40, 91, 60, 57]
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

});
