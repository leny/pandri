# [pandri](http://github.com/leny/pandri)

[![Build Status](https://secure.travis-ci.org/leny/pandri.png?branch=master)](http://travis-ci.org/leny/pandri)

In-memory key/value store, with json file backup.

* * *

coded by leny

started at 02/02/14

* * *

## HEY ! Watch here ! A note !

**pandri** is in development, not yet published on npm.

* * *

## Getting Started

Install the module with: `npm install pandri`

Create a store (a *json* object representation *in-memory*) with `var store = new Pandri( "name" )`.

> TODO "getting started" documentation.

## Documentation

> This README is a *literate coffeescript* file, containing the documentation AND the code.

    fs = require "fs"

All the stores are stored in a private variable called _stores, the in-memory storage. :)

    _stores = {}

    module.exports = class Pandri

Private var that will stores the current content of the store.

        _content = {}

### new Pandri( name [, path [, callback ] ] )

Create and return a **pandri store** object.

        constructor: ( @name, @path = no, callback = no ) ->

#### store.name

Return the name of the store, use to find it in in-memory storage.

            _stores[ @name ] = @

#### store.path

Return the `path` used for `load()` and `save()` operations.

#### store.hasChanges

Return `true` if some change has been made since the last `load()` or `save()`.

            @hasChange = no

The parameters `path` and `callback`, if present, are used to make a direct call to `store.load()`.

            @load @path, callback if @path

### store.load( [ path [, callback ] ] )

Load a json file inside the store.
If the file doesn't exists, it will be create at the first call of `store.save()`. The `path` is stored in `store.path`.

        load: ( path = no, callback = no ) ->
            @path = path ? @path
            if not fs.existsSync @path
                return callback and callback new Error "The file at path '#{ @path }' doesn't exists !"
            readOptions =
                encoding: "utf-8"
            fs.readFile @path, readOptions, ( err, rawContent ) =>
                return callback and callback( err ) if err
                try
                    _content = JSON.parse rawContent
                catch err
                    return callback and callback err
                @hasChange = no
                return callback and callback null, @

### store.get( key )

Return the value associated to the `key` in the store.

        get: ( key ) ->
            _content[ key ] or null

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

        save: ( path = no, callback = no ) ->
            if not @hasCHange
                return if not callback then yes else callback null, @
            @path = path ? @path
            fs.writeFile @path, JSON.stringify( _content ), ( err ) ->
                return callback and callback err  if err
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

* **2014-02-02** : starting project.

## License
Copyright (c) 2014 Leny
Licensed under the MIT license.
