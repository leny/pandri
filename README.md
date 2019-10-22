# pandri

![NPM version](http://img.shields.io/npm/v/pandri.svg) ![Build Status](http://img.shields.io/travis/leny/pandri.svg) ![Dependency Status](https://david-dm.org/leny/pandri.svg) ![Downloads counter](http://img.shields.io/npm/dm/pandri.svg) [![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

In-memory key/value store, with json file backup.

* * *

coded by leny

started at 02/02/14

* * *

## Documentation

> This README is a *literate coffeescript* file, containing the documentation AND the code.

All the stores are stored in a private variable called _stores, the *in-memory storage*. :)

    _stores = {}

    FS = require "fs"
    Path = require "path"
    mkdirp = require "mkdirp"

    module.exports = class Pandri

### store = new Pandri( name [, path [, callback ] ] )

Create and return a **pandri store** object.

        constructor: ( @name, @path = no, callback = no ) ->

Store the instance inside the in-memory storage.

            @_content = {}

            _stores[ @name ] = @

#### store.name

Return the name of the store, use to find it in in-memory storage.

#### store.path

Return the `path` used for `load()` and `save()` operations.

The parameters `path` and `callback`, if present, are used to make a direct call to `store.load()`.

            @load @path, callback if @path

### store.load( path [, callback ] )

Load a json file inside the store.
If the file doesn't exists, it will be create at the first call of `store.save()`.
The `path` is stored in `store.path`.

The callback will receive two parameters : `error` (if an error occures, unless it will be `null`), and `store`, the current store instance.

        load: ( path, callback = no ) ->
            @path = path ? @path
            readOptions =
                encoding: "utf-8"
            FS.readFile @path, readOptions, ( err, rawContent ) =>
                return callback and callback( err ) if err
                try
                    @_content = JSON.parse rawContent
                catch err
                    return callback and callback err
                return callback and callback null, @

### store.get( key )

Return the value associated to the `key` in the store, or `null` if it doesn't exists.

        get: ( key ) ->
            @_content[ key ] ? null

### store.set( key, value )

Affect the `value` to the `key` in the store.

        set: ( key, value ) ->
            @_content[ key ] = value

### store.remove( key )

Delete the `key` from the store.

        remove: ( key ) ->
            delete @_content[ key ]

### store.save( [ path [, callback ] ] )

Store the data in the json `path`. The `path` is stored in `store.path`. If no path are given, the path from `store.path` is used.

The callback will receive two parameters : `error` (if an error occures, unless it will be `null`), and `store`, the current store instance.

        save: ( path = no, callback = no ) ->
            callback = path if not callback and typeof path is "function"
            @path = ( if typeof path is "string" then path else null ) ? @path
            mkdirp Path.dirname( @path ), ( err ) =>
                return callback and callback err if err
                FS.writeFile @path, JSON.stringify( @_content ), ( err ) =>
                    return callback and callback err if err
                    callback and callback null, @

### store.toJSON( [ beautify [, indentSize = 4 ] ] )

Return the (beautified or not) data of the store as json.

        toJSON: ( beautify = no, indentSize = 4 ) ->
            JSON.stringify @_content, no, ( if beautify then indentSize else no )

### store = Pandri.get( name )

(**static method**) Retrieve a store from the memory.
If no store is found, return a new one.

        @get: ( name ) ->
            _stores[ name ] ?= new Pandri name

### Pandri.clear( name )

(**static method**) Remove a store from the memory.
**Note:** only clear the object in the memory. The target file remains unchanged.

        @clear: ( name ) ->
            delete _stores[ name ]


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

Lint and test your code using [Grunt](http://gruntjs.com/).

The **pandri** lib is an unique file, the present `README.md` file, compiled in `javascript` as a *literate coffeescript* file.

## Release History

* **2014-02-02** : starting project
* **2014-02-03** : version 0.1.0
    * Initial release
* **2014-02-04** : version 0.1.1
    * Bugfixes
* **2014-02-04** : version 0.1.2
    * Bugfixes
* **2014-02-04** : version 0.1.3
    * Remove `store.hasChange` property, saving at each call to `store.save()`
    * Bugfixes


## License
Copyright (c) 2014 Leny
Licensed under the MIT license.
