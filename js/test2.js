var url = "http://api.justin.tv/api/stream/list.json?channel=";
var stream = "styrka,alinity&callback=?"

$.getJSON(url + stream, function(data) {
  var items = [];
  $.each(data, function(id, node) {
      items.push('<li> ENTRY </li>');
      $.each(node, function(key, val) {
        items.push('<li>' + key + ':' + val + '</li>');
        if(key==='channel') {
          items.push('<li> CHANNEL INFO </li>');
          $.each(val, function(item, iden) {
            items.push('<li>' + item + ':' + iden + '</li>');
          });
          items.push('<li> END CHANNEL INFO </li>');
        }
      });
  });
 
  $('<ul/>', {
    'class': 'list',
    html: items.join('')
  }).appendTo('#streams');
});
