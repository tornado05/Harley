var chartService = (function(){

    var getStatisticChartData = function(collection, param, config){
        var data = {};
        data.labels = _getStatisticLabels(collection);
        console.log(data.labels);
        data.datasets = _getStatisticDatasets(collection, param, config);
        console.log(data.datasets);
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

    var _getStatisticDatasets = function(collection, params, config){
        var result = [],
            data = {};
        _.each(config.servicesNames, function(service){
            data.label = service;
            data.fill = true;
            data.data = _getDataByService(collection, service, param);
            data.backgroundColor = null;
            data.borderColor = null;
            data.borderWidth = 2;
            result.push(data);
        });
        return result;
    };

    var _getDataByService = function(collection, service, param){
        var result = [];
        _.each(collection, function(model){
            
        });
        return result;
    };
    
    return {
        getOptions: getOptions,
        updateTicks: updateTicks,
        getStatisticChartData: getStatisticChartData
    }
})();
