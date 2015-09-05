$(document).ready(function(){
  //console.log("here's your mock data to start with:")
  //console.log(GLOBAL_MOCK_DATA_OBJECT)
	$.get((""), function handleResponse(data){
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
				 $.get(("https://openapi.etsy.com/v2/listings/active/?limit=15&tags=cats&category=clothing&api_key=3kqfujuiow2nni3pco8gnzbf"), function handleResponse(data){
				      data.data.forEach(function(element){ 
			         
						 $("#sanity-check").append("<img src='" + element.images.fixed_height.url + "'>");
					 // can you render the mock data to the page?

				  		});
				});
		 };
	});
});