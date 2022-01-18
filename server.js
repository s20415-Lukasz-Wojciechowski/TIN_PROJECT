const express = require('express');
const app = express();

app.get('/game', (req, res)=>{
   res.send(
      `
      <h1 id="score">100</h1>
      <canvas id="canvas" height="600" width="600" style="border:2px solid black">
         
      </canvas>

      <script>

      const 
   ctx    = document.getElementById("canvas").getContext('2d'),
   score  = document.getElementById('score');

//variables
let 
   snakeLength = 1,
   pointsGet   = 50,
   pointsLoss   = 5,
   totalPoints = 100,
   stepSize = 15;

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

   ctx.fillRect(width*stepSize,height*stepSize,stepSize,stepSize);
   points.push([width*stepSize,height*stepSize]);
};

//making board and first segment of snake (red rect)
ctx.fillStyle = 'red';
ctx.fillRect(0,0,stepSize,stepSize)

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
         ctx.fillRect(currPosition[0]-=stepSize, currPosition[1],stepSize, stepSize);
         break;

      case 38: 
         ctx.fillRect(currPosition[0], currPosition[1]-=stepSize, stepSize,stepSize);
         break;

      case 39: 
         ctx.fillRect(currPosition[0]+=stepSize, currPosition[1], stepSize, stepSize);
         break;

      case 40:
         ctx.fillRect(currPosition[0], currPosition[1]+=stepSize, stepSize, stepSize);
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

   ctx.clearRect(snakeSegments[0][0],snakeSegments[0][1],stepSize,stepSize);
   snakeSegments.shift();
};
   


//gameOver
function gameOver(){
   for (let i in snakeSegments){
      if(snakeSegments[i][0] == currPosition[0] && snakeSegments[i][1] == currPosition[1]){
         location.href = "http://localhost:3000/score";
         break;
      };
   };
   if (currPosition[0]>600 || currPosition[0]<0 || currPosition[1]<0 || currPosition[1]>600){
      location.href = "http://localhost:3000/score"
   };

};
//points collecting
function pointsCollecting(){
   /*score.innerHTML+=pointsGet;*/
   totalPoints-=pointsLoss ;
   score.innerHTML = totalPoints;
}

setInterval(apple,3500);
setInterval(pointsCollecting,4000);
setInterval(movement,200);
</script>
      `)});
   


app.get('/menu', (req, res)=>{
   //res.send();
   //res.redirect('http://localhost:3000/game')
   res.send(`<a href="http://localhost:3000/game">Start</a>`);
});

app.get('/score', (req, res)=>{
   res.send("1");
   //res.redirect('http://localhost:3000/game')
  // res.send(`<a href="http://localhost:3000/game">Start</a>`);
});
app.listen(3000)