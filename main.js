function Ball() {

	this._id = Ball.options.id;

	this._color = Ball.initColor();
	this._coords = {
		'left': Ball.intRandom(0, Ball.options.windowCoords.width),
		'top': Ball.intRandom(0, Ball.options.windowCoords.height)
	};

	this._direction = Ball.options.movementDirection[Ball.intRandom(0, 7)];

	this.initBall();
	this.move(this._direction, this._id);

	Ball.options.id += 1;
}


Ball.intRandom = function (min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
};

Ball.initColor = function () {
	return Ball.options.color[Ball.intRandom(0, Ball.options.color.length - 1)];
};

Ball.options = {
	'id': 0,
	'color': ['red', 'blue', 'yellow', 'green', 'orange', 'purple', 'brown', 'black'],
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

console.log(Ball.options);


/* PROTOTYPE ****/
(function () {

	this.initBall = function () {

		$('body').append('' +
			'<div class="ball" id="' + this._id + '" style="background: ' + this._color + '; ' +
			'left : ' + this._coords.left + 'px; ' +
			'top : ' + this._coords.top + 'px"> ' +
			'</div>');

	};

	this.move = function (direction, id) {

		var direction = direction;
		var currentEl = $('#' + id);


		var windowWidth = (Ball.options.windowCoords.width - 2);
		var windowHeight = (Ball.options.windowCoords.height - 2);


		function initNewDirection() {
			var max = arguments.length - 1;
			return arguments[Ball.intRandom(0, max)];
		}

		function goingTo(direction) {
			switch (direction) {
				case 'top':
					var currentElTop = currentEl.offset().top;
					if (currentElTop <= 2) {
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
					if (currentElLeft <= 2) {
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

					if (currentElTop <= 2) {
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

					if (currentElTop <= 2) {
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

					} else if (currentElLeft <= 2) {
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

	this.constructor = Ball;
}).call(Ball.prototype);


/*$('#start').on('click', function () {

	var ballsCount = $('#ballsCount').val();

	if (ballsCount === 0)
		return false;

	$(this).remove();
	$('#ballsCount').remove();

	for (var i = 0; i <= ballsCount; i++) {
		new Ball();
	}
});*/

for (var i = 0; i <= 50; i++) {
	new Ball();
}