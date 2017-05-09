var main = function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "#FF00F0";
	ctx.fillRect(30,200, 150, 200);
}

$(document).ready(main);