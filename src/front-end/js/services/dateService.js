var dateService = (function(){

    var convertDate = function(timestamp){
        var date = new Date(timestamp * 1000);
        return [
            (date.getDay() < 10) ? '0' + date.getDay() : date.getDay(),
            (date.getMonth() + 1  < 10) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            date.getFullYear()
        ].join('-')
    };

    return{
        convertDate: convertDate
    }
})();
