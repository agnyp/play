var url = "http://api.justin.tv/api/stream/list.json?channel=";
var stream = "tobiwandota,dotademon,h4nn1,universedota,netolicrc,sexybamboe,megumixbear,koreyah,alaito&callback=?"
var streamdata = [];
$.getJSON(url + stream, function(data) {
  var datact = 0;
  $.each(data, function(id, node) {
      $.each(node, function(key, val) {
        if(key==='channel') {
          streamdata[datact] = [];
          streamdata[datact].stream = val.embed_code;
          streamdata[datact].name = val.login;
          datact++;
        }
      });
  });
  for (i=0;i<datact;i++) {
    $('#stream'+i).append('<h3>' + streamdata[i].name + '</h3>' + streamdata[i].stream);
  }
});
