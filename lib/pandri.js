var FS, Pandri, Path, mkdirp, _stores;

_stores = {};

FS = require("fs");

Path = require("path");

mkdirp = require("mkdirp");

module.exports = Pandri = (function() {
  function Pandri(name, path, callback) {
    this.name = name;
    this.path = path != null ? path : false;
    if (callback == null) {
      callback = false;
    }
    this._content = {};
    _stores[this.name] = this;
    if (this.path) {
      this.load(this.path, callback);
    }
  }

  Pandri.prototype.load = function(path, callback) {
    var readOptions;
    if (callback == null) {
      callback = false;
    }
    this.path = path != null ? path : this.path;
    readOptions = {
      encoding: "utf-8"
    };
    return FS.readFile(this.path, readOptions, (function(_this) {
      return function(err, rawContent) {
        if (err) {
          return callback && callback(err);
        }
        try {
          _this._content = JSON.parse(rawContent);
        } catch (_error) {
          err = _error;
          return callback && callback(err);
        }
        return callback && callback(null, _this);
      };
    })(this));
  };

  Pandri.prototype.get = function(key) {
    var _ref;
    return (_ref = this._content[key]) != null ? _ref : null;
  };

  Pandri.prototype.set = function(key, value) {
    return this._content[key] = value;
  };

  Pandri.prototype.remove = function(key) {
    return delete this._content[key];
  };

  Pandri.prototype.save = function(path, callback) {
    var _ref;
    if (path == null) {
      path = false;
    }
    if (callback == null) {
      callback = false;
    }
    if (!callback && typeof path === "function") {
      callback = path;
    }
    this.path = (_ref = (typeof path === "string" ? path : null)) != null ? _ref : this.path;
    return mkdirp(Path.dirname(this.path), (function(_this) {
      return function(err) {
        if (err) {
          return callback && callback(err);
        }
        return FS.writeFile(_this.path, JSON.stringify(_this._content), function(err) {
          if (err) {
            return callback && callback(err);
          }
          return callback && callback(null, _this);
        });
      };
    })(this));
  };

  Pandri.prototype.toJSON = function(beautify, indentSize) {
    if (beautify == null) {
      beautify = false;
    }
    if (indentSize == null) {
      indentSize = 4;
    }
    return JSON.stringify(this._content, false, (beautify ? indentSize : false));
  };

  Pandri.get = function(name) {
    return _stores[name] != null ? _stores[name] : _stores[name] = new Pandri(name);
  };

  Pandri.clear = function(name) {
    return delete _stores[name];
  };

  return Pandri;

})();
