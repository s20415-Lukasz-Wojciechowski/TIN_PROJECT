const express = require('express');
const app = express();
const fs = require('fs')
app.get('/', (req, res)=>{
   res.redirect('http://localhost:3000/menu')
});
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
   key = 39;
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
         Store()
         location.href = "http://localhost:3000/score";
      };
   };
   if (currPosition[0]>600 || currPosition[0]<0 || currPosition[1]<0 || currPosition[1]>600){
      Store()
      location.href = "http://localhost:3000/score"
   };

};
//points collecting
function pointsCollecting(){
   score.innerHTML+=pointsGet;
   totalPoints-=pointsLoss ;
   score.innerHTML = totalPoints;
}


function Store(){
   let results = window.localStorage.getItem('best');
   let output = window.localStorage.getItem('comm');
   if (results == 'undefined' || Number(score.innerText)>=Number(results)) {
      window.localStorage.setItem('cur',score.innerText);
      window.localStorage.setItem('best',score.innerText)
      window.localStorage.setItem('comm','u won')
   }
   else{
      window.localStorage.setItem('cur',score.innerText);
       window.localStorage.setItem('comm','u lost');
   }
}

setInterval(apple,3500);
setInterval(pointsCollecting,4000);
setInterval(movement,200);
</script>
      

`)});
   


app.get('/menu', (req, res)=>{
   res.send(`<a href="http://localhost:3000/game">Start</a>`);
});

app.get('/score', (req, res)=>{
   res.send(`
      <h1 id="feedback"></h1>
      <h2 id="score"></h2>
      <a href="http://localhost:3000/menu"><button>Menu</button></a>
      <script>
         const 
            msg = document.getElementById('feedback'),
            scr = document.getElementById('score')

            msg.innerText = window.localStorage.getItem('comm');
            if (window.localStorage.getItem('cur') == window.localStorage.getItem('best')) {
               scr.innerText = 'Your score is '+window.localStorage.getItem('best')+' and it is a the highest score';
            }else{
               scr.innerText = 'Your score is '+window.localStorage.getItem('cur')
               +' and the highest score is '+ window.localStorage.getItem('best') + '. Try Again';
            }
      </script>
      `);
  
});
app.listen(3000)