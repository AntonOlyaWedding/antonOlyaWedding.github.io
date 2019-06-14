(function(){
	pen = document.querySelector(".pen");
	
	pen.addEventListener("mousedown", function(evt){
		evt.preventDefault();
		
		console.log("Событие mousedown. НАЧАЛО");
		
		var StartCoords = {
			x: evt.clientX,
			y: evt.clientY
		};
		console.log("Событие mousedown. StartCoords.X: " + StartCoords.x + ". StartCoords.Y: " + StartCoords.y);
		
		var onMouseMove = function(moveEvt){
			
			console.log("Событие onMouseMove. НАЧАЛО");
			console.log("Событие onMouseMove. moveEvt.clientX: " + moveEvt.clientX + ". moveEvt.clientY: " + moveEvt.clientY);
			
			moveEvt.preventDefault();
			
			var shift = {
				x: moveEvt.clientX - StartCoords.x,
				y: moveEvt.clientY - StartCoords.y 
			};			
			console.log("Событие onMouseMove. shift.X: " + shift.x + ". shift.Y: " + shift.y);
			
			StartCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};
			console.log("Событие onMouseMove. StartCoords.X: " + StartCoords.x + ". StartCoords.Y: " + StartCoords.y);
			
			pen.style.top = (pen.offsetTop + shift.y) + "px";
			pen.style.left = (pen.offsetLeft + shift.x) + "px";
			console.log("Событие onMouseMove. top: " + pen.style.top + ". left: " + pen.style.left);
			
			console.log("Событие onMouseMove. КОНЕЦ");
		};
		
		var onMouseUp = function(upEvt){
			upEvt.preventDefault();
			
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		}
		
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		
		console.log("Событие mousedown. КОНЕЦ");
	});
	
	
	
	keys = document.querySelector(".keys");
	
	keys.addEventListener("mousedown", function(evt){
		evt.preventDefault();
		
		console.log("Событие mousedown. НАЧАЛО");
		
		var StartCoords = {
			x: evt.clientX,
			y: evt.clientY
		};
		console.log("Событие mousedown. StartCoords.X: " + StartCoords.x + ". StartCoords.Y: " + StartCoords.y);
		
		var onMouseMove = function(moveEvt){
			
			console.log("Событие onMouseMove. НАЧАЛО");
			console.log("Событие onMouseMove. moveEvt.clientX: " + moveEvt.clientX + ". moveEvt.clientY: " + moveEvt.clientY);
			
			moveEvt.preventDefault();
			
			var shift = {
				x: moveEvt.clientX - StartCoords.x,
				y: moveEvt.clientY - StartCoords.y 
			};			
			console.log("Событие onMouseMove. shift.X: " + shift.x + ". shift.Y: " + shift.y);
			
			StartCoords = {
				x: moveEvt.clientX,
				y: moveEvt.clientY
			};
			console.log("Событие onMouseMove. StartCoords.X: " + StartCoords.x + ". StartCoords.Y: " + StartCoords.y);
			
			keys.style.top = (keys.offsetTop + shift.y) + "px";
			keys.style.left = (keys.offsetLeft + shift.x) + "px";
			console.log("Событие onMouseMove. top: " + keys.style.top + ". left: " + keys.style.left);
			
			console.log("Событие onMouseMove. КОНЕЦ");
		};
		
		var onMouseUp = function(upEvt){
			upEvt.preventDefault();
			
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		}
		
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		
		console.log("Событие mousedown. КОНЕЦ");
	});
	
	
	
})();