(function(){
	
	var addClickHandler = function(_gift_container){
//		
		
		_gift_container.addEventListener("click", function(){
			
			var _gift = _gift_container.querySelector(".gift");
			var gift_id = _gift.id;
			
			// Убираем у выбранного подарка анимацию плавания.
			_gift.classList.remove("gift-move");
			
			// Удаляем подарок из контейнера с подарками и добавляем его в попап.			
			all_gift_container.removeChild(_gift_container);
			popup.appendChild(_gift_container);
			
			// Убираем у попапа скрытность.
			popup.classList.remove("hidden");
			
			// Добавляем подарку анимацию уменьшения.
			_gift.classList.add("gift-hidden");
			
			
			// Получаем картинку с самим подарком.
			var gift_present = document.querySelector(".present."+gift_id);
			
			// Добавляем картинку в попап.
			popup.appendChild(gift_present);
			
			gift_present.classList.add("open-present");
			gift_present.classList.remove("hidden");
			
			// Находим Описание подарка и добавляем ему анимацию.
			var present_desc = gift_present.querySelector(".desc");
			present_desc.classList.add("show");
		});
	};
	
	
	var all_gift_container = document.querySelector(".all-gift-container");
	var popup = document.querySelector(".popup");
	
	
	// Добавление анимации плавания для подарков.
	var gifts = document.querySelectorAll(".gift");
	for(var i =0; i<gifts.length; i++){		
		gifts[i].classList.add("gift-move");
	}
	
	
	var gifts_containers = document.querySelectorAll(".gift-container");
	for(var i =0; i<gifts_containers.length; i++){		
		addClickHandler(gifts_containers[i]);
	}
	
	
	// Закрытие всплывающего окна при клике на нем.
	popup.addEventListener("click", function(){		
		
		var popupDiv = popup.querySelector(".popup .gift-container");
		if (popupDiv){
			popup.removeChild(popupDiv);
		}
				
		var popupImg= popup.querySelector(".popup .present");
		if (popupImg){
			popup.removeChild(popupImg);
		}
		
		popup.classList.add("hidden");		
		
	});
	
	
})();