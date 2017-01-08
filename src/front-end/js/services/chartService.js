var chartService = (function(){

    var getStatisticChartData = function(collection, param, config){
        var data = {},
        dates = _getStatisticLabels(collection);
        data.labels = dates;
        //console.log(data.labels);
        data.datasets = _getStatisticDatasets(collection, param, config, dates);
        //console.log(data.datasets);
        return data;
    };
    
    var updateTicks = function (config, param, values){
        var limits = {};
        _.each(config.params, function (item){
            if(item.name == param){
                limits = (param == 'temp') ? _getTemperatureLimits(item, values) :
                    { max: item.max, min: 0 };
            }
        });
        return limits;
    };
    
    var getOptions = function (config, param, values){
        _.each(config.params, function (item){
            if(item.name == param){
                (param == 'temp') ? _getTemperatureOptions(config, item, values) :
                    _.first(config.chart.options.scales.yAxes).ticks.max = item.max;
            }
        });
        return config.chart.options;
    };

    var _getTemperatureOptions = function(config, item, values){
        var limits = _getTemperatureLimits(item, values);
        _.first(config.chart.options.scales.yAxes).ticks.max = limits.max;
        _.first(config.chart.options.scales.yAxes).ticks.min = limits.min;
        return config;
    };

    var _getTemperatureLimits = function(tempParams, values){
        var maxVal = Math.max.apply(Math, values),
            minVal = Math.min.apply(Math, values),
            ticks  = {};
        ticks.max = (tempParams.max > maxVal) ? tempParams.max : maxVal;
        ticks.min = (tempParams.min < minVal) ? tempParams.min : minVal;
        return ticks;
    };

    var _getStatisticLabels = function (collection){
        var result = [];
        _.each(collection, function(model){
            result.push(dateService.convertDate(model.get('time')));
        });
        return _.uniq(result);
    };

    var _getStatisticDatasets = function(collection, param, config, dates){
        var result = [];
        _.each(config.servicesNames, function(service, i){
            var data = {};
            data.label = service;
            data.fill = true;
            data.data = _getDataByTime(collection, service, param, dates);
            data.backgroundColor = config.chart.colors.background[i];
            data.borderColor = config.chart.colors.border[i];
            data.borderWidth = 2;
            result.push(data);
        });
        return result;
    };

    var _getDataByTime = function(collection, service, param, dates){
        var result = [];
        if(_.isArray(dates) && dates.length > 1){
            _.each(dates, function(date){
                result.push(_getDataByService(collection, service, param, date));
            });
        } else {
            result = _getDataByService(collection, service, param, dates)
        }

        return result;
    };

    var _getDataByService = function(collection, service, param, date){
        var result = [];
            _.each(collection, function(model){
                if((model.get('service') == service) &&
                    (dateService.convertDate(model.get('time')) == date)){
                    result.push(_getDataByParam(param, model.get('stat')));
                }
            });
        return result;
    };

    var _getDataByParam = function (param, statistics){
        var result = null;
        _.each(statistics, function(stat){
            if(stat.name == param){
                result = stat.avg;
            }
        });
        return result;
    };
    
    return {
        getOptions: getOptions,
        updateTicks: updateTicks,
        getStatisticChartData: getStatisticChartData
    }
})();
