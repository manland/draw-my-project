define('page/ChooseNextMapPage',
  ['helper/DomHelper', 'helper/LangHelper', 'util/MapUtil'],
  function(DomHelper, LangHelper, MapUtil) {

    var backCallback;
    var chooseCallback;

    function build() {
      DomHelper.clearPageContent();
      scoreDiv = DomHelper.addPageTitle(LangHelper.get('chooseNextMapTitle'));

      var mainDiv = DomHelper.addContainer('chooseNextMap');
      var maps = MapUtil.getAll();
      var levels = MapUtil.getLevels();
      mainDiv.appendChild(buildColumn('tutos', maps.tutos, levels.tutos));
      mainDiv.appendChild(buildColumn('cleanZone', maps.cleanZone, levels.cleanZone, levels.tutos === -1));
      mainDiv.appendChild(buildColumn('protect', maps.protect, levels.protect, levels.cleanZone === -1));
      mainDiv.appendChild(buildColumn('race', maps.race, levels.race, levels.protect === -1));

      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
    }

    var buildColumn = function buildColumn(category, maps, level, forceDesable) {
      var columnContainer = DomHelper.buildDiv('columnContainer');
      var titleDiv = DomHelper.buildTitle(LangHelper.get('chooseNextMap' + category));
      columnContainer.appendChild(titleDiv);
      
      function makeCallback(isDisable, map) {
        return function() {
          if(!isDisable) {
            chooseCallback(map);
          }
        };
      }

      for(var key in maps) {
        var map = maps[key];
        var isDisable = forceDesable || (level+1) < key;
        var b = DomHelper.buildButton(map.name, makeCallback(isDisable, map));
        var divScore = DomHelper.buildDiv('mapScoreToWin');
        divScore.innerHTML = map.scoreToWin + '';
        b.appendChild(divScore);
        if(isDisable) {
          b.classList.add('disabled');
        }
        columnContainer.appendChild(b);
      }
      return columnContainer;
    };

    return {
      show: function(back, choose) {
        backCallback = back;
        chooseCallback = choose;
        build();
      }
    };

  }
);