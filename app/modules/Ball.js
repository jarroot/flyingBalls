function Ball(radius) {

	var
		ballOpt = Ball.options,
		randomArrayItem = Ball.randomArrayItem,
		intRandom = Ball.intRandom;

	this.ID = ballOpt.prefix + ballOpt.id;
	this._radius = radius || intRandom(5, 30);
	this._color = randomArrayItem(ballOpt.colors);
	this._direction = randomArrayItem(ballOpt.movementDirections);
	this._coords = {
		'left': intRandom(0, (ballOpt.window.width - this._radius)),
		'top': intRandom(0, (ballOpt.window.height - this._radius))
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
		'prefix': 'ball-',
		'colors': ['red', 'blue', 'yellow', 'green', 'orange', 'purple'],
		'window': {
			'width': window.innerWidth - 1,
			'height': window.innerHeight - 1
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

		$('body').append(
			'<div class="ball" id="' + this.ID + '" ' +
			'style="background: ' + this._color + '; ' +
			'left : ' + this._coords.left + 'px; ' +
			'top : ' + this._coords.top + 'px; ' +
			'width : ' + this._radius + 'px; ' +
			'height: ' + this._radius + 'px;">' +
			'</div>');

	};

	this.move = function (ball) {

		var
			$BALL = $('#' + ball.ID),
			radius = ball._radius,

			windowsCoords = Ball.options.window,
			windowWidth = (windowsCoords.width - 1),
			windowHeight = (windowsCoords.height - 1),
			initNewDirection = Ball.randomArrayItem,

			newDirection = {
				"top": ['bottom', 'bottom-right', 'bottom-left'],
				"bottom": ['top', 'top-right', 'top-left'],
				"left": ['right', 'top-right', 'bottom-right'],
				"right": ['top', 'top-left', 'bottom-left']
			};


		function goingTo(direction) {


			var
				ballTop = ball._coords.top,
				ballLeft = ball._coords.left,
				ballBottom = ballTop + radius,
				ballRight = ballLeft + radius,
				ballDirection = ball._direction;


			switch (direction) {
				case 'top':

					if (ballTop > 1) {
						ball._coords.top -= 1;
						$BALL.css("top", ball._coords.top);
					} else {

						ball._direction = initNewDirection(newDirection[ballDirection]);
					}
					break;

				case 'bottom':

					if (ballBottom < windowHeight) {
						ball._coords.top += 1;
						$BALL.css("top", ball._coords.top);
					} else {
						ball._direction = initNewDirection(newDirection[ballDirection]);
					}
					break;

				case 'left' :

					if (ballLeft > 1) {
						ball._coords.left -= 1;
						$BALL.css("left", ball._coords.left);
					} else {
						ball._direction = initNewDirection(newDirection[ballDirection]);
					}

					break;

				case 'right' :

					if (ballRight < windowWidth) {
						ball._coords.left += 1;
						$BALL.css("left", ball._coords.left);
					} else {
						ball._direction = initNewDirection(newDirection[ballDirection]);
					}

					break;

				case 'top-right' :

					if (ballTop > 1 && ballRight < windowWidth) {
						ball._coords.top -= 1;
						ball._coords.left += 1;
						$BALL.css({"top": ball._coords.top, "left": ball._coords.left});
					} else if (ballTop <= 1) {
						ball._direction = initNewDirection(newDirection.top);
					} else if (ballRight >= windowWidth) {
						ball._direction = initNewDirection(newDirection.right);
					}

					break;


				case 'top-left' :

					if (ballTop > 1 && ballLeft > 1) {
						ball._coords.top -= 1;
						ball._coords.left -= 1;
						$BALL.css({"top": ball._coords.top, "left": ball._coords.left});
					} else if (ballTop <= 1) {
						ball._direction = initNewDirection(newDirection.top);
					} else if (ballLeft <= 1) {
						ball._direction = initNewDirection(newDirection.right);
					}

					break;

				case 'bottom-right' :

					if (ballBottom < windowHeight && ballRight < windowWidth) {
						ball._coords.top += 1;
						ball._coords.left += 1;
						$BALL.css({"top": ball._coords.top, "left": ball._coords.left});
					} else if (ballBottom >= windowHeight) {
						ball._direction = initNewDirection(newDirection.bottom);
					} else if (ballRight >= windowWidth) {
						ball._direction = initNewDirection(newDirection.right);
					}

					break;

				case 'bottom-left' :

					if (ballBottom < windowHeight && ballRight > 1) {
						ball._coords.top += 1;
						ball._coords.left -= 1;
						$BALL.css({"top": ball._coords.top, "left": ball._coords.left});
					} else if (ballBottom >= windowHeight) {
						ball._direction = initNewDirection(newDirection.bottom);
					} else if (ballRight <= 1) {
						ball._direction = initNewDirection(newDirection.right);
					}

					break;
			}

			setTimeout(function () {
				goingTo(ball._direction);
			}, 10);
		}


		goingTo(ball._direction);
	};


	this.initAndStartMove = function () {
		this.init();
		this.move(this);
	};

	this.constructor = Ball;
}).call(Ball.prototype);