function counter (mode_param, item_param, input_tag){
    if(mode_param == "sum"){
        $.ajax({
               type: 'GET',
               url: 'http://' +location.host + '/form/amountcount/index/mode:'+mode_param+'/item_id:'+item_param+'/',
               dataType: 'text',
               success: function(data) {
                   var num = new String(data).replace(/,/g, "");
                   while(num != (num = num.replace(/^(-?\d+)(\d{3})/, "$1,$2")));
                   $(input_tag).text("￥"+num);
               }
        });
    }else{
        $.ajax({
               type: 'GET',
               url: 'http://' +location.host + '/form/amountcount/index/mode:'+mode_param+'/item_id:'+item_param+'/',
               dataType: 'text',
               success: function(data) {
                   $(input_tag).text(String(data)+"件");
               }
        });    
    }
}(jQuery);