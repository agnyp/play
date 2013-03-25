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

if ((navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1)) {
    document.location = "http://www.comeatme.co/m/index.html";
}

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

function lastStreamLoad() {
  var lastStream = getCookie("lastStream");
  if (lastStream !== '') {
    stream = lastStream;
  }
  else {
    stream = "?limit=9&callback=?";
  }
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

$('#streamAdd').click(function() {
  var alreadyIn;
  for (i=0;i<streamSelection.length;i++) {
    if ($('#streamName').val()===streamSelection[i]) {
      alreadyIn = true;
    }
  }
  if (!alreadyIn) {
    streamSelection.push($('#streamName').val());
    streamUpdate($('#streamName').val());
  };
  $('#streamName').val('');
});
$('#streamClear').click(function() {
  emptyStreams();
});
$('#streamMove').click(function(){
  if (lock) {
    $('#streams').sortable('enable');
    $('#streams').disableSelection();
    $('#streamMove').html('Lock');
    lock = false;
  }
  else if (!lock) {
    $('#streams').sortable('disable');
    $('#streams').enableSelection();
    $('#streamMove').html('Move');
    lock = true;
  };
});
$(document).on("click", "a.remove", function() {
  $(this).parent().parent().parent().remove();
});
$('#streamTop9').click(function() {
  streamSelection = [];
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  stream = "?limit=9&callback=?";
  loadStreams();
});
$('#streamDota').click(function() {
  streamSelection = [];
  stream = "?game=Dota+2&limit=9&callback=?";
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  loadStreams();
});
$('#streamWoW').click(function() {
  streamSelection = [];
  stream = "?game=World+of+Warcraft:+Mists+of+Pandaria&limit=9&callback=?";
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  loadStreams();
});
$('#streamProm').click(function() {
  streamSelection = [];
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  streamUpdate(streamProm);
});

function emptyStreams() {
  $('#streams').html('');
  streamSelection = [];
}

function streamUpdate(selection) {
  if ($('#streams').html()==='') $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  stream = "?channel=" + selection.toString() + "&callback=?";
  loadStreams();
}

function streamList(input) {
  var alreadyInList;
  for (n=0;n<streamSelection.length;n++) {
    if (input===streamSelection[n]) {
      alreadyInList = true;
    }
  }
  if (!alreadyInList) {
    streamSelection.push(input);
  };
}

function streamCookie() {
  var streamListing = "?channel=" + streamSelection.toString() + "&callback=?";
  setCookie("lastStream",streamListing,365);
}

function loadStreams() {
  $.getJSON(url + stream, function(data) {
    var datact = 0;
    $.each(data, function(id, node) {
      if (id==='streams') {
        datact = node.length;
        for (i=0; i<datact; i++) {
          streamdata[i] = [];
          $.each(node[i], function(key, val) {
            if (key==='viewers') streamdata[i].viewers = val;
            if (key==='channel') {
              streamdata[i].name = val.name;
              streamdata[i].game = val.game;
              streamdata[i].title = val.status;
            }
          });
        };
      };
    });
    streamsActive = [];
    for (i=0;i<datact;i++) {
      streamsActive[i] = [];
      streamCreate(streamdata[i]);
    }
    streamPlacement();
    streamCookie();
    $('#streams').sortable("refresh");
    setTimeout(function(){if ($('#streams').html()==='' ||$('#streams').html()==='<i class="icon-spinner icon-4x icon-spin"></i>') $('#streams').html('<h2><i class="icon-lemon"></i> no streams available <i class="icon-lemon"></i></h2>')}, 500);
  });
}

function streamPlacement() {
  $('i.icon-spinner').remove();
  for (i=0;i<streamsActive.length;i++) {
    $('#streams').append('<li class="ui-state-default" id="' + streamsActive[i].id + 'Link">');
    $('#streams').children().last().append('<section id="' + streamsActive[i].id + '"> <h3> <a class="inline cursorDefault" target="_blank" href="http://www.twitch.tv/' + streamsActive[i].id + '">' + streamsActive[i].id + '</a>' + removeItem + '</h3>' + streamsActive[i].object + '<p class="subtext">' + streamsActive[i].title + '</p> </section>');
    $('#streams').append('</li>');
  }
}

function streamCreate(streamA) {
  streamsActive[i].id = streamA.name;
  streamsActive[i].object = '<object type="' + flashType + '" height="' + flashHeight + '" width="' + flashWidth + '" id="live_embed_player_flash" data="'+ flashData + '?channel=' + name + '" bgcolor="' + flashColor + '"><param name="allowFullScreen" value="' + flashFS + '" /><param name="allowScriptAccess" value="' + flashSA + '" /><param name="movie" value="' + flashData + '" /><param name="flashvars" value="' + flashVars + streamA.name + '" /></object>';
  streamsActive[i].title = streamA.title;
  streamList(streamA.name);
}

$('document').ready(function(){
  $('#streams').sortable();
  $('#streams').sortable('disable');
  lastStreamLoad();
  ticktock();
  setTimeout(loadStreams(), 500);
});
