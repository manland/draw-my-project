define('util/AudioUtil', 
  ['util/CompatibilityUtil'],
  function(CompatibilityUtil) {

    'use strict';

    var audioPlayers = {};
    var isEnable = true;
    var loadInProgress = true;
    var lastSongPlayed = 'song';
    var songs = ['click', 'shoot', 'loose', 'song'];

    function buildAudioPlayer(name) {
      var a = document.createElement('audio');
      var s = document.createElement('source');
      s.src = 'assets/audio/'+name+'.wav';
      s.type = 'audio/wav';
      a.appendChild(s);
      s = document.createElement('source');
      s.src = 'assets/audio/'+name+'.mp3';
      s.type = 'audio/mpeg';
      a.appendChild(s);
      s = document.createElement('source');
      s.src = 'assets/audio/'+name+'.ogg';
      s.type = 'audio/ogg';
      a.appendChild(s);
      a.load();
      return a;
    }

    function startSong(player, loop, optForceNew) {
      if(isEnable === true && AudioUtil.canBeEnable() === true && loadInProgress === false) {
        var name = player;
        if(audioPlayers[name] === undefined || optForceNew === true) {
          audioPlayers[name] = buildAudioPlayer(player);
        }
        if(loop === true) {
          audioPlayers[name].loop = true;
        }
        audioPlayers[name].time = 0;
        audioPlayers[name].play();
      }
    }

    function stopSong(player, optSuffixe) {
      var name = player;
      if(optSuffixe !== undefined) {
        name = name + optSuffixe;
      }
      if(audioPlayers[name] !== undefined) {
        audioPlayers[name].pause();
      }
    }

    function loadAllSongs() {
      for(var i=0, len=songs.length; i<len; i++) {
        audioPlayers[songs[i]] = buildAudioPlayer(songs[i]);
      }
      loadInProgress = false;
      startSong(lastSongPlayed, true);
      audioPlayers.song.volume = 0.3;
    }

    var AudioUtil = {

      disable: function() {
        if(AudioUtil.canBeEnable() === true) {
          for(var key in audioPlayers) {
            audioPlayers[key].pause();
          }
        }
        isEnable = false;
      },
      enable: function() {
        isEnable = true;
        startSong(lastSongPlayed, true);
      },
      isEnable: function() {
        return isEnable;
      },
      canBeEnable: function() {
        return CompatibilityUtil.hasAudioMp3() || 
          CompatibilityUtil.hasAudioWav() || 
          CompatibilityUtil.hasAudioOgg();
      },
      click: function() {
        startSong('click');
      },
      shoot: function() {
        startSong('shoot', false, true);
      },
      loose: function() {
        startSong('loose');
      },
      song: function() {
        startSong('song');
      },
      loadAllSongs: function() {
        loadAllSongs();
      }

    };
    return AudioUtil;
  }
);