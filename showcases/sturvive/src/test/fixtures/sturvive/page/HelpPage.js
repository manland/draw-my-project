define('page/HelpPage',
  ['helper/DomHelper', 'helper/LangHelper', 'helper/MobileHelper'],
  function(DomHelper, LangHelper, MobileHelper) {

    var backCallback;

    var device = MobileHelper.isMobile() ? 'mobile' : 'pc';
    var lang = LangHelper.getCurrentLang();

    var help = [
      {
        image: 'assets/img/help/'+lang+'/1.png',
        resume: LangHelper.get('help_start'),
        sentences: []
      },
      {
        image: 'assets/img/help/'+device+'/0.png',
        resume: LangHelper.get('help_0'),
        sentences: [LangHelper.get('help_0_1'), LangHelper.get('help_0_2'), LangHelper.get('help_0_3'), LangHelper.get('help_0_4'), LangHelper.get('help_0_5'), LangHelper.get('help_0_6'), LangHelper.get('help_0_7'), LangHelper.get('help_0_8'), LangHelper.get('help_0_9')]
      },
      {
        image: 'assets/img/help/'+device+'/4.png',
        resume: LangHelper.get('help_4'),
        sentences: [LangHelper.get('help_4_1')]
      },
      {
        image: 'assets/img/help/'+device+'/1.png',
        resume: LangHelper.get('help_1'),
        sentences: [LangHelper.get('help_1_1'), LangHelper.get('help_1_2')]
      },
      {
        image: 'assets/img/help/'+device+'/2.png',
        resume: LangHelper.get('help_2'),
        sentences: [LangHelper.get('help_2_1'), LangHelper.get('help_2_2')]
      },
      {
        image: 'assets/img/help/'+device+'/3.png',
        resume: LangHelper.get('help_3'),
        sentences: [LangHelper.get('help_3_1'), LangHelper.get('help_3_2')]
      },
      {
        image: 'assets/img/help/'+lang+'/2.png',
        resume: LangHelper.get('help_bonus'),
        sentences: []
      },
    ];
    var currentHelp = 0;

    var title;
    var img;
    var sentence;
    var prevButton, nextButton;

    var buildTitle = function buildTitle() {
      return LangHelper.get('helpTitle') + ' ' +
        (currentHelp+1) + '/' + help.length;
    };

    function build() {
      DomHelper.clearPageContent();
      title = DomHelper.addPageTitle(buildTitle());
      buildContent();
      prevButton = DomHelper.addPageSmallButton(
        LangHelper.get('prev'),
        function(e) {
          if(currentHelp > 0) {
            currentHelp = currentHelp - 1;
            buildContent();
            refreshButtons();
          }
        }
      );
      nextButton = DomHelper.addPageSmallButton(
        LangHelper.get('next'),
        function(e) {
          if(currentHelp < help.length - 1) {
            currentHelp = currentHelp + 1;
            buildContent();
            refreshButtons();
          }
        }
      );
      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
      refreshButtons();
    }

    var buildContent = function buildContent() {
      var h = help[currentHelp];
      title.innerHTML = buildTitle();
      if(!img) {
        img = DomHelper.addPageImg(h.image, '');
        sentence = DomHelper.addContainer('sentences');
      } else {
        img.src = h.image;
        img.title = '';
      }
      var ol = document.createElement('ol'), li;
      for(var i=0, len=h.sentences.length; i<len; i++) {
        li = document.createElement('li');
        li.innerHTML = h.sentences[i];
        ol.appendChild(li);
      }
      sentence.innerHTML = h.resume;
      sentence.appendChild(ol);
    };

    var refreshButtons = function refreshButtons() {
      if(currentHelp <= 0) {
        prevButton.classList.add('disabled');
      } else {
        prevButton.classList.remove('disabled');
      }
      if(currentHelp >= help.length - 1) {
        nextButton.classList.add('disabled');
      } else {
        nextButton.classList.remove('disabled');
      }
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);