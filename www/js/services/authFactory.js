app.service('Auth', function (furl) {

  var ref = new Firebase(furl);

  return { ref: function(){
    return ref;
  }};

});
