

document.addEventListener("mousedown", function(e) {
	var isRightMB;
    e = e || window.event;
    isRightMB = e.which == 3;
    if(isRightMB) {
    	createCanvasOverlay('rgba(255,255,0,0.5)');
    	  var context=myCanvas.getContext('2d');
		  context.beginPath();
		  context.strokeStyle='rgb(0,255,0)';  // a green line
		  context.lineWidth=4;                       // 4 pixels thickness
		  context.moveTo(50,50);
		  context.lineTo(150,150);
		  context.stroke();
		    document.getElementById("myCanvas").parentNode.addEventListener(
     'mousemove', onMouseMoveOnMyCanvas, false);
    	e.preventDefault();
    }
		
});

document.addEventListener("mouseup", function(e) {
	hideCanvas();
});

var myCanvas;

  function onMouseMoveOnMyCanvas(event)
  {
    var mouseX=event.layerX;
    var mouseY=event.layerY;
    //alert("onMouseMove mouseX="+mouseX);
    var context = myCanvas.getContext("2d");
    if (myCanvas.pathBegun==null)
    {
      context.beginPath();
      myCanvas.pathBegun=true;
    }
    else
    {
      context.lineTo(mouseX, mouseY);
      context.stroke();
    }
  }

 function createCanvasOverlay(color, canvasContainer)
 {
    if (!myCanvas)
    {
      if (!canvasContainer)
      {
        canvasContainer = document.createElement('div'); 
        document.body.appendChild(canvasContainer);
        canvasContainer.style.position="absolute";
        canvasContainer.style.left="0px";
        canvasContainer.style.top="0px";
        canvasContainer.style.width="100%";
        canvasContainer.style.height="100%";
        canvasContainer.style.zIndex="1000";
        superContainer=document.body;
      }
      else
        superContainer=canvasContainer;
      
      // Part of block below is inspired by code from Google excanvas.js
      {
      myCanvas = document.createElement('canvas');    
      myCanvas.style.width = superContainer.scrollWidth+"px";
      myCanvas.style.height = superContainer.scrollHeight+"px";
      // You must set this otherwise the canvas will be streethed to fit the container
      myCanvas.width=superContainer.scrollWidth;
      myCanvas.height=superContainer.scrollHeight;    
      //surfaceElement.style.width=window.innerWidth; 
      myCanvas.style.overflow = 'visible';
      myCanvas.style.position = 'absolute';
      }
      
      var context=myCanvas.getContext('2d');
      context.fillStyle = color;
      context.fillRect(0,0, myCanvas.width, myCanvas.height);
      canvasContainer.appendChild(myCanvas);
  

      //alert(myCanvas);
    }
    else
      myCanvas.parentNode.style.visibility='visible';
 }
 
 function hideCanvas()
 {
    if (myCanvas)
    {
      //myCanvas.style.visibility='hidden';
      myCanvas.parentNode.style.visibility='hidden';
    }
 }
 