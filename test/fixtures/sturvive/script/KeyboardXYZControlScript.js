define('script/KeyboardXYZControlScript', 
  ['helper/KeyboardHelper', 
  'helper/DebuggerHelper', 
  'script/AbstractXYZControlScript',
  'helper/DomHelper',
  'helper/LangHelper'], 
  function(KeyboardHelper, DebuggerHelper, AbstractXYZControlScript, DomHelper, LangHelper) {

  var speedxz = 0.5;
  var speedYRotation = 0.05;

  function KeyboardXYZControlScript() {
    AbstractXYZControlScript.prototype.constructor.apply(this);
    //UP
    KeyboardHelper.listen(38, function(){this.z=speedxz;}, function(){this.z=0;}, this);
    //DOWN
    KeyboardHelper.listen(40, function(){this.z=-speedxz;}, function(){this.z=0;}, this);
    //RIGHT
    KeyboardHelper.listen(39, function(){this.x=speedxz;}, function(){this.x=0;}, this);
    //LEFT
    KeyboardHelper.listen(37, function(){this.x=-speedxz;}, function(){this.x=0;}, this);
    //TOURN LEFT - TOUCH C
    KeyboardHelper.listen(67, function(){this.yRotation=speedYRotation;}, function(){this.yRotation=0;}, this);
    //TOURN RIGHT - TOUCH V
    KeyboardHelper.listen(86, function(){this.yRotation=-speedYRotation;}, function(){this.yRotation=0;}, this);

    var d;
    d = DomHelper.addTouch('up');
    d.title = LangHelper.get('forwardKeyboardDescription');
    d = DomHelper.addTouch('down');
    d.title = LangHelper.get('backwardKeyboardDescription');
    d = DomHelper.addTouch('right');
    d.title = LangHelper.get('rightKeyboardDescription');
    d = DomHelper.addTouch('left');
    d.title = LangHelper.get('leftKeyboardDescription');
    d = DomHelper.addTouch('tournRight');
    d.title = LangHelper.get('tournRightKeyboardDescription');
    d = DomHelper.addTouch('tournLeft');
    d.title = LangHelper.get('tournLeftKeyboardDescription');
    d = DomHelper.addTouch('shoot');
    d.title = LangHelper.get('shootKeyboardDescription');
  }

  KeyboardXYZControlScript.prototype = Object.create(AbstractXYZControlScript.prototype);

  return KeyboardXYZControlScript;

});