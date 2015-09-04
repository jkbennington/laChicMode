$(document).ready(function(){
  //console.log("here's your mock data to start with:")
  //console.log(GLOBAL_MOCK_DATA_OBJECT)
	$.get(("http://api.giphy.com/v1/gifs/search?q=funny+cats&api_key=dc6zaTOxFJmzC"), function handleResponse(data){
	      data.data.forEach(function(element){ 
	      	$("#sanity-check").append("<img src='" + element.images.fixed_height.url + "'>");
	      });
	});



	$(window).keypress(function(e){
		 var keyCode = e.keyCode;
		 
		  if(keyCode === 13){
	//GLOBAL_MOCK_DATA_OBJECT.data.forEach (function(element,index){
		 	var link = $("input").val()
		 	 $("img").remove();
				 $.get(("http://api.giphy.com/v1/gifs/search?q="+ link +"&api_key=dc6zaTOxFJmzC"), function handleResponse(data){
				      data.data.forEach(function(element){ 
			         
						 $("#sanity-check").append("<img src='" + element.images.fixed_height.url + "'>");
					 // can you render the mock data to the page?

				  		});
				});
		 };
	});
});