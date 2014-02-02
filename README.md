# [pandri](http://github.com/leny/pandri)

[![Build Status](https://secure.travis-ci.org/Leny/pandri.png?branch=master)](http://travis-ci.org/Leny/pandri)

In-memory key/value store, with json file backup.

* * *

coded by leny

started at 02/02/14

* * *

## Getting Started

Install the module with: `npm install pandri`

Create a store (a *json* object representation *in-memory*) with `var store = new Pandri( "name" )`.

> TODO "getting started" documentation.

## Documentation

> This README is a *literate coffeescript* file, containing the documentation AND the code.

All the stores are stored in a private variable called _stores, the in-memory storage. :)

    _stores = {}

    module.exports = class Pandri

### new Pandri( name [, path [, callback ] ] )

Create and return a **pandri store** object.

        constructor: ( @name, @path = no, callback = no ) ->

#### store.name

Return the name of the store, use to find it in memory.

#### store.path

Return the `path` used for `load()` and `save()` operations.

#### store.hasChanges

Return `true` if some change has been made since the last `load()` or `save()`.

            @hasChange = no

The parameters `path` and `callback`, if present, are used to make a direct call to `store.load()`.

            @load @path, callback if @path

### store.load( path [, callback] )

Load a json file inside the store. If the file doesn't exists, it will be create at the first call of `store.save()`. The `path` is stored in `store.path`.

        load: ( path, callback = no ) ->

### store.get( key )

Return the value associated to the `key` in the store.

        get: ( key ) ->

### store.set( key, value )

Affect the `value` to the `key` in the store.

        set: ( key, value ) ->

### store.remove( key )

Delete the `key` from the store.

        remove: ( key ) ->

### store.save( [ path [, callback ] ] )

Store the data in the json `path`. The `path` is stored in `store.path`. If no path are given, the path from `store.path` is used.

        save: ( path, callback = no ) ->

### store.toJSON( [ beautify ] )

Return the (beautified or not) data of the store as json.

        toJSON: ( beautify = no ) ->

### store = Pandri.get( name )

(**static method**) Retrieve a store from the memory.

        @get: ( name ) ->

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

Lint and test your code using [Grunt](http://gruntjs.com/).

The **pandri** lib is an unique file, the present `README.md` file, compiled in `javascrip` as a *literate coffeescript* file. 

## Release History

* **2014-02-02** : starting project.

## License
Copyright (c) 2014 Leny
Licensed under the MIT license.
