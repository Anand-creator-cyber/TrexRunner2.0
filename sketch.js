var trex, trex_running, trex_collided;
var ground_img, invisible_g, ground;
var cloud_grp, cloud_img;
var obstacle_grp, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var PLAY = 1;
var END = 0;

var gameState = PLAY;
var gameOver, gameOver_img;
var restart, restart_img;
localStorage["h_score"] = 0;

function preload() {

  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ground_img = loadImage("ground2.png");

  cloud_img = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  gameOver_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");

}


function setup() {
  createCanvas(600, 200);

  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trex",trex_collided);

  ground = createSprite(200, 180, 400, 30);
  ground.addImage("ground", ground_img);

  invisible_g = createSprite(200, 190, 400, 10);
  invisible_g.visible = false;

  gameOver = createSprite(300, 100, 40, 60);
  gameOver.addImage("gameOver", gameOver_img);
  gameOver.visible = false;

  restart = createSprite(300, 150, 30, 30);
  restart.addImage("retsart", restart_img);
  restart.visible = false;

  cloud_grp = new Group();
  obstacle_grp = new Group();
}

function draw() {
  background(185);

  text("Score :" + score, 500, 60);


  if (gameState === PLAY) {

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    ground.velocityX = -7;
    ground.velocityX = -(6 + 3*score/100);

    trex.velocityY = trex.velocityY + 0.4;
    
      if (keyDown("space") && trex.y >= 159) {
    trex.velocityY = -7;
        jumpSound.play();
    }
    
      trex.collide(invisible_g);
    
     score = score + Math.round(getFrameRate() / 60);
     if(score % 100 === 0 && score > 0) {
     
       checkPointSound.play();
     }
    
    if(obstacle_grp.isTouching(trex)) {
       
       gameState = END;
      
       dieSound.play();
       
       }
    
 
    
    
 }
  
  else if(gameState === END) {
    
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    
    obstacle_grp.setVelocityXEach(0);
    cloud_grp.setVelocityXEach(0);
    
    obstacle_grp.setLifetimeEach(-1);
    cloud_grp.setLifetimeEach(-1);
    
    trex.changeAnimation("trex",trex_collided);
    
    trex.collide(invisible_g);
    
    if(mousePressedOver(restart)) {
    
      reset();
    }
    
  }

  spawnObstacles();
  spawnClouds();
  drawSprites();
}


function spawnClouds() {

  if (frameCount % 90 === 0) {
    var cloud = createSprite(600, 120, 40, 10);
    cloud.y = Math.round(random(90, 120));
    cloud.addImage(cloud_img);
    cloud.scale = 0.7;
    cloud.velocityX = -3;


    cloud.lifetime = 210;


    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;

    cloud_grp.add(cloud);
  }

}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600, 165, 10, 40);
    obstacle.velocityX = -6;

    //generate random obstacles
    var rand = Math.round(random(1, 6));

    switch (rand) {

      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;

    }

    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 220;

    obstacle_grp.add(obstacle);
  } 
}

 function reset() {

   gameState = PLAY;
   
   gameOver.visible = false;
   restart.visible = false;
   
   obstacle_grp.destroyEach();
   cloud_grp.destroyEach();
   
   trex.changeAnimation("running", trex_running);
   
   
   
   if(localStorage["h_score"] < score) {
   
     localStorage["h_score"] = score;
   
   }
   
   console.log(localStorage["h_score"]);
   
   score = 0;
   
 }
