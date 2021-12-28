const Bodies = Matter.Bodies;
const Engine = Matter.Engine
const World = Matter.World

var bg;
var num = 0
var diver
var passbon = false;
var gameState = 1;
var  tiresG,tm  = false;
var plasticBG;
var chemicalG,CS = false;
var distance = 0;
var plasticG;
var i = 0;
var Healthofsea
var w =50;
var turtleCame = false;
var turtleControl = true;


function preload() 
{
  bg = loadImage("images/bg.jpg");
  diverImage2 = loadImage("images/diver2.png");
  diverImage = loadImage("images/diver.png");
  turtleI = loadImage("images/turtle.png")
  tyresImage = loadImage("images/tires.gif");
  plasticImage = loadImage("images/plastic.png");
  plasticBottleImage = loadImage("images/plasticBottle.png");
  chemicalWasteI = loadImage("images/chemical.png");
  chemicalWasteI2 = loadImage("images/chemical2.png");
  diverHurt = loadImage("images/diverHurt.png");
  buzzer = loadSound("Buzzer.mp3")

}


function setup() {

canvas = createCanvas(displayWidth * 5, displayHeight * 3);

engine = Engine.create();
world  = engine.world;



  i1 = createSprite(-3107, 1000, 20, displayHeight * 4);
  i1.visible = false
  i2 = createSprite(3150, 1000, 20, displayHeight * 4);
  i2.visible = false
  i3 = createSprite(0, displayHeight * 3, displayWidth * 5, 20);
  i3.visible = true;


  plasticG = createGroup();
  tiresG = createGroup();
  plasticBG = createGroup();
  chemicalG = createGroup();

  diver = createSprite(300, 300, 20, 20);
  diver.debug = true;


  diver.addImage(diverImage2)
  diver.scale = 1.2;

}





function draw() {

  
  Engine.update(engine)

  background("lightblue");

  
  imageMode(CENTER)
  image(bg, 0, 1000, displayWidth * 6, displayHeight * 3);




  diver.collide(i1);
  diver.collide(i2);
  diver.collide(i3);
 


if(gameState === 0 )
{
  if(turtleCame===true)
  {
      num++
  }
  turtleConversation();
  
}    
  
if(gameState === 1)
{
  turtleControl = true;
  spawnPlastic();
  spawnTires();
  spawnPlasticBottles();
  spawnChemical();

}





    diverControl();

   

    Health()
    drawSprites();

  }





function spawnPlastic()
{
    if(frameCount% 10===0 )
    {

          var plastic = createSprite(random(-3107, displayWidth*6),-500, 60, 60);
          plasticG.add(plastic)
          plastic.addImage(plasticImage);
          plastic.scale= 0.5
          plastic.velocityY =6
          for(var i=0; i < plasticG.length; i++){
            plasticG.get(i).collide(i3)
            if(plasticG.get(i).isTouching(diver)){
              w = w + 10
                plasticG.get(i).destroy();
            }

        }
    }
}

function spawnTires()
{
    if(frameCount% 10===0 )
    {

          var tyres = createSprite(random(-3107, displayWidth*6),-500, 60, 60);
          tiresG.add(tyres)
          tyres.addImage(tyresImage);
          tyres.velocityY =6
          for(var i=0; i < tiresG.length; i++){
            tiresG.get(i).collide(i3)
            if(tiresG.get(i).isTouching(diver)){
              w = w + 10
                tiresG.get(i).destroy();
            }

        }
    }
}




function spawnPlasticBottles()
{
  if(frameCount% 20 ===0 )
  {
  var  plasticBottles = createSprite(random(-3107,displayWidth*5), -500, 20, 20);
    plasticBottles.addImage(plasticBottleImage);
    plasticBG.add(plasticBottles);

plasticBottles.velocityY=6

        for(var i=0; i <  plasticBG.length; i++){
          plasticBG.get(i).collide(i3)
          if(plasticBG.get(i).isTouching(diver)){

            plasticBG.get(i).destroy();
            w = w + 20

          }

      }
  }
}
function spawnChemical()
{
  if(frameCount% 400 ===0 )
  {

   var chemicalWaste = createSprite(random(-3107,displayWidth*5),-500, 20, 20);

   chemicalWaste.velocityY =6
   chemicalWaste.addImage(chemicalWasteI);
    chemicalG.add(chemicalWaste);
;
        for(var i=0; i <  chemicalG.length; i++){

          chemicalG.get(i).collide(i3)
          if( chemicalG.get(i).isTouching(diver)){

            if(CS === false)
            {
              buzzer.play();

              alert("you need a suit , go search");
              diver.addImage(diverHurt);
              CS = true;
            }
            w = w +100

            chemicalG.get(i).destroy();
          }

      }
  }
}




function Health()

{
  textSize (50);
  fill(0)
  text("Health Of The Sea : ",camera.position.x+1000,100)


if(gameState !== 0)
{
  if(frameCount % 200 ===0)
  w = w -100
}

  if(w>0)
  {   
    fill(255,0,0)
    rect(camera.position.x+ 1000,100,w-0.5,20)
  } 
  else
  { 
     fill(255,0,0)
    rect(camera.position.x+1000,100,0.5,20)
 
  }
}



function turtleConversation()
{
  if (distance >= 500 && turtleCame===false ) {
    turtle = createSprite(diver.x + 1500, diver.y, 60, 60);
    turtle.addImage(turtleI);
    turtle.scale = 3;
    turtleCame=true
  }


 if(turtleCame===true)
 {
diver.addImage(diverImage);
diver.scale = 1
  turtleControl = false;
  fill(255,0,0)
  textSize(55)


  if(num >= 50){

  text("HEY WISE TURTLE , WHERE ARE MY FISH",diver.x , diver.y - 250)
  }

  if(num >= 150)
  {
    text("WE HAVE LEFT THIS SEA BECAUSE",turtle.x,turtle.y - 200)
  }
  if(num >= 200)
  {
  text("YOU HUMANS HAVE DESTROYED OUR HOME",turtle.x ,turtle.y -150 )
  }
  if(num >= 300)
  {
  text ("DON'T WORRY TURTLE I WILL SAVE THE OCEAN",diver.x,diver.y -150  );
  }
  if(num >= 350)
  {
gameState = 1;
turtle.destroy();
  } 
}
 }




function diverControl()
{
  
  
  diver.velocityX = 0;
  diver.velocityY = 0;


  if (diver.x < 1200 && diver.x > 250) {
    camera.position.x = diver.x;

  }

  if (keyDown("RIGHT_ARROW") && turtleControl === true ) {
    diver.addImage(diverImage);
    diver.scale = 1;
    diver.velocityX = 10;
    distance++
    diver.setCollider("rectangle",200,0,80,200)
  }
  if (keyDown("LEFT_ARROW") && turtleControl === true) {
    diver.addImage(diverImage2);
    diver.scale = 1.2;

    diver.velocityX = -10;
    distance++
    diver.setCollider("rectangle",-200,0,80,200)
  }
  if (keyDown("DOWN_ARROW")&& turtleControl === true) {


    diver.velocityY = 10;
    distance++
  }
  if (keyDown("UP_ARROW")&& turtleControl === true) {


    diver.velocityY = -10;
    distance++
  }

}


