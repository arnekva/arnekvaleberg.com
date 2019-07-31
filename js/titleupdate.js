var scrolling = false;
console.log("Onscroll limited to 800ms. Oppdateringsfrekvens senkes.");
$( window ).scroll( function() {
  scrolling = true;
});

setInterval( function() {
  if ( scrolling ) {
    scrolling = false;
    var el = document.getElementsByClassName('nav-link js-scroll-trigger active');
  //Kaster exception hvis brukeren scroller over toppen (bounce) på mobil, da ingen seksjon vil være active fordi han forlater vinduet. Må sjekke om tabell er tom.
    if(el.length > 0){
      document.title = el[0].innerHTML + ' | Arne Kvaleberg';
      console.log('Title oppdatert med innhold \'' + el[0].innerHTML + '\'');

    } else{
      document.title = 'Om | Arne Kvaleberg';
      console.log('Scrolled too far up, lost active class. Set to default.');
    }





  }
}, 800 );
