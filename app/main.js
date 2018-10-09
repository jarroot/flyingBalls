/* MAIN JS */

(function () {
	for (var i = 0; i <= 80; i++) {
		var ball = new Ball();
		ball.initAndStartMove(ball.DIRECTION, ball.ID);
	}
})();


var obj = (function () {

	var name = 'vadim';
	var options = {
		name: name,
		age: 26
	};


	return {
		getName: function () {
			return name;
		},

		getOptions: function () {
			var newOptions = {};

			for (var item in options) {
				newOptions[item] = options[item];
			}

			return newOptions;
		}
	}

})();


console.dir(obj);