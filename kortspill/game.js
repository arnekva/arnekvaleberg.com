let playerCount = 0;
let players = [];
let rounds = {
"rounds":[
  {"name": "3+3", "rules":"3 like + 3 like", "antall":"6"},
  {"name": "3+4", "rules":"3 like + 1 serie","antall":"7"},
  {"name": "4+4", "rules":"2 serier","antall":"8"},
  {"name": "3+3+3", "rules":"3 like + 3 like + 3 like","antall":"9"},
  {"name": "3+3+4", "rules":"3 like + 3 like + 1 serie", "antall":"10"},
  {"name": "3+4+4", "rules":"3 like + 2 serier", "antall":"11"},
  {"name": "4+4+4", "rules":"3 serier","antall":"12"},
  {"name": "3+3+3+3", "rules":"3 like 4 ganger", "antall":"12"},
]
}
let roundCount = 0;
let hasJustRestored = false;
function checkForState(){
  let state = restoreState();
  if(state !== null){
    console.log("not null");
    hideCreationPart();
    firstRoundSetup();

    startNextRound();
  }
}
checkForState();

function saveState(){
  let state = {
    "players":players,
    "roundCount":roundCount,

  }
  let saved = JSON.stringify(state)
  localStorage.setItem('state', saved)
  console.log("Saved to storage");
}
function restoreState(){
  hasJustRestored = true;
  console.log("Attempting to retrieve state from storage");
  let state = JSON.parse(localStorage.getItem('state'))
  if(state !== null){
    playerCount = state.players.length
    console.log("Found previous state");
    console.log(state);
    for(let i = 0; i<state.playerCount;i++){
      let player = new Player(state.players[i].id, state.players[i].name)
      player.updateRounds(state.players[i].rounds)
    players[i] = state.players
    console.log();
    }
    players = state.players;
    roundCount = state.roundCount;
    hideSteps();
    printCurrentLeader()
    printScores();
    return state
  }
  return null
}
function nukeState(){
localStorage.clear();
location.reload()
}
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
  this.updateRounds = function(newRounds){
    this.rounds = newRounds;
  }

}
function hideSteps(){
  let btn = document.getElementById("startBtn")
  let inp = document.getElementById("playerInputCount")
  let text = document.getElementById("task")
  let gmh = document.getElementById("gameHeader")
  gmh.style.display = "none"
  text.innerText = "Skriv inn navnet på spillerene"
  inp.style.display = "none"
  btn.style.display = "none"
}
function startGame(){
  let input = document.getElementById("playerInputCount").value
  //Check input for number
    playerCount = input;
    createNameInputFields(input);

    hideSteps();
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
  let submitNamesButton = document.createElement('button')
  submitNamesButton.onclick = function(){
    let names = document.getElementsByClassName("nameInputField")
    for(let i = 0; i<playerCount;i++){
      let navn = names[i].value;
      if(navn.length > 12){
        navn = navn.substr(1,10) + "..."
      }
    let player = new Player(names[i].dataset.playerid, navn)
    players.push(player)
    }
    hideCreationPart()
    startNextRound()
  }
  submitNamesButton.className = "submitNamesButton"
  submitNamesButton.value = "OK"
  submitNamesButton.innerText = "OK"
  node.appendChild(submitNamesButton)
}
function hideCreationPart(){
  document.getElementById('intro-body').style.display = 'none'
  document.getElementsByClassName('mainGame')[0].style.display = 'block'

}

function startNextRound(){
  saveState();
  let header = document.getElementById('roundHeader');
  let cardCount = document.getElementById('antallKort');
  let roundCountText = document.getElementById('roundCount');
  let ruleText = document.getElementById('roundRules')
  header.innerText = rounds.rounds[roundCount].name
  ruleText.innerText = rounds.rounds[roundCount].rules
  cardCount.innerText = "Det skal deles " + rounds.rounds[roundCount].antall + " kort"
  let runde = roundCount - 0 +1
  roundCountText.innerText = "Runde " + runde + " av " + rounds.rounds.length
  if(roundCount === 0 && hasJustRestored){
    firstRoundSetup()
    }

}
function firstRoundSetup(){
  let node = document.getElementById("scoreInputContainer")
    console.log("COUNT: " + playerCount);
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
  //todo: legg til event listener
  submitScoresButton.onclick = function(){
    let values = document.getElementsByClassName('roundScoreField')
      for(let i = 0; i<playerCount;i++){
        for(let j = 0; j<=playerCount;j++){
        if(values[j].dataset.playerid === players[i].id){
          players[i].rounds.push(values[j].value - 0)
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
  if(roundCount == 0 || (hasJustRestored && roundCount>0)){
  let scoreContainer = document.getElementById("currentScoreContainer")
  for(let i = 0; i<playerCount;i++){
    let scoreText = document.createElement("p")
    scoreText.className = "scoreText"
    scoreText.innerText = players[i].name + " har " + players[i].score + " poeng."
    scoreContainer.appendChild(scoreText)
    }
    hasJustRestored = false;
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
  //Gjør i modale box slik at bruker kan se når som helst.
  //Bruk roundcount for å sjekke hvor langt det skal genereres
  //En kolonne for runde, en kolonne videre for hver spiller
}
