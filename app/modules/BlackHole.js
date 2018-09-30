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