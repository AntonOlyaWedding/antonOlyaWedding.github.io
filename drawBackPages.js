(function() {
	
	window.addEventListener("resize", function(){
	
		var bookBorder = document.querySelector(".book-border");
		var backgPages = document.querySelectorAll( ".backgPage" );
		
		for(var i = 0; i< backgPages.length; i++){
			backgPages[i].style.width = bookBorder.clientWidth + (i+1) * 4 + "px";
			var diff = (backgPages[i].clientWidth - bookBorder.clientWidth) / 2;
			backgPages[i].style.left = -diff + "px";
		}

//		var otn = document.body.clientWidth / 1690;
/*		if (otn > 0.95){
			document.body.style.zoom = 1;
		}
		else if (otn < 0.60){
			document.body.style.zoom = 0.3;
		}
		else if(otn < 0.8){
			document.body.style.zoom = 0.5;
		}
*/
//		document.body.style.zoom = otn;

		var bookContainer = document.querySelector(".book-container");
		var otn = document.body.clientWidth / 1740;
		if (otn>1){
			otn = 1;
		}
		var scale = "scale("+otn+")";	
		bookContainer.style.transform = scale;
	});
	
//	var otn = document.body.clientWidth / document.body.scrollWidth;
/*	if (otn > 0.95){
		document.body.style.zoom = 1;
	}
	else if (otn < 0.60){
		document.body.style.zoom = 0.3;
	}
	else if(otn < 0.8){
		document.body.style.zoom = 0.5;
	}
	*/
//	document.body.style.zoom = otn;
	
	var bookContainer = document.querySelector(".book-container");
	var otn = document.body.clientWidth / 1740;
	if (otn>1){
		otn = 1;
	}
	var scale = "scale("+otn+")";	
	bookContainer.style.transform = scale;
	
	var bookBorder = document.querySelector(".book-border");
	var backgPages = document.querySelectorAll( ".backgPage" );
	
	for(var i = 0; i< backgPages.length; i++){
		backgPages[i].style.width = bookBorder.clientWidth + (i+1) * 4 + "px";
		backgPages[i].style.zIndex = backgPages.length - i;
		
		var diff = (backgPages[i].clientWidth - bookBorder.clientWidth) / 2;
		backgPages[i].style.left = -diff + "px";
	}
}
)();