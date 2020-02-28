let score1 = document.getElementById('scorep1')

setUpListener("p1")
function setUpListener(id){
  const node = document.getElementById("input"+id)
  node.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
      node.blur()
      let extra = "a"
      updatescore(this.id, extra)
    }
});
}
function updatescore(id, extra){
  let playerId;
  if(extra !== undefined){
    playerId = id.substr(5)
  }else{
    playerId = id.substr(6)
  }
let scoreToBeAdded = document.getElementById("input"+playerId).value - 0
let currentScore = document.getElementById(playerId).innerText - 0
let totalscore = scoreToBeAdded + currentScore

if(totalscore !== null && !Number.isNaN(totalscore)&& totalscore !== undefined){
  document.getElementById(playerId).innerText = totalscore + ""
  appendScore(playerId, scoreToBeAdded)
}else{
  alert("Du har tastet inn et ugyldig tall")
  clearFieldAndFocusSame(playerId)
}
}
let previousNodeMap = new Map()
let currentRound = new Map()

function appendScore(playerId, score){

console.log("Player ID was: " + playerId)
let list = document.getElementById("score-list"+playerId)
let node = document.createElement("p")
node.className = "score-element "
incrementRound(playerId)
node.innerText =  "Runde " + currentRound.get(playerId) +": " +score
let previousNode;



if(previousNodeMap.get(playerId) == null || previousNodeMap.get(playerId) == undefined){
  previousNode = document.getElementById('before-for'+playerId)
}else{
 previousNode = previousNodeMap.get(playerId)
}

list.insertBefore(node,previousNode)
updatePreviousNode(playerId, node)
clearFieldAndFocusNext(playerId)
}
function clearFieldAndFocusSame(playerId){
  let field = document.getElementById('input'+playerId)
  field.value = ""
  field.focus()
  field.style.backgroundColor = "#ffc9c9"
}
function clearFieldAndFocusNext(playerId){
  let number = playerId.substr(1)-0

  let field = document.getElementById('inputp'+number)
  field.value = ""
  field.style.backgroundColor = "white"
  num = ++number
  let max =  howManyPlayers();
  if(num-1 === max){
    num = 1;
    console.log("max was reached")
  }
  document.getElementById('inputp'+num).focus()
}

function incrementRound(playerId){
  let round = currentRound.get(playerId)
  if(round == null){
    currentRound.set(playerId, 1)
  }else{
  round++;
  currentRound.set(playerId, round)
  }

}
function updatePreviousNode(playerId, node){
previousNodeMap.set(playerId, node)
}

/* Not in use */
function calculateTotal(playerId){

  let totalNode = document.getElementById(playerId+"total")

  let scoreTab = document.getElementsByClassName("score-element-" + playerId)
  let total = 0;
  for(let i = 0; i< scoreTab.length; i++){
    total += scoreTab[i].innerText -0
  }
  totalNode.innerText = total

}

function changeName(id){
let playerId = id.substr(4,5)
let newName = document.getElementById("input-name-"+playerId).value
document.getElementById('header'+playerId).innerText = newName
}
/* Used to check which ID next player should receive */
function howManyPlayers(){
  return document.getElementsByClassName('score-container').length
}


function addNewPlayer(){

  let number = howManyPlayers()+1
  console.log("new number is: " + number)

  let container = document.getElementById('duplicate-container')
  let newContainer = container.cloneNode(true)
  newContainer.className = "p"+number + " score-container"
  //newContainer.setAttribute('id', "p"+number)
  let mainContainer = document.getElementsByClassName('game-container')[0]
  updateIdOfChildElements(newContainer, number)
  mainContainer.appendChild(newContainer)
  let scoreList = document.getElementById("score-listp" + number)
  let before = document.createElement('div')
  before.id = "before-forp"+number
  scoreList.appendChild(before)
  setUpListener("p"+number)
}

function updateIdOfChildElements(mainNode, number){

  let list = mainNode.childNodes
  list[1].id = "input-name-p"+number;
  list[3].id = "namep"+number;
  list[5].id = "headerp"+number;
  list[5].innerText = "Spiller "+number;
  list[7].id = "p"+number;
  list[7].innerText = 0 + ""
  list[9].id = "inputp"+number;
  list[9].value = ""
  list[11].id = "submitp"+number;
  list[13].id = "score-listp"+number;
  list[13].textContent = "";
  //list[14].id = "p"+number+"heading";

}
