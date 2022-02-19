var score = 0;

var aircraft , bullet , diomand , enemy_1 , enemy_2 , enemy_3;

var aircraftImg , bulletImg , diomandImg , enemy_1Img , enemy_2Img , enemy_3Img;

var bulletGroup ,diomandGroup , enemy_1Group , enemy_2Group , enemy_3Group;

var background , backgroundImg;

var you_win , you_winImg;

var life = 10;

var gameState = 1;

var Made_by_Chandrajeet_Bhilane;

function preload() {
  aircraftImg = loadImage("assets/aircraft.png");
  bulletImg = loadImage("assets/bullet.png");
  diomandImg = loadImage("assets/diomand.png");
  enemy_1Img = loadImage("assets/enemy_1.png");
  enemy_2Img = loadImage("assets/enemy_2.png");
  enemy_3Img = loadImage("assets/enemy_3.png");

  backgroundImg = loadImage("assets/background.jpg");

  you_winImg = loadImage("assets/you_win.png")
}

function setup() {
  createCanvas(500,1000);
  
  aircraft = createSprite(250, 900, 50, 50);
  aircraft.addImage(aircraftImg);
  aircraft.scale=0.9
  
  
  bulletGroup = createGroup();
  diomandGroup = createGroup();
  enemy_1Group = createGroup();
  enemy_2Group = createGroup();
  enemy_3Group = createGroup();

  heading = createElement("h1");
  scoreboard = createElement("h2");
  makername=createElement("h3")

  you_win = createSprite(250,500,50,50);
  you_win.scale = 5;
}

function draw() {
 background(backgroundImg);  

  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:orange'); 
  scoreboard.position(300,25)

  makername.html("Made by Chandrajeet Bhilane")
  makername.style("color:white");
  makername.position(220,950)

  if(gameState===1){
    aircraft.x=mouseX

    you_win.visible = false;


    if (frameCount % 60 === 0){
      drawenemy_1();
    }
    if (frameCount % 80 === 0){
      drawenemy_2();
    }
    if (frameCount % 100 === 0){
      drawenemy_3();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if(enemy_1Group.collide(aircraft)) {
      handleGameOver(enemy_1Group);
    }
    if(enemy_2Group.collide(aircraft)) {
      handleGameOver(enemy_2Group);
    }
    if(enemy_3Group.collide(aircraft)) {
      handleGameOver(enemy_3Group);
    }

    if(enemy_1Group.collide(bulletGroup)) {
      handleEnemyCollision(enemy_1Group);
    }
    if(enemy_2Group.collide(bulletGroup)) {
      handleEnemyCollision(enemy_2Group);
    }
    if(enemy_3Group.collide(bulletGroup)) {
      handleEnemyCollision(enemy_3Group);
    }
  }

  /*
  if(score === 1){
    enemy_1.velocityY=0;
    enemy_2.velocityY=0;
    enemy_3.velocityY=0; 
    enemy_1Group.destroyEach();
    enemy_2Group.destroyEach();
    enemy_3Group.destroyEach();

    you_winImg.visible = true;
    you_winImg.scale=4;

  } 
  */
  
  drawSprites();
}


function drawenemy_1(){
  enemy_1 = createSprite(random(100,900),0,40,40);
  enemy_1.addImage(enemy_1Img);
  enemy_1.scale = 1;
  enemy_1.velocityY = 8;
  enemy_1.lifetime = 100;
  enemy_1Group.add(enemy_1);
  enemy_1.display(); 
}
function drawenemy_2(){
  enemy_2 = createSprite(random(100,900),0,40,40);
  enemy_2.addImage(enemy_2Img);
  enemy_2.scale = 1;
  enemy_2.velocityY = 8;
  enemy_2.lifetime = 100;
  enemy_2Group.add(enemy_2);
  enemy_2.display();
}
function drawenemy_3(){
  enemy_3 = createSprite(random(100,900),0,40,40);
  enemy_3.addImage(enemy_3Img);
  enemy_3.scale = 1   ;
  enemy_3.velocityY = 8;
  enemy_3.lifetime = 100;
  enemy_3Group.add(enemy_3);
  enemy_3.display();
}

function shootBullet() { 
  bullet=createSprite(150,790,50)
  bullet.x = aircraft.x-15
  bullet.addImage(bulletImg)
  bullet.scale = 1
  bullet.velocityY = -10
  bulletGroup.add(bullet)
}

function handleEnemyCollision(enemyGroup){
  if(life > 0) {
    score=score+1;
  }
  enemyGroup.destroyEach(); 
  bulletGroup.destroyEach();
}

function handleGameOver(enemyGroup){
  life=life-1;
  enemyGroup.destroyEach();

  if(life === 0) {
    gameState=2
  }
}