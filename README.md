# [pandri](http://github.com/leny/pandri)

[![Build Status](https://secure.travis-ci.org/leny/pandri.png?branch=master)](http://travis-ci.org/leny/pandri)

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

Private var that will stores the current content of the store.

        _content = {}

### store = new Pandri( name [, path [, callback ] ] )

Create and return a **pandri store** object.

        constructor: ( @name, @path = no, callback = no ) ->

Store the instance inside the in-memory storage.

            _stores[ @name ] = @

#### store.name

Return the name of the store, use to find it in in-memory storage.

#### store.path

Return the `path` used for `load()` and `save()` operations.

#### store.hasChange

Return `true` if some change has been made since the last `load()` or `save()`.

            @hasChange = no

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
                    _content = JSON.parse rawContent
                catch err
                    return callback and callback err
                @hasChange = no
                return callback and callback null, @

### store.get( key )

Return the value associated to the `key` in the store, or `null` if it doesn't exists.

        get: ( key ) ->
            _content[ key ] ? null

### store.set( key, value )

Affect the `value` to the `key` in the store.

        set: ( key, value ) ->
            @hasChange = yes
            _content[ key ] = value

### store.remove( key )

Delete the `key` from the store.

        remove: ( key ) ->
            @hasChange = yes
            delete _content[ key ]

### store.save( [ path [, callback ] ] )

Store the data in the json `path`. The `path` is stored in `store.path`. If no path are given, the path from `store.path` is used.
The save operation is only performed if `store.hasChange` is `true`.

The callback will receive two parameters : `error` (if an error occures, unless it will be `null`), and `store`, the current store instance.

        save: ( path = no, callback = no ) ->
            callback = path if not callback and typeof path is "function"
            if not @hasChange
                return if not callback then yes else callback null, @
            @path = ( if typeof path is "string" then path else null ) ? @path
            mkdirp Path.dirname( @path ), ( err ) =>
                return callback and callback err if err
                FS.writeFile @path, JSON.stringify( _content ), ( err ) =>
                    return callback and callback err if err
                    @hasChange = no
                    callback and callback null, @

### store.toJSON( [ beautify [, indentSize = 4 ] ] )

Return the (beautified or not) data of the store as json.

        toJSON: ( beautify = no, indentSize = 4 ) ->
            JSON.stringify _content, no, ( if beautify then indentSize else no )

### store = Pandri.get( name )

(**static method**) Retrieve a store from the memory.
If no store is found, return a new one.

        @get: ( name ) ->
            _stores[ name ] ?= new Pandri name

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

Lint and test your code using [Grunt](http://gruntjs.com/).

The **pandri** lib is an unique file, the present `README.md` file, compiled in `javascript` as a *literate coffeescript* file.

## Release History

* **2014-02-02** : starting project
* **2014-02-03** : version 0.1.0

## License
Copyright (c) 2014 Leny
Licensed under the MIT license.
