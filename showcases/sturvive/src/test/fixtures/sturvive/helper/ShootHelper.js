define('helper/ShootHelper', 
  ['component/BulletComponent', 
  'manager/PlayerManager',
  'helper/MobileHelper', 
  'helper/KeyboardHelper', 
  'helper/TouchButton', 
  'helper/EntityHelper',
  'helper/DomHelper',
  'util/AudioUtil'], 
  function(BulletComponent, 
    PlayerManager,
    MobileHelper, 
    KeyboardHelper, 
    TouchButton, 
    EntityHelper,
    DomHelper,
    AudioUtil) {

    var divBullets;

    var build = function build() {
      divBullets = DomHelper.addBulletAmount();
      divBullets.update(PlayerManager.getBulletPercent());
    };

    return {
      start: function(world, camera) {
        build();
        if(MobileHelper.isMobile()) {
          document.getElementsByTagName('body')[0].appendChild(
            TouchButton.build('shootButton', function() {
              if(PlayerManager.get('nbBullet') > 0) {
                new BulletComponent(
                  world, 
                  EntityHelper.getPosition(camera.entity), 
                  camera.getBulletPosition(), 
                  camera.script.yRotationAcc,
                  false
                );
                PlayerManager.minusBullet();
                AudioUtil.shoot();
                divBullets.update(PlayerManager.getBulletPercent());
              }
            })
          );
        } else {
          KeyboardHelper.listen(32, function() {
            if(PlayerManager.get('nbBullet') > 0) {
              new BulletComponent(
                world, 
                EntityHelper.getPosition(camera.entity), 
                camera.getBulletPosition(), 
                camera.script.yRotationAcc,
                false
              );
              PlayerManager.minusBullet();
              AudioUtil.shoot();
              divBullets.update(PlayerManager.getBulletPercent());
            }
          }, function() {}, null);
        }
      },
      refresh: function() {
        divBullets.update(PlayerManager.getBulletPercent());
      }
    };
  }
);