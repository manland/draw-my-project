define('util/CompatibilityUtil', function() {

	'use strict';

  function hasWebGlContext() {
    try { 
      var canvas = document.createElement('canvas');
      return !!( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
    } catch (x) { 
      return false; 
    }
  }

  //from http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
  function hasCssTransition() {
    try {
      var b = document.body || document.documentElement;
      var s = b.style;
      var p = 'transition';
      if(typeof s[p] === 'string') {return true; }

      // Tests for vendor specific prop
      var v = ['Moz', 'Webkit', 'Khtml', 'O', 'ms'];
      p = p.charAt(0).toUpperCase() + p.substr(1);
      for(var i=0; i<v.length; i++) {
        if(typeof s[v[i] + p] === 'string') { return true; }
      }
    } catch(e) {
      return false;
    }
    return false;
  }

  //from http://diveintohtml5.info/everything.html
  function hasLocalStorage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch(e) {
      return false;
    }
  }

  //from http://diveintohtml5.info/everything.html
  function hasAudioMp3() {
    try {
      var a = document.createElement('audio');
      return !!a.canPlayType &&
        !!(a.canPlayType('audio/mpeg;').replace(/no/, ''));
    } catch(e) {
      return false;
    }
  }

  //from http://diveintohtml5.info/everything.html
  function hasAudioWav() {
    try {
      var a = document.createElement('audio');
      return !!a.canPlayType &&
        !!(a.canPlayType('audio/wav; codecs="1"').replace(/no/, ''));
    } catch(e) {
      return false;
    }
  }

  //from http://diveintohtml5.info/everything.html
  function hasAudioOgg() {
    try {
      var a = document.createElement('audio');
      return !!a.canPlayType &&
        !!(a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));
    } catch(e) {
      return false;
    }
  }

  function hasNavigatorLanguage() {
    try {
      navigator.language.substring(0,2);
      return true;
    } catch(e) {
      return false;
    }
  }

  function hasClassList() {
    try {
      var element = document.createElement('span');
      return 'classList' in element && 'add' in element.classList;
    } catch(e) {
      return false;
    }
  }

  var _hasWebGlContext = hasWebGlContext();
  var _hasCssTransition = hasCssTransition();
  var _hasLocalStorage = hasLocalStorage();
  var _hasAudioMp3 = hasAudioMp3();
  var _hasAudioWav = hasAudioWav();
  var _hasAudioOgg = hasAudioOgg();
  var _hasNavigatorLanguage = hasNavigatorLanguage();
  var _hasClassList = hasClassList();

  return {

    isCompatible: function() {
      return _hasWebGlContext && 
        _hasClassList &&
        (_hasAudioMp3 || _hasAudioWav || _hasAudioOgg);
    },
    isFullCompatible: function() {
      return _hasWebGlContext &&
        _hasCssTransition && 
        _hasClassList &&
        _hasLocalStorage &&
        _hasNavigatorLanguage &&
        (_hasAudioMp3 && _hasAudioWav && _hasAudioOgg);
    },
    nbItemCompatible: function() {
      var nb = 0;
      nb = nb + ((_hasWebGlContext === true) ? 1 : 0);
      nb = nb + ((_hasCssTransition === true) ? 1 : 0);
      nb = nb + ((_hasLocalStorage === true) ? 1 : 0);
      nb = nb + ((_hasAudioMp3 === true) ? 1 : 0);
      nb = nb + ((_hasAudioWav === true) ? 1 : 0);
      nb = nb + ((_hasAudioOgg === true) ? 1 : 0);
      nb = nb + ((_hasClassList === true) ? 1 : 0);
      nb = nb + ((_hasNavigatorLanguage === true) ? 1 : 0);
      return nb;
    },
    nbItem: function() {
      return 8;
    },
    hasWebGlContext: function() {
      return _hasWebGlContext;
    },
    hasCssTransition: function() {
      return _hasCssTransition;
    },
    hasLocalStorage: function() {
      return _hasLocalStorage;
    },
    hasAudioMp3: function() {
      return _hasAudioMp3;
    },
    hasAudioWav: function() {
      return _hasAudioWav;
    },
    hasAudioOgg: function() {
      return _hasAudioOgg;
    },
    hasClassList: function() {
      return _hasClassList;
    },
    hasNavigatorLanguage: function() {
      return _hasNavigatorLanguage;
    }

  };

});