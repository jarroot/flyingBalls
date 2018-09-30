function Ball() {

	this.ID = Ball.options.prev_id_text + Ball.options.id;
	this._radius = Ball.options.radius;

	this._color = Ball.randomArrayItem(Ball.options.colors);
	this.DIRECTION = Ball.randomArrayItem(Ball.options.movementDirections);

	this._coords = {
		'left': Ball.intRandom(0, (Ball.options.windowCoords.width - this._radius)),
		'top': Ball.intRandom(0, (Ball.options.windowCoords.height - this._radius))
	};


	Ball.options.id++;
}


Ball.intRandom = function (min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
};

Ball.randomArrayItem = function (array) {

	var currentArray;
	var identification = Array.isArray(array);

	identification ? currentArray = array : currentArray = arguments;

	return currentArray[Ball.intRandom(0, currentArray.length - 1)];
};

Ball.options = {
	'id': 0,
	'prev_id_text': 'ball-',
	'radius': 10,
	'colors': ['red', 'blue', 'yellow', 'green', 'orange', 'purple'],
	'windowCoords': {
		'width': $(window).width(),
		'height': $(window).height()
	},

	'movementDirections': [
		'top', 'left', 'right', 'bottom',
		'top-left', 'top-right',
		'bottom-left', 'bottom-right'
	]
};


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


		var currentEl = $('#' + id);

		var radius = currentEl.width();

		var windowWidth = (Ball.options.windowCoords.width - 1);
		var windowHeight = (Ball.options.windowCoords.height - 1);


		var initNewDirection = Ball.randomArrayItem;

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
function BlackHole() {
	Ball.call(this);

	this._color = 'black';
	this.ID = BlackHole.options.prev_id_text + BlackHole.options.id;

	this._radius = BlackHole.options.radius;


	BlackHole.options.id++;
}

(function () {

	this.options = {
		'id': 0,
		'prev_id_text': 'blackhole-',
		'radius': 20
	};

}).call(BlackHole);


BlackHole.prototype = Object.create(Ball.prototype);

(function () {

	this.constructor = BlackHole;
}).call(BlackHole.prototype);
/* MAIN JS */

for (var i = 0; i <= 60; i++) {
	var ball = new Ball();
	ball.initAndStartMove(ball.DIRECTION, ball.ID);
}

//var blackHole = new BlackHole();
//blackHole.initAndStartMove(blackHole.DIRECTION, blackHole.ID, blackHole);


