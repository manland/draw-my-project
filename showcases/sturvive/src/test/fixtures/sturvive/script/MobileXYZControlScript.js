define('script/MobileXYZControlScript', 
  ['helper/TouchButton', 'helper/DebuggerHelper', 'script/AbstractXYZControlScript'], 
  function(TouchButton, DebuggerHelper, AbstractXYZControlScript) {

  var speedxz = 0.2;
  var speedYRotation = 0.01;

  function MobileXYZControlScript() {
    AbstractXYZControlScript.prototype.constructor.apply(this);
    var xzButton = TouchButton.build('xzButton', this.handleXZStart, this.handleXZStop, this);
    document.getElementsByTagName('body')[0].appendChild(xzButton);
    var yButton = TouchButton.build('yButton', this.handleYStart, this.handleYStop, this);
    document.getElementsByTagName('body')[0].appendChild(yButton);
  }

  MobileXYZControlScript.prototype = Object.create(AbstractXYZControlScript.prototype);

  MobileXYZControlScript.prototype.handleXZStart = function(e) {
    var middleWidth = e.width/2;
    var middleHeight = e.height/2;
    //QUART ROUND BUTTON
    this.x = e.insideX > middleWidth ? speedxz : -speedxz;
    this.z = e.insideY > middleHeight ? -speedxz : speedxz;
    //MIDDLE ROUND BUTTON
    this.x = e.insideX > e.width/3 && e.insideX < 2*(e.width/3) ? 0 : this.x;
    this.z = e.insideY > e.height/3 && e.insideY < 2*(e.height/3) ? 0 : this.z;
    DebuggerHelper.updateDebug('x', this.x, 'z', this.z, 'yRotation', this.yRotation);
  };

  MobileXYZControlScript.prototype.handleXZStop = function(e) {
    this.x = 0;
    this.z = 0;
  };

  MobileXYZControlScript.prototype.handleYStart = function(e) {
    var middleWidth = e.width/2;
    this.yRotation = e.insideX > middleWidth ? -speedYRotation : speedYRotation;
    DebuggerHelper.updateDebug('x', this.x, 'z', this.z, 'yRotation', this.yRotation);
  };

  MobileXYZControlScript.prototype.handleYStop = function(e) {
    this.yRotation = 0;
  };

  return MobileXYZControlScript;

});