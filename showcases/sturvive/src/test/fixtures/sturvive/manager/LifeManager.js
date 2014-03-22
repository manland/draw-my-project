define('manager/LifeManager', 
  ['manager/PlayerManager', 'helper/DomHelper'],
  function(PlayerManager, DomHelper) {

  var divLife;

  var build = function build() {
    divLife = DomHelper.addLifeContainer();
    refresh();
  };

  var refresh = function refresh() {
    divLife.innerHTML = '';
    var life = '';
    for(var i=0; i<PlayerManager.getMax('nbLife'); i++) {
      divLife.appendChild(DomHelper.buildLife(i < PlayerManager.get('nbLife')));
    }
  };

  PlayerManager.onLooseLife(refresh);
  PlayerManager.onWinLife(refresh);

  return {

    start: function() {
      build();
    }

  };

});