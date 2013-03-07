var url = "https://api.twitch.tv/kraken/streams";
var stream = "?channel=tobiwandota,versuta,minidota,wagamamatv,netolicrc,sexybamboe,dendi,wepla,alaito&callback=?";
var streamSelection = [];
var streamDota = ["dendi","tobiwandota","starladder1","wagamamatv","onemoregametv2","versuta","4cejkee","beyondthesummit","minidota"];
var streamWoW = ["styrka","affinitiibl","amiye","slootbag","zuperwtf","killars","syiler","sco","healthbar"];
var streamProm = ["styrka","greenyb","healthbar","velna","amiye","kynks"];
var streamdata = [];

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
  streamUpdate(streamDota);
});
$('#streamWoW').click(function() {
  streamUpdate(streamWoW);
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
   $('#streams').html('');
    for (i=0;i<datact;i++) {
      if (i%3===0) {
        $('#streams').append('<article class="row">');
      }
      streamCreate(streamdata[i]);
      if (i%3===2) {
        $('#streams').append('</article>');
      }
    }
    if (i%3!==2) {
      $('#streams').append('</article>');
    }
  });
}

function streamCreate(streamA) {
  $('#streams').children().last().append('<section id="' + streamA.name + '" class="one third padded"> <h3>' + streamA.name + '</h3>' + '<object type="' + flashType + '" height="' + flashHeight + '" width="' + flashWidth + '" id="live_embed_player_flash" data="'+ flashData + '?channel=' + name + '" bgcolor="' + flashColor + '"><param name="allowFullScreen" value="' + flashFS + '" /><param name="allowScriptAccess" value="' + flashSA + '" /><param name="movie" value="' + flashData + '" /><param name="flashvars" value="' + flashVars + name + '" /></object>' + '<p>' + streamA.title + '</p> </section>');
}

$('document').ready(loadStreams());
