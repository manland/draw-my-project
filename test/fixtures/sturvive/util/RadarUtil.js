define('util/RadarUtil', 
  ['helper/DomHelper', 'helper/EntityHelper', 'manager/EntityManager'],
  function(DomHelper, EntityHelper, EntityManager) {

	'use strict';

  var div;
  var lastEntities, heightZoneMax = 50, widthZoneMax = 50;
  var entityByDiv = {};
  var camera, fuelZone, starship, finishZone, finalZone;
  var divCameraElem, divStarshipElem;

  var draw = function draw(c, f, s, fz, finalZ) {
    camera = c;
    fuelZone = f;
    starship = s;
    finishZone = fz;
    finalZone = finalZ;
    if(!div) {
      div = DomHelper.addRadar();
      divCameraElem = DomHelper.buildDiv('radarCamera');
      div.appendChild(divCameraElem);
      camera.script.onRun(updateCamera);
      divStarshipElem = DomHelper.buildDiv('radarStarship');
      div.appendChild(divStarshipElem);
      starship.script.onRun(updateStarship);
      starship.onDead(updateStarship);
    }
    if(lastEntities) {
      refresh(lastEntities);
    }
  };

  var updateCamera = function updateCamera() {
    var pos = EntityHelper.getPosition(camera.entity);
    divCameraElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
    divCameraElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
  };

  var updateStarship = function updateStarship() {
    var pos = EntityHelper.getPosition(starship.entity);
    if(pos.y === 0 && !starship.isDead()) {
      divStarshipElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
      divStarshipElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
      divStarshipElem.style.display = 'block';
    } else {
      divStarshipElem.style.display = 'none';
    }
  };
      
  var refresh = function refresh(entities) {
    lastEntities = entities;
    if(div) {
      div.setAttribute('nbentities', entities.length);
      div.innerHTML = '';
      entityByDiv = {};
      var zoneSize = 100;
      var maxX=zoneSize, maxZ=zoneSize, i=0, len=entities.length, pos, divElem;
      for(i=0; i<len; i++) {
        pos = EntityHelper.getPosition(entities[i].entity);
        if(Math.abs(pos.x) > maxX) {
          maxX = pos.x;
        }
        if(Math.abs(pos.z) > maxZ) {
          maxZ = pos.z;
        }
      }
      heightZoneMax = zoneSize / (maxZ * 2);
      widthZoneMax = zoneSize / (maxX * 2);
      for(i=0; i<len; i++) {
        divElem = DomHelper.buildDiv('radarEntity');
        pos = EntityHelper.getPosition(entities[i].entity);
        divElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
        divElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
        div.appendChild(divElem);
        entityByDiv[entities[i].entity.name] = divElem;
      }

      divElem = DomHelper.buildDiv('radarFuelZone');
      pos = EntityHelper.getPosition(fuelZone.entity);
      if(pos.y === 0) {//else not use
        divElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
        divElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
        div.appendChild(divElem);
      }

      divElem = DomHelper.buildDiv('radarFinishZone');
      pos = EntityHelper.getPosition(finishZone.entity);
      if(pos.y === 0) {//else not use
        divElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
        divElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
        div.appendChild(divElem);
      }

      divElem = DomHelper.buildDiv('radarFinalZone');
      pos = EntityHelper.getPosition(finalZone.entity);
      if(pos.y === 0) {//else not use
        divElem.style.top = ((pos.z*heightZoneMax) + 50) + 'px';
        divElem.style.left = ((pos.x*widthZoneMax) + 50) + 'px';
        div.appendChild(divElem);
      }

      div.appendChild(divCameraElem);
      updateCamera();
      div.appendChild(divStarshipElem);
      updateStarship();
    }
  };

  var remove = function remove(entity, len) {
    if(div && entity && entityByDiv[entity.name]) {
      div.removeChild(entityByDiv[entity.name]);
      delete entityByDiv[entity.name];
      div.setAttribute('nbentities', Object.keys(entityByDiv).length);
    }
  };

  EntityManager.onNewEntities(refresh);
  EntityManager.onRemoveEntity(remove);

  return {

    draw: function(camera, fuelZone, starship, finishZone, finalZone) {
      draw(camera, fuelZone, starship, finishZone, finalZone);
    }

  };

});