var backImage,backgr;
var player, player_running;
var ground,ground_img;
var starGroup, obstacleGroup;
var END =0;
var PLAY =1;
var score = 0;
var gameState = PLAY;
var star,starImage;
var obstacle,obstacleImage;
var gameOver,gameOverImg;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("mario-running0.png", "mario-running1.png", "mario-running2.png");
  starImage = loadImage("star2.png");
  obstacleImage = loadImage("galoomba_orig.png");
  gameOverImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  gameOver = createSprite(400,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;

  gameOver.visible = false;

  starGroup = createGroup();
  obstacleGroup = createGroup(); 
}

function draw() { 
  background(0);
 

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);



  if(starGroup. isTouching(player)){
    starGroup.destroyEach();
    score = score+2;
    player.velocityX = player.velocityX+1.5
  }
  
  if(obstacleGroup . isTouching(player)) {
    gameState = END;
    
  }
  

  
  spawnStar()
  spawnObstacle ()

  drawSprites();
}
  
else if (gameState === END) {
  gameOver.visible = true;

  //set velcity of each game object to 0
  backgr.velocityX = 0;
  player.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
 
  
  //set lifetime of the game objects so that they are never destroyed
  obstacleGroup.setLifetimeEach(-1);
  FoodGroup.setLifetimeEach(-1);
  
}

drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+score,300,100);
}


function spawnStar(){
  if (frameCount % 80 === 0) {
  star = createSprite( 200,330,330,40);
  star.y = Math.round(random(120,200));
  star.addImage(starImage);
  star.scale = 0.1; 
  star.velocityX = -4;
  star.lifetime = 300;
  starGroup.add(star);
  player.depth = star.depth+1;

    
    
  }
}

function spawnObstacle (){
  if(frameCount % 80 === 0){
    var obstacle = createSprite(300,325,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX =-4;
    obstacle.lifeTime = 10;
    obstacleGroup.add(obstacle);
    
  }
  }
