import "./styles.css";
import "./Timer.js";

/*document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use the same configuration as Parcel to bundle this sandbox, you can find more
  info about Parcel 
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;*/

var array = [];
var player = "X";
const SizeofBoard = 5;
const otherplayersTurn = 10;
var proxytime = otherplayersTurn;
var canStop = false;
var intervalStopvalue;

function addItemToArray(id, symbol) {
  if (symbol === "O") {
    document.getElementById(id).style.backgroundColor = "rgb(250, 128, 114)";
  } else if (symbol === "X") {
    document.getElementById(id).style.backgroundColor = "rgb(124, 252, 0)";
  }
  var splits = id.split("-");
  array[splits[0] - 1][splits[1] - 1] = symbol;
}

function addListener(element) {
  const button = element;
  console.log("button done");
  button.addEventListener("mousedown", (event) => {
    buttonActivites(element.id);
    event.stopPropagation();
  });
}
function buttonActivites(id) {
  if (
    document.getElementById(id).innerHTML !== "X" &&
    document.getElementById(id).innerHTML !== "O"
  ) {
    document.getElementById(id).innerHTML = player;
    //document.getElementById(id).color = "rgb(124, 252, 0)";
    addItemToArray(id, player);
    changeplayer();
  }

  if (checkWinner(array) === 1) {
    //window.setTimeout(clearBoard, 2000);
  }
}

//creates a timer and a bar for it to use
function createTimer() {
  var body = document.getElementById("container");

  var timerEle = document.createElement("div");
  timerEle.setAttribute("id", "timer");
  timerEle.setAttribute("class", "col s12 pull-s7");
  timerEle.style.width = "40%";
  //timerEle.className = "col s1";
  timerEle.style.border = "solid 1px black";
  body.appendChild(timerEle);
  let progressbarShell = document.createElement("div");
  let progressbar = document.createElement("div");
  progressbarShell.setAttribute("class", "progress");
  progressbar.setAttribute("class", "determinate");
  progressbar.style = "width: 70%";

  progressbar.setAttribute("id", "progressbar");
  // progressbarShell.className = "w3-border";
  // progressbarShell.style.width = "40%";
  // progressbarShell.setAttribute("id", "progresshell");
  // progressbar.className = "w3-gray";
  // progressbar.style.height = "24px";
  // progressbar.style.width = 0;

  progressbarShell.appendChild(progressbar);
  body.appendChild(progressbarShell);
}

function changeTimer() {
  document.getElementById("timer").innerHTML = proxytime;
  const procentage =
    (100 - (100 * proxytime) / otherplayersTurn).toString() + "%";
  //console.log(procentage);
  document.getElementById("progressbar").style.width = procentage;
}

function timerStart() {
  createTimer();
  //var time = new Date().getTime();
  proxytime = otherplayersTurn;
  changeTimer(proxytime);
  canStop = false;
  intervalStopvalue = setInterval(function () {
    changeTimer(proxytime);
    proxytime -= 1;

    if (proxytime === -1) {
      changeplayer();
    }
  }, 1000);
}

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  renderTablet();
  ChangePlayerButton();
  makeArray();

  timerStart();
}

function makeArray() {
  array = [];
  for (var i = 0; i < SizeofBoard; i++) {
    var subarray = ["", "", "", "", ""];
    array.push(subarray);
  }
}

function clearBoard() {
  clearInterval(intervalStopvalue);
  var button = document.getElementById("clearButton");
  var button2 = document.getElementById("CP");

  initializeCode();
  document.getElementById("board").remove();
  button2.remove();
  button.remove();
  document.getElementById("progressbar").remove();
  document.getElementById("progresshell").remove();
  document.getElementById("timer").remove();
}

function renderTablet() {
  let tablehead = document.createElement("div");
  const width = SizeofBoard * 60,
    height = SizeofBoard * 60;
  //tablehead.setAttribute("style", "width:400px;height:400px");
  tablehead.setAttribute("width", width);
  tablehead.setAttribute("height", height);
  tablehead.setAttribute("id", "board");
  tablehead.style.tableLayout = "fixed";

  //rows.style.width=20;
  for (var i = 1; i < SizeofBoard + 1; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (var j = 1; j < SizeofBoard + 1; j++) {
      let element = document.createElement("div");
      element.className = "col s2";

      element.setAttribute("id", i.toString() + "-" + j.toString());
      //console.log(i.toString() + j.toString());
      addListener(element);
      row.appendChild(element);
    }

    tablehead.appendChild(row);
  }

  let mainelement = document.getElementById("container");
  mainelement.appendChild(tablehead);
  clearButton();
}

function clearButton() {
  let button = document.createElement("button");
  button.textContent = "clear board";
  button.setAttribute("id", "clearButton");
  button.addEventListener("mousedown", (event) => {
    clearBoard();
    event.stopPropagation();
  });
  let mainelement = document.getElementById("container");
  mainelement.appendChild(button);
}

function changeplayer() {
  if (player === "X") {
    player = "O";
  } else {
    player = "X";
  }
  proxytime = otherplayersTurn;
}

function ChangePlayerButton() {
  let button = document.createElement("button");
  button.textContent = "changeplayer";
  button.setAttribute("id", "CP");
  button.addEventListener("mousedown", (event) => {
    changeplayer();
    event.stopPropagation();
  });
  let mainelement = document.getElementById("container");
  mainelement.appendChild(button);
}

function checkReverseDiagonal() {
  var intx = 0;
  for (var i = 0; i < SizeofBoard; i++) {
    if (array[i][SizeofBoard - i - 1] === "X") {
      //console.log(i + " " + (SizeofBoard - i - 1) + " is X");
      intx++;
    } else if (array[i][SizeofBoard - i - 1] === "O") {
      //console.log(i + " " + (SizeofBoard - i - 1) + " is O");
      intx--;
    }
  }
  if (intx === SizeofBoard) {
    alert("X wins");
    return 1;
  } else if (intx === -SizeofBoard) {
    alert("O wins");
    return 1;
  }
  return 0;
}

function checkWinner(array2d) {
  var proxyArray;
  var int, proxyvalue;
  var array = [0, 0, 0, 0, 0, 0, 0];
  for (var i = 0; i < array2d.length; i++) {
    int = 0;
    proxyArray = array2d[i];
    for (var j = 0; j < proxyArray.length; j++) {
      if (proxyArray[j] === "X") {
        int++;
        proxyvalue = 1;
      } else if (proxyArray[j] === "O") {
        int--;
        proxyvalue = -1;
      } else {
        proxyvalue = 0;
      }
      array[j] += proxyvalue;
      if (j === i) {
        array[SizeofBoard] += proxyvalue;
      }
      if (array[j] === SizeofBoard || array[j] === -SizeofBoard) {
        int = array[j];
      }
      if (
        array[SizeofBoard] === SizeofBoard ||
        array[SizeofBoard] === -SizeofBoard
      ) {
        int = array[SizeofBoard];
      }
    }
    if (int === SizeofBoard) {
      alert("Player 1 won!");
      return 1;
    } else if (int === -SizeofBoard) {
      alert("Player 2 won!");
      return 1;
    }
  }
  if (checkReverseDiagonal() === 1) {
    return 1;
  }
  return 0;
}
