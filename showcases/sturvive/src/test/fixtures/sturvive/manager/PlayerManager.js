define('manager/PlayerManager', function() {

  var initNbBullet = 30;

  var onLooseLifeCallback = [];
  var onWinLifeCallback = [];

  var maxOptions = {
    nbLife: 3,
    nbBulletAtStart: 150,//IN PROGRESS, display nb bullets in game
    nbBulletPerShoot: 3,//TODO
    bulletPower: 5,
    bulletLife: 10,
    fuelLoss: 0.1,
    speed: 2
  };

  var defaultOptions = {
    nbLife: maxOptions.nbLife,
    nbBullet: initNbBullet,//IN PROGRESS, display nb bullets in game
    nbBulletAtStart: initNbBullet,
    nbBulletPerShoot: 1,//TODO
    bulletPower: 1,
    bulletLife: 1,
    fuelLoss: 0.5,
    speed: 1,
    starLife: 1,
    score: 0
  };

  var options = defaultOptions;
  if(localStorage.optionsPlayer) {
    try {
      options = JSON.parse(localStorage.optionsPlayer);
    } catch(e) {}
  }

  options.nbLife = maxOptions.nbLife;//At begin we have always 3 lifes
  options.nbBullet = options.nbBulletAtStart;

  return {

    get: function(key) {
      return options[key];
    },
    getMax: function(key) {
      return maxOptions[key];
    },
    update: function(key, v) {
      var value = v !== undefined ? v : options[key];
      if(key === 'nbLife') {
        value = value + 1;
      } else if(key === 'nbBulletAtStart') {
        value = value + 10;
      } else if(key === 'bulletPower') {
        value = value + 1;
      } else if(key === 'bulletLife') {
        value = value + 1;
      } else if(key === 'speed') {
        value = ((value * 10) + 1) / 10;
      } else if(key === 'fuelLoss') {
        value = ((value * 10) - 1) / 10;
      }
      options[key] = value;
      localStorage.optionsPlayer = JSON.stringify(options);
    },
    minusBullet: function() {
      options.nbBullet = options.nbBullet - options.nbBulletPerShoot;
    },
    reinitNbBullet: function() {
      options.nbBullet = options.nbBulletAtStart;
    },
    setNbBullet: function(nb) {
      options.nbBullet = nb;
    },
    looseLife: function() {
      options.nbLife = options.nbLife - 1;
      for(var i=0, len=onLooseLifeCallback.length; i<len; i++) {
        onLooseLifeCallback[i]();
      }
    },
    onLooseLife: function(callback) {
      onLooseLifeCallback.push(callback);
    },
    winLife: function() {
      options.nbLife = options.nbLife + 1;
      for(var i=0, len=onWinLifeCallback.length; i<len; i++) {
        onWinLifeCallback[i]();
      }
    },
    onWinLife: function(callback) {
      onWinLifeCallback.push(callback);
    },
    getBulletPercent: function() {
      return Math.round((options.nbBullet / options.nbBulletAtStart) * 100);
    },
    reinitLife: function() {
      options.nbLife = maxOptions.nbLife;
      for(var i=0, len=onWinLifeCallback.length; i<len; i++) {
        onWinLifeCallback[i]();
      }
    },
    setNbLife: function(nbLife) {
      options.nbLife = nbLife;
      for(var i=0, len=onWinLifeCallback.length; i<len; i++) {
        onWinLifeCallback[i]();
      }
    }

  };

});