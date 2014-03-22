define('helper/DebuggerHelper',
  ['helper/UrlHelper'],
  function(UrlHelper) {

  //DEBUGGER
  var divDebug = document.createElement('div');
  divDebug.style.position = 'absolute';
  divDebug.style.top = '80px';
  divDebug.style.right = 0;
  divDebug.color = 'white';
  
  if(UrlHelper.isDev()) {
    document.getElementsByTagName('body')[0].appendChild(divDebug);
  }

  function updateDebug() {
    var innerHTML = '';
    for(var i=0, len=arguments.length; i<len; i=i+2) {
      innerHTML = innerHTML + arguments[i] + ' : ' + arguments[i+1] + '<br />';
    }
    divDebug.innerHTML = innerHTML;
  }
  updateDebug('Go', 'oo');

  return {
    updateDebug: function() {
      updateDebug.apply(null, arguments);
    }
  };

});