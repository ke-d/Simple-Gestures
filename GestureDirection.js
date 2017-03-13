
window.addEventListener("mousedown", function(e) {

  if (!e) var e = window.event;
  if (e.which) rightclick = (e.which == 3);
  else if (e.button) rightclick = (e.button == 2);
  //console.log(rightclick);
  if(rightclick) {
    window.addEventListener("contextmenu", stopContextMenu);
    changedDirectionX = e.pageX;
    changedDirectionY = e.pageY;
    url = e.target.href;
    window.addEventListener("mousemove", getMouseDirection, false);
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
  txt.style.display = "none";
  direction = "";
  currentDirection = "";
  url = "";
});
var url = "";
var rightclick;
var direction = "";
var currentDirection = "";

var txt = document.createElement("div");
//window.appendChild(txt);
txt.style.position = "absolute";
txt.style.display = "none";

var oldX = 0;
var oldY = 0;

var changedDirectionX = 0;
var changedDirectionY = 0;
var range = 100;

function stopContextMenu(e) {
  e.preventDefault();
  return false;
}
function changedDirection(e) {
  changedDirectionX = e.pageX;
  changedDirectionY = e.pageY;
  direction += currentDirection;
  txt.innerHTML = direction + " ";
  txt.style.display = "";
}

function getMouseDirection(e) {
  txt.style.left = (e.pageX + 15) + "px";
  txt.style.top = (e.pageY - 10) + "px";

  if (oldX < e.pageX && (changedDirectionX + 2 < e.pageX && direction === "" || changedDirectionX + range < e.pageX || currentDirection === "L") && currentDirection !== "R") {
      currentDirection = "R";
      changedDirection(e);
  } else if(oldX > e.pageX && (changedDirectionX - 2 > e.pageX && direction === "" || changedDirectionX - range > e.pageX || currentDirection === "R") && currentDirection !== "L") {
      currentDirection = "L";
      changedDirection(e);
  } else if (oldY < e.pageY && (changedDirectionY + 2 < e.pageY && direction === "" || changedDirectionY + range < e.pageY || currentDirection === "U") && currentDirection !== "D") {
      currentDirection = "D";
      changedDirection(e);
  } else if (oldY > e.pageY && (changedDirectionY - 2 > e.pageY && direction === "" || changedDirectionY - range > e.pageY || currentDirection === "D") && currentDirection !== "U"){
      currentDirection = "U";
      changedDirection(e);
  }

  oldX = e.pageX;
  oldY = e.pageY;

}

