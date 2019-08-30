//dom elements
const 
	ctx    = document.getElementById("canvas").getContext('2d'),
	score  = document.getElementById('score');

//variables
let 
	snakeLength = 1,
	pointsGet   = 50,
	totalPoints = 100,
	key         = 39;

const 
	currPosition  = [0,0],
	points        = [],
	snakeSegments = [];

//appending apples - points to get
function apple(){
	ctx.fillStyle = 'green';
	let 
		height = Math.floor(Math.random()*2600)%40,
	 	width  = Math.floor(Math.random()*2600)%40;

	ctx.fillRect(width*15,height*15,15,15);
	points.push([width*15,height*15]);
};

//making board and first segment of snake (red rect)
ctx.fillStyle = 'red';
ctx.fillRect(0,0,15,15)

//snakes movement

document.addEventListener('keydown',turn)
	function turn(elem){key = elem.keyCode};

snakeSegments.push([...currPosition]);

function movement(){
	ctx.fillStyle = 'red';
	let 
		keyCode         = key,
		lastSnakeLength = snakeLength;

	for (let i in points){
		if(points[i][0] == currPosition[0] && points[i][1] == currPosition[1]){
			snakeLength++
			points.splice(i,1)
		};
	}; 
	switch(keyCode){
		case 37: 
			ctx.fillRect(currPosition[0]-=15, currPosition[1], 15, 15);
			break;

		case 38: 
			ctx.fillRect(currPosition[0], currPosition[1]-=15, 15, 15);
			break;

		case 39: 
			ctx.fillRect(currPosition[0]+=15, currPosition[1], 15, 15);
			break;

		case 40:
			ctx.fillRect(currPosition[0], currPosition[1]+=15, 15, 15);
			break;
		default : break;
	};

	//gameOver references
	gameOver();

	//removing segments of snake
	if (snakeLength>lastSnakeLength) {
		snakeSegments.push([...currPosition]);
		totalPoints+=pointsGet;
		score.innerHTML = totalPoints;
	};
	snakeSegments.push([...currPosition]);

	ctx.clearRect(snakeSegments[0][0],snakeSegments[0][1],15,15);
	snakeSegments.shift();
};
	


//gameOver
function gameOver(){
	for (let i in snakeSegments){
		if(snakeSegments[i][0] == currPosition[0] && snakeSegments[i][1] == currPosition[1]){
			alert(`You lost. You gained ${score.innerHTML} points... Press F5 to restart and then OK to start`);
		};
	};
	if (currPosition[0]>600 || currPosition[0]<0 || currPosition[1]<0 || currPosition[1]>600){
		alert(`You lost. You gained ${score.innerHTML} points... Press F5 to restart and then OK to start`);
	};
	if (totalPoints<=0){
		alert(`You lost. You gained ${score.innerHTML} points... Press F5 to restart and then OK to start`);
	};
};
//points collecting
function pointsCollecting(){
	/*score.innerHTML+=pointsGet;*/
	totalPoints-=5;
	score.innerHTML = totalPoints;
}

setInterval(apple,3500);
setInterval(pointsCollecting,4000);
setInterval(movement,200);

/*function sleep(milliseconds) {
  var start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    };
  };
};


function compare(arr1,arr2){
	arr1.forEach(elem1=>arr2.forEach(elem2=>{
		if (elem1[0] == elem2[0] && elem1[1] == elem2[1]) return true;
		return false;
	}));
};*/
