var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  spookySound.loop();
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(200,200);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  
}

function draw() {
  background(200);
  
if(gameState==="play")
{


  if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors();
    

    if(keyDown("right_arrow"))
    {
      ghost.x = ghost.x + 3;
    }

    if(keyDown("left_arrow"))
    {
      ghost.x = ghost.x - 3;
    }

    if(keyDown("space"))
    {
      ghost.velocityY = -6;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }

    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end";
    }
    drawSprites();
  }


  if(gameState === "end")
  {
    
    fill("yellow");
    textSize(30);
    text("GAME OVER", 230, 250);
  }
}

  function spawnDoors()
    {
      if(frameCount%240===0)
      {
        door = createSprite(200, -50);
        climber = createSprite(200, 10);
        invisibleBlock = createSprite(200, 15);
        door.addImage ("door", doorImg);
        climber.addImage("climber", climberImg);
        door.velocityY = tower.velocityY;
        climber.velocityY = tower.velocityY;
        invisibleBlock.width = climber.width;
        invisibleBlock.height = 1.5;
        invisibleBlock.velocityY = climber.velocityY;
        door.x = Math.round(random(120, 400));
        climber.x = door.x;
        invisibleBlock.x = climber.x;
        door.lifetime = 800;
        climber.lifetime = door.lifetime;
        invisibleBlock.lifetime = climber.lifetime;
        doorsGroup.add(door);
        climbersGroup.add(climber);
        ghost.depth = door.depth + 1;
        //invisibleBlock.visible = false;
        invisibleBlock.debug = true;
        invisibleBlockGroup.add(invisibleBlock);
      }
    }
