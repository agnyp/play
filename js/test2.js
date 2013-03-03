var url = "http://api.justin.tv/api/stream/list.json?channel=";
var stream = "styrka,alinity&callback=?"

$.getJSON(url + stream, function(data) {
  var items = [];
  $.each(data, function(id, node) {
      $.each(node, function(key, val) {
        if(key==='channel') {
          $.each(val, function(item, iden) {
            items.push('<li>' + item + ':' + iden + '</li>');
          });
        }
      });
  });
 
  $('<ul/>', {
    'class': 'list',
    html: items.join('')
  }).appendTo('#stream1');
});
