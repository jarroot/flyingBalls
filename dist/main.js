function Ball() {

	this.ID = Ball.options._id;

	this._color = Ball.initColor();
	this._coords = {
		'left': Ball.intRandom(0, Ball.options.windowCoords.width),
		'top': Ball.intRandom(0, Ball.options.windowCoords.height)
	};

	this._coords.right = this._coords.left + Ball.options._radius;
	this._coords.bottom = this._coords.top + Ball.options._radius;

	this._radius = Ball.options._radius;
	this.DIRECTION = Ball.options.movementDirection[Ball.intRandom(0, 7)];

	Ball.options._id += 1;
}


Ball.intRandom = function (min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
};

Ball.initColor = function () {
	return Ball.options.colors[Ball.intRandom(0, Ball.options.colors.length - 1)];
};

Ball.options = {
	'_id': 0,
	'_radius': 10,
	'colors': ['red', 'blue', 'yellow', 'green', 'orange', 'purple'],
	'windowCoords': {
		'width': $(window).width() - 10,
		'height': $(window).height() - 10
	},

	'movementDirection': [
		'top', 'left', 'right', 'bottom',
		'top-left', 'top-right',
		'bottom-left', 'bottom-right'
	]
};


/* PROTOTYPE ****/
(function () {

	this.initBall = function () {

		$('body').append('' +
			'<div class="ball" id="' + this.ID + '" style="background: ' + this._color + '; ' +
			'left : ' + this._coords.left + 'px; ' +
			'top : ' + this._coords.top + 'px; ' +
			'width : ' + this._radius + 'px; ' +
			'height: ' + this._radius + 'px;">' +
			'</div>');

	};

	this.move = function (direction, id) {

		var direction = direction;
		var currentEl = $('#' + id);


		var windowWidth = (Ball.options.windowCoords.width - 1);
		var windowHeight = (Ball.options.windowCoords.height - 1);


		function initNewDirection() {
			var max = arguments.length - 1;
			return arguments[Ball.intRandom(0, max)];
		}

		function goingTo(direction) {
			switch (direction) {
				case 'top':
					var currentElTop = currentEl.offset().top;
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
					var currentElTop = currentEl.offset().top;
					if (currentElTop >= windowHeight) {
						direction = initNewDirection('top', 'top-right', 'top-left');
						goingTo(direction);
						break;
					}
					currentEl.animate({'top': (currentElTop + 1) + 'px'}, 2, function () {
						goingTo(direction);
					});
					break;


				case 'left' :
					var currentElLeft = currentEl.offset().left;
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
					var currentElLeft = currentEl.offset().left;
					if (currentElLeft >= windowWidth) {
						direction = initNewDirection('left', 'top-left', 'bottom-left');
						goingTo(direction);
						break;
					}

					currentEl.animate({'left': (currentElLeft + 1) + 'px'}, 2, function () {
						goingTo(direction);
					});
					break;

				case 'top-right' :
					var currentElTop = currentEl.offset().top;
					var currentElLeft = currentEl.offset().left;

					if (currentElTop <= 1) {
						direction = initNewDirection('bottom-left', 'bottom-right');
						goingTo(direction);
						break;
					} else if (currentElLeft >= windowWidth) {
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
					var currentElTop = currentEl.offset().top;
					var currentElLeft = currentEl.offset().left;

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
					var currentElTop = currentEl.offset().top;
					var currentElLeft = currentEl.offset().left;

					if (currentElTop >= windowHeight) {
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
					var currentElTop = currentEl.offset().top;
					var currentElLeft = currentEl.offset().left;

					if (currentElTop >= windowHeight) {
						direction = initNewDirection('top-right', 'top-left');
						goingTo(direction);
						break;
					} else if (currentElLeft >= windowWidth) {
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
		this.initBall();
		this.move(direction, id);
	};

	this.constructor = Ball;
}).call(Ball.prototype);
function BlackHole() {
	Ball.call(this);

	this._color = 'black';
	this.ID = BlackHole.options._idPrevText + BlackHole.options._id;

	this._coords.right = this._coords.left + BlackHole.options._radius;
	this._coords.bottom = this._coords.top + BlackHole.options._radius;

	this._radius = BlackHole.options._radius;

	BlackHole.options._id++;
}

BlackHole.options = {
	'_id': 0,
	'_idPrevText': 'blackhole',
	'_radius': 10
};

BlackHole.prototype = Object.create(Ball.prototype);
BlackHole.prototype.constructor = BlackHole;

/* MAIN JS */

for (var i = 0; i <= 10; i++) {
	var ball = new Ball();
	ball.initAndStartMove(ball.DIRECTION, ball.ID);
}

var blackHole = new BlackHole();
blackHole.initAndStartMove(blackHole.DIRECTION, blackHole.ID);
console.dir(blackHole);