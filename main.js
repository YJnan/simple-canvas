var canvas = document.getElementById('can');
var context = canvas.getContext('2d');
var lineWidth = 5

autoSetCanvasSize(canvas);

listenToUser(canvas);

/*********/
var eraserEnabled = false;
pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function(){
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}
clear.onclick = function(){
    context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
    var url = canvas.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'painting'
    a.target = '_blank'
    a.click()
}

black.onclick = function(){
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function(){
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')

}
green.onclick = function(){
    context.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick = function(){
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}


thin.onclick = function(){
    lineWidth = 5
}
thick.onclick = function(){
    lineWidth = 10
}
/*******/
function autoSetCanvasSize(canvas){
    setCanvasSize();

    window.onresize = function(){
        setCanvasSize()
    };
    function setCanvasSize(){
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1,y1,x2,y2){
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineWidth = lineWidth;
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath()
}

function listenToUser(canvas) {

    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        canvas.ontouchstart = function(a){
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.ontouchmove = function(a) {
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function(a){
            using = false
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX;
            var y = a.clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }
            }
        }
        canvas.onmousemove = function (a) {
            var x = a.clientX;
            var y = a.clientY;
            if (!using) {
                return
            }
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 20, 20)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
                lastPoint = newPoint
            }
        }
        canvas.onmouseup = function (a) {
            using = false
        }

    }
}




