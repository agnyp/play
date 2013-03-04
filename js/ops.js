var url = "http://api.justin.tv/api/stream/list.json?channel=";
var stream = "tobiwandota,versuta,minidota,wagamamatv,netolicrc,sexybamboe,megumixbear,koreyah,alaito&callback=?"
var streamdata = [];
$.getJSON(url + stream, function(data) {
  var datact = 0;
  $.each(data, function(id, node) {
      streamdata[datact] = [];
      $.each(node, function(key, val) {
        streamdata[datact].title = val.title;
        streamdata[datact].viewers = val.stream_count;
        streamdata[datact].game = val.meta_game;
        if(key==='channel') {
          streamdata[datact].stream = val.embed_code;
          streamdata[datact].name = val.login;
        }
      });
      datact++;
  });
  for (i=0;i<datact;i++) {
    if (i%3===0) {
      $('#streams').append('<article class="row">');
    }
    $('#streams').children().last().append('<section id="' + streamdata[i].name + '" class="one third padded"> <h3>' + streamdata[i].name + '</h3>' + streamdata[i].stream + '</section>');
    if (i%3===2) {
      $('#streams').append('</article>');
    }
  }
  if (i%3!==2) {
    $('#streams').append('</article>');
  }
});
