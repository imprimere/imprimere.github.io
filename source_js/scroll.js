
$(window).load(function() {

  var wh = window.innerHeight;
  var ww = window.innerWidth;
  var SCRL_DELAY = 3;
  var SCRL_SPEED = 2;
  var gnavLock = true;
  var gnavDuration = 300;
  var gnavEasing = 'easeOutQuad';
  var scrl = 0;
  var scrlCache = 0;

  var headerH = $('header#site-title').height();
  var aboutH  = $('section#about').height();
  var memberH = $('section#member').height();
  var concertH = $('section#concert').height();
  var contactH = $('section#contact').height();
  var rawScrlWait = [aboutH/wh, memberH/wh, concertH/wh, contactH/wh];
  for(var i=0; i<4; i++) { rawScrlWait[i] = (rawScrlWait[i] < 1)? 1 : rawScrlWait[i]; }
  var sumScrlWait = [
        1,
        1+rawScrlWait[0],
        1+rawScrlWait[0]+rawScrlWait[1],
        1+rawScrlWait[0]+rawScrlWait[1]+rawScrlWait[2],
        1+rawScrlWait[0]+rawScrlWait[1]+rawScrlWait[2]+rawScrlWait[3]
      ];

  parallaxInit(wh,ww);

  $(window).scroll(function() {
    scrl = $(this).scrollTop()/SCRL_DELAY;
    if(scrl > wh*0.45 && gnavLock) {
      gnavLock = false;
      $('nav#global-nav-floated').animate({'top': 0}, {duration: gnavDuration, easing: gnavEasing});
      $('div#goTop').animate({'top': wh-100}, {duration: gnavDuration, easing: gnavEasing});
    } else if(scrl < wh*0.45 && !gnavLock) {
      gnavLock = true;
      $('nav#global-nav-floated').animate({'top': -100}, {duration: gnavDuration, easing: gnavEasing});
      $('div#goTop').animate({'top': wh}, {duration: gnavDuration, easing: gnavEasing});
    }

    //---[Header]
    $('header#site-title').css('top', -scrl);
    $('nav#global-nav ul').css('top', wh*4/5-scrl*1.5);

    //---[Section]
    parallaxMove($('section#about'),   0);
    parallaxMove($('section#member'),  1);
    parallaxMove($('section#concert'), 2);
    parallaxMove($('section#contact'), 3);
  });

  function parallaxMove(targetObj, page) {
    var scrlTo = (2*sumScrlWait[page]-1)*wh - scrl*SCRL_SPEED;
    if(scrl < (sumScrlWait[page+1]-1)*wh){
      if(scrlTo <= 0) {
        targetObj.css('top',0);
        targetObj.find(".content-wrap").css('top', scrlTo*0.5);
      } else {
        targetObj.css('top', scrlTo);
      }
    } else {
      targetObj.find(".content-wrap").css('top', scrlTo*0.5);
      targetObj.css('top', (sumScrlWait[page+1]-1)*wh - scrl);
    }
  }

  //---[initial settings]

  function parallaxInit(wh,ww) {
    var gnavOffset = wh/5;
    var titleOffset = (wh*0.7 > 480) ? (wh-gnavOffset-480)/2 : (wh*0.3-gnavOffset)/2;
    var goTopOffset = (ww >= 960) ? ww/2-323 : ww*0.2-35;
    var sectionPadding = (wh > 800) ? 150 : 100*(wh/800)+50;

    $("body").css("height", (sumScrlWait[sumScrlWait.length-1]-1)*wh*SCRL_DELAY);
    $('header#site-title').css('height', wh);
    $('article#main section').css('height', wh);
    $('header#site-title').css('top', 0);
    $('h1#title').css('margin-top', titleOffset);
    $('nav#global-nav ul').css({'top':wh-gnavOffset});
    $('div#goTop').css({'top': wh, 'left': goTopOffset});
    $('section').css({'padding-top': sectionPadding, 'padding-bottom': sectionPadding});
    $('section#about').css('top', wh);
    $('section#member').css('top', wh);
    $('section#concert').css('top', wh);
    $('section#contact').css('top', wh);

    $(window).scrollTop(0);
    $('div.splash').fadeOut(500);
  }

  //---[goInternalLink]

  $('div#goTop a').click(function() {    return goInternalLink(0);                 });
  $('a.gnav-about').click(function() {   return goInternalLink(wh*SCRL_DELAY/2);   });
  $('a.gnav-member').click(function() {  return goInternalLink((2*sumScrlWait[1]-1)*wh*SCRL_DELAY/2); });
  $('a.gnav-concert').click(function() { return goInternalLink((2*sumScrlWait[2]-1)*wh*SCRL_DELAY/2); });
  $('a.gnav-contact').click(function() { return goInternalLink((2*sumScrlWait[3]-1)*wh*SCRL_DELAY/2); });

  function goInternalLink(scrlTop) {
    var scrlDuration = 700;
    var scrlEasing = 'easeInOutCubic';
    $('html, body').animate({'scrollTop': scrlTop}, {duration: scrlDuration, easing: scrlEasing});
    return false;
  }

});
