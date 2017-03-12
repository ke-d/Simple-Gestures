
window.addEventListener("mousedown", function(e) {

  if (!e) var e = window.event;
  if (e.which) rightclick = (e.which == 3);
  else if (e.button) rightclick = (e.button == 2);
  //console.log(rightclick);
  if(rightclick) {
    window.addEventListener("contextmenu", stopContextMenu);
    changedDirectionX = e.pageX;
    changedDirectionY = e.pageY;
    window.addEventListener("mousemove", getMouseDirection, false);
  }
});
window.addEventListener("mouseup", function(e) {
if(rightclick) {
  if(direction === "") {
    window.removeEventListener("contextmenu", stopContextMenu);
  }
  window.removeEventListener("mousemove", getMouseDirection, false);
  console.log(direction);

  direction = "";
  currentDirection = "";
  
}

});
var rightclick;
var direction = "";
var currentDirection = "";
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

}

function getMouseDirection(e) {
  if (oldX < e.pageX && (changedDirectionX + range < e.pageX || currentDirection === "L" && changedDirectionX + range/5 < e.pageX) && currentDirection !== "R") {
    currentDirection = "R";
    changedDirection(e);
  } else if(oldX > e.pageX && (changedDirectionX - range > e.pageX || currentDirection === "R" && changedDirectionX - range/5 > e.pageX) && currentDirection !== "L") {
    currentDirection = "L";
    changedDirection(e);
  } else if (oldY < e.pageY && (changedDirectionY + range < e.pageY || currentDirection === "U" && changedDirectionY + range/5 < e.pageY) && currentDirection !== "D") {
    currentDirection = "D";
    changedDirection(e);
  } else if (oldY > e.pageY && (changedDirectionY - range > e.pageY || currentDirection === "D" && changedDirectionY - range/5 > e.pageY) && currentDirection !== "U"){
    currentDirection = "U";
    changedDirection(e);
  }

  oldX = e.pageX;
  oldY = e.pageY;
//document.body.innerHTML = direction + " oldX: " + oldX + " pageX: " + e.pageX + " oldY: " + oldY + " pageY " + e.pageY;
//document.body.innerHTML = direction;

}

