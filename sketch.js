//Create variables here
var Dog,HappyDog,SadDog ;
var database,foodS,foodStock;

function preload()
{
  //load images here
  HappyDog=loadImage("images/dogImg1.png");
  SadDog=loadImage("images/dogImg.png");
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  
  dog=createSprite(250,300,150,150);
  dog.addImage(SadDog);
  dog.scale=0.15;

  foodStock=database.ref('food');
  foodStock.on("value",readstock);
  textSize(20);
}


function draw() { 
  background(46,139,87); 
if (keyWentDown(UP_ARROW)){
  writestock(foodS);
  dog.addImage(HappyDog);
}
  drawSprites();
  //add styles here
fill(255,255,254);
stroke("black");
text("Food remaning: "+foodS,170,200);
textSize(13);
text("press up arrow key to feed Fred milk" ,130,10,300,20);
}
function readstock (data){
  foodS=data.val();
}
function writestock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
   food:x 
  })
}

