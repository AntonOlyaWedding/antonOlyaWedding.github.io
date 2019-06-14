(function(){
	//var Screen = document.querySelector("body");
	
	var ScreenSize = {
		WIDTH: document.documentElement.clientWidth,	//Screen.clientWidth,
		HEIGHT: document.documentElement.clientHeight	//Screen.clientHeight
	};
	
	var getRandomValue = function(min, max){
		return Math.random() * (max-min) + min;
	};
	
	// Создаем конструктор
	var Raindrop = function(){
		this._reset();
	};
	
	Raindrop.prototype._reset = function(){
		this.size = getRandomValue(1, 6);
		this.x = getRandomValue(-ScreenSize.WIDTH * 0.3, ScreenSize.WIDTH * 1.6);
		this.y = 0;
		

		this.velocity = this.size;
		this.hVelocity = -this.size / 3;
	};
	
	Raindrop.prototype.render = function(ctx){
		ctx.drawImage(img_pacifier, this.x, this.y);
	};
	
	Raindrop.prototype.update = function(){
		this.x += this.hVelocity;
		this.y += this.velocity;
		
		if(this.isOffscreen()){
			this._reset();
		}
	};
	
	Raindrop.prototype.isOffscreen = function(){
		return this.y > ScreenSize.HEIGHT + this.size ||
			   this.x > ScreenSize.WIDTH  + this.size ||
			   this.x < -this.size;
	};
	
	var Duck = function(){
		Raindrop.call(this);
	}
	Duck.prototype = Object.create(Raindrop.prototype);
	
	Duck.prototype.render = function(ctx){
		ctx.drawImage(img_duck, this.x, this.y);
	};
	
	var Teddy = function(){
		Raindrop.call(this);
	}
	Teddy.prototype = Object.create(Raindrop.prototype);
	
	Teddy.prototype.render = function(ctx){
		ctx.drawImage(img_teddy, this.x, this.y);
	};
	
	var img_pacifier = document.querySelector(".pacifier");
	var img_duck = document.querySelector(".duckling");
	var img_teddy = document.querySelector(".teddy");
	
	var setup = function(){
		var DROPS = 20;
		var rain_canvas = document.getElementById( "rain-canvas" );	
		var ctx = rain_canvas.getContext('2d');
		var book_cont = document.querySelector(".book-container");
		
		rain_canvas.width = ScreenSize.WIDTH;
		rain_canvas.height = ScreenSize.HEIGHT;
		
		rain_canvas.classList.remove("hidden");
		book_cont.classList.add("hidden");
		
		var DUCK_RATIO = 1;
		var TEDDY_RATIO = 1;
		
		var raindrops = new Array(DROPS)
			.fill('')
			.map(function(){
				return new Raindrop();
			})
			.concat(new Array(DROPS * DUCK_RATIO)
			.fill('')
			.map(function(){
				return new Duck();
			})
			)
			.concat(new Array(DROPS * TEDDY_RATIO)
			.fill('')
			.map(function(){
				return new Teddy();
			})
			);
		
		renderFrame(ctx, raindrops);
	};
	
	// Функция очищения канваса
	var cleanupFrame = function(ctx){
		ctx.clearRect(0, 0, ScreenSize.WIDTH, ScreenSize.HEIGHT);
	};
	
	var renderFrame = function(ctx, raindrops){
		cleanupFrame(ctx);		
		
		raindrops.forEach(function(it){
			it.render(ctx);
			it.update();
		});
		
		requestAnimationFrame(renderFrame.bind(null, ctx, raindrops));
	};
	
	var buttonRain = document.querySelector(".flip-button.rain");
	buttonRain.addEventListener( "click", setup );
	
})();