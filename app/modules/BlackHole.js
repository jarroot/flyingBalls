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