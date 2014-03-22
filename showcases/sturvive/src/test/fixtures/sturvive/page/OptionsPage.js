define('page/OptionsPage',
  ['helper/DomHelper', 'helper/LangHelper', 'util/OptionsUtil'],
  function(DomHelper, LangHelper, OptionsUtil) {

    var backCallback;

    function build() {
      DomHelper.clearPageContent();
      DomHelper.addPageTitle(LangHelper.get('optionsTitle'));
      DomHelper.addPageBackButton(
        LangHelper.get('back'),
        backCallback
      );
      var mainDiv = DomHelper.addContainer('options');
      mainDiv.appendChild(buildScreenSize());
      mainDiv.appendChild(buildMeshDetails());
      mainDiv.appendChild(buildResetOptions());
    }

    var buildScreenSize = function buildScreenSize() {
      var sizeScreenDiv = DomHelper.buildDiv('sizeScreenContainer');
      var sizeScreenViewContainer = DomHelper.buildDiv('sizeScreenViewContainer');
      var sizeScreenView = DomHelper.buildDiv('sizeScreenView');
      var buttonsDiv = DomHelper.buildDiv('buttonContainer');
      sizeScreenViewContainer.appendChild(sizeScreenView);
      buttonsDiv.appendChild(DomHelper.buildButton('30%', function() {
        sizeScreenView.style.width = '30%';
        sizeScreenView.style.height = '30%';
        sizeScreenView.innerHTML = '30%';
        OptionsUtil.update('screenSize', 0.3);
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('50%', function() {
        sizeScreenView.style.width = '50%';
        sizeScreenView.style.height = '50%';
        sizeScreenView.innerHTML = '50%';
        OptionsUtil.update('screenSize', 0.5);
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('100%', function() {
        sizeScreenView.style.width = '99%';
        sizeScreenView.style.height = '99%';
        sizeScreenView.innerHTML = '100%';
        OptionsUtil.update('screenSize', 1);
      }));
      if(OptionsUtil.get('screenSize') === 0.3) {
        sizeScreenView.style.width = '30%';
        sizeScreenView.style.height = '30%';
        sizeScreenView.innerHTML = '30%';
      } else if(OptionsUtil.get('screenSize') === 0.5) {
        sizeScreenView.style.width = '50%';
        sizeScreenView.style.height = '50%';
        sizeScreenView.innerHTML = '50%';
      } else {
        sizeScreenView.style.width = '99%';
        sizeScreenView.style.height = '99%';
        sizeScreenView.innerHTML = '100%';
      }
      sizeScreenDiv.appendChild(DomHelper.buildTitle('ScreenSize'));
      sizeScreenDiv.appendChild(buttonsDiv);
      sizeScreenDiv.appendChild(sizeScreenViewContainer);
      return sizeScreenDiv;
    };

    var buildMeshDetails = function buildMeshDetails() {
      var meshDetailsDiv = DomHelper.buildDiv('meshDetailsContainer');
      var buttonsDiv = DomHelper.buildDiv('buttonContainer');
      buttonsDiv.appendChild(DomHelper.buildButton('30%', function() {
        OptionsUtil.update('meshDetails', 1);
        meshDetailsViewDiv.innerHTML = '30%';
        meshDetailsViewDiv.style.color = 'rgba(0,0,0,0.3)';
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('50%', function() {
        OptionsUtil.update('meshDetails', 3);
        meshDetailsViewDiv.innerHTML = '50%';
        meshDetailsViewDiv.style.color = 'rgba(0,0,0,0.65)';
      }));
      buttonsDiv.appendChild(DomHelper.buildButton('100%', function() {
        OptionsUtil.update('meshDetails', 10);
        meshDetailsViewDiv.innerHTML = '100%';
        meshDetailsViewDiv.style.color = 'rgba(0,0,0,1)';
      }));
      var meshDetailsViewDiv = DomHelper.buildDiv('meshDetailsView');
      if(OptionsUtil.get('meshDetails') === 1) {
        meshDetailsViewDiv.innerHTML = '30%';
        meshDetailsViewDiv.style.color = 'rgba(0,0,0,0.3)';
      } else if(OptionsUtil.get('meshDetails') === 3) {
        meshDetailsViewDiv.innerHTML = '50%';
        meshDetailsViewDiv.style.color = 'rgba(0,0,0,0.65)';
      } else {
        meshDetailsViewDiv.innerHTML = '100%';
        meshDetailsViewDiv.style.color = 'rgba(0,0,0,1)';
      }
      meshDetailsDiv.appendChild(DomHelper.buildTitle('MeshDetails'));
      meshDetailsDiv.appendChild(buttonsDiv);
      meshDetailsDiv.appendChild(meshDetailsViewDiv);
      return meshDetailsDiv;
    };

    var buildResetOptions = function buildResetOptions() {
      var resetOptionsDiv = DomHelper.buildDiv('resetOptionsContainer');
      resetOptionsDiv.appendChild(DomHelper.buildButton(LangHelper.get('optionsResetOptions'), function() {
        localStorage.options = undefined;
        localStorage.levelUser = undefined;
        localStorage.optionsPlayer = undefined;
        location.reload();
      }));
      return resetOptionsDiv;
    };

    return {
      show: function(back) {
        backCallback = back;
        build();
      }
    };

  }
);