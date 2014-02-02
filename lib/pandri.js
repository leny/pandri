var Pandri, fs, _stores;

fs = require("fs");

_stores = {};

module.exports = Pandri = (function() {
  var _content;

  _content = {};

  function Pandri(name, path, callback) {
    this.name = name;
    this.path = path != null ? path : false;
    if (callback == null) {
      callback = false;
    }
    _stores[this.name] = this;
    this.hasChange = false;
    if (this.path) {
      this.load(this.path, callback);
    }
  }

  Pandri.prototype.load = function(path, callback) {
    var readOptions;
    if (path == null) {
      path = false;
    }
    if (callback == null) {
      callback = false;
    }
    this.path = path != null ? path : this.path;
    if (!fs.existsSync(this.path)) {
      return callback && callback(new Error("The file at path '" + this.path + "' doesn't exists !"));
    }
    readOptions = {
      encoding: "utf-8"
    };
    return fs.readFile(this.path, readOptions, (function(_this) {
      return function(err, rawContent) {
        if (err) {
          return callback && callback(err);
        }
        try {
          _content = JSON.parse(rawContent);
        } catch (_error) {
          err = _error;
          return callback && callback(err);
        }
        _this.hasChange = false;
        return callback && callback(null, _this);
      };
    })(this));
  };

  Pandri.prototype.get = function(key) {
    return _content[key] || null;
  };

  Pandri.prototype.set = function(key, value) {
    this.hasChange = true;
    return _content[key] = value;
  };

  Pandri.prototype.remove = function(key) {
    this.hasChange = true;
    return delete _content[key];
  };

  Pandri.prototype.save = function(path, callback) {
    if (path == null) {
      path = false;
    }
    if (callback == null) {
      callback = false;
    }
    if (!this.hasCHange) {
      if (!callback) {
        return true;
      } else {
        return callback(null, this);
      }
    }
    this.path = path != null ? path : this.path;
    return fs.writeFile(this.path, JSON.stringify(_content), function(err) {
      if (err) {
        return callback && callback(err);
      }
      this.hasChange = false;
      return callback && callback(null, this);
    });
  };

  Pandri.prototype.toJSON = function(beautify, indentSize) {
    if (beautify == null) {
      beautify = false;
    }
    if (indentSize == null) {
      indentSize = 4;
    }
    return JSON.stringify(_content, false, (beautify ? indentSize : false));
  };

  Pandri.get = function(name) {
    return _stores[name] != null ? _stores[name] : _stores[name] = new Pandri(name);
  };

  return Pandri;

})();
