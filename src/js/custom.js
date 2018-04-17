// cookie functions
var Cookie = {

  // set cookie
  //
  // @param string cname: name
  // @param string cvalue: cooke value
  // @param int exdays: expiration days
  set: function(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },


  // read cookie
  //
  // @param string key: name of the cookie
  //
  // @return string: cookie value
  read: function(key)
  {
    var result;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? (result[1]) : null;
  }

};

(function() {
  if (Cookie.read('accepted_cookies') != 'true') {
    // show cookie message
    $('#cookie-info').html('<footer class="cookie-footer bg-info padding-15px"><table><tr><td>This website uses cookies to ensure you get the best experience. <a href="https://en.wikipedia.org/wiki/HTTP_cookie" target="_blank">Learn more.</a></td><td><button id="cookie-got-it-button" class="btn btn-primary">Got it!</button></td></tr></table></footer>');

    $('#cookie-got-it-button').on('click', function() {
      $(this).prop('disabled', true);
      Cookie.set('accepted_cookies', 'true', 10000);
      $('.cookie-footer').remove();
    });
  }
})();



function map(x, inMin, inMax, outMin, outMax) { return (x-inMin) * (outMax-outMin) / (inMax-inMin) + outMin; } // maps a value

function round(x) {
  return x.toExponential(4);
}

function roundMathJax(x) {
  var str = round(x).replace('e+0', '').replace('e+', 'e');
  if (str.replace('e', '').length !== str.length) {
    // exponent existing
    str = str.replace('e', ' \\cdot 10^{') + '}';
  }
  return str;
}