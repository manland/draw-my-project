define('page/CompatibilityPage',
  ['helper/DomHelper', 'helper/LangHelper', 'util/CompatibilityUtil'],
  function(DomHelper, LangHelper, CompatibilityUtil) {

    var backCallback;

    var buildCompatibility = function buildCompatibility(name, isCompatible, description) {
      return ['<li class="compatibility ', isCompatible, '">',
        name,
        '<span class="description">', description, '</span>',
        '</li>'].join('');
    };

    function build() {
      DomHelper.clearPageContent();
      DomHelper.addPageTitle(LangHelper.get('compatibilityTitle'));

      var noCompatible = '';
      if(CompatibilityUtil.isCompatible() === false) {
        noCompatible = LangHelper.get('compatibilityPageNoCompatible');
      } else if(CompatibilityUtil.isCompatible() === true && CompatibilityUtil.isFullCompatible() === false) {
        noCompatible = LangHelper.get('compatibilityPageNoFullCompatible');
      }
      var container = DomHelper.addPageSentence('');
      container.innerHTML = [
        '<div class="content">', noCompatible, '</div><ul>',
        buildCompatibility('Web GL', CompatibilityUtil.hasWebGlContext(), LangHelper.get('compatibilityWebGLDescription')),
        buildCompatibility('Css transition', CompatibilityUtil.hasCssTransition(), LangHelper.get('compatibilityCssTransitionDescription')),
        buildCompatibility('Css class list', CompatibilityUtil.hasClassList(), LangHelper.get('compatibilityClassListDescription')),
        buildCompatibility('Local storage', CompatibilityUtil.hasLocalStorage(), LangHelper.get('compatibilityLocalStorageDescription')),
        buildCompatibility('Audio mp3', CompatibilityUtil.hasAudioMp3(), LangHelper.get('compatibilityMp3Description')),
        buildCompatibility('Audio wav', CompatibilityUtil.hasAudioWav(), LangHelper.get('compatibilityWavDescription')),
        buildCompatibility('Audio ogg', CompatibilityUtil.hasAudioOgg(), LangHelper.get('compatibilityOggDescription')),
        buildCompatibility('Navigator language', CompatibilityUtil.hasNavigatorLanguage(), LangHelper.get('compatibilityNavigatorLanguageDescription')),
        '</ul>'
      ].join('');

      var buttonText = LangHelper.get('back');
      if(CompatibilityUtil.isCompatible() === false) {
        buttonText = LangHelper.get('compatibilityPageTryBack');
      }

      DomHelper.addPageBackButton(
        buttonText,
        backCallback
      );
    }

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);