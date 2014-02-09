define('util/MapUtil', function() {

	'use strict';

  var currentMap = {
    tutos: -1,
    cleanZone: -1,
    protect: -1,
    race: -1
  };

  if(localStorage.levelUser) {
    try {
      currentMap = JSON.parse(localStorage.levelUser);
    } catch(e) {}
  }

  var tutos = {

    0: {
      name: 'Shoot',
      category: 'tutos',
      level: 0,
      camera: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        return [{position: {x: 0, y:0, z:-7}}];
      },
      scoreToWin: 0
    },

    1: {
      name: 'Move',
      category: 'tutos',
      level: 1,
      camera: {
        position: {x:0, y:0, z:7}
      },
      getEntities: function() {
        return [{position: {x: 5, y:0, z:-7}}, {position: {x: 15, y:0, z:7}}];
      },
      scoreToWin: 0
    },

    2: {
      name: 'Fuel',
      category: 'tutos',
      level: 2,
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:0, y:0, z:-50}
      },
      getEntities: function() {
        return [{position: {x: 0, y:0, z:-100}}];
      },
      scoreToWin: 0
    }

  };

  var cleanZone = {

    0: {
      name: '10 in 2\'',
      category: 'cleanZone',
      level: 0,
      maxTime: 120,
      camera: {
        position: {x:0, y:0, z:0}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<10; i++) {
          var x = ((Math.random()*100)+1)-10;
          var z = ((Math.random()*100)+1)-10;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 1
    },
    1: {
      name: '20 in 2\'',
      category: 'cleanZone',
      level: 1,
      maxTime: 120,
      camera: {
        position: {x:0, y:0, z:0}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<20; i++) {
          var x = ((Math.random()*100)+1)-50;
          var z = ((Math.random()*100)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 1
    },
    2: {
      name: '30 in 2\'',
      category: 'cleanZone',
      level: 2,
      maxTime: 120,
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:10, y:0, z:10}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<30; i++) {
          var x = ((Math.random()*100)+1)-100;
          var z = ((Math.random()*100)+1)-100;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 2
    },
    3: {
      name: '40 in 2\'',
      category: 'cleanZone',
      level: 3,
      maxTime: 120,
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:10, y:0, z:10}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<40; i++) {
          var x = ((Math.random()*100)+1)-100;
          var z = ((Math.random()*100)+1)-100;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 3
    },
    4: {
      name: '50 in 2\'',
      category: 'cleanZone',
      level: 4,
      maxTime: 120,
      camera: {
        position: {x:0, y:0, z:0}
      },
      fuelZone: {
        position: {x:10, y:0, z:10}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<50; i++) {
          var x = ((Math.random()*100)+1)-100;
          var z = ((Math.random()*100)+1)-100;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 5
    }

  };

  var protect = {

    0: {
      name: '10 in 100m',
      category: 'protect',
      level: 0,
      camera: {
        position: {x:10, y:0, z:60}
      },
      starship: {
        position: {x:0, y:0, z:50}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<10; i++) {
          var x = ((Math.random()*10)+1)-10;
          var z = ((Math.random()*40)+1)-40;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      finishZone: {
        position: {x:0, y:0, z:-50}
      },
      scoreToWin: 1
    },
    1: {
      name: '20 in 200m',
      category: 'protect',
      level: 1,
      camera: {
        position: {x:10, y:0, z:110}
      },
      starship: {
        position: {x:0, y:0, z:100}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<20; i++) {
          var x = ((Math.random()*20)+1)-20;
          var z = ((Math.random()*90)+1)-90;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      finishZone: {
        position: {x:0, y:0, z:-100}
      },
      scoreToWin: 2
    },
    2: {
      name: '50 in 500m',
      category: 'protect',
      level: 2,
      camera: {
        position: {x:10, y:0, z:260}
      },
      starship: {
        position: {x:0, y:0, z:250}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<50; i++) {
          var x = ((Math.random()*40)+1)-40;
          var z = ((Math.random()*230)+1)-230;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      finishZone: {
        position: {x:0, y:0, z:-250}
      },
      scoreToWin: 3
    },
    3: {
      name: '70 in 500m',
      category: 'protect',
      level: 3,
      camera: {
        position: {x:10, y:0, z:260}
      },
      starship: {
        position: {x:0, y:0, z:250}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<70; i++) {
          var x = ((Math.random()*40)+1)-40;
          var z = ((Math.random()*230)+1)-230;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      finishZone: {
        position: {x:0, y:0, z:-250}
      },
      scoreToWin: 3
    },
    4: {
      name: '100 in 1000m',
      category: 'protect',
      level: 4,
      camera: {
        position: {x:10, y:0, z:510}
      },
      starship: {
        position: {x:0, y:0, z:500}
      },
      getEntities: function() {
        var entities = [];
        for(var i=0; i<100; i++) {
          var x = ((Math.random()*40)+1)-40;
          var z = ((Math.random()*490)+1)-490;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      finishZone: {
        position: {x:0, y:0, z:-500}
      },
      scoreToWin: 5
    }

  };

  var race = {

    0: {
      name: '1',
      category: 'race',
      level: 0,
      camera: {
        position: {x:0, y:0, z:0}
      },
      finalZone: {
        position: {x:-10, y:0, z:-30}
      },
      nbLife: 0,
      nbBullet: 0,
      getEntities: function() {
        var entities = [];
        for(var i=0; i<50; i++) {
          var x = ((Math.random()*50)+1)-25;
          var z = ((Math.random()*50)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 2
    },
    1: {
      name: '2',
      category: 'race',
      level: 1,
      camera: {
        position: {x:0, y:0, z:0}
      },
      finalZone: {
        position: {x:0, y:0, z:-50}
      },
      nbLife: 0,
      nbBullet: 0,
      getEntities: function() {
        var entities = [];
        for(var i=0; i<80; i++) {
          var x = ((Math.random()*50)+1)-25;
          var z = ((Math.random()*50)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 3
    },
    2: {
      name: '3',
      category: 'race',
      level: 2,
      camera: {
        position: {x:0, y:0, z:0}
      },
      finalZone: {
        position: {x:10, y:0, z:-50}
      },
      nbLife: 0,
      nbBullet: 0,
      getEntities: function() {
        var entities = [];
        for(var i=0; i<100; i++) {
          var x = ((Math.random()*50)+1)-25;
          var z = ((Math.random()*50)+1)-50;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 3
    },
    3: {
      name: '4',
      category: 'race',
      level: 3,
      camera: {
        position: {x:0, y:0, z:0}
      },
      finalZone: {
        position: {x:10, y:0, z:-50}
      },
      nbLife: 0,
      nbBullet: 0,
      getEntities: function() {
        var entities = [];
        for(var i=0; i<120; i++) {
          var x = ((Math.random()*50)+1)-25;
          var z = ((Math.random()*50)+1)-80;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 4
    },
    4: {
      name: '5',
      category: 'race',
      level: 3,
      camera: {
        position: {x:0, y:0, z:0}
      },
      finalZone: {
        position: {x:10, y:0, z:-50}
      },
      nbLife: 0,
      nbBullet: 0,
      getEntities: function() {
        var entities = [];
        for(var i=0; i<150; i++) {
          var x = ((Math.random()*50)+1)-25;
          var z = ((Math.random()*50)+1)-80;
          entities.push({position: {x: x, y:0, z:z}});
        }
        return entities;
      },
      scoreToWin: 5
    }

  };

  var maps = {
    tutos: tutos,
    cleanZone: cleanZone,
    protect: protect,
    race: race
  };

  return {

    getAll: function() {
      return maps;
    },
    getLevels: function() {
      return currentMap;
    },
    increment: function(map) {
      var category = map.category;
      if(map.level > currentMap[category]) {
        currentMap[category] = currentMap[category] + 1;
      }
      localStorage.levelUser = JSON.stringify(currentMap);
    }

  };

});