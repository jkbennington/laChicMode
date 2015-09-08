$(document).ready(function(){


})	$.get(("https://openapi.etsy.com/v2/listings/active/?limit=15&tags=cats&category=clothing&keywords=women&api_key="), function handleResponse(item){
		item.data.forEach(function(element){
			$("#target").append("<img src='" + element. +"'>")
		}

	})