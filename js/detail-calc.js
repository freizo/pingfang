function tableToMatrix(id) {
    var data = [];
    $(id + ' tr').each(function(i) {
        data[i] = [];
        $('td', $(this)).each(function(j) {
            data[i][j] = $(this).text();
        });
    });
    return data;
}

function itemToObject(url){
    var json = $.ajax({
        url: url,
        async: false,
        type: 'GET',
        dataType: 'json'
   });
   if (json.responseText == '') return true;
   var response = $.parseJSON(json.responseText);
   return response;
}

function itemInfoGet(item_id, mode){
    var value = $.ajax({
        url: 'http://' +location.host + '/form/amountcount/index/mode:'+mode+'/item_id:'+item_id+'/',
        async: false,
        type: 'GET',
        dataType: 'text'
   });
   if (value.responseText == '') return true;
   return value.responseText;
}

function SummaryArrayGet(user_data, item_object){
    
    var return_object = new Object();
    
    $.each( item_object, function( key1, value1 ) {
        var temp_item_object = new Object();
        
        var user_invest_total = 0;
        var user_back_total = 0;
        var new_key = null;
        
        $.each( value1["Itemmaster"], function( key2, value2 ) {
            
            if(key2 === "item_id"){
                new_key = value2;
            }
            temp_item_object[key2] = value2;
        });

        $.each( user_data, function( key3, value3 ) {
            var temp_key = null;
            var temp_type_code = null;

            $.each( value3, function( key4, value4 ) {

                //instrumet_id
                if(key4 === 1){
                    temp_key = value4;
                }

                //buy_sell_type_code
                if(key4 === 3){
                    temp_type_code = value4;
                }

                //price
                if(temp_key == new_key && key4 === 5){
                    switch(temp_type_code){
                        case "1": user_back_total = user_back_total + parseInt(value4); break;
                        case "4": user_invest_total = user_invest_total - parseInt(value4); break;
                        case "10": user_invest_total = user_invest_total + parseInt(value4); break;
                    }
                }
            });
        });

        temp_item_object["total_amount"] = user_invest_total;
        temp_item_object["back_amount"] = user_back_total;
        return_object[new_key] = temp_item_object; 
        
    });

    return return_object;
}