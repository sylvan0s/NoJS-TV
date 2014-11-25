function onImageClick(elmnt) {
	var SelectedType = $(elmnt).data("type");
	var ProductID;
    //console.log($(elmnt).data("type"));
    //console.log(listproducts);
    for ( prod in listproducts ){
    	if ( listproducts[prod].display_name == SelectedType ){
    		ProductID = listproducts[prod].product_id;
    		//console.log(ProductID);
    	}
    }

    // Lat : 48.8205039
    // Long : 2.3910444
    socket.emit("GetEstimatePrices", { slat : window.position.latitude, slong : window.position.longitude, elat : 48.8205039, elong : 2.3910444, type : SelectedType });
}

function affichageEstimation(data){
	console.log(data);
	var estim = data.estim.prices;
	console.log(estim);
	for ( type in estim ){
		if ( estim[type].display_name == data.loc.type ){
			console.log(estim[type].estimate);
			$("#info").append(" - " + data.loc.type + "<br>" + estim[type].estimate + "<br>");
			socket.emit("GetEstimateTime", data.loc);
		}
	}
}

function affichageEstimation2(data){
	console.log(data);
	var estim = data.estim.times;
	console.log(estim);
	for ( type in estim ){
		if ( estim[type].display_name == data.loc.type ){
			var min = Math.floor(estim[type].estimate / 60);
			var seconds = Math.floor((estim[type].estimate - ( min * 60)));
			$("#info").append(" - Temps d'attente : " + min + " min " + seconds + "<br><br><br>");
		}
	}
}