var PIECE_SIZE = 8;
var node = function(x, y) {
	this.x = x;
	this.y = y;
	this.next = null;
}

var head;
var snake_length;
var init = function() {

 	head = new node(200, 200);
	iter = head;
	for(var i = 0; i < 7; i++){
		iter.next = new node(iter.x, iter.y+PIECE_SIZE);
		iter = iter.next;
		snake_length++;
	}
}

var print_snake = function(ctx) {
	iter = head;
	while(iter.next != null){
		ctx.fillStyle = "#FF00F0";
		ctx.fillRect(iter.x, iter.y, PIECE_SIZE, PIECE_SIZE);
		iter = iter.next;
	}
}

var main = function() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	ctx.fillStyle = "#FF00F0";
	ctx.fillRect(30,200, 150, 200);

	init();
	print_snake(ctx);


	iter = head;
	while(iter.next != null){
		console.log(iter.x + ',' + iter.y);
		iter = iter.next;
	}
}

$(document).ready(main);