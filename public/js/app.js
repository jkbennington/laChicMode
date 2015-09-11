
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

// function heartButton(click) {
//     console.log(this);
// }
$(document).ready(function(){
    $("#evil").on("click", function () {

    console.log("hello")
    });

});



$(document).ready(function(){


    $('#submit').click('submit', function() {
        // api_key = "3kqfujuiow2nni3pco8gnzbf";
        var terms = {}
        terms.search = $('#etsy-terms').val();
        // etsyURL = "https://openapi.etsy.com/v2/listings/active.js?keywords=women&category=clothes&tags="+
        //     terms+"&limit=20&includes=Images:1&api_key="+api_key;

        // $('#etsy-images').empty();
        $('<p></p>').text('Searching for '+terms.search).appendTo('#etsy-images');

        $.ajax({
            url: '/search',
            type: 'GET',
            data: terms,
            // dataType: 'jsonp',
            success: function(data) {
                $.ajax({
                    url: data,
                    dataType: 'jsonp',
                    success: function(data) {
                         if (data.ok) {
                        $('#etsy-images').empty();
                        if (data.count > 0) {
                            $.each(data.results, function(i,item) {
                                $("<img/>").attr("src", item.Images[0].url_170x135).appendTo("#etsy-images").wrap(
                                    // "<a href='" + item.url + "'></a>"
                                ).wrap("<div id='evil' class='wrapper glyphicon glyphicon-heart' style='cursor:pointer'><a href='" + item.url + "'></a></div>")
                                if (i === 5) {
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
            }
        });
    });
});
