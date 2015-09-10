
// $(function() {
// 	alert("welcome!");
//   //console.log("here's your mock data to start with:")
//   //console.log(GLOBAL_MOCK_DATA_OBJECT)
// 	$.get(("https://openapi.etsy.com/v2/listings/active.js?limit=15&tags=cats&keywords=women&category=clothes&includes=Images:1&api_key=3kqfujuiow2nni3pco8gnzbf"), function handleResponse(data){
// 		console.log(data);
// 	      data['results'].forEach(function(element){ 
// 	      	$("#sanity-check").append("<img src='" + element.Images[0]url_75x75 + "'>");
// 	      });
// 	}));
// });

$(function(){

    $(document).ready(function(){
        $('#etsy-search').click('submit', function() {
            var api_key = "3kqfujuiow2nni3pco8gnzbf";
            terms = $('#etsy-terms').val();
            etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=women&category=clothes&tags="+
                terms+"&limit=20&includes=Images:1&api_key="+api_key;

            $('#etsy-images').empty();
            $('<p></p>').text('Searching for '+terms).appendTo('#etsy-images');

            $.ajax({
                url: etsyURL,
                dataType: 'jsonp',
                success: function(data) {
                    if (data.ok) {
                        $('#etsy-images').empty();
                        if (data.count > 0) {
                            $.each(data.results, function(i,item) {
                                $("<img/><i class='glyphicon glyphicon-heart></i>").attr("src", item.Images[0].url_170x135).appendTo("#etsy-images").wrap(
                                    "<a class='wrapper' href='" + item.url + "'></a>"
                                );
                                if (i%4 == 3) {
                                    $('<br/>').appendTo('#etsy-images');
                                }
                            });
                        } else {
                            $('<p>No results.</p>').appendTo('#etsy-images');
                        }
                    } else {
                        $('#etsy-images').empty();
                        alert(data.error);
                    }
                }
            });

            return false;
        })
    });

});