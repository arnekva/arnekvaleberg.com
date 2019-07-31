var scrolling = false;
console.log("Onscroll limited to 800ms. Oppdateringsfrekvens senkes.");
$( window ).scroll( function() {
  scrolling = true;
});

setInterval( function() {
  if ( scrolling ) {
    scrolling = false;
    var el = document.getElementsByClassName('nav-link js-scroll-trigger active');
    document.title = el[0].innerHTML + ' | Arne Kvaleberg';
    console.log('Title oppdatert med innhold \'' + el[0].innerHTML + '\'');
  }
}, 800 );
