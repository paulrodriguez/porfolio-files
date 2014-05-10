//grid for the entire box. 1 if its occupied, 0 otherwise.
var cgrid = document.getElementById("mycanvas");
var startText = document.getElementById("start-game");
var pts = document.getElementById("points");
cgrid.width = canvas.width;
cgrid.height = canvas.height;

var ctx=cgrid.getContext("2d");

var grid = new Array(20);

for(var k = 0; k < grid.length;k++) {
	grid[k] = new Array(10);
	//for (var w = 0; w < grid[k].length;w++) {
		//grid[k][w] = {bid:0,color:"white"};
	//}
}

var currcol = 3;
var currrow = 0;

var totPoints = 0;
//stores position of the shapes based on a 4X4 grid
var i= [[1,5,9,13], [4,5,6,7], [2,6,10,14], [8,9,10,11],"cyan"];
var j= [[1,5,8,9], [0,4,5,6], [1,2,5,9],[4,5,6,10],"blue"];
var l = [[1,5,9,10], [4,5,6,8], [0,1,5,9],[2,4,5,6],"orange"];
//var o = [[0,1,4,5],[0,1,4,5],[0,1,4,5],[0,1,4,5],"yellow"];
var o = [[0,1,4,5], "yellow"];
var s = [[5,6,8,9], [0,4,5,9], [1,2,4,5],[1,5,6,10],"green"];
var t = [[4,5,6,9],[1,4,5,9],[1,4,5,6],[1,5,6,9],"purple"];
var z = [[4,5,9,10], [1,4,5,8], [0,1,5,6],[2,5,6,9],"red"]; 
//var u = [[0,1,2,4,6,8,10,12,14],[0,1,2,3,7,8,9,10,11],[0,2,4,6,8,10,12,13,14],[0,1,2,3,4,8,9,10,11],"gold"];
var u = [[0,1,2,4,6,8,9,10], "gold"];
var c = [[0,1,4,8,9],[0,2,4,5,6],[0,1,5,8,9],[0,1,2,4,6],"brown"];
var diag = [[0,5,10,15], [3,6,9,12], "green"];
var lf = [[0,1,4,8,9,12], [0,1,2,3,5,7],[1,4,5,9,12,13], [0,2,4,5,6,7], "lime"];
var cross = [[1,4,5,6,9], "DimGray"];

var rot = 0;
var currShape = null;


var tGame = null;
var gameon = false;
var FPIECES = [i,i,i,i,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z,j,c,c,c, diag,diag, cross, cross];
var pieces= FPIECES.slice(0);
document.body.onload = function() {
	currShape = randomShape();//pieces[Math.floor(Math.random()*pieces.length)];
	//console.log(currShape);
}

document.body.onkeydown = function (event) {
	switch (event.keyCode)
	{
		//move to the left
		case 37:
			if(!gameon) break;
			if(checkLeftBoundary(currShape[rot])) {
				currcol -= 1;
				draw(currShape);
			}
			
			
			break;
		//up key
		case 38:
			//if game is paused or game ended, do not allot any movement and exit
			if(!gameon) break;
			if(allowRotation(currShape)) {
				rot+=1;
				if(rot==currShape.length-1) rot = 0;
				draw(currShape);
			}

			break;
		//move to the right
		case 39:
			//if game is paused or game ended, do not allot any movement and exit
			if(!gameon) break;
			if(checkRightBoundary(currShape[rot])) {
				currcol += 1;
				draw(currShape);
			}
			
			break;
		//down key
		case 40:
			//if game is paused or game ended, do not allot any movement and exit
			if(!gameon) break;
			if(haveLanded(currShape[rot])) {
				setBlocks(currShape[rot],currShape[currShape.length-1]);
				currShape = randomShape();
				madeRow();
				rot = 0;
				currrow=0;
				currcol=3;
				if(reachTop(currShape[rot])) {
					//console.log("game over");
					clearInterval(tGame);
					gameon = false;
					startText.innerHTML = "<p>GAME OVER</p><p>press SPACE to restart</p>";
				}
				//console.log("arrived at bottom");
			}
			else {
				currrow+=1;
				if(haveLanded(currShape[rot])) {
				setBlocks(currShape[rot],currShape[currShape.length-1]);
				currShape = randomShape();
				madeRow();
				rot = 0;
				currrow=0;
				currcol=3;
				if(reachTop(currShape[rot])) {
					//console.log("game over");
					clearInterval(tGame);
					gameon = false;
					startText.innerHTML = "<p>GAME OVER</p><p>press SPACE to restart</p>";
				
				}
				//console.log("arrived at bottom");
			}
				//draw(currShape);
			}
			draw(currShape);
			//drawShape(currShape[rot],currShape);
			break;
		case 32:
			if(!gameon) {
				
				currShape = randomShape();
				pieces = FPIECES.slice(0);//[i,i,i,i,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z,j,u,u,u,u,u,u];
				totPoints = 0;
				pts.innerHTML = "Points: "+totPoints;
				rot = 0;
				currrow=-1;
				currcol=3;
				for(var k = 0; k < grid.length;k++) {
					for (var w = 0; w < grid[k].length;w++) {
						grid[k][w] = {bid:0,color:"white"};
					}
				}
				startText.innerHTML = "";
				tGame = setInterval("run()",900);
				gameon = true;
			}
			/*else {
				clearInterval(tGame);
				gameon = false;
			}*/
			break;
		case 88:
			if(!gameon) {
				tGame = setInterval("run()", 900);
				gameon = true;
				break;
			}
			else {
				clearInterval(tGame);
				gameon = false;
				tGame = 0;
				break;
			}
			break;
			
	}
}
function reachTop(shape) {
	//console.log("inside reachTop : "+currrow);
	for(var k = 0; k < shape.length; k++) {
		var colnum = currcol+parseInt(shape[k]%4);
		var rownum = currrow+parseInt(shape[k]/4);
		//console.log("grid number: "+grid[rownum][colnum].bid + " , iteration: "+k);
		if(grid[rownum][colnum].bid == 1) {
			//console.log("made it to the top");
			return true;
		}
	}
	//console.log("inside reachTop : "+currrow);
	return false;
}

//to check if we have a full row occupied
function madeRow() {
	//count how many blocks in a row are occupied
	var counter = 0;
	//for each row
	for (var k = 0; k  < grid.length; k++) {
		//for each column in each row
		for (var w = 0; w < grid[k].length; w++) {
			//if its unoccupied then move on to next row, else increase counter
			if(grid[k][w].bid == 0) {
				w = grid[k].length;
			}
			else {
				counter++;
			}
			//if all blocks in the row are occupied
			if(counter == 10 && k >0) {
				totPoints += 20;
				pts.innerHTML = "Points: "+totPoints;
				//move all blocks down by one and erase the occupied row
				for (var w = 0; w < grid[k].length; w++) {
					for(var f = k-1; f >0;f--) {
						grid[f+1][w].bid = grid[f][w].bid;
						grid[f+1][w].color=grid[f][w].color;
					}
					/*grid[k][w].bid = grid[k-1][w].bid;
					grid[k][w].color=grid[k-1][w].color;
					var x = w*blocksize;
					var y = k*blocksize;*/
					//ctx.strokeStyle="white";
					//ctx.strokeRect(x,y,blocksize,blocksize);
				}
			}
			
		}
		counter = 0;
	}
}
//get a random shape 
function randomShape() {
	if (pieces.length == 0) {
		pieces = FPIECES.slice(0);//[i,i,i,i,j,j,l,l,l,l,o,o,o,o,s,s,s,s,t,t,t,t,z,z,z,z,j,u,u,u,u,u,u];
	}
	var index = Math.floor(Math.random()*pieces.length);
  var rshape = pieces[index];
  pieces.splice(index, 1);
  //console.log(rshape);
  //console.log("pieces size:"+pieces.length);
  return rshape;
}

/**
draws one of the shapes
@shape: takes in a shape with rotation already specified
@color: takes in the color of the shape
**/
function drawShape(shape,color) {

	//for each block composing the tetromino
	for (var i=0; i < shape.length;i++) {
		//get coordinates of a block in tetromino based on a 4X4 grid
		var colnum = parseInt(shape[i]%4);
		var rownum = parseInt(shape[i]/4);
		var y = (currrow+rownum)*blocksize;
		var x = (currcol+colnum)*blocksize;
		
		ctx.fillStyle=color;//[4];
		
		ctx.fillRect(x,y,blocksize,blocksize);
		ctx.strokeStyle="#000000";
		ctx.strokeRect(x,y,blocksize,blocksize);
		
	}
}

//whenever a block has landed set the block positions to be occupied
function setBlocks(shape,color) {
	for (var k=0; k < shape.length;k++) {
		//convert array number of shape into 2d index in grid space
		var colnum = currcol+parseInt(shape[k]%4);
		var rownum = currrow+parseInt(shape[k]/4);
		//console.log("colnum:"+colnum+", rownum: "+rownum);
		grid[rownum][colnum].bid = 1;
		grid[rownum][colnum].color = color;
	}
}

function draw(shape){

ctx.save();
ctx.clearRect(0,0,200,400);

drawShape(shape[rot],shape[shape.length-1]);
drawBlocks();
//ctx.fillStyle = "red";
//ctx.fillRect(0,0,blocksize,blocksize);
ctx.restore();
}

//draws blocks that have already landed
function drawBlocks() {
	//for each row
	for(var k = 0; k < grid.length;k++) {
		//for each square in each row
		for(var w=0; w < grid[k].length;w++) {
			if(grid[k][w].bid==1) {
				ctx.fillStyle=grid[k][w].color;
				var x = w*blocksize;
				var y = k*blocksize;
				ctx.fillRect(x,y,blocksize,blocksize);
				ctx.strokeStyle="#000000";
				ctx.strokeRect(x,y,blocksize,blocksize);
			}
			
		}
	}
}

/**
checks if the tetromino can rotate
@shape: takes in the tetromino array
**/
function allowRotation(shape){
	var temprot = rot+1;
	if (temprot==shape.length-1) temprot = 0;
	var tempshape = shape[temprot];
	for (var k = 0; k < tempshape.length;k++) {
		var colnum = currcol+parseInt(tempshape[k]%4);
		var rownum = currrow+parseInt(tempshape[k]/4);
		//console.log("colnum:"+colnum+", rownum: "+rownum);
		if(colnum<=9 && colnum>=0 && rownum<=19 && rownum>=0) {
			if(grid[rownum][colnum].bid==1)
				return false;
		}
		else
			return false;
	}
	
	return true;
}

/***
checks if we can move to the left
@shape: takes in tetromino with specified rotation
**/
function checkLeftBoundary(shape) {
	for (var k=0; k < shape.length;k++) {
		//convert array number of shape into 2d index in grid space
		var colnum = currcol+parseInt(shape[k]%4);
		var rownum = currrow+parseInt(shape[k]/4);
		//console.log("colnum:"+colnum+", rownum: "+rownum);
		if(colnum-1 >= 0) {
			if(grid[rownum][colnum-1].bid==1)
				return false;
		}
		else if(colnum-1<0) return false;
	}
	return true;
}

/***
checks if we can move to the right
@shape: takes in tetromino with specified rotation
**/
function checkRightBoundary(shape) {
		for (var k=0; k < shape.length;k++) {
		//convert array number of shape into 2d index in grid space
		var colnum = currcol+parseInt(shape[k]%4);
		var rownum = currrow+parseInt(shape[k]/4);
		//console.log("colnum:"+colnum+", rownum: "+rownum);
		if(colnum+1 <= 9) {
			if(grid[rownum][colnum+1].bid==1)
				return false;
		}
		else if(colnum+1>=10) return false;
	}
	return true;
}
//to check if we have already collided with bottom shape
function haveLanded(shape){
	for(var k=0;k<shape.length;k++) {
		var colnum = currcol+parseInt(shape[k]%4);
		var rownum = currrow+parseInt(shape[k]/4);
		//console.log("colnum:"+colnum+", rownum: "+rownum);
		//console.log("grid ["+rownum+1+","+colnum+"] value: "+grid[rownum+1][colnum].bid);
		if(rownum<19 && rownum>0) {
			if(grid[rownum+1][colnum].bid==1)
				return true;
		}
		//reached the bottom boundary
		else if(rownum==19)
			return true;
	}
	
	return false;
}

function run() {
		
		if(haveLanded(currShape[rot])) {
			
			setBlocks(currShape[rot],currShape[currShape.length-1]);
			madeRow();
			currShape = randomShape();//shapes[Math.floor(Math.random()*shapes.length)];
			rot = 0;
			currrow=0;
			currcol=3;
			if(reachTop(currShape[rot])) {
				console.log("game over");
				clearInterval(tGame);
				gameon = false;
				startText.innerHTML = "<p>GAME OVER</p><p>press SPACE to restart</p>";
				
			}
		}
		else {
			currrow += 1;
		}
	draw(currShape);
	
}
