let playerCount = 0;
let players = [];
let rounds = {
"rounds":[
  {"name": "3+3", "rules":"3 like + 3 like"},
  {"name": "3+4", "rules":"3 like + 1 serie"},
  {"name": "4+4", "rules":"2 serier"},
  {"name": "3+3+3", "rules":"3 like + 3 like + 3 like"},
  {"name": "3+3+4", "rules":"3 like + 3 like + 1 serie"},
  {"name": "3+4+4", "rules":"3 like + 2 serier"},
  {"name": "4+4+4", "rules":"3 serier"},
  {"name": "3+3+3+3", "rules":"3 like 4 ganger"},
]
}
let roundCount = 0;

function Player(id, name){
  this.id = id;
  this.name = name;
  this.score = 0;
  this.rounds = []
  this.getScore = function (){
    return this.score;
  }
  this.setRoundScore = function(score){
    this.rounds.push(score);
  }

}

function startGame(){
  let input = document.getElementById("playerInputCount").value
  //Check input for number
    playerCount = input;
    createNameInputFields(input);

}

function createNameInputFields(count){
let node = document.getElementById("nameInputs")
  for(let i = 0; i<count;i++){
    let inp = document.createElement('input')
    inp.className = "nameInputField"
    inp.placeholder = "Navn"
    inp.id = "nameField"
    inp.dataset.playerid = i
    node.appendChild(inp)
  }
  let submitNamesButton = document.createElement('input')
  submitNamesButton.onclick = function(){
    let names = document.getElementsByClassName("nameInputField")
    for(let i = 0; i<playerCount;i++){
    let player = new Player(names[i].dataset.playerid, names[i].value)
    players.push(player)
    }
    hideCreationPart()
    startNextRound()
  }
  submitNamesButton.type = "Submit"
  submitNamesButton.className = "submitNamesButton"
  submitNamesButton.value = "OK"
  node.appendChild(submitNamesButton)
}
function hideCreationPart(){
  document.getElementById('intro-body').style.display = 'none'
  document.getElementsByClassName('mainGame')[0].style.display = 'block'

}

function startNextRound(){
  let header = document.getElementById('roundHeader');
  let ruleText = document.getElementById('roundRules')
  header.innerText = rounds.rounds[roundCount].name
  ruleText.innerText = rounds.rounds[roundCount].rules
  if(roundCount === 0){
    firstRoundSetup()
    }

}
function firstRoundSetup(){
  let node = document.getElementById("scoreInputContainer")
  for(let i = 0; i<playerCount;i++){
    let container = document.createElement('div')
    container.className = "playerContainer"
    let inputfield = document.createElement('input')
    inputfield.dataset.playerid = i;
    inputfield.className = "roundScoreField"
    let labelForInput = document.createElement('Label')
    labelForInput.innerText = findPlayerName(i);
    labelForInput.className = "playerNameText"
    container.appendChild(labelForInput)
    container.appendChild(inputfield)
    node.appendChild(container)
  }

  let submitScoresButton = document.createElement('input')
  submitScoresButton.onclick = function(){
    let values = document.getElementsByClassName('roundScoreField')
      for(let i = 0; i<playerCount;i++){
        for(let j = 0; j<=playerCount;j++){
        if(values[j].dataset.playerid === players[i].id){
          players[i].setRoundScore(values[j].value - 0)
          players[i].score += values[j].value - 0;
        }
        }
      }
      if(roundCount+1 === rounds.rounds.length){
        printWinnerAndScoreboard()
      }else{
      printCurrentLeader()
      printScores()
      roundCount++;
      clearFields()
      startNextRound()
      }
    }
    submitScoresButton.type = "Submit"
    submitScoresButton.value = "Lagre poeng"
    submitScoresButton.className = "submitScoresButton"
    node.appendChild(submitScoresButton)

}
function findPlayerName(id){
  for(let i = 0; i<playerCount;i++){
    if(players[i].id == id){
      return players[i].name;
    }
  }
  return "Fant ikke spilleren"
}
function createScoreBoxes(){

}
function clearFields(){
  let els = document.getElementsByClassName("roundScoreField");
  for(let i = 0; i<els.length;i++){
    els[i].value = "";
  }
  els[0].focus()
}
function printScores(){
  if(roundCount == 0){
  let scoreContainer = document.getElementById("currentScoreContainer")
  for(let i = 0; i<playerCount;i++){
    let scoreText = document.createElement("p")
    scoreText.className = "scoreText"
    scoreText.innerText = players[i].name + " har " + players[i].score + " poeng."
    scoreContainer.appendChild(scoreText)
    }
  }
  let scoreTexts = document.getElementsByClassName('scoreText');
  for(let i = 0; i<playerCount;i++){
    scoreTexts[i].innerText = players[i].name + " har " + players[i].score + " poeng."
  }
}
function printCurrentLeader(){
  let header = document.getElementById('currentLeader')
  let runnerUp = document.getElementById('runnerUp')
  let leader = findLowestScorer()
  header.innerText = leader.name + " leder med sine " + leader.score + " poeng!"
}


function findLowestScorer(){
  let x = players;
  x.sort(function(a,b){
    return a.score - b.score;
  })
  return players[0];
}

function printWinnerAndScoreboard(){
let scoreboard = document.getElementById("scoreboard")
for(let i = 0;i<playerCount;i++){

  let nameNode = document.createElement("h4")
  nameNode.innerText = players[i].name
  scoreboard.appendChild(nameNode)
  for(let j = 0; j<players[i].rounds.length; j++){
    let el = document.createElement("h2")
    el.innerText = rounds.rounds[i].name
    let roundScoreText = players[i].rounds[j]
    let node = document.createElement("p")
    node.innerText = rounds.rounds[j].name + " -> " + roundScoreText
    scoreboard.appendChild(node)
  }
  }

}
