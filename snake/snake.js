var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext('2d');
var snakeLength = 3;
var frameRate = 1;
var pixelSize = 32;
var snakeDirection = "right";
var newDirection = "right";
var nextDirection = "";
var xMax = canvas.width / pixelSize - 1;
var yMax = canvas.height / pixelSize - 1;
var head;
var bodyArray = [];
var gameOver = false;
var scoreboard = document.getElementById('scoreboard');
window.addEventListener("keydown", setDirection, false);
setStartingPosition();
var gameInterval = setInterval(animate, 1000 / frameRate);


function head(x, y) {
		this.x = x;
		this.y = y;
}

function body(x, y) {
		this.x = x;
		this.y = y;
}

function food(x, y) {
		this.x = x;
		this.y = y;
}

function setStartingPosition() {
	snakeLength = 3;
	head = new head(2, 0);
	bodyArray[0] = new body(1, 0);
	bodyArray[1] = new body(0, 0);
	bodyArray[2] = new body(-1, 0);
	food = new food(Math.floor(xMax / 2), Math.floor(yMax / 2));
}

function setDirection(e) {
	// 
    switch(e.keyCode) {
        case 37:
			if(snakeDirection != "right") {
				newDirection = "left";
				nextDirection = "left";
			}
			else if (newDirection != "right"){
				nextDirection = "left"
			}
            break;
		case 38:
			if(snakeDirection != "down") {
				newDirection = "up";
				nextDirection = "up";
			}
			else if (newDirection != "down"){
				nextDirection = "up"
			}
			break;
        case 39:
			if(snakeDirection != "left") {
				newDirection = "right"; 
				nextDirection = "right";
			}	
			else if (newDirection != "left"){
				nextDirection = "right"
			}		
			break;
        case 40:
			if(snakeDirection != "up") {
				newDirection = "down";
				nextDirection = "down";
			}
			else if (newDirection != "up"){
				nextDirection = "down"
			}
            break;  
    }
}

function animate() {
	if (snakeLength == (yMax + 1) * (xMax + 1) - 1) {
		scoreboard.innerHTML = "You won!";
		gameOver = true;
	}
	if (gameOver)
		return;
	// DebugSomeStuff();
	// move the body
	var newBodyX = bodyArray[bodyArray.length - 1].x;
	var newBodyY = bodyArray[bodyArray.length - 1].y;
	for (var i = snakeLength - 1; i > 0; --i) {
		bodyArray[i].x = bodyArray[i - 1].x;
		bodyArray[i].y = bodyArray[i - 1].y;
	}
	bodyArray[0].x = head.x;
	bodyArray[0].y = head.y;
	// get the head's direction
	snakeDirection = newDirection;
	if (nextDirection != "") {
		newDirection = nextDirection;
		nextDirection = "";
	}
	// move the head
	if (snakeDirection == "right") {
		head.x += 1;
	} else if (snakeDirection == "left") {
		head.x -= 1;
	} else if (snakeDirection == "down") {
		head.y += 1;
	} else if (snakeDirection == "up") {
		head.y -= 1;
	}
	// check if the food was eaten
	if (head.x == food.x && head.y == food.y) {
		bodyArray[bodyArray.length] = new body(newBodyX, newBodyY);
		generateFood();
		++snakeLength;
		scoreboard.innerHTML = "Score: " + (snakeLength - 3);
	}
	drawObjects();
	// check if the snake died
	if (!snakeCanLive()) {
		clearInterval(gameInterval);
		// context.clearRect(0, 0, canvas.width, canvas.height);
		scoreboard.innerHTML += "</br>Game over.";
		gameOver = true;
		return;
	}
	// draw the canvas
	
}

function drawObjects() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawPixel(food.x, food.y, "food");
	for (var i = 0; i < snakeLength; ++i)
		drawPixel(bodyArray[i].x, bodyArray[i].y, "body");
	drawPixel(head.x, head.y, "head");
}

function drawPixel(x, y, type) {
	if (type == "body")
		context.fillStyle = "rgb(0, 255, 0)";
	else if (type == "head")
		context.fillStyle = "rgb(0, 200, 0)";
	else if (type == "food")
		context.fillStyle = "rgb(255, 0, 0)";
	else
		context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function snakeCanLive() {
	if (head.x < 0 || head.y < 0 || head.x > xMax || head.y > yMax || pixelIsBody(head.x, head.y))
		return false;
	return true;
}

function pixelIsBody(x, y) {
	for (var i = 0; i < snakeLength; ++i) {
		if (bodyArray[i].x == x && bodyArray[i].y == y)
			return true;
	}
	return false;
}

function generateFood() {
	var x = Math.floor(Math.random() * xMax + 0.5);
	var y = Math.floor(Math.random() * yMax + 0.5);
	if (pixelIsBody(x, y) || (head.x == x && head.y == y)) {
		generateFood();
	} else {
		food.x = x;
		food.y = y;
	}
	scoreboard.innerHTML += "</br> trying (" + x + ";" + y + ")";
}

function DebugSomeStuff() {
	scoreboard.innerHTML += "</br>~~~head.x = " + head.x;
}