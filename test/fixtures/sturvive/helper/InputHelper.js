define('helper/InputHelper', 
  ['helper/UrlHelper', 'material/ColoredMaterial'], 
  function(UrlHelper, ColoredMaterial) {

  var mainContainer = document.createElement('div');
  mainContainer.classList.add('inputHelperMainContainer');

  if(UrlHelper.isDev()) {
    document.getElementsByTagName('body')[0].appendChild(mainContainer);
  }

  function addRange(div, name, min, max, step, value, onUpdate) {
    var container = document.createElement('div');
    var input = document.createElement('input');
    input.type = 'range';
    input.min = min;
    input.max = max;
    input.value = value || 0;
    input.step = step;
    input.readOnly = false;
    container.appendChild(input);
    var explanation = document.createElement('div');
    explanation.style.width = '200px';
    explanation.style.textAlign = 'center';
    var minSpan = document.createElement('span');
    minSpan.innerHTML = min;
    minSpan.style.cssFloat = 'left';
    explanation.appendChild(minSpan);
    var valSpan = document.createElement('span');
    valSpan.innerHTML = name + ' = ' + value;
    var updateValSpan = function updateValSpan(newVal) {
      valSpan.innerHTML = name + ' = ' + Math.round(newVal * 100) / 100;
    };
    // var inputVal = document.createElement('input');
    // inputVal.type = 'text';
    // inputVal.value = value;
    // inputVal.style = 'width:50px';
    // valSpan.appendChild(inputVal);
    explanation.appendChild(valSpan);
    var maxSpan = document.createElement('span');
    maxSpan.innerHTML = max;
    maxSpan.style.cssFloat = 'right';
    explanation.appendChild(maxSpan);
    container.appendChild(explanation);

    input.oninput = function(){ updateValSpan(this.value); onUpdate(this.value); };
    input.onchange = function(){ updateValSpan(this.value); onUpdate(this.value); };
    // inputVal.onblur = function(){ updateValSpan(this.value); onUpdate(this.value); };

    div.appendChild(container);
  }

  function switchContent(div) {
    //i=0 === title
    for(var i=1, len=div.children.length; i<len; i++) {
      if(div.children[i].style.display === 'none') {
        div.children[i].style.display = 'block';
      } else {
        div.children[i].style.display = 'none';
      }
    }
  }

  function hideContent(div) {
    //i=0 === title
    for(var i=1, len=div.children.length; i<len; i++) {
      div.children[i].style.display = 'none';
    }
  }

  function addXYZComponent(container, name, ctx, functionToCall) {
    var div = createGroup(name);
    var t = {x: 0, y: 0, z:0};
    var _update = function() {
      functionToCall.call(ctx, t.x, t.y, t.z);
    };
    addRange(div, 'x', -100, 100, 0.01, 0, function(newVal) {
      t.x = newVal;
      _update();
    });
    addRange(div, 'y', -100, 100, 0.01, 0, function(newVal) {
      t.y = newVal;
      _update();
    });
    addRange(div, 'z', -100, 100, 0.01, 0, function(newVal) {
      t.z = newVal;
      _update();
    });
    switchContent(div);
    container.appendChild(div);
  }

  function addRGBAComponent(container, name, material, prop) {
    var div = createGroup(name);
    var t = {r: 0, g: 0, b:0, a:0};
    var _update = function() {
      ColoredMaterial.updateProp(material, prop, [t.r, t.g, t.b, t.a]);
    };
    addRange(div, 'r', 0, 1, 0.01, 0, function(newVal) {
      t.r = newVal;
      _update();
    });
    addRange(div, 'g', 0, 1, 0.01, 0, function(newVal) {
      t.g = newVal;
      _update();
    });
    addRange(div, 'b', 0, 1, 0.01, 0, function(newVal) {
      t.b = newVal;
      _update();
    });
    addRange(div, 'a', 0, 1, 0.01, 0, function(newVal) {
      t.a = newVal;
      _update();
    });
    switchContent(div);
    container.appendChild(div);
  }

  function createGroup(name) {
    var div = document.createElement('div');
    div.style.display = 'inline-block';
    div.style.verticalAlign = 'top';
    div.style.padding = '10px';
    div.style.width = '300px';
    var title = document.createElement('div');
    title.innerHTML = name + ' : ';
    title.style.cursor = 'pointer';
    div.appendChild(title);
    title.onclick = function() {
      switchContent(div);
    };
    return div;
  }

  function addEntityManager(name, entity, container) {
    var div = createGroup(name);
    addXYZComponent(div, 'Translation', entity.transformComponent, entity.transformComponent.setTranslation);
    addXYZComponent(div, 'Rotation', entity.transformComponent, entity.transformComponent.setRotation);
    addXYZComponent(div, 'Scale', entity.transformComponent, entity.transformComponent.setScale);
    switchContent(div);
    container.appendChild(div);
    return div;
  }

  function addSimpleLitMaterialManager(name, material, container) {
    var div = createGroup(name);
    addRGBAComponent(div, 'ambient', material, 'materialAmbient');
    addRGBAComponent(div, 'diffuse', material, 'materialDiffuse');
    addRGBAComponent(div, 'emissive', material, 'materialEmissive');
    addRGBAComponent(div, 'specular', material, 'materialSpecular');
    addRange(div, 'specularPower', 0, 100, 1, 0, function(newVal) {
      ColoredMaterial.updateProp(material, 'materialSpecularPower', newVal);
    });
    addRange(div, 'opacity', 0, 1, 0.01, 0, function(newVal) {
      ColoredMaterial.updateProp(material, 'opacity', newVal);
    });
    container.appendChild(div);
    hideContent(div);
    return div;
  }

  function addToonMaterialManager(name, material, container) {
    var div = createGroup(name);
    addRGBAComponent(div, 'HighlightColour', material, 'HighlightColour');
    addRGBAComponent(div, 'MidColour', material, 'MidColour');
    addRGBAComponent(div, 'ShadowColour', material, 'ShadowColour');
    addRange(div, 'HighlightSize', 0, 1, 0.01, 1, function(newVal) {
      ColoredMaterial.updateProp(material, 'HighlightSize', newVal);
    });
    addRange(div, 'OutlineWidth', 0, 1, 0.01, 0.15, function(newVal) {
      ColoredMaterial.updateProp(material, 'OutlineWidth', newVal);
    });
    addRange(div, 'ShadowSize', 0, 1, 0.01, 0.15, function(newVal) {
      ColoredMaterial.updateProp(material, 'ShadowSize', newVal);
    });
    container.appendChild(div);
    hideContent(div);
    return div;
  }

  return {
    entity: function(name, entity, optDiv) {
      optDiv = optDiv || mainContainer;
      var div = addEntityManager(name, entity, optDiv);
      if(optDiv !== mainContainer) {
        hideContent(optDiv);
      }
      return div;
    },
    coloredMaterial: function(name, material, optDiv) {
      optDiv = optDiv || mainContainer;
      var div = addSimpleLitMaterialManager(name, material, optDiv);
      hideContent(optDiv);
      return div;
    },
    toonColoredMaterial: function(name, material, optDiv) {
      optDiv = optDiv || mainContainer;
      var div = addToonMaterialManager(name, material, optDiv);
      hideContent(optDiv);
      return div;
    }
  };

});