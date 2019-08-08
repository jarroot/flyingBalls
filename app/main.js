/* MAIN JS */

(function () {
	for (var i = 0; i <= 100; i++) {
		var ball = new Ball();
		ball.initAndStartMove(ball.DIRECTION, ball.ID);
	}
})();