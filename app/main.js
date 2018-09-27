
/* MAIN JS */

for (var i = 0; i <= 10; i++) {
	var ball = new Ball();
	ball.initAndStartMove(ball.DIRECTION, ball.ID);
}

var blackHole = new BlackHole();
blackHole.initAndStartMove(blackHole.DIRECTION, blackHole.ID);
console.dir(blackHole);