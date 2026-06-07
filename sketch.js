function preload(){
  
  sky = loadImage("images/background.png");
  birdAnimation = loadAnimation("images/redbird/l0_1.png","images/redbird/l0_2.png","images/redbird/l0_3.png","images/redbird/l0_4.png");
  evilAnimation = loadAnimation("images/evilbird/l0_e1.png","images/evilbird/l0_e2.png","images/evilbird/l0_e3.png",
    "images/evilbird/l0_e4.png","images/evilbird/l0_e5.png","images/evilbird/l0_e6.png","images/evilbird/l0_e7.png","images/evilbird/l0_e8.png");
  smokeAnimation = loadAnimation("images/smoke/l0_sm1.png","images/smoke/l0_sm2.png","images/smoke/l0_sm3.png","images/smoke/l0_sm4.png","images/smoke/l0_sm5.png",);

  birdImg = loadImage("images/redbird/l0_11.png");
  evilBirdImg = loadImage("images/evilbird/l0_e1.png");
  castleImg = loadImage("images/castle.png");
  wreckedCastleImg = loadImage("images/castle_d.png");

  enemyBulletImg = loadImage("images/ebull.png");
  bulletImg = loadImage("images/bull.png");

  heartImg = loadImage("images/heart0.png")

  state = "play";
}

function setup() {

  bg = createSprite(600,200,600,400);
  bg.addImage("sky", sky);
  bg.scale = 3.28;
  bg.velocityX = -1;

  castle = createSprite(110,200,100,100);
  castle.addImage("c",castleImg);
  castle.scale = 7;

  bird = createSprite(100,200,20,20);
  bird.addAnimation("fly",birdAnimation);
  bird.scale = 1.5;

  score = 0;
  bulletTimer = 1;

  bulletGroup = new Group();
  evilBirdGroup = new Group();
  enemyBulletGroup = new Group();

  bulletNum = 3;

  bullet1 = createSprite(20,20,10,10);
  bullet2 = createSprite(60,20,10,10);
  bullet3 = createSprite(100,20,10,10);
  bullet1.scale = 2;
  bullet2.scale = 2;
  bullet3.scale = 2;
  bullet1.addAnimation("bullet",bulletImg);
  bullet2.addAnimation("bullet",bulletImg);
  bullet3.addAnimation("bullet",bulletImg);

  heart1 = createSprite(580,20,10,10);
  heart2 = createSprite(540,20,10,10);
  heart3 = createSprite(500,20,10,10);
  heart1.scale = 0.03
  heart2.scale = 0.03
  heart3.scale = 0.03
  heart1.addImage("heart",heartImg);
  heart2.addImage("heart",heartImg);
  heart3.addImage("heart",heartImg);
  livesNum = 3;
}

function draw() {
  createCanvas(600,400);
  background("black");

  if  (state=="play"){
    if (bg.x<70) {
      bg.x = 600;
    }
    edges = createEdgeSprites();
    if (keyDown("up")){bird.y = bird.y-10;}
    if (keyDown("down")){bird.y = bird.y+10;}

    if (keyDown("space")&&bulletTimer === 1&&bulletNum >= 1) {  
      bullet = createSprite(110,bird.y,10,10);
      bullet.velocityX = 5;
      bulletTimer = 0;
      bullet.addImage("bullet",bulletImg);
      bullet.scale = 2;
      bulletGroup.add(bullet);
      bulletNum = bulletNum-1;
    }
    if (keyWentUp("space")) {  
      bulletTimer = 1;
    }

    if (bulletNum === 3) {

      bullet3.visible = true;
      bullet2.visible = true;
      bullet1.visible = true;
    }
    if (bulletNum === 2){

      bullet3.visible = false;
      bullet2.visible = true;
      bullet1.visible = true;
    }
    if (bulletNum === 1) {
      bullet3.visible = false
      bullet2.visible = false;
      bullet1.visible = true;
    }
    if (bulletNum === 0) {

      bullet3.visible = false
      bullet2.visible = false;
      bullet1.visible = false;
    }

    if (livesNum === 3) {

      heart3.visible = true;
      heart2.visible = true;
      heart1.visible = true;
    }
    if (livesNum === 2){

      heart3.visible = false;
      heart2.visible = true;
      heart1.visible = true;
    }
    if (livesNum === 1) {

      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = true;
    }
    if (livesNum === 0) {

      heart3.visible = false;
      heart2.visible = false;
      heart1.visible = false;
    }
    if(livesNum === 0||evilBirdGroup.isTouching(edges[0])){

      state = "end";
    }
    if (frameCount%60===0&&bulletNum<3) {

      bulletNum = bulletNum+1;
    }
    bird.collide(edges[3]);
    bird.collide(edges[2]);
    spawnEnemy();
  }
  evilBirdGroup.overlap(bird,()=>{
    state="end"
    livesNum = 0;
  })
  enemyBulletGroup.overlap(bird,(bulletHit)=>{
    bulletHit.destroy()
    livesNum = livesNum-1;
  })
  bulletGroup.overlap(evilBirdGroup,(bulletHit,birdHit)=>{
    bulletHit.destroy();
    birdHit.addAnimation("smoke",smokeAnimation)
    birdHit.changeAnimation("smoke")
    score = score+1;
    setTimeout(()=>{birdHit.destroy()},600)
  })
  fill(0)
  drawSprites();
  textSize(20);
  text("Score: "+score,250,50)
  textSize(10);
  text("Press Space to shoot",10,380);
  text("The Bad Birds are attacking us",450,370);
  text("You are the only Hero we have",460,380);
  text("to defend our castle",475,390);

  if (state=="end") {
    
    bird.setVelocity(0,6);

    evilBirdGroup.setVelocityXEach(0);
    bg.velocityX = 0;
    bird.addImage("over",birdImg);
    bird.changeImage("over");
    castle.addImage("do",wreckedCastleImg);
    castle.changeImage("do");
    livesNum=0
    bulletNum=0

    textSize(30);
    text("The Castle was Destroyed",110,200);
    textSize(40);
    text("Game Over",200,100) 
    textSize(15);
    text("Press R to Restart",200,300);

    if (keyDown('r')){reset();}
  }
}
function spawnEnemy(){

  if (frameCount %60==0){
    enemy = createSprite(630,random(50,380),20,20)
    enemy.velocityX = -2;
    enemy.addAnimation("evil",evilAnimation);
    enemy.mirrorX = -1;
    enemy.scale = 2;
    evilBirdGroup.add(enemy);
  }
  if(frameCount %60 === 0&&frameCount != 0){

    enemyBullet = createSprite(enemy.x-10,enemy.y,10,10)
    enemyBullet.velocityX = -6;
    enemyBullet.velocityY = random(-3,3);
    enemyBullet.addImage("enemyBullet",enemyBulletImg);
    enemyBullet.scale = 2;
    enemyBulletGroup.add(enemyBullet);
  }
}
function reset() {
  
  state = "play";
  livesNum = 3;
  bulletNum = 3;
  bird.changeAnimation("fly");
  bird.y = 200;
  bird.setVelocity(0,0)
  castle.changeAnimation("c");
  evilBirdGroup.destroyEach();
  score = 0;
  bg.velocityX = -1;
}
