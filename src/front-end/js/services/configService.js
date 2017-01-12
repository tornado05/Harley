var configService = (function(){
    var getParamFullName = function(config, param){
        var result = null;
        _.each(config.params, function(item){
            if (item.name == param){
                return result = item.label;
            }
        });
        return result;
    };
    var createLabel = function(config, param, city){
        _.each(config.params, function (item) {
            if (item.name == param) {
                param = item;
            }
        });
        return param.label + ' in ' + city + ' (' + param.units + ')';
    };
    var getConfigByParam = function(config, param){
        var result = null;
        _.each(config.params, function (item) {
            if (item.name == param) {
                return result = item;
            }
        });
        return result;
    };
    
    return{
        getConfigByParam: getConfigByParam,
        getParamFullName: getParamFullName,
        createLabel: createLabel
    }
})();
