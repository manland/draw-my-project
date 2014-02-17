var regexp = /^[0-9a-fA-F]{24}$/;

module.exports = {
  isObjectId: function(obj) {
    return regexp.test(obj);
  }
};