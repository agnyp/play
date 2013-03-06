var url = "https://api.twitch.tv/kraken/streams?channel=";
var stream = "sodapoppin,alinity&callback=?"

$.getJSON(url + stream, function(data) {
  var items = [];
  $.each(data, function(id, node) {
      items.push('<li> ENTRY </li>');
      $.each(node, function(key, val) {
        items.push('<li>' + key + ':' + val + '</li>');
          items.push('<li> CHANNEL INFO </li>');
          $.each(val, function(item, iden) {
            items.push('<li>' + item + ':' + iden + '</li>');
            if(item==='channel') {
              items.push('<li> CONTENTS </li>');
              $.each(iden, function(one, two) {
                items.push('<li>' + one + ':' + two + '</li>');
              });
              items.push('<li> END CONTENTS </li>');
            };
          });
          items.push('<li> END CHANNEL INFO </li>');
      });
  });
 
  $('<ul/>', {
    'class': 'list',
    html: items.join('')
  }).appendTo('#streams');
});
