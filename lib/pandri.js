var Pandri, _stores;

_stores = {};

module.exports = Pandri = (function() {
  function Pandri(name, path, callback) {
    this.name = name;
    this.path = path != null ? path : false;
    if (callback == null) {
      callback = false;
    }
    this.hasChange = false;
    if (this.path) {
      this.load(this.path, callback);
    }
  }

  Pandri.prototype.load = function(path, callback) {
    if (callback == null) {
      callback = false;
    }
  };

  Pandri.prototype.get = function(key) {};

  Pandri.prototype.set = function(key, value) {};

  Pandri.prototype.remove = function(key) {};

  Pandri.prototype.save = function(path, callback) {
    if (callback == null) {
      callback = false;
    }
  };

  Pandri.prototype.toJSON = function(beautify) {
    if (beautify == null) {
      beautify = false;
    }
  };

  Pandri.get = function(name) {};

  return Pandri;

})();
