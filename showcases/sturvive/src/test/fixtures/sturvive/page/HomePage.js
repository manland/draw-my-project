define('page/HomePage',
  ['helper/DomHelper', 
  'helper/LangHelper', 
  'page/GamePage',
  'page/HelpPage', 
  'page/OptionsPage', 
  'page/CompatibilityPage',
  'util/CompatibilityUtil',
  'util/ScreenUtil',
  'util/AudioUtil'
  ],
  function(DomHelper, LangHelper, 
    GamePage, HelpPage, OptionsPage, CompatibilityPage, 
    CompatibilityUtil, ScreenUtil, AudioUtil) {

    // document.body.style.height = ScreenUtil.getHeight() + 'px';
    // document.body.style.width = ScreenUtil.getWidth() + 'px';

    ScreenUtil.onResize(function() {
      // document.body.style.height = ScreenUtil.getHeight() + 'px';
      // document.body.style.width = ScreenUtil.getWidth() + 'px';
    });

    var audioManager;

    var build = function build() {
      DomHelper.clearPageContent();

      //LANGS
      var langs = DomHelper.addContainer('langs');
      var enButton = DomHelper.buildButton('', function(e) { location.hash = '#en'; location.reload(); });
      enButton.classList.remove('button');
      enButton.classList.add('lang');
      enButton.classList.add('en');
      if(LangHelper.getCurrentLang() === 'en') {
        enButton.classList.add('active');
      }
      langs.appendChild(enButton);
      var frButton = DomHelper.buildButton('', function(e) { location.hash = '#fr'; location.reload(); });
      frButton.classList.remove('button');
      frButton.classList.add('lang');
      frButton.classList.add('fr');
      if(LangHelper.getCurrentLang() === 'fr') {
        frButton.classList.add('active');
      }
      langs.appendChild(frButton);

      //AUDIO
      if(!audioManager) {
        audioManager = DomHelper.buildButton('', function() {
          if(AudioUtil.isEnable() === true) {
            AudioUtil.disable();
            audioManager.classList.remove('active');
          } else if(AudioUtil.canBeEnable()) {
            AudioUtil.enable();
            audioManager.classList.add('active');
          }
        });
        audioManager.classList.remove('button');
        audioManager.classList.add('audio');
        if(AudioUtil.canBeEnable() === true) {
          audioManager.classList.add('active');
          //load all songs (in songs array on top of this class) at start 
          AudioUtil.loadAllSongs();
        } else {
          AudioUtil.disable();
        }
        document.body.appendChild(audioManager);
      } else {
        audioManager.style.display = 'block';
      }

      //HOME PAGE
      DomHelper.addPageTitle(LangHelper.get('title'));
      DomHelper.addPageButton(
        LangHelper.get('homeStart'),
        function(e) { GamePage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('homeHelp'),
        function(e) { HelpPage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('homeOptions'),
        function(e) { OptionsPage.show(build); }
      );
      DomHelper.addPageButton(
        LangHelper.get('homeCompatibility') + ' ' + CompatibilityUtil.nbItemCompatible() + '/' + CompatibilityUtil.nbItem(),
        function(e) { CompatibilityPage.show(build); }
      );
    };

    return {
      show: function() {
        build();
      }
    };

  }
);