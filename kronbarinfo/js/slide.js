$('.js-popup-quiz').on('click', function () {
    $.magnificPopup.open({
        items: {
            src: '<div class="white-popup"><h2>Quiz</h2> <strong>Quiz</strong> er den mest populære aktivteten Kronbar har. Dørene åpner kanskje 18:00, men køen utfor begynner ofte 17:30. Det pleier nesten alltid være helt fult, og dersom du ankommer lokalet etter 18:30 er sannsynligheten for å få et bord svært lav. Inngangsprisen er 20 kroner, en sum som blir brukt til premiepotten. Premiene består av Gavekort på Kiwi/Rema 1000 og lignende. Quizen består av 2 deler, og temaene varierer for hver gang. Mellom de to delene er det en times pause hvor det også arrangeres en rask Kahoot (med premie). <br /><br /><strong>Lydnivå: </strong> Middels. Man kan fint holde samtaler og spille spill ved siden av quizen. Baren kjører middels/lav bakgrunnsmusikk.</div>',
            type: 'inline'
        }
    });
});
$('.js-popup-spillkveld').on('click', function () {
    $.magnificPopup.open({
        items: {
            src: '<div class="white-popup"><h2>Spillkveld</h2> <strong>Spillkveld</strong> er en annen populær kveld blant studentene. //TODO:<br /><br /><strong>Lydnivå: </strong> Lavt. En rolig kveld med helt perfekt stemning til spillaktiviter. Baren har lav bakgrunnsmusikk.</div>',
            type: 'inline'
        }
    });
});
$('.js-popup-jam').on('click', function () {
    $.magnificPopup.open({
        items: {
            src: '<div class="white-popup"><h2>Jam</h2> <strong>Jam</strong> er en gøyal aften hvor husbandet spiller opp til god stemning. //TODO: <br /><br /><strong>Lydnivå: </strong> Høyt. Vanskelig å holde samtaler</div>',
            type: 'inline'
        }
    });
});
$('.js-popup-konsert').on('click', function () {
    $.magnificPopup.open({
        items: {
            src: '<div class="white-popup"><h2>Konsert</h2> <strong>Konserter</strong> er sjeldne, men alltid bra. Kombiner flotte artister med billig drikke i baren så blir det en kveld med allsang uten like. //TODO: <br /><br /><strong>Lydnivå: </strong> Ekstremt høyt. Det er en konsert, så det er akkurat slik du forventer at det blir.</div>',
            type: 'inline'
        }
    });
});
