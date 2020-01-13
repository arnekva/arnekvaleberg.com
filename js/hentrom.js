$( document ).ready(function () {
getTimeEdit()
});

function getTimeEdit(){
  //link til åpen timeplan
  // TimeEdit -> Åpen timeplan HVL
  let timeedit = "https://cloud.timeedit.net/hvl/web/pen/ri10Yv581566Z7QY5XQ7788XZX086065759068Yy368Y5Q1g78Y121p5lyZQ7Xlx79Wd88Sn(Y5v8rpQamaQn777c8771WVqjZxt)cmrXc(wxjn8VVXS)90wWvWdW8WEpynW6aua7ej5Xm711wWvjFæ6pnn2Q6bWrafZZZX5a9er6naZoWXc.html"
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
              course.append("<p class='romkode'>Rom: " + dagensNoder[i].innerText.substr(17,6).replace('(', '').replace(',', '') + "</p>")
              course.append("<p>Type: " + "Forelesning" + "</p>")
            }else if(dagensNoder[i].title.includes("Øving")){
              course.append("<p class='romkode'>Rom: " + dagensNoder[i].innerText.substr(12,6).replace('(', '').replace(',', '') + "</p>")
              course.append("<p>Type: " + "Øvelse" + "</p>")
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
    $('[data-fag="'+ fagkoder[k] +'"]').append("<p class='ingenting'>Du har ingen timer videre i dag!</p><hr/>")
  }
  }
  });
}
function checkType(type){
  if(type.innerText.includes("fore")){
    return "forelesning"
  }else if(type.innerText.includes("velse")){
    return "Øvelse"
  }else{
  return "Ikke spesifisert"
  }
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
