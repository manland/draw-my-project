define('helper/LangHelper', function() {

  var currentLang, potentialLang;
  try {
    currentLang = navigator.language.substring(0,2);
    potentialLang = window.location.hash.substring(1);
  } catch(e) {
    currentLang = 'en';
    potentialLang = 'en';
  }
  
  if(potentialLang === 'en') {
    currentLang = 'en';
  } else if(potentialLang === 'fr') {
    currentLang = 'fr';
  }
  if(currentLang === undefined || currentLang === null) {
    currentLang = 'en';
  }
  if(currentLang !== 'en' && currentLang !== 'fr') {
    currentLang = 'en';
  }

  var lang = { en: {}, fr: {} };

  lang.en.title = 'Sturvive';
  lang.fr.title = 'Sturvive';
  lang.en.back = 'Back';
  lang.fr.back = 'Précédent';
  lang.en.prev = 'Previous';
  lang.fr.prev = 'Précédent';
  lang.en.next = 'Next';
  lang.fr.next = 'Suivant';

  /*************************\
  * HOME PAGE               *
  \*************************/
  lang.en.homeStart = 'Start';
  lang.fr.homeStart = 'Démarrer';
  lang.en.homeHelp = 'Help';
  lang.fr.homeHelp = 'Aide';
  lang.en.homeOptions = 'Options';
  lang.fr.homeOptions = 'Options';
  lang.en.homeCompatibility = 'Compatibility';
  lang.fr.homeCompatibility = 'Compatibilité';

  /*************************\
  * HELP PAGE               *
  \*************************/
  lang.en.helpTitle = 'Help';
  lang.fr.helpTitle = 'Aide';
  lang.en.help_start = 'In this game, there are 4 types of map. At the beginning you can choose only Learn. But when you win map, you can choose other type.';
  lang.fr.help_start = 'Dans ce jeu, il y a 4 types de cartes différentes. Au début tu ne peux choisir que Entrainement, mais au fur et mesure que tu gagnes, tu débloques de nouvelles cartes.';
  lang.en.help_bonus = 'After some maps you can choose to improve your starship.';
  lang.fr.help_bonus = 'Après quelques cartes tu peux choisir d\'améliorer ton vaisseau.';
  lang.en.help_0 = 'General';
  lang.fr.help_0 = 'Généralités';
  lang.en.help_0_1 = 'Pause button';
  lang.fr.help_0_1 = 'Bouton de pause';
  lang.en.help_0_2 = 'Nb lifes';
  lang.fr.help_0_2 = 'Nb vies';
  lang.en.help_0_3 = 'Fuel gauge';
  lang.fr.help_0_3 = 'Jauge d\'essence';
  lang.en.help_0_4 = 'Meteorite to be destroyed';
  lang.fr.help_0_4 = 'Météorite à détruire';
  lang.en.help_0_5 = 'Bullets gauge';
  lang.fr.help_0_5 = 'Jauge de balles';
  lang.en.help_0_6 = 'Radar';
  lang.fr.help_0_6 = 'Radar';
  lang.en.help_0_7 = 'Shoot';
  lang.fr.help_0_7 = 'Tire';
  lang.en.help_0_8 = 'Turn';
  lang.fr.help_0_8 = 'Tourne';
  lang.en.help_0_9 = 'Move';
  lang.fr.help_0_9 = 'Avance, recule, à droite ou à gauche';
  lang.en.help_1 = 'Stay in the green zone to refuel gasoline';
  lang.fr.help_1 = 'Restes dans la zone verte pour faire le plein';
  lang.en.help_1_1 = 'Fuel Zone';
  lang.fr.help_1_1 = 'Zone pour l\'essence';
  lang.en.help_1_2 = 'Fuel gauge';
  lang.fr.help_1_2 = 'Jauge  à essence';
  lang.en.help_2 = 'In protect map';
  lang.fr.help_2 = 'Carte de type protection';
  lang.en.help_2_1 = 'Starship to protect';
  lang.fr.help_2_1 = 'Vaisseau à protéger';
  lang.en.help_2_2 = 'Look your radar to know where starship should go (blue disk)';
  lang.fr.help_2_2 = 'Regardes le radar pour savoir où le vaisseau doit aller (rond bleu)';
  lang.en.help_3 = 'In race map';
  lang.fr.help_3 = 'Carte de type course';
  lang.en.help_3_1 = 'Look your radar to know where you should go (red disk)';
  lang.fr.help_3_1 = 'Regardes le radar pour savoir où tu dois aller (rond rouge)';
  lang.en.help_3_2 = 'In this type of map you haven\'t life';
  lang.fr.help_3_2 = 'Dans ce type de carte tu n\'as pas de vie';
  lang.en.help_4 = 'In clean zone map';
  lang.fr.help_4 = 'Carte de type nettoyer zone';
  lang.en.help_4_1 = 'Destroy all meteorites (orange disk) before time\'s up';
  lang.fr.help_4_1 = 'Détruits toutes les météorites (rond orange) avant la fin du temps';

  /*************************\
  * OPTIONS PAGE            *
  \*************************/
  lang.en.optionsTitle = 'Options';
  lang.fr.optionsTitle = 'Options';

  lang.en.optionsResetOptions = 'Reset options';
  lang.fr.optionsResetOptions = 'ré-initialiser mes options';

  /*************************\
  * COMPATIBILITY PAGE      *
  \*************************/
  lang.en.compatibilityTitle = 'Compatibility';
  lang.fr.compatibilityTitle = 'Compatibilité';
  lang.en.compatibilityPageNoCompatible = 'We are sorry, but your browser doesn\'t allow you to play ! Please upgrade it or change it !';
  lang.fr.compatibilityPageNoCompatible = 'Nous sommes désolés mais ton navigateur ne te permet pas de jouer ! S\'il te plaît mets le à jour ou changes en !';
  lang.en.compatibilityPageNoFullCompatible = 'Your browser is not fully compatible with the game, but you can still play !';
  lang.fr.compatibilityPageNoFullCompatible = 'Ton navigateur n\'est pas complètement compatible, mais tu peux jouer quand même !';
  lang.en.compatibilityPageTryBack = 'Try anyway';
  lang.fr.compatibilityPageTryBack = 'Essayer quand même';
  lang.en.compatibilityWebGLDescription = 'All the game is based on this system !';
  lang.fr.compatibilityWebGLDescription = 'Le jeu est en 3d grâce à ce système !';
  lang.en.compatibilityCssTransitionDescription = 'All the game is based on this system !';
  lang.fr.compatibilityCssTransitionDescription = 'Le jeu est en 3d grâce à ce système !';
  lang.en.compatibilityClassListDescription = 'All the game is based on this system !';
  lang.fr.compatibilityClassListDescription = 'Le jeu est en 3d grâce à ce système !';
  lang.en.compatibilityLocalStorageDescription = 'Your game options and progression are saved with localStorage !';
  lang.fr.compatibilityLocalStorageDescription = 'Vos options et votre progression sont sauvegardés avec !';
  lang.en.compatibilityMp3Description = 'You can\'t play mp3 songs !';
  lang.fr.compatibilityMp3Description = 'Tu ne peux pas écouter le son au format mp3 !';
  lang.en.compatibilityWavDescription = 'You can\'t play wav songs !';
  lang.fr.compatibilityWavDescription = 'Tu ne peux pas écouter le son au format wav !';
  lang.en.compatibilityOggDescription = 'You can\'t play ogg songs !';
  lang.fr.compatibilityOggDescription = 'Tu ne peux pas écouter le son au format ogg !';
  lang.en.compatibilityNavigatorLanguageDescription = 'Game can\'t select your language !';
  lang.fr.compatibilityNavigatorLanguageDescription = 'Le jeu ne peut pas sélectionner ta langue !';

  /*************************\
  * PAUSE PAGE              *
  \*************************/
  lang.en.pauseTitle = 'Pause';
  lang.fr.pauseTitle = 'Pause';
  lang.en.pauseHelp = 'Help';
  lang.fr.pauseHelp = 'Aide';
  lang.en.pauseMainMenu = 'Main menu';
  lang.fr.pauseMainMenu = 'Menu principal';
  lang.en.pauseOptions = 'Options';
  lang.fr.pauseOptions = 'Options';
  lang.en.pauseRestart = 'Restart';
  lang.fr.pauseRestart = 'Redémarrer';

  /*************************\
  * GAME PAGE               *
  \*************************/
  lang.en.forwardKeyboardDescription = 'To go forward use the up key !';
  lang.fr.forwardKeyboardDescription = 'Pour aller en avant utilises la flêche du haut !';
  lang.en.backwardKeyboardDescription = 'To go backward use the down key !';
  lang.fr.backwardKeyboardDescription = 'Pour aller en arrière utilisess la flêche du bas !';
  lang.en.leftKeyboardDescription = 'To go left use the left key !';
  lang.fr.leftKeyboardDescription = 'Pour aller à gauche utilises la flêche gauche !';
  lang.en.rightKeyboardDescription = 'To go right use the right key !';
  lang.fr.rightKeyboardDescription = 'Pour aller à droite utilises la flêche droite !';
  lang.en.tournLeftKeyboardDescription = 'To turn left use c key !';
  lang.fr.tournLeftKeyboardDescription = 'Pour tourner à gauche utilises la touche c !';
  lang.en.tournRightKeyboardDescription = 'To turn right use the v key !';
  lang.fr.tournRightKeyboardDescription = 'Pour tourner à droite utilises la touche v !';
  lang.en.shootKeyboardDescription = 'To shoot use the space key !';
  lang.fr.shootKeyboardDescription = 'Pour tirer utilises la touche espace !';

  /*************************\
  * BONUS PAGE              *
  \*************************/
  lang.en.bonusTitle = 'Bonus';
  lang.fr.bonusTitle = 'Bonus';
  lang.en.bonusExplanation = 'Well done ! Choose a bonus for your job !';
  lang.fr.bonusExplanation = 'Bien joué ! Choisis un bonus pour ce boulot !';
  lang.en.speedBonus = 'Speed';
  lang.fr.speedBonus = 'Vitesse';
  lang.en.nbLifeBonus = 'Life\'s number';
  lang.fr.nbLifeBonus = 'Nombre de vies';
  lang.en.nbBulletAtStartBonus = 'Bullets\' reserve';
  lang.fr.nbBulletAtStartBonus = 'Taille du chargeur';
  lang.en.bulletPowerBonus = 'Bullets\' power';
  lang.fr.bulletPowerBonus = 'Destruction des balles';
  lang.en.bulletLifeBonus = 'Bullets\' life';
  lang.fr.bulletLifeBonus = 'Vie des balles';
  lang.en.fuelLossBonus = 'Fuel loss';
  lang.fr.fuelLossBonus = 'Perte du carburant';
  lang.en.backBonus = 'No, I save !';
  lang.fr.backBonus = 'Non, j\'économise !';

  /*************************\
  * CHOOSE NEXT MAP PAGE    *
  \*************************/
  lang.en.chooseNextMapTitle = 'Choose a map';
  lang.fr.chooseNextMapTitle = 'Choisis une carte';
  lang.en.backChooseNextMap = 'Random';
  lang.fr.backChooseNextMap = 'Aléatoire';
  lang.en.chooseNextMaptutos = 'Learn';
  lang.fr.chooseNextMaptutos = 'Enseignement';
  lang.en.chooseNextMapcleanZone = 'Clean Zone';
  lang.fr.chooseNextMapcleanZone = 'Nettoyer Zone';
  lang.en.chooseNextMapprotect = 'Protect';
  lang.fr.chooseNextMapprotect = 'Protéger';
  lang.en.chooseNextMaprace = 'Race';
  lang.fr.chooseNextMaprace = 'Course';

  return {
    get: function(key) {
      return lang[currentLang][key];
    },
    getCurrentLang: function() {
      return currentLang;
    }
  };

});