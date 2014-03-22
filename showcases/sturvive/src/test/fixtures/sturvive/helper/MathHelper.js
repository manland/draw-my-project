define('helper/MathHelper', ['goo/math/Matrix3x3'], function(Matrix3x3) {

  var matrix = new Matrix3x3();

  return {
    rotateVectorByYRad: function(vector, yrad) {
      var m = new Matrix3x3();
      matrix.rotateY(yrad, m);
      return m.applyPre(vector);
    },
    randomSpherePoint: function(x0,y0,z0,radius){
      var u = Math.random();
      var v = Math.random();
      var theta = 2 * Math.PI * u;
      var phi = Math.acos(2 * v - 1);
      var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
      var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
      var z = z0 + (radius * Math.cos(phi));
      return {x:x,y:y,z:z};
    }
  };

});