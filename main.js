var canvas = document.getElementById('can');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas);

listenToMouse(canvas);
 
/*********/
var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
  actions.className = 'actions x'

}
brush.onclick = function(){
   eraserEnabled = false
   actions.className = 'actions'
}

/*******/
function autoSetCanvasSize(canvas){
setCanvasSize()

window.onresize = function(){
setCanvasSize()
}

function setCanvasSize(){
var pageWidth = document.documentElement.clientWidth
var pageHeight = document.documentElement.clientHeight

canvas.width = pageWidth
canvas.height = pageHeight
 }
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.fillStyle = 'black'
  context.moveTo(x1,y1)
  context.lineWidth = 5
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
}

function listenToMouse(canvas){
 

var using = false;
var lastPoint = {
  x:undefined,
  y:undefined
}
canvas.onmousedown = function(a){
  var x = a.clientX
  var y = a.clientY
  using = true
  if(eraserEnabled){
    context.clearRect(x-5,y-5,20,20)
  }else{   
    lastPoint = {
      x: x, 
      y: y
    }
  }

  canvas.onmousemove = function(a){
  var x = a.clientX
  var y = a.clientY
  if(!using){ return }
  if(eraserEnabled){
     context.clearRect(x-5,y-5,20,20)  
  }else{
    var newPoint  = {
      x: x,
      y: y
    }
  drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
  lastPoint = newPoint
 }
}

canvas.onmouseup = function(a){
  using = false
    }
  }
}
