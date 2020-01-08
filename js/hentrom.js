$( document ).ready(function () {
getTimeEdit()
});

function getTimeEdit(){
  //link til åpen timeplan
  // TimeEdit -> Åpen timeplan HVL
  let timeedit = "https://cloud.timeedit.net/hvl/web/pen/ri15X60Yg50601Q0g7QY5660Z863X675561Y540yZ08Q8186Y7X87881725p88Q557899c717X7ZYQY.html#"
  let fagkoder = ["DAT151", "DAT153", "DAT154", "DAT190"]
  //Starting get for timeedit
  $.get( timeedit, function(response){
  $('#testDiv').html(response);
  let date = new Date()
  //TODO: Fix dato og tid
  let dato = formatDate(date)
  let time = checkTime(date.getHours())
  //TODO: Legg til sjekk for previous time på en eller annen måte

  let dagensNoder = document.querySelectorAll('[title*=" ' + dato + '"]')

  for(let i = 0; i<dagensNoder.length;i++){
    for(let t = 0; t<8;t++){
    console.log(time)
    if(dagensNoder[i].title.includes(time)){
      console.log("found")
      for(let j = 0; j<fagkoder.length;j++){
        if(dagensNoder[i].title.includes(fagkoder[j])){
          let course = $('[data-fag="'+ fagkoder[j] +'"]')
            course.append("<p class='pclock'>Klokken: " + time + "</p>")
            if(dagensNoder[i].title.includes("Forelesning")){
              course.append("<p class='romkode'>Rom: " + dagensNoder[i].innerHTML.substr(29,6).replace('(', '').replace(',', '') + "</p>")
              course.append("<p>Type: " + dagensNoder[i].innerHTML.substr(16,11) + "</p>")
            }else if(dagensNoder[i].title.includes("Øving")){
              course.append("<p class='romkode'>Rom: " + dagensNoder[i].innerHTML.substr(23,6).replace('(', '').replace(',', '') + "</p>")
              course.append("<p>Type: " + dagensNoder[i].innerHTML.substr(16,5) + "</p>")
            }
            course.append("<hr class='largehr'/>")
            }
      }
      t=8;
    }else{
      console.log("Adding one hour for " + i)
    time = (date.getHours()+t) + ":" + "15"
      }
    }
  }
  for(k = 0;k<fagkoder.length;k++){
  if(!document.querySelector('[data-fag="'+ fagkoder[k] +'"]').hasChildNodes()){
    $('[data-fag="'+ fagkoder[k] +'"]').append("<p class='ingenting'>Du har ingen timer i dag!</p><hr/>")
  }
  }
  });
}
function checkTime(time){
  var date = new Date()
  if(time < 10){
    console.log("small number")
    time = '0' + time + ":" + "15"
  } else{
    console.log("large number")
    time = date.getHours() + ":" + "15"
  }
  return time
}
function checkTimePrevious(time){
  var date = new Date()
  if(time < 10){
    console.log("small number")
    time = time-1
    time = '0' + time + ":" + "15"
    console.log("checktime" + time)
  } else{
    console.log("large number")
    time = date.getHours()-1 + ":" + "15"
  }
  return time
}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('.')
}
