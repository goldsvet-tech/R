import css from 'styled-jsx/css';

export default css.global`




.playingCards .singlePlayingCard {
    display: inline-block;
    width: 3.3em;
    height: 4.6em;
    border: 1px solid #666;
    border-radius: .3em;
    -moz-border-radius: .3em;
    -webkit-border-radius: .3em;
    -khtml-border-radius: .3em;
    padding: .25em;
    margin: 0 .5em .5em 0;
    text-align: center;
    font-weight: normal;
    position: relative;
    background-color: #fff;
    -moz-box-shadow: .2em .2em .5em #333;
    -webkit-box-shadow: .2em .2em .5em #333;
    box-shadow: .2em .2em .5em #333;
  }
  
  .playingCards a.singlePlayingCard {
    text-decoration: none;
  }
  /* selected and hover state */
  .playingCards a.singlePlayingCard:hover, .playingCards a.singlePlayingCard:active, .playingCards a.singlePlayingCard:focus,
  .playingCards label.singlePlayingCard:hover,
  .playingCards strong .singlePlayingCard {
    bottom: 1em;
  }
  .playingCards label.singlePlayingCard {
    cursor: pointer;
  }
  
  .playingCards .singlePlayingCard.back {
    text-indent: -4000px;
    background-color: #ccc;
    background-repeat: repeat;
    background-image: url(data:image/gif;base64,R0lGODlhJAAkAJEAAOjFsezdztOKbL5QKCH5BAAAAAAALAAAAAAkACQAAAL/HC4RAqm/mmLHyHmAbczB11Ea8ombJKSgKo6Z17pXFznmS1JptiX0z3vVhpEKDoUIkoa0olGIUeZUk1RI6Yn2mh/FDAt6frOrRRTqXPpsVLYugzxaVy+YcBdnoWPZOT0E4eckQtZFZBjWoHixQFWl6Nhol6R2p1Okt5TGaEWZA6fjiMdhZgPHeWrTWGVq+jTZg1HYyAEWKLYzmyiGKoUimilz+YYryyTlg5RcDJSAbNx0Q7lMcbIGEyzTK8zVdfVaImzs/QV+prYqWWW2ObkoOApM/Em/rUlIm7fijs8a2EEKEaZ3AsMUgneEU6RcpJbZ27aGHkAO2Ors8xQH1IR0Bn5YnOtVAAA7); /* image is "Pattern 069" from http://www.squidfingers.com/patterns/ */
    background-image: -moz-repeating-linear-gradient(34% 6% 135deg,#0F1E59, #000000, #3E3E63 50%);
    background-image: -webkit-gradient(radial, center center, 20, center center, 80, from(rgb(19, 19, 19)), color-stop(0.4, rgb(15, 15, 15)), to(rgb(5, 5, 5)));
    /* yes, it's intentional that Mozilla, Webkit, Opera and IE all will get different backgrounds ... why not? :) */
  }
  
  /* suit colours
  ********************************************************************/
  
  .playingCards .singlePlayingCard.diams {
    color: #f00 !important;
  }
  .playingCards.fourColours .singlePlayingCard.diams {
    color: #00f !important;
  }
  .playingCards .singlePlayingCard.hearts {
    color: #f00 !important;
  }
  .playingCards .singlePlayingCard.spades {
    color: #000 !important;
  }
  .playingCards .singlePlayingCard.clubs {
    color: #000 !important;
  }
  .playingCards.fourColours .singlePlayingCard.clubs {
    color: #090 !important;
  }
  .playingCards .singlePlayingCard.joker {
    color: #000 !important;
  }
  .playingCards .singlePlayingCard.joker.big {
    color: #f00 !important;
  }
  
  /* inner bits
  ********************************************************************/
  
  /* top left main info (rank and suit) */
  
  .playingCards .singlePlayingCard .rank,
  .playingCards .singlePlayingCard .suit {
    display: block;
    line-height: 1;
    text-align: left;
  }
  .playingCards .singlePlayingCard .rank {
  }
  .playingCards .singlePlayingCard .suit {
    line-height: .7;
  }
  
  /* checkbox */
  .playingCards .singlePlayingCard input {
    margin-top: -.05em;
    font: inherit;
  }
  .playingCards.simpleCards .singlePlayingCard input,
  .playingCards .singlePlayingCard.rank-j input,
  .playingCards .singlePlayingCard.rank-q input,
  .playingCards .singlePlayingCard.rank-k input,
  .playingCards .singlePlayingCard.rank-a input {
    margin-top: 2.4em;
  }
  .playingCards.inText .singlePlayingCard input {
    margin-top: 0;
  }
  
  .playingCards .singlePlayingCard.joker .rank:before {
    content: "\2605";
    top: 0;
    left: 0;
  }
  .playingCards .singlePlayingCard.joker .suit {
    text-indent: -9999px;
  }
  
  /* inner multiple suits */
  .playingCards .singlePlayingCard .suit:after {
    display: block;
    margin-top: -.11em;
    text-align: center;
    white-space: pre;
    line-height: .9;
    opacity: 0.22;
    word-spacing: -.01em;
  }
  
  /* make the hearts and clubs symbols fit, because they are a bit bigger than the others */
  .playingCards .singlePlayingCard.hearts .suit:after {
    word-spacing: -.15em;
  }
  .playingCards .singlePlayingCard.hearts.rank-10 .suit:after {
    word-spacing: -.05em;
    letter-spacing: -.1em;
  }
  .playingCards .singlePlayingCard.clubs.rank-10 .suit:after {
    word-spacing: -.15em;
  }
  
  /* 8, 9, 10 are the most crowded */
  .playingCards .singlePlayingCard.rank-8 .suit:after,
  .playingCards .singlePlayingCard.rank-9 .suit:after {
    letter-spacing: -.075em;
  }
  .playingCards .singlePlayingCard.rank-10 .suit:after {
    letter-spacing: -.1em;
  }
  .playingCards .singlePlayingCard.clubs .suit:after {
    letter-spacing: -.125em;
  }
  
  /*____________ symbols in the middle (suits, full) ____________*/
  
  /* diamonds */
  .playingCards .singlePlayingCard.rank-2.diams .suit:after {
    content: "\2666 \A\A\2666";
  }
  .playingCards .singlePlayingCard.rank-3.diams .suit:after {
    content: "\2666 \A\2666 \A\2666";
  }
  .playingCards .singlePlayingCard.rank-4.diams .suit:after {
    content: "\2666\00A0\00A0\00A0\2666 \A\A\2666\00A0\00A0\00A0\2666";
  }
  .playingCards .singlePlayingCard.rank-5.diams .suit:after {
    content: "\2666\00A0\00A0\00A0\2666 \A\2666 \A\2666\00A0\00A0\00A0\2666";
  }
  .playingCards .singlePlayingCard.rank-6.diams .suit:after {
    content: "\2666\00A0\00A0\00A0\2666 \A\2666\00A0\00A0\00A0\2666 \A\2666\00A0\00A0\00A0\2666";
  }
  .playingCards .singlePlayingCard.rank-7.diams .suit:after {
    content: "\2666\00A0\00A0\2666 \A\2666\00A0\2666\00A0\2666 \A\2666\00A0\00A0\2666";
  }
  .playingCards .singlePlayingCard.rank-8.diams .suit:after {
    content: "\2666\00A0\2666\00A0\2666 \A\2666\00A0\00A0\2666 \A\2666\00A0\2666\00A0\2666";
  }
  .playingCards .singlePlayingCard.rank-9.diams .suit:after {
    content: "\2666\00A0\2666\00A0\2666 \A\2666\00A0\2666\00A0\2666 \A\2666\00A0\2666\00A0\2666";
  }
  .playingCards .singlePlayingCard.rank-10.diams .suit:after {
    content: "\2666\00A0\2666\00A0\2666 \A\2666\00A0\2666\00A0\2666\00A0\2666 \A\2666\00A0\2666\00A0\2666";
  }
  
  /* hearts */
  .playingCards .singlePlayingCard.rank-2.hearts .suit:after {
    content: "\2665 \A\A\2665";
  }
  .playingCards .singlePlayingCard.rank-3.hearts .suit:after {
    content: "\2665 \A\2665 \A\2665";
  }
  .playingCards .singlePlayingCard.rank-4.hearts .suit:after {
    content: "\2665\00A0\00A0\00A0\2665 \A\A\2665\00A0\00A0\00A0\2665";
  }
  .playingCards .singlePlayingCard.rank-5.hearts .suit:after {
    content: "\2665\00A0\00A0\00A0\2665 \A\2665 \A\2665\00A0\00A0\00A0\2665";
  }
  .playingCards .singlePlayingCard.rank-6.hearts .suit:after {
    content: "\2665\00A0\00A0\00A0\2665 \A\2665\00A0\00A0\00A0\2665 \A\2665\00A0\00A0\00A0\2665";
  }
  .playingCards .singlePlayingCard.rank-7.hearts .suit:after {
    content: "\2665\00A0\00A0\2665 \A\2665\00A0\2665\00A0\2665 \A\2665\00A0\00A0\2665";
  }
  .playingCards .singlePlayingCard.rank-8.hearts .suit:after {
    content: "\2665\00A0\2665\00A0\2665 \A\2665\00A0\00A0\2665 \A\2665\00A0\2665\00A0\2665";
  }
  .playingCards .singlePlayingCard.rank-9.hearts .suit:after {
    content: "\2665\00A0\2665\00A0\2665 \A\2665\00A0\2665\00A0\2665 \A\2665\00A0\2665\00A0\2665";
  }
  .playingCards .singlePlayingCard.rank-10.hearts .suit:after {
    content: "\2665\00A0\2665\00A0\2665 \A\2665\00A0\2665\00A0\2665\00A0\2665 \A\2665\00A0\2665\00A0\2665";
  }
  
  /* spades */
  .playingCards .singlePlayingCard.rank-2.spades .suit:after {
    content: "\2660 \A\A\2660";
  }
  .playingCards .singlePlayingCard.rank-3.spades .suit:after {
    content: "\2660 \A\2660 \A\2660";
  }
  .playingCards .singlePlayingCard.rank-4.spades .suit:after {
    content: "\2660\00A0\00A0\00A0\2660 \A\A\2660\00A0\00A0\00A0\2660";
  }
  .playingCards .singlePlayingCard.rank-5.spades .suit:after {
    content: "\2660\00A0\00A0\00A0\2660 \A\2660 \A\2660\00A0\00A0\00A0\2660";
  }
  .playingCards .singlePlayingCard.rank-6.spades .suit:after {
    content: "\2660\00A0\00A0\00A0\2660 \A\2660\00A0\00A0\00A0\2660 \A\2660\00A0\00A0\00A0\2660";
  }
  .playingCards .singlePlayingCard.rank-7.spades .suit:after {
    content: "\2660\00A0\00A0\2660 \A\2660\00A0\2660\00A0\2660 \A\2660\00A0\00A0\2660";
  }
  .playingCards .singlePlayingCard.rank-8.spades .suit:after {
    content: "\2660\00A0\2660\00A0\2660 \A\2660\00A0\00A0\2660 \A\2660\00A0\2660\00A0\2660";
  }
  .playingCards .singlePlayingCard.rank-9.spades .suit:after {
    content: "\2660\00A0\2660\00A0\2660 \A\2660\00A0\2660\00A0\2660 \A\2660\00A0\2660\00A0\2660";
  }
  .playingCards .singlePlayingCard.rank-10.spades .suit:after {
    content: "\2660\00A0\2660\00A0\2660 \A\2660\00A0\2660\00A0\2660\00A0\2660 \A\2660\00A0\2660\00A0\2660";
  }
  
  /* clubs */
  .playingCards .singlePlayingCard.rank-2.clubs .suit:after {
    content: "\2663 \A\A\2663";
  }
  .playingCards .singlePlayingCard.rank-3.clubs .suit:after {
    content: "\2663 \A\2663 \A\2663";
  }
  .playingCards .singlePlayingCard.rank-4.clubs .suit:after {
    content: "\2663\00A0\00A0\00A0\2663 \A\A\2663\00A0\00A0\00A0\2663";
  }
  .playingCards .singlePlayingCard.rank-5.clubs .suit:after {
    content: "\2663\00A0\00A0\00A0\2663 \A\2663 \A\2663\00A0\00A0\00A0\2663";
  }
  .playingCards .singlePlayingCard.rank-6.clubs .suit:after {
    content: "\2663\00A0\00A0\00A0\2663 \A\2663\00A0\00A0\00A0\2663 \A\2663\00A0\00A0\00A0\2663";
  }
  .playingCards .singlePlayingCard.rank-7.clubs .suit:after {
    content: "\2663\00A0\00A0\2663 \A\2663\00A0\2663\00A0\2663 \A\2663\00A0\00A0\2663";
  }
  .playingCards .singlePlayingCard.rank-8.clubs .suit:after {
    content: "\2663\00A0\2663\00A0\2663 \A\2663\00A0\00A0\2663 \A\2663\00A0\2663\00A0\2663";
  }
  .playingCards .singlePlayingCard.rank-9.clubs .suit:after {
    content: "\2663\00A0\2663\00A0\2663 \A\2663\00A0\2663\00A0\2663 \A\2663\00A0\2663\00A0\2663";
  }
  .playingCards .singlePlayingCard.rank-10.clubs .suit:after {
    content: "\2663\00A0\2663\00A0\2663 \A\2663\00A0\2663\00A0\2663\00A0\2663 \A\2663\00A0\2663\00A0\2663";
  }
  
  /*____________ symbols in the middle (faces as images) ____________*/
  
  .playingCards.faceImages .singlePlayingCard.rank-j .suit:after,
  .playingCards.faceImages .singlePlayingCard.rank-q .suit:after,
  .playingCards.faceImages .singlePlayingCard.rank-k .suit:after {
    content: '';
  }
  .playingCards.faceImages .singlePlayingCard.rank-j,
  .playingCards.faceImages .singlePlayingCard.rank-q,
  .playingCards.faceImages .singlePlayingCard.rank-k,
  .playingCards.faceImages .singlePlayingCard.joker {
    background-repeat: no-repeat;
    background-position: -1em 0;
    /* @change: smaller cards: more negative distance from the left
       bigger cards: 0 or more positive distance from the left */
  
    /* for a centered full background image:
    background-position: .35em 0;
    -moz-background-size: contain;
    -o-background-size: contain;
    -webkit-background-size: contain;
    -khtml-background-size: contain;
    background-size: contain;
    */
  }
  
  .playingCards.faceImages .singlePlayingCard.rank-j.diams  { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/JD.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-j.hearts { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/JH.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-j.spades { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/JS.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-j.clubs  { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/JC.gif); }
  
  .playingCards.faceImages .singlePlayingCard.rank-q.diams  { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/QD.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-q.hearts { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/QH.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-q.spades { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/QS.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-q.clubs  { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/QC.gif); }
  
  .playingCards.faceImages .singlePlayingCard.rank-k.diams  { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/KD.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-k.hearts { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/KH.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-k.spades { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/KS.gif); }
  .playingCards.faceImages .singlePlayingCard.rank-k.clubs  { background-position: center; background-repeat: no-repeat; background-size: 50% 65%; background-image: url(/assets/blackjack/KC.gif); }
  
  .playingCards.simpleCards .singlePlayingCard.rank-j,
  .playingCards.simpleCards .singlePlayingCard.rank-q,
  .playingCards.simpleCards .singlePlayingCard.rank-k       { background-image: none !important; }
  
  /*____________ symbols in the middle (faces as dingbat symbols) ____________*/
  
  .playingCards.simpleCards .singlePlayingCard .suit:after,
  .playingCards .singlePlayingCard.rank-j .suit:after,
  .playingCards .singlePlayingCard.rank-q .suit:after,
  .playingCards .singlePlayingCard.rank-k .suit:after,
  .playingCards .singlePlayingCard.rank-a .suit:after,
  .playingCards .singlePlayingCard.joker .rank:after {
    position: absolute;
    right: .05em;
    bottom: .15em;
    word-spacing: normal;
    letter-spacing: normal;
    line-height: 1;
  }
  .playingCards .singlePlayingCard.rank-j .suit:after {
    content: "\265F";
    right: .15em;
  }
  .playingCards .singlePlayingCard.rank-q .suit:after {
    content: "\265B";
  }
  .playingCards .singlePlayingCard.rank-k .suit:after {
    content: "\265A";
  }
  /* joker (inner symbol) */
  .playingCards.faceImages .singlePlayingCard.joker .rank:after {
    content: "";
  }
  .playingCards .singlePlayingCard.joker .rank:after {
    position: absolute;
    content: "\2766";
    top: .4em;
    left: .1em;
  }
  
  /* big suits in middle */
  .playingCards.simpleCards .singlePlayingCard .suit:after,
  .playingCards .singlePlayingCard.rank-a .suit:after {
    line-height: .9;
    bottom: .35em;
  }
  .playingCards.simpleCards .singlePlayingCard.diams .suit:after,
  .playingCards .singlePlayingCard.rank-a.diams .suit:after {
    content: "\2666";
    right: .4em;
  }
  .playingCards.simpleCards .singlePlayingCard.hearts .suit:after,
  .playingCards .singlePlayingCard.rank-a.hearts .suit:after {
    content: "\2665";
    right: .35em;
  }
  .playingCards.simpleCards .singlePlayingCard.spades .suit:after,
  .playingCards .singlePlayingCard.rank-a.spades .suit:after {
    content: "\2660";
    right: .35em;
  }
  .playingCards.simpleCards .singlePlayingCard.clubs .suit:after,
  .playingCards .singlePlayingCard.rank-a.clubs .suit:after {
    content: "\2663";
    right: .3em;
  }
  
  /*____________ smaller cards for use inside text ____________*/
  
  .playingCards.inText .singlePlayingCard {
    font-size: .4em;
    vertical-align: middle;
  }
  .playingCards.inText .singlePlayingCard span.rank,
  .playingCards.inText .singlePlayingCard span.suit {
    text-align: center;
  }
  .playingCards.inText .singlePlayingCard span.rank {
    font-size: 2em;
    margin-top: .2em;
  }
  .playingCards.inText .singlePlayingCard span.suit {
    font-size: 2.5em;
  }
  .playingCards.inText .singlePlayingCard .suit:after,
  .playingCards.inText .singlePlayingCard.joker .rank:after {
    content: "" !important;
  }
  .playingCards.inText .singlePlayingCard .rank:after {
    left: .5em;
    padding: 0 .1em;
  }
  
  
  .playingCards ul.playingTable,
  .playingCards ul.playingHand,
  .playingCards ul.playingDeck {
    list-style-type: none;
    padding: 0;
    margin: 0 0 1.5em 0;
    position: relative;
    clear: both;
  }
  .playingCards ul.playingHand {
    margin-bottom: 3.5em;
  }
  .playingCards ul.playingTable li,
  .playingCards ul.playingHand li,
  .playingCards ul.playingDeck li {
    margin: 0;
    padding: 0;
    list-style-type: none;
    float: left;
  }
  
  .playingCards ul.playingHand,
  .playingCards ul.playingDeck {
    height: 8em;
  }
  .playingCards ul.playingHand li,
  .playingCards ul.playingDeck li {
    position: absolute;
  }
  .playingCards ul.playingHand li {
    bottom: 0;
  }
  .playingCards ul.playingHand li:nth-child(1)  { left: 0; }
  .playingCards ul.playingHand li:nth-child(2)  { left: 1.1em; }
  .playingCards ul.playingHand li:nth-child(3)  { left: 2.2em; }
  .playingCards ul.playingHand li:nth-child(4)  { left: 3.3em; }
  .playingCards ul.playingHand li:nth-child(5)  { left: 4.4em; }
  .playingCards ul.playingHand li:nth-child(6)  { left: 5.5em; }
  .playingCards ul.playingHand li:nth-child(7)  { left: 6.6em; }
  .playingCards ul.playingHand li:nth-child(8)  { left: 7.7em; }
  .playingCards ul.playingHand li:nth-child(9)  { left: 8.8em; }
  .playingCards ul.playingHand li:nth-child(10) { left: 9.9em; }
  .playingCards ul.playingHand li:nth-child(11) { left: 11em; }
  .playingCards ul.playingHand li:nth-child(12) { left: 12.1em; }
  .playingCards ul.playingHand li:nth-child(13) { left: 13.2em; }
  
  .playingCards ul.playingHand li:nth-child(14) { left: 14.3em; }
  .playingCards ul.playingHand li:nth-child(15) { left: 15.4em; }
  .playingCards ul.playingHand li:nth-child(16) { left: 16.5em; }
  .playingCards ul.playingHand li:nth-child(17) { left: 17.6em; }
  .playingCards ul.playingHand li:nth-child(18) { left: 18.7em; }
  .playingCards ul.playingHand li:nth-child(19) { left: 19.8em; }
  .playingCards ul.playingHand li:nth-child(20) { left: 20.9em; }
  .playingCards ul.playingHand li:nth-child(21) { left: 22em; }
  .playingCards ul.playingHand li:nth-child(22) { left: 23.1em; }
  .playingCards ul.playingHand li:nth-child(23) { left: 24.2em; }
  .playingCards ul.playingHand li:nth-child(24) { left: 25.3em; }
  .playingCards ul.playingHand li:nth-child(25) { left: 26.4em; }
  .playingCards ul.playingHand li:nth-child(26) { left: 27.5em; }
  
  /* rotate cards if rotateHand option is on */
  .playingCards.rotateHand ul.playingHand li:nth-child(1) {
    -moz-transform: translate(1.9em, .9em) rotate(-42deg);
    -webkit-transform: translate(1.9em, .9em) rotate(-42deg);
    -o-transform: translate(1.9em, .9em) rotate(-42deg);
    transform: translate(1.9em, .9em) rotate(-42deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(2) {
    -moz-transform: translate(1.5em, .5em) rotate(-33deg);
    -webkit-transform: translate(1.5em, .5em) rotate(-33deg);
    -o-transform: translate(1.5em, .5em) rotate(-33deg);
    transform: translate(1.5em, .5em) rotate(-33deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(3) {
    -moz-transform: translate(1.1em, .3em) rotate(-24deg);
    -webkit-transform: translate(1.1em, .3em) rotate(-24deg);
    -o-transform: translate(1.1em, .3em) rotate(-24deg);
    transform: translate(1.1em, .3em) rotate(-24deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(4) {
    -moz-transform: translate(.7em, .2em) rotate(-15deg);
    -webkit-transform: translate(.7em, .2em) rotate(-15deg);
    -o-transform: translate(.7em, .2em) rotate(-15deg);
    transform: translate(.7em, .2em) rotate(-15deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(5) {
    -moz-transform: translate(.3em, .1em) rotate(-6deg);
    -webkit-transform: translate(.3em, .1em) rotate(-6deg);
    -o-transform: translate(.3em, .1em) rotate(-6deg);
    transform: translate(.3em, .1em) rotate(-6deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(6) {
    -moz-transform: translate(-.1em, .1em) rotate(3deg);
    -webkit-transform: translate(-.1em, .1em) rotate(3deg);
    -o-transform: translate(-.1em, .1em) rotate(3deg);
    transform: translate(-.1em, .1em) rotate(3deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(7) {
    -moz-transform: translate(-.5em, .2em) rotate(12deg);
    -webkit-transform: translate(-.5em, .2em) rotate(12deg);
    -o-transform: translate(-.5em, .2em) rotate(12deg);
    transform: translate(-.5em, .2em) rotate(12deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(8) {
    -moz-transform: translate(-.9em, .3em) rotate(21deg);
    -webkit-transform: translate(-.9em, .3em) rotate(21deg);
    -o-transform: translate(-.9em, .3em) rotate(21deg);
    transform: translate(-.9em, .3em) rotate(21deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(9) {
    -moz-transform: translate(-1.3em, .6em) rotate(30deg);
    -webkit-transform: translate(-1.3em, .6em) rotate(30deg);
    -o-transform: translate(-1.3em, .6em) rotate(30deg);
    transform: translate(-1.3em, .6em) rotate(30deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(10) {
    -moz-transform: translate(-1.7em, 1em) rotate(39deg);
    -webkit-transform: translate(-1.7em, 1em) rotate(39deg);
    -o-transform: translate(-1.7em, 1em) rotate(39deg);
    transform: translate(-1.7em, 1em) rotate(39deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(11) {
    -moz-transform: translate(-2.2em, 1.5em) rotate(48deg);
    -webkit-transform: translate(-2.2em, 1.5em) rotate(48deg);
    -o-transform: translate(-2.2em, 1.5em) rotate(48deg);
    transform: translate(-2.2em, 1.5em) rotate(48deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(12) {
    -moz-transform: translate(-2.8em, 2.1em) rotate(57deg);
    -webkit-transform: translate(-2.8em, 2.1em) rotate(57deg);
    -o-transform: translate(-2.8em, 2.1em) rotate(57deg);
    transform: translate(-2.8em, 2.1em) rotate(57deg);
  }
  .playingCards.rotateHand ul.playingHand li:nth-child(13) {
    -moz-transform: translate(-3.5em, 2.8em) rotate(66deg);
    -webkit-transform: translate(-3.5em, 2.8em) rotate(66deg);
    -o-transform: translate(-3.5em, 2.8em) rotate(66deg);
    transform: translate(-3.5em, 2.8em) rotate(66deg);
  }
  
  /* deck */
  .playingCards ul.playingDeck li:nth-child(1)  { left: 0;    bottom: 0; }
  .playingCards ul.playingDeck li:nth-child(2)  { left: 2px;  bottom: 1px; }
  .playingCards ul.playingDeck li:nth-child(3)  { left: 4px;  bottom: 2px; }
  .playingCards ul.playingDeck li:nth-child(4)  { left: 6px;  bottom: 3px; }
  .playingCards ul.playingDeck li:nth-child(5)  { left: 8px;  bottom: 4px; }
  .playingCards ul.playingDeck li:nth-child(6)  { left: 10px; bottom: 5px; }
  .playingCards ul.playingDeck li:nth-child(7)  { left: 12px; bottom: 6px; }
  .playingCards ul.playingDeck li:nth-child(8)  { left: 14px; bottom: 7px; }
  .playingCards ul.playingDeck li:nth-child(9)  { left: 16px; bottom: 8px; }
  .playingCards ul.playingDeck li:nth-child(10) { left: 18px; bottom: 9px; }
  .playingCards ul.playingDeck li:nth-child(11) { left: 20px; bottom: 10px; }
  .playingCards ul.playingDeck li:nth-child(12) { left: 22px; bottom: 11px; }
  .playingCards ul.playingDeck li:nth-child(13) { left: 24px; bottom: 12px; }
  .playingCards ul.playingDeck li:nth-child(14) { left: 26px; bottom: 13px; }
  .playingCards ul.playingDeck li:nth-child(15) { left: 28px; bottom: 14px; }
  .playingCards ul.playingDeck li:nth-child(16) { left: 30px; bottom: 15px; }
  .playingCards ul.playingDeck li:nth-child(17) { left: 32px; bottom: 16px; }
  .playingCards ul.playingDeck li:nth-child(18) { left: 34px; bottom: 17px; }
  .playingCards ul.playingDeck li:nth-child(19) { left: 36px; bottom: 18px; }
  .playingCards ul.playingDeck li:nth-child(20) { left: 38px; bottom: 19px; }
  .playingCards ul.playingDeck li:nth-child(21) { left: 40px; bottom: 20px; }
  .playingCards ul.playingDeck li:nth-child(22) { left: 42px; bottom: 21px; }
  .playingCards ul.playingDeck li:nth-child(23) { left: 44px; bottom: 22px; }
  .playingCards ul.playingDeck li:nth-child(24) { left: 46px; bottom: 23px; }
  .playingCards ul.playingDeck li:nth-child(25) { left: 48px; bottom: 24px; }
  .playingCards ul.playingDeck li:nth-child(26) { left: 50px; bottom: 25px; }
  .playingCards ul.playingDeck li:nth-child(27) { left: 52px; bottom: 26px; }
  .playingCards ul.playingDeck li:nth-child(28) { left: 54px; bottom: 27px; }
  .playingCards ul.playingDeck li:nth-child(29) { left: 56px; bottom: 28px; }
  .playingCards ul.playingDeck li:nth-child(30) { left: 58px; bottom: 29px; }
  .playingCards ul.playingDeck li:nth-child(31) { left: 60px; bottom: 30px; }
  .playingCards ul.playingDeck li:nth-child(32) { left: 62px; bottom: 31px; }
`;