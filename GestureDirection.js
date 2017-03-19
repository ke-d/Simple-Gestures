
window.addEventListener("mousedown", function(e) {

  if (!e) var e = window.event;
  if (e.which) rightclick = (e.which == 3);
  else if (e.button) rightclick = (e.button == 2);
  //console.log(rightclick);
  if(rightclick) {
    direction = "";
    url = "";
    window.addEventListener("contextmenu", stopContextMenu);
    oldX = e.screenX;
    oldY = e.screenY;
    
    let node = e.target;
    console.log(e.nodeName);
    while(!node.hasAttribute("href")) {
      
      //console.log(node.nodeName);
      node = node.parentElement;
      if(node.nodeName === "BODY" || node.nodeName === "HTML") {
        break;
      }
    }
    url = node.href;
    window.addEventListener("mousemove", getMouseDirection, false);
    textChainNode.style.display = "";
  }
});

window.addEventListener("mouseup", function(e) {
if(rightclick) {
  
  window.removeEventListener("mousemove", getMouseDirection, false);
  if(direction === "") {
    window.removeEventListener("contextmenu", stopContextMenu);
  }
  if(direction !== "") {
    console.log(direction);
    console.log(url);
    browser.runtime.sendMessage({
      gesture: direction,
      targeturl: url
    });
  }
    
  }
  textChainNode.style.display = "none";
  
});
var url = "";
var rightclick;
var direction = "";

var textChainNode = document.createElement("span");
textChainNode.id = "directionChain";
//textChainNode.style.all = "initial";
textChainNode.style.position = "fixed";
textChainNode.style.bottom = "2px";
textChainNode.style.right = "5px";
textChainNode.style.font = "1rem arial,sans-serif"; 
document.body.appendChild(textChainNode);
textChainNode.style.display = "none";


var oldX = 0;
var oldY = 0;


function stopContextMenu(e) {
  e.preventDefault();
  return false;
}


function getMouseDirection(e) {

  var x = e.screenX;
  var y = e.screenY;
  var lastX = oldX;
  var lastY = oldY;
  var subX = x - lastX;
  var subY = y - lastY;
  var distX = (subX > 0 ? subX : (-subX));
  var distY= (subY > 0 ? subY : (-subY));
  var currentDirection;
  
  if(distX < 10 && distY < 10) {
    return;
  }
  if(distX > distY) {
    currentDirection = subX < 0 ? "L" : "R";
  } else {
    currentDirection = subY < 0 ? "U" : "D";
  }
  if(currentDirection !== direction.charAt(direction.length - 1)) {
    direction += currentDirection;
  }
  oldX = x;
  oldY = y;

  textChainNode.textContent = direction;
  //textChainNode.appendChild(document.createTextNode(direction));
}

