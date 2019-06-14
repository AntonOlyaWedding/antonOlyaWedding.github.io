(function() {
	
	window.addEventListener("resize", function(){
	
		var book = document.getElementById( "book" );	
		var bookPage = book.querySelector( "section.active" );
		
		BOOK_WIDTH  = book.clientWidth;
		BOOK_HEIGHT = book.clientHeight;
		PAGE_WIDTH  = bookPage.clientWidth;
		PAGE_HEIGHT = bookPage.clientHeight;
		
		PAGE_Y = ( BOOK_HEIGHT - PAGE_HEIGHT ) / 2;
		CANVAS_PADDING = 30;
		var canvas = document.getElementById( "pageflip-canvas" );
		
		canvas.width = BOOK_WIDTH; //+ ( CANVAS_PADDING * 2 );
		canvas.height = BOOK_HEIGHT + ( CANVAS_PADDING * 2 );
		
		canvas.style.top = -CANVAS_PADDING + "px";
		//canvas.style.left = -CANVAS_PADDING + "px";
	
	});
	
	var massCoord = [];
	var massCoordFlip = {
						XStart: 0,
						XEnd: 0,
						XCenter: 0
	};
	
	
	// Определение размеров программно
	var book = document.getElementById( "book" );	
	var bookPage = book.querySelector( "section" );
	var BOOK_WIDTH  = book.clientWidth;
	var BOOK_HEIGHT = book.clientHeight;
	var PAGE_WIDTH  = bookPage.clientWidth;
	var PAGE_HEIGHT = bookPage.clientHeight;
	
	// Vertical spacing between the top edge of the book and the papers
	var PAGE_Y = ( BOOK_HEIGHT - PAGE_HEIGHT ) / 2;
	
	// The canvas size equals to the book dimensions + this padding
	var CANVAS_PADDING = 30;
	
	var page = 0;
	
	var canvas = document.getElementById( "pageflip-canvas" );
	var context = canvas.getContext( "2d" );
	
	var mouse = { x: 0, y: 0 };
	
	var flips = [];	
	
	
	// List of all the page elements in the DOM
	var pages = book.getElementsByTagName( "section" );
	
	var pageHeader = document.querySelector(".pageHeader-text");
	
	// Organize the depth of our pages and create the flip definitions
	for( var i = 0, len = pages.length; i < len; i++ ) {
		pages[i].style.zIndex = len - i;
		
		flips.push( {
			// Current progress of the flip (left -1 to right +1)
			progress: 1,
			// The target value towards which progress is always moving
			target: 1,
			// The page DOM element related to this flip
			page: pages[i], 
			// True while the page is being dragged
			dragging: false,
			pageHeader: pages[i].querySelector(".leftPage").innerHTML
		} );
	}
	console.log("Создан массив flips: " + flips);
	
	flips[0].page.classList.add("active");
	pageHeader.innerHTML = flips[0].pageHeader;
	
	// Resize the canvas to match the book size
	canvas.width = BOOK_WIDTH; //+ ( CANVAS_PADDING * 2 );
	canvas.height = BOOK_HEIGHT + ( CANVAS_PADDING * 2 );
	console.log("Установлены размеры канваса. width: " + canvas.width + "; height: " + canvas.height);
	
	
	// Offset the canvas so that it's padding is evenly spread around the book
	canvas.style.top = -CANVAS_PADDING + "px";
	//canvas.style.left = -CANVAS_PADDING + "px";
	//console.log("Установлено положение канваса. top: " + canvas.style.top + "; left: " + canvas.style.left);
	
	
	var bookBorder = document.querySelector( ".book-border");
	var RenderCount = 0;
	
	
	
	function drawFlip( flip ) {
		
//		console.log("Событие drawFlip. НАЧАЛО");
		
		// Strength of the fold is strongest in the middle of the book
		var strength = 1 - Math.abs( flip.progress );
//		console.log("Событие drawFlip. Переменная strength: " + strength);
		
		// Width of the folded paper
		// Используется для задания ширины согнутой страницы
		// Чем ближе к середине книги, тем ширина строгнутой страницы будет больше.
		var foldWidth = ( PAGE_WIDTH * 0.5 ) * ( 1 - flip.progress );
//		console.log("Событие drawFlip. Переменная foldWidth: " + foldWidth);
		
		
		// X position of the folded paper
		var foldX = PAGE_WIDTH * flip.progress + foldWidth;
//		console.log("Событие drawFlip. Переменная foldX: " + foldX);
		
		
		// How far the page should outdent vertically due to perspective
		// На сколько страница должна выступать вертикально 
		var verticalOutdent = 20 * strength;
//		console.log("Событие drawFlip. Переменная verticalOutdent: " + verticalOutdent);
		
		
		// The maximum width of the left and right side shadows
		var paperShadowWidth = ( PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
//		console.log("Событие drawFlip. Переменная paperShadowWidth: " + paperShadowWidth);
		var rightShadowWidth = ( PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
//		console.log("Событие drawFlip. Переменная rightShadowWidth: " + rightShadowWidth);
		var leftShadowWidth = ( PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
//		console.log("Событие drawFlip. Переменная leftShadowWidth: " + leftShadowWidth);
		
		
		// Change page element width to match the x position of the fold
		flip.page.style.width = Math.max(foldX, 0) + "px";
//		console.log("Событие drawFlip. Ширина переворачиваемой страницы: " + flip.page.style.width);
				
		// Сохраняем состояние холста в стек
		context.save();
		
		// Смещаем точку начала координат в корешок книги. Не сам канвас, а именно точку, из которой будем рисовать!
		context.translate( ( BOOK_WIDTH / 2 ), PAGE_Y + CANVAS_PADDING );
		
		'rgba(0,0,0, 0.5)';
		// Draw a sharp shadow on the left side of the page
		context.strokeStyle = 'rgba(0,0,0, 0.1)';                               //'rgba(247,0,0,'+(0.05 * strength)+')';  //Цвет обводки фигуры, т.е. цвет контура. 0,0,0
	//	console.log("Событие drawFlip. Рисуем тень слева. Цвет обводки: " + context.strokeStyle);
		context.lineWidth = 30 * strength; 		//Толщина линии
//		console.log("Событие drawFlip. Рисуем тень слева. Толщина обводки: " + context.lineWidth);
		context.beginPath();
		context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
//		console.log("Событие drawFlip. Рисуем тень слева. Перемещаемся в точку. Координата Х: " + (foldX - foldWidth) + ". Координата Y: " + (-verticalOutdent * 0.5));
		context.lineTo(foldX - foldWidth, PAGE_HEIGHT + (verticalOutdent * 0.5));
//		console.log("Событие drawFlip. Рисуем тень слева. Проводим линию в точку. Координата Х:" + (foldX - foldWidth) + ". Координата Y: " + (PAGE_HEIGHT + (verticalOutdent * 0.5)) );
		context.stroke();
		
		
		// Right side drop shadow
		// Правая сторона резкой тени
		
		var rightShadowGradient = context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
		rightShadowGradient.addColorStop(0, 'rgba(0,0,0,'+(strength*0.5)+')');
		rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');
		
		context.fillStyle = rightShadowGradient;
		context.beginPath();
		context.moveTo(foldX, 0);
		context.lineTo(foldX + rightShadowWidth, 0);
		context.lineTo(foldX + rightShadowWidth, PAGE_HEIGHT);
		context.lineTo(foldX, PAGE_HEIGHT);
		context.fill();
		
				
		// Left side drop shadow
		// Левая сторона резкой тени
		var leftShadowGradient = context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
		leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
		leftShadowGradient.addColorStop(1, 'rgba(0,0,0,'+(strength*0.4)+')');  
		
		context.fillStyle = leftShadowGradient;
		context.beginPath();
		context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
		context.lineTo(foldX - foldWidth, 0);
		context.lineTo(foldX - foldWidth, PAGE_HEIGHT);
		context.lineTo(foldX - foldWidth - leftShadowWidth, PAGE_HEIGHT);
		context.fill();
		
		
		// Gradient applied to the folded paper (highlights & shadows)
		var foldGradient = context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
		foldGradient.addColorStop(0.7, '#daeaf9');  //fafafa
		//foldGradient.addColorStop(0.73, '#9db7ce'); //eeeeee
		foldGradient.addColorStop(0.9, '#9db7ce');	//fafafa
//		foldGradient.addColorStop(1.0, '#2d699e');	//e2e2e2
		
		context.fillStyle = foldGradient;
		context.strokeStyle = 'rgba(0,0,0,0.06)';
		context.lineWidth = 0.5;
		
		// Draw the folded piece of paper
		context.beginPath();
		context.moveTo(foldX, 0);
//		console.log("Событие drawFlip. Рисуем перевернутую страницу. Перемещаемся в точку. Координата Х:" + foldX + ". Координата Y: 0");
		context.lineTo(foldX, PAGE_HEIGHT);
//		console.log("Событие drawFlip. Рисуем перевернутую страницу. Проводим линию в точку. Координата Х:" + foldX + ". Координата Y: " + PAGE_HEIGHT);
		context.quadraticCurveTo(foldX, PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, PAGE_HEIGHT + verticalOutdent);
//		console.log("Событие drawFlip. Рисуем перевернутую страницу. Проводим кривую линию в точку. Координата Х:" + foldX + ". Координата Y: " + (PAGE_HEIGHT + (verticalOutdent * 2)));
		context.lineTo(foldX - foldWidth, -verticalOutdent);
//		console.log("Событие drawFlip. Рисуем перевернутую страницу. Проводим линию в точку. Координата Х:" + (foldX - foldWidth) + ". Координата Y: " + (-verticalOutdent));
		context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
//		console.log("Событие drawFlip. Рисуем перевернутую страницу. Проводим кривую линию в точку. Координата Х:" + foldX + ". Координата Y: " + (-verticalOutdent * 2));
		
		context.fill();
		context.stroke();
		
		
		context.restore();
				
//		console.log("Событие drawFlip. КОНЕЦ");
	}
	
	
	var buttonNext = document.querySelector(".flip-button.next");
	var buttonPrev = document.querySelector(".flip-button.prev");
	
	buttonNext.addEventListener( "click", buttonNextClick );
	buttonPrev.addEventListener( "click", buttonPrevClick );
	
	setInterval( renderNew, 1000/60 );
	
	var curFlip = undefined;
	var flipDirection = "";
	
	function buttonNextClick(){
		if (page + 1 < flips.length){
			curFlip = flips[page];	
			curFlip.target = 1;
			curFlip.progress = 1;
			flipDirection = "next";
			
			flips[page].page.classList.remove("active");
			pageHeader.classList.add("pageHeader-hide");

			var pageimgs = flips[page].page.querySelectorAll("img");
			for(var i = 0; i<pageimgs.length; i++){
				pageimgs[i].classList.remove("img-animate");
			}
			
			buttonPrev.disabled = true;
		}	
	}
	
	function buttonPrevClick(){
		if (page - 1 >= 0){
			pageHeader.classList.add("pageHeader-hide");
			
			curFlip = flips[page-1];	
			curFlip.target = -1;
			curFlip.progress = -1;
			flipDirection = "prev";		

			flips[page].page.classList.remove("active");
			
			var pageimgs = flips[page].page.querySelectorAll("img");
			for(var i = 0; i<pageimgs.length; i++){
				pageimgs[i].classList.remove("img-animate");
			}
			
			buttonNext.disabled = true;
		}	
	}
	
	function renderNew(){
		context.clearRect( 0, 0, canvas.width, canvas.height );
		
		if (curFlip){
			
			if (Math.abs( curFlip.progress ) <= 1){ 
			
				if (flipDirection === "next"){
//					curFlip.progress = curFlip.progress + (curFlip.target - curFlip.progress) * 0.2;	
//					curFlip.target -= 0.02;	
				
					/*
					if(curFlip.progress < -0.7){
						curFlip.progress -= 0.0075;
					}
					else{
						curFlip.progress -= 0.015;
					}
					*/
					curFlip.progress -= 0.015;	

					drawFlip( curFlip );
					
					flips[page+1].page.classList.add("active");
				}
				else if (flipDirection === "prev"){
//					curFlip.progress = curFlip.progress + (curFlip.target - curFlip.progress) * 0.2;	
//					curFlip.target += 0.02;
					
					
					//curFlip.progress += 0.015;
					curFlip.progress += 0.02;
					drawFlip( curFlip );
					
					flips[page-1].page.classList.add("active");
				}
			}
			else{
				curFlip = undefined;
				
				if (flipDirection === "next"){
					page = page + 1;
					buttonPrev.disabled = false;
				}
				else if (flipDirection === "prev"){
					page = page - 1;
					buttonNext.disabled = false;
				}
				pageHeader.innerHTML = flips[page].pageHeader;
				pageHeader.classList.remove("pageHeader-hide");
				flips[page].page.style.width = "";
				
				var pageimgs = flips[page].page.querySelectorAll("img");
				for(var i = 0; i<pageimgs.length; i++){
					pageimgs[i].classList.add("img-animate");
				}
			}
		}
	}
})();


