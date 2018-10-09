function Ball(radius) {

	var randomArrayItem,
		intRandom;

	randomArrayItem = Ball.randomArrayItem;
	intRandom = Ball.intRandom;

	this.ID = Ball.options.prev_id_text + Ball.options.id;
	this._radius = radius || intRandom(5, 30);

	this._color = randomArrayItem(Ball.options.colors);
	this.DIRECTION = randomArrayItem(Ball.options.movementDirections);

	this._coords = {
		'left': intRandom(0, (Ball.options.windowCoords.width - this._radius)),
		'top': intRandom(0, (Ball.options.windowCoords.height - this._radius))
	};


	Ball.options.id++;
}


/* Свойства и методы конструктора  */
(function () {

	this.intRandom = function (min, max) {
		var rand = min + Math.random() * (max + 1 - min);
		rand = Math.floor(rand);
		return rand;
	};

	this.randomArrayItem = function (array) {

		var currentArray,
			identification,
			intRandom;

		identification = Array.isArray(array);
		intRandom = Ball.intRandom;

		identification ? currentArray = array : currentArray = arguments;

		return currentArray[intRandom(0, currentArray.length - 1)];
	};

	this.options = {
		'id': 0,
		'prev_id_text': 'ball-',
		'colors': ['red', 'blue', 'yellow', 'green', 'orange', 'purple'],
		'windowCoords': {
			'width': window.innerWidth,
			'height': window.innerHeight
		},

		'movementDirections': [
			'top', 'left', 'right', 'bottom',
			'top-left', 'top-right',
			'bottom-left', 'bottom-right'
		]
	};


}).call(Ball);


/* PROTOTYPE ****/
(function () {

	this.init = function () {


		$('body').append('' +
			'<div class="ball" id="' + this.ID + '" style="background: ' + this._color + '; ' +
			'left : ' + this._coords.left + 'px; ' +
			'top : ' + this._coords.top + 'px; ' +
			'width : ' + this._radius + 'px; ' +
			'height: ' + this._radius + 'px;">' +
			'</div>');

	};

	this.move = function (direction, id) {

		var currentEl,
			radius,
			windowsCoords,
			windowWidth,
			windowHeight,
			initNewDirection;

		currentEl = $('#' + id);
		radius = currentEl.width();

		windowsCoords = Ball.options.windowCoords;
		windowWidth = (windowsCoords.width - 1);
		windowHeight = (windowsCoords.height - 1);

		initNewDirection = Ball.randomArrayItem;


		function goingTo(direction) {

			var currentElTop = currentEl.offset().top;
			var currentElLeft = currentEl.offset().left;

			switch (direction) {
				case 'top':

					if (currentElTop <= 1) {
						direction = initNewDirection('bottom', 'bottom-right', 'bottom-left');
						goingTo(direction);
						break;
					}
					currentEl.animate({'top': (currentElTop - 1) + 'px'}, 2, function () {
						goingTo(direction);
					});
					break;

				case 'bottom':

					if (currentElTop + radius >= windowHeight) {
						direction = initNewDirection('top', 'top-right', 'top-left');
						goingTo(direction);
						break;
					}
					currentEl.animate({'top': (currentElTop + 1) + 'px'}, 2, function () {
						goingTo(direction);
					});
					break;


				case 'left' :

					if (currentElLeft <= 1) {
						direction = initNewDirection('right', 'top-right', 'bottom-right');
						goingTo(direction);
						break;
					}

					currentEl.animate({'left': (currentElLeft - 1) + 'px'}, 2, function () {
						goingTo(direction);
					});
					break;

				case 'right' :

					if (currentElLeft + radius >= windowWidth) {
						direction = initNewDirection('left', 'top-left', 'bottom-left');
						goingTo(direction);
						break;
					}

					currentEl.animate({'left': (currentElLeft + 1) + 'px'}, 2, function () {
						goingTo(direction);
					});
					break;

				case 'top-right' :

					if (currentElTop <= 1) {
						direction = initNewDirection('bottom-left', 'bottom-right');
						goingTo(direction);
						break;
					} else if (currentElLeft + radius >= windowWidth) {
						direction = initNewDirection('top-left', 'bottom-left');
						goingTo(direction);
						break;
					}

					currentEl.animate({
						'left': (currentElLeft + 1) + 'px',
						'top': (currentElTop - 1) + 'px'
					}, 2, function () {
						goingTo(direction);
					});
					break;


				case 'top-left' :

					if (currentElTop <= 1) {
						direction = initNewDirection('bottom-left', 'bottom-right');
						goingTo(direction);
						break;
					} else if (currentElLeft <= 2) {
						direction = initNewDirection('top-right', 'bottom-right');
						goingTo(direction);
						break;
					}

					currentEl.animate({
						'left': (currentElLeft - 1) + 'px',
						'top': (currentElTop - 1) + 'px'
					}, 2, function () {
						goingTo(direction);
					});
					break;

				case 'bottom-left' :

					if (currentElTop + radius >= windowHeight) {
						direction = initNewDirection('top-left', 'top-right');
						goingTo(direction);
						break;

					} else if (currentElLeft <= 1) {
						direction = initNewDirection('bottom-right', 'top-right');
						goingTo(direction);
						break;
					}

					currentEl.animate({
						'left': (currentElLeft - 1) + 'px',
						'top': (currentElTop + 1) + 'px'
					}, 2, function () {
						goingTo(direction);
					});
					break;


				case 'bottom-right' :

					if (currentElTop + radius >= windowHeight) {
						direction = initNewDirection('top-right', 'top-left');
						goingTo(direction);
						break;
					} else if (currentElLeft + radius >= windowWidth) {
						direction = initNewDirection('bottom-left', 'top-left');
						goingTo(direction);
						break;
					}

					currentEl.animate({
						'left': (currentElLeft + 1) + 'px',
						'top': (currentElTop + 1) + 'px'
					}, 2, function () {
						goingTo(direction);
					});
					break;
			}
		}


		goingTo(direction);
	};


	this.initAndStartMove = function (direction, id) {
		this.init();
		this.move(direction, id);
	};

	this.constructor = Ball;
}).call(Ball.prototype);