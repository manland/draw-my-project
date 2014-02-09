define('page/BonusPage',
  ['helper/DomHelper', 'helper/LangHelper', 'manager/PlayerManager'],
  function(DomHelper, LangHelper, PlayerManager) {

    var backCallback;
    var scoreDiv;

    function build() {
      DomHelper.clearPageContent();
      scoreDiv = DomHelper.addPageTitle(LangHelper.get('bonusTitle'));
      refreshScore();

      var mainDiv = DomHelper.addContainer('bonus');
      mainDiv.appendChild(buildExplanation());
      mainDiv.appendChild(buildBonus('nbLife'));
      mainDiv.appendChild(buildBonus('nbBulletAtStart'));
      mainDiv.appendChild(buildBonus('bulletPower'));
      mainDiv.appendChild(buildBonus('bulletLife'));
      mainDiv.appendChild(buildBonus('speed'));
      mainDiv.appendChild(buildBonus('fuelLoss'));

      DomHelper.addPageBackButton(
        LangHelper.get('backBonus'),
        backCallback
      );
    }

    var buildExplanation = function buildExplanation() {
      var div = DomHelper.addContainer('bonusExplanation');
      div.innerHTML = LangHelper.get('bonusExplanation');
      return div;
    };

    var refreshScore = function refreshScore() {
      scoreDiv.innerHTML = LangHelper.get('bonusTitle') + ' : ' + PlayerManager.get('score') + ' ';
      var span = document.createElement('span');
      span.classList.add('bonusSymbol');
      span.innerHTML = '';
      scoreDiv.appendChild(span);
    };

    var labelBonus = function labelBonus(key) {
      var value = PlayerManager.get(key);
      var max = PlayerManager.getMax(key);
      return LangHelper.get(key+'Bonus') + ' ' + value + '/' + max;
    };

    var isEnableBonus = function isEnableBonus(key) {
      var isMinBonus = key === 'fuelLoss';
      return PlayerManager.get(key) < PlayerManager.getMax(key) || 
      (isMinBonus && PlayerManager.get(key) > PlayerManager.getMax(key));
    };

    var buildBonus = function buildBonus(key) {
      var b = DomHelper.buildButton(labelBonus(key), function() {
        if(isEnableBonus(key)) {
          PlayerManager.update(key);
          PlayerManager.update('score', PlayerManager.get('score') - 1);
          refreshScore();
          b.innerHTML = labelBonus(key);
          if(PlayerManager.get('score') <= 0) {
            backCallback();
          } else if(!isEnableBonus(key)) {
            b.classList.add('disabled');
            b.disabled = true;
          }
        }
      });
      if(!isEnableBonus(key)) {
        b.classList.add('disabled');
        b.disabled = true;
      }
      return b;
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);