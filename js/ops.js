var url = "https://api.twitch.tv/kraken/streams";
var stream = "?limit=9&callback=?";
var streamSelection = [];
var streamProm = ["styrka","greenyb","healthbar","velna","amiye","kynks","shuttle08","gnorrior","archidel"];
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
});
$('#streamRemove').click(function() {
  removeA(streamSelection, $('#streamName').val());
  $('#streamName').val('');
});
$('#streamUpdate').click(function() {
  if (streamSelection.length !== 0) streamUpdate(streamSelection);
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
  streamUpdate(streamProm);
});

function streamCategory(selection) {

  $('#streams').html('');
  loadStreams();
}
function streamUpdate(selection) {
  stream = "?channel=" + selection.toString() + "&callback=?";
  $('#streams').html('<i class="icon-spinner icon-4x icon-spin"></i>');
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
    if ($('#streams').html()==='') $('#streams').html('<h2><i class="icon-lemon"></i> no streams available <i class="icon-lemon"></i></h2>');
  });
}

function streamPlacement() {
  $('#streams').html('');
  for (i=0;i<streamsActive.length;i++) {
    if (i%3===0) {
      $('#streams').append('<article class="row">');
    }
    $('#streams').children().last().append(streamsActive[i]);
    if (i%3===2) {
      $('#streams').append('</article>');
    }
  }
  if (i%3!==2) {
    $('#streams').append('</article>');
  }
}

function streamCreate(streamA) {
  streamsActive.push('<section id="' + streamA.name + '" class="one third padded"> <h3>' + streamA.name + '</h3>' + '<object type="' + flashType + '" height="' + flashHeight + '" width="' + flashWidth + '" id="live_embed_player_flash" data="'+ flashData + '?channel=' + name + '" bgcolor="' + flashColor + '"><param name="allowFullScreen" value="' + flashFS + '" /><param name="allowScriptAccess" value="' + flashSA + '" /><param name="movie" value="' + flashData + '" /><param name="flashvars" value="' + flashVars + streamA.name + '" /></object>' + '<p>' + streamA.title + '</p> </section>');
}

$('document').ready(loadStreams());
