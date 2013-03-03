var url = "http://api.justin.tv/api/stream/list.json?channel=";
var stream = "artosis,wagamamatv,aui_2000,protech,steven_bonnell_ii,sodapoppin&callback=?"
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
