var url = "https://api.twitch.tv/kraken/streams";
var stream = "?limit=9&callback=?";
var streamSelection = [];
var streamProm = ["styrka","greenyb","healthbar","velna","amiye","kynks","shuttle08","gnorrior","shyllo","zoaxlis","archidel"];
var streamdata = [];
var streamsActive = [];

var flashHeight = 295;
var flashWidth = 353;
var flashType = "application/x-shockwave-flash";
var flashData = "http://www.twitch.tv/widgets/live_embed_player.swf";
var flashColor = "#000"
var flashFS = "true";
var flashSA = "always";
var flashVars = "auto_play=false&start_volume=25&channel=";
var lock = true;

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
  streamSelection.push($('#streamName').val());
  $('#streamName').val('');
  streamUpdate(streamSelection);
});
$('#streamClear').click(function() {
  emptyStreams();
});
$('#streamMove').click(function(){
  if (lock) {
    $('#streams').sortable();
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
$('#streamDota').click(function() {
  stream = "?game=Dota+2&limit=9&callback=?";
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  loadStreams();
});
$('#streamWoW').click(function() {
  stream = "?game=World+of+Warcraft:+Mists+of+Pandaria&limit=9&callback=?";
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  loadStreams();
});
$('#streamProm').click(function() {
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  streamUpdate(streamProm);
});

function emptyStreams() {
  $('#streams').html('');
}

function streamUpdate(selection) {
  if ($('#streams').html()==='') $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
  stream = "?channel=" + selection.toString() + "&callback=?";
  loadStreams();
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
      streamCreate(streamdata[i]);
    }
    streamPlacement();
    setTimeout(function(){if ($('#streams').html()==='' ||$('#streams').html()==='<i class="icon-spinner icon-4x icon-spin"></i>') $('#streams').html('<h2><i class="icon-lemon"></i> no streams available <i class="icon-lemon"></i></h2>')}, 500);
  });
}

function streamPlacement() {
  $('i.icon-spinner').remove();
  for (i=0;i<streamsActive.length;i++) {
    $('#streams').append('<li class="ui-state-default">');
    $('#streams').children().last().append(streamsActive[i]);
    $('#streams').append('</li>');
  }
}

function streamCreate(streamA) {
  streamsActive.push('<section id="' + streamA.name + '"> <h3>' + streamA.name + ' <a class="remove">X</a></h3>' + '<object type="' + flashType + '" height="' + flashHeight + '" width="' + flashWidth + '" id="live_embed_player_flash" data="'+ flashData + '?channel=' + name + '" bgcolor="' + flashColor + '"><param name="allowFullScreen" value="' + flashFS + '" /><param name="allowScriptAccess" value="' + flashSA + '" /><param name="movie" value="' + flashData + '" /><param name="flashvars" value="' + flashVars + streamA.name + '" /></object>' + '<p class="subtext">' + streamA.title + '</p> </section>');
}

$('document').ready(function(){
  loadStreams();
});
