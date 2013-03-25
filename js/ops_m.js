var url = "https://api.twitch.tv/kraken/streams";
var stream = "?limit=9&callback=?";
var streamSelection = [];
var streamProm = ["styrka","greenyb","healthbar","velna","amiye","kynks","shuttle08","gnorrior","shyllo","zoaxlis","archidel"];
var streamdata = [];
var streamsActive = [];
var removeItem = '<a class="remove">X</a>';

var flashHeight = 295;
var flashWidth = 353;
var flashType = "application/x-shockwave-flash";
var flashData = "http://www.twitch.tv/widgets/live_embed_player.swf";
var flashColor = "#000"
var flashFS = "true";
var flashSA = "always";
var flashVars = "auto_play=false&start_volume=25&channel=";
var lock = true;

function ticktock() {
  setInterval(function() {
    $('#theTime').html('<h2 class="responsive zero" data-compression="8.25" data-min="20" data-max="200"> <a class="colortoBG clock">' + moment().format("H:mm:ss") + '</a></h3>')
    $('#hour').css('height', moment().format("H")*5);
    $('#minute').css('height', moment().format("mm")*2);
  }, 500);
  setInterval(function() {
    $('#second').css('height', moment().format("ss")*2 + moment().format("SS")/50);
  }, 50);
}

function setCookie(c_name,value,exdays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
  document.cookie = c_name + "=" + c_value;
}

function getCookie(cookieName) {
  var theCookie=" "+document.cookie;
  var ind=theCookie.indexOf(" "+cookieName+"=");
  if (ind==-1) ind=theCookie.indexOf(";"+cookieName+"=");
  if (ind==-1 || cookieName=="") return "";
  var ind1=theCookie.indexOf(";",ind+1);
  if (ind1==-1) ind1=theCookie.length; 
  return unescape(theCookie.substring(ind+cookieName.length+2,ind1));
}

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
      what = a[--L];
      while ((ax= arr.indexOf(what)) !== -1) {
          arr.splice(ax, 1);
      }
  }
  return arr;
}

$(document).on("click", "a.remove", function() {
  $(this).parent().parent().parent().remove();
});

$('document').ready(function(){
  ticktock();
});
