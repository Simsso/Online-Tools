function unixToTimeString(unixTimestamp) {
  var d = new Date(unixTimestamp * 1000);
  var year = d.getFullYear();
  var monthStrings = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var month = monthStrings[d.getMonth()];
  var date = ('0' + d.getDate()).substr(-2);
  var hour = ('0' + d.getHours()).substr(-2);
  var min = ('0' + d.getMinutes()).substr(-2);
  var sec = ('0' + d.getSeconds()).substr(-2);

  return date + '. ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
}
