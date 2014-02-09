define('page/PausePage',
  ['helper/DomHelper', 
  'helper/LangHelper', 
  'page/GamePage',
  'page/HelpPage', 
  'page/OptionsPage', 
  'page/CompatibilityPage',
  'util/CompatibilityUtil'],
  function(DomHelper, LangHelper, 
    GamePage, HelpPage, OptionsPage, CompatibilityPage, CompatibilityUtil) {

    var backCallback;
    var showMenuCallback;

    var build = function build() {
      DomHelper.clearPageContent();

      DomHelper.addPageTitle(LangHelper.get('pauseTitle'));
      DomHelper.addPageButton(
        LangHelper.get('pauseMainMenu'),
        showMenuCallback
      );
      DomHelper.addPageButton(
        LangHelper.get('pauseHelp'),
        function(e) { HelpPage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('pauseOptions'),
        function(e) { OptionsPage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('pauseRestart'),
        backCallback
      );
    };

    return {
      show: function(back, showMenu) {
        backCallback = back;
        showMenuCallback = showMenu;
        build();
      }
    };

  }
);