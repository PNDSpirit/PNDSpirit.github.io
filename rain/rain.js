var framerate = 60;
var drop_count = 2500;
var drops = [];
var canvas = document.getElementById('rainCanvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
generate_drops();
window.addEventListener('resize', resizeCanvas, false);
setInterval(animate, 1000 / framerate);

function drop() {
	this.x = Math.floor(Math.random() * canvas.width);
	this.y = Math.floor(Math.random() * (canvas.height * 20) - canvas.height * 7);
	this.z = 8 - generateZValue(7);
	if (this.z <= 0)
		alert("z <= 0");	
	this.velocity = Math.floor(Math.random() * 10);
	// this.style = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
	this.style = "rgb(0,0,0)"
	this.restoreStarterValues = function() {
		this.x = Math.floor(Math.random() * canvas.width);
		this.y = - Math.floor(Math.random() * canvas.height) - canvas.height * 3;
		this.z = 6 - generateZValue(5);
		if (this.z <= 0)
			alert("z <= 0");
		this.velocity = 0;
		//this.style = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
		this.style = "rgb(0,0,0)"
	}
}

function generate_drops() {
	for (var i = 0; i < drop_count; ++i) {
		drops[i] = new drop();
	}
}


function animate() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (var i = 0; i < drop_count; ++i) {
		drops[i].velocity += drops[i].z;
		drops[i].y += drops[i].velocity / 2;
		if (drops[i].y > canvas.height * ((framerate / 5) + 1)) {
			drops[i].restoreStarterValues();
		}
		context.fillStyle = drops[i].style;
		context.fillRect(drops[i].x, drops[i].y / (framerate / 5), (drops[i].z), (drops[i].z) * 3);
	}
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function generateZValue(lim) {
	var value = 3.5;
	var number = Math.random() * Math.pow(value, lim);
	for (var i = 0; i < lim; ++i) {
		if (number < Math.pow(value, i))
			return i;
	}
	return lim;
}