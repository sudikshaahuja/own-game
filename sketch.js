var child,fruit,animal,weapon,pFruit;
var child_running,animal_running;
var fruitImage,pFruitImage;
var weaponImage;
var ground;
var groundImage;
var gameState = "play";
var score = 0;
var fruitGroup,weaponGroup,PfruitGroup;
var life = 5;
var gImg;
var cGroup;
var animal_collides;
var child_collided;
var gameOver,restart,gameOverImg,restartImg;

function preload(){

child_running = loadAnimation("Images/1.png","Images/2.png","Images/3.png","Images/4.png","Images/5.png",
"Images/6.png","Images/7.png","Images/8.png","Images/9.png");

animal_running = loadAnimation("Images/a1.png","Images/a2.png","Images/a3.png",
"Images/a5.png","Images/a6.png");

fruitImage = loadImage("Images/goodapple.png");

pFruitImage = loadImage("Images/Pfruit.png");

weaponImage = loadImage("Images/weapon.png");

groundImage = loadImage("Images/background.png");

 gImg = loadImage("Images/gamesnake.png");

 animal_collides = loadImage("Images/idle boy.png");

 child_collided = loadImage("Images/dead.png");

 gameOverImg = loadImage("Images/gameoverimg.png")

 restartImg = loadImage("Images/restartimg.png")
}

function setup() {
  createCanvas(displayWidth,displayHeight);

ground = createSprite(0,0);
ground.addImage("ground",groundImage);





child = createSprite(270,680);
child.addAnimation("running",child_running);
child.addAnimation("dead",child_collided);
child.scale = 0.4;

    

animal = createSprite(50,670);
animal.addAnimation("animal_running",animal_running);
animal.addAnimation("idle boy",animal_collides);
animal.scale = 0.4;

fruitGroup = new Group();
PfruitGroup = new Group();
weaponGroup = new Group();
cGroup = new Group();

gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+100);
  restart.addImage(restartImg);

  
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  

}

function draw() {
  background(255);
  
  if(gameState === "play"){

    ground.velocityX = -15;

    if(ground.x<0){
      ground.x = ground.width/2;
    }
  
    child.y = mouseY;

    

    if(child.isTouching(fruitGroup) || child.isTouching(weaponGroup)){
      fruitGroup.destroyEach();
      weaponGroup.destroyEach();
      score = score +15;
      if(score % 30=== 0){
        var c = createSprite(1200,random(300,600));
        c.addImage(gImg);
        c.velocityX = -20;
        c.scale = 0.1;
        c.lifetime = displayWidth/8
        cGroup.add(c)
      }
    }

   

    if(child.isTouching(PfruitGroup)){
      PfruitGroup.destroyEach();
      life = life -1
    }

   
  
    spawnFruits();
    spawnWeapon();
    spawnpFruit();

    if(child.isTouching(cGroup) || life === 0){
      gameState = "end"
    }
    
  }

  if(gameState === "end"){
    ground.velocityX = 0;

    child.changeAnimation("dead",child_collided);
    animal.changeAnimation("idle boy",animal_collides);
    fruitGroup.setVelocityXEach(0);
    weaponGroup.setVelocityXEach(0);
    PfruitGroup.setVelocityXEach(0);
    cGroup.setVelocityXEach(0);
    fruitGroup.setLifetimeEach(-1);
    PfruitGroup.setLifetimeEach(-1);
    weaponGroup.setLifetimeEach(-1);
    cGroup.setLifetimeEach(-1);

    
  
    gameOver.visible = true;
    restart.visible = true;

    if(mousePressedOver(restart)) {
      reset();
    }
    
  }

  
  
    drawSprites();
    
    fill("blue")
  textSize(35)
  text("Score: "+score,displayWidth-200,50);
  fill("blue")
  textSize(35)
  text("Life: "+life,displayWidth-170,100);
  
  
}

function spawnFruits(){
  if(frameCount%110 === 0){
    fruit = createSprite(1200,random(250,350),15,15);
    fruit.addImage(fruitImage);
    fruit.scale = 0.2;
    fruit.velocityX = -15;
    fruit.lifetime = 600;
    fruitGroup.add(fruit);
  }
}

function spawnWeapon(){
  if(frameCount%200 === 0){
    weapon = createSprite(1200,random(200,300),10,10);
    weapon.addImage(weaponImage);
    weapon.scale = 0.2;
    weapon.velocityX = -15;
    weapon.lifetime = 300;
    weaponGroup.add(weapon)
  }
}

function spawnpFruit(){
  if(frameCount%250 === 0){
  pFruit = createSprite(1200,random(300,400),10,10);
  pFruit.addImage(pFruitImage);
  pFruit.scale = 0.3;
  pFruit.velocityX = -15;
  pFruit.lifetime = 600;
  PfruitGroup.add(pFruit)

}
}

function reset(){
  gameState = "play";
  gameOver.visible = false;
  restart.visible = false;

  score = 0;

  child.changeAnimation("running",child_running);
    animal.changeAnimation("animal_running",animal_running);

    fruitGroup.destroyEach();
      weaponGroup.destroyEach();
      PfruitGroup.destroyEach();
      cGroup.destroyEach();

      if(life === 0){
        life = 5
      }


}