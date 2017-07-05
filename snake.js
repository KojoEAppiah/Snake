var PIECE_SIZE = 10;
var HEIGHT = 300;
var WIDTH = 450;
var BLACK = "#0F0000";
var WHITE = "#FFFFFF";
var canvas, ctx;

var LEFT = 0;
var UP = 1;
var RIGHT= 2;
var DOWN = 3;

var over = false;
var PAUSED = false;

var direction = UP;

var node = function(x, y) {
	this.x = x;
	this.y = y;
	this.next = null;
	this.prev = null;
	this.index = 0;
}

var food = function(x, y){
	this.x = x;
	this.y = y;
	this.color = "#FFFF00";
}

var foods = [];

var head, tail;
var snake_length = 0;
var snake_dir = UP;

var init = function() {

 	head = new node(200, 2*(HEIGHT/3));
	iter = head;
	for(var i = 0; i < 14; i++){
		iter.next = new node(iter.x, iter.y+PIECE_SIZE);
		iter.next.prev = iter;
		iter.index = snake_length;
		iter = iter.next;
		snake_length++;
	}
	tail = iter;
}


var printSnake = function(color) {

	iter = head;
	ctx.fillStyle = color;
	while(iter.next != null){
/*		ctx.beginPath();
		ctx.arc(iter.x+PIECE_SIZE/2, iter.y+PIECE_SIZE/2,PIECE_SIZE/2,0,2*Math.PI);
		ctx.stroke();		*/
		if(color === WHITE){
			ctx.fillRect(iter.x, iter.y, PIECE_SIZE, PIECE_SIZE);
			ctx.strokeRect(iter.x, iter.y, PIECE_SIZE, PIECE_SIZE);
		}
		else
			ctx.fillRect(iter.x-1, iter.y-1, PIECE_SIZE+2, PIECE_SIZE+2);

		iter = iter.next;
	}
}

var mainLoop = function() {

	printSnake(BLACK);

	iter = tail;
	while(iter.prev != null) { //move each piece to the previous position of the piece in front of it
		iter.x = iter.prev.x;
		iter.y = iter.prev.y;
		iter = iter.prev;
	}

	switch(direction) {
		case UP:
			head.y -= PIECE_SIZE;
			console.log(UP);
			snake_dir = UP;
			break;
		case RIGHT:
			head.x += PIECE_SIZE;
			console.log(RIGHT);
			snake_dir = RIGHT;
			break;
		case DOWN:
			head.y += PIECE_SIZE;
			console.log(DOWN);
			snake_dir = DOWN;
			break;
		case LEFT:
			head.x -= PIECE_SIZE;
			console.log(UP);
			snake_dir = LEFT;
			break;
		default:
			break;//ERROR!
	}

	//Collisions  - Check for endgame.
	if(head.x > WIDTH - PIECE_SIZE || head.x < 0 || head.y > HEIGHT - PIECE_SIZE || head.y < 0){ //game over man! Boundaries.
		GameOver();
	}

	iter = head;
	while(iter.next != null){
		iter = iter.next;   //check the bounaries of the head against the boundaries of each node
		if(((head.x >= iter.x && head.x <= iter.x+PIECE_SIZE-1) || (head.x+PIECE_SIZE-1 >= iter.x && head.x+PIECE_SIZE-1 <= iter.x+PIECE_SIZE-1))
		 && ((head.y >= iter.y && head.y <= iter.y+PIECE_SIZE-1) || (head.y+PIECE_SIZE-1 >= iter.y && head.y+PIECE_SIZE-1 <= iter.y+PIECE_SIZE-1))){
			GameOver();
		console.log("iter: " + iter.index);
			console.log("bam");
		}
	}

	var i = 0;
	//check the bounaries of the head against the bounaries of the food.
	if(((head.x >= foods[i].x && head.x <= foods[i].x+PIECE_SIZE-1) || (head.x+PIECE_SIZE-1 >= foods[i].x && head.x+PIECE_SIZE-1 <= foods[i].x+PIECE_SIZE-1))
	 && ((head.y >= foods[i].y && head.y <= foods[i].y+PIECE_SIZE-1) || (head.y+PIECE_SIZE-1 >= foods[i].y && head.y+PIECE_SIZE-1 <= foods[i].y+PIECE_SIZE-1))) {//yum!
		tail.next = new node(0,0); //x and y will be set below
		tail.next.prev = tail;
		tail = tail.next;
		console.log("FOOOOD  " + snake_length++);
		ctx.fillStyle = BLACK;
		ctx.fillRect(foods[i].x, foods[i].y, PIECE_SIZE, PIECE_SIZE);
		addFood();
	}

	printSnake(WHITE);
	if(!over){
		setTimeout(function(){ mainLoop()}, 100);
	}
}


var GameOver = function() {
	console.log("Baaaaaaaa");
	over = true;
}


var addFood = function() {

	//randomize location
	var nugget = new food(Math.floor(Math.random() * (WIDTH/PIECE_SIZE))*PIECE_SIZE, Math.floor(Math.random() * (HEIGHT/PIECE_SIZE))*PIECE_SIZE);
	iter = head;
	while(iter.next != null){
		console.log(nugget.x + " " + nugget.y); //make sure food doesn't materialize in/on the snake...
		if((nugget.x >= iter.x && nugget.x <= iter.x+PIECE_SIZE-1) || (nugget.x+PIECE_SIZE-1 >= iter.x && nugget.x+PIECE_SIZE-1 <= iter.x+PIECE_SIZE-1)
			&& (nugget.y >= iter.y && nugget.y <= iter.y+PIECE_SIZE-1) || (nugget.y+PIECE_SIZE-1 >= iter.y && nugget.y+PIECE_SIZE-1 <= iter.y+PIECE_SIZE-1)) {
			nugget.x = Math.floor(Math.random() * 1000) % (WIDTH - PIECE_SIZE);
			nugget.y = Math.floor(Math.random() * 1000) % (HEIGHT - PIECE_SIZE);
			console.log("FoodSnakeBOOM!");
			iter = head;
		}
		iter = iter.next;
	}

	random_color = '#'+Math.floor(Math.random()*16777215).toString(16);

	while(random_color == WHITE || random_color == BLACK) // make sure it doesn't blend into the background
		random_color = '#'+Math.floor(Math.random()*16777215).toString(16);

	foods[0] = new food(nugget.x, nugget.y, random_color);

	ctx.fillStyle = random_color;
	ctx.fillRect(nugget.x, nugget.y, PIECE_SIZE, PIECE_SIZE);

}


window.onkeydown = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   switch(key) {
	   case 37:
	   		if(snake_dir != RIGHT)
		    	direction = LEFT;
		    break;
	   case 38:
	   		if(snake_dir != DOWN)
		    	direction = UP;
		    break;
	   case 39:
	   		if(snake_dir != LEFT)
		    	direction = RIGHT;
		    break;
	   case 40:
	   		if(snake_dir != UP)
		    	direction = DOWN;
		    break;
		case 80:
			PAUSED = !PAUSED;
		default:
			break;
	}
}


var main = function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	ctx.canvas.width = WIDTH;
	ctx.canvas.height = HEIGHT;

	WIDTH = canvas.width;
	HEIGHT = canvas.height;


	init();
	printSnake(BLACK);
	addFood();


	iter = head;
	while(iter.next != null){
		console.log(iter.x + ',' + iter.y);
		iter = iter.next;
	}
	mainLoop();

}


$(document).ready(main);