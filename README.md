# Pandri 

[![Build Status](https://secure.travis-ci.org/Leny/pandri.png?branch=master)](http://travis-ci.org/Leny/pandri)

In-memory key/value store, with json file backup.

## Getting Started
Install the module with: `npm install pandri`

## Documentation

> TODO Introduction text

### new Pandri( name [, path [, callback ] ] )

Create and return a **pandri store** object. The parameters `path` and `callback`, if present, are used to make a call to `store.load()`.

### store.load( path [, callback] )

Load a json file inside the store. If the file doesn't exists, it will be create at the first call of `store.save()`. The `path` is stored in `store.path`.

### store = Pandri.get( name )

Retrieve a store from the memory.

### store.get( key )

Return the value associated to the `key` in the store.

### store.set( key, value )

Affect the `value` to the `key` in the store.

### store.remove( key )

Delete the `key` from the store.

### store.save( [ path [, callback ] ] )

Store the data in the json `path`. The `path` is stored in `store.path`. If no path are given, the path from `store.path` is used.

### store.toJSON( [ beautify ] )

Return the (beautified or not) data of the store as json.

### store.path

Return the `path` used for `load()` and `save()` operations.

### store.name

Return the name of the store, use to find it in memory.

### store.hasChanges

Return `true` if some change has been made since the last `load()` or `save()`.

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Leny  
Licensed under the MIT license.
