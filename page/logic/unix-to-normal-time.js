function unixToTimeString(unixTimestamp) {
  var d = new Date(unixTimestamp * 1000);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var hour = d.getHours();
  var min = d.getMinutes();
  var sec = d.getSeconds();
  return date + '.' + month + '.' + year + ' ' + hour + ':' + min + ':' + sec ;
}
