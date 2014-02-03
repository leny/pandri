"use strict";

var Pandri = require( "../lib/pandri.js" );
var fs = require( "fs" );

exports[ "Pandri" ] = {

    setUp: function(done) {
        done();
    },

    "scenario one": function( test ) {
        var store = new Pandri( "test" );

        test.equal( store.name, "test", "should be 'test'." );
        test.equal( store.path, false, "should be false." );
        test.equal( store.hasChange, false, "should be false." );

        test.equal( store.get( "foo" ), null, "should be null." );

        store.set( "foo", "bar" );
        test.equal( store.get( "foo" ), "bar", "should be 'bar'." );
        test.equal( store.hasChange, true, "should be true." );

        store.set( "bar", 2 );
        test.equal( store.get( "bar" ), 2, "should be 2." );

        store.set( "baz", [ 1, 2, 3, 4, 5 ] );
        test.deepEqual( store.get( "baz" ), [ 1, 2, 3, 4, 5 ], "should be [ 1, 2, 3, 4, 5 ]." );

        store.set( "fuu", false );
        test.equal( store.get( "fuu" ), false, "should be false." );

        test.equal( store.toJSON(), '{"foo":"bar","bar":2,"baz":[1,2,3,4,5],"fuu":false}', "should a flat JSON." );
        test.equal( store.toJSON( true ), '{\n    "foo": "bar",\n    "bar": 2,\n    "baz": [\n        1,\n        2,\n        3,\n        4,\n        5\n    ],\n    "fuu": false\n}', "should be a beautyfied JSON with 4-spaces indentation." );
        test.equal( store.toJSON( true, 2 ), '{\n  "foo": "bar",\n  "bar": 2,\n  "baz": [\n    1,\n    2,\n    3,\n    4,\n    5\n  ],\n  "fuu": false\n}', "should be a beautyfied JSON with 2-spaces indentation." );

        var restore = Pandri.get( "test" );

        test.equal( restore.get( "foo" ), "bar", "should be 'bar'." );
        test.equal( restore.get( "bar" ), 2, "should be 2." );
        test.deepEqual( restore.get( "baz" ), [ 1, 2, 3, 4, 5 ], "should be [ 1, 2, 3, 4, 5 ]." );
        test.equal( restore.get( "fuu" ), false, "should be false." );

        store.save( __dirname + "/expected/test-two.json", function( err, pandriStore ) {
            test.equal( err, null, "should be null." );

            test.equal( pandriStore.get( "foo" ), "bar", "should be 'bar'." );
            test.equal( pandriStore.get( "bar" ), 2, "should be 2." );
            test.deepEqual( pandriStore.get( "baz" ), [ 1, 2, 3, 4, 5 ], "should be [ 1, 2, 3, 4, 5 ]." );
            test.equal( pandriStore.get( "fuu" ), false, "should be false." );

            test.equal( store.hasChange, false, "should be false." );
            test.equal( store.path, __dirname + "/expected/test-two.json", "should be the good path." );

            test.equal( fs.existsSync( __dirname + "/expected/test-two.json" ), true, "should be true." );

            test.equal( fs.readFileSync( __dirname + "/expected/test-two.json", { encoding: "utf-8" } ), '{"foo":"bar","bar":2,"baz":[1,2,3,4,5],"fuu":false}', "content of the saved file should be the good json representation." );

            test.done();
        } );
    },

    "scenario two": function( test ) {
        var store = new Pandri( "test", __dirname + "/expected/test.json", function( err, pandriStore ) {
            test.equal( err.errno, 34, "should be 34 (ENOENT)." );
            test.equal( err instanceof Error, true, "should be an error." );

            test.equal( pandriStore, undefined, "should be undefined." );

            test.equal( store.name, "test", "should be 'test'." );
            test.equal( store.path, __dirname + "/expected/test.json", "should be the good path." );
            test.equal( store.hasChange, false, "should be false." );

            test.done();
        } );
    },

    "scenario three": function( test ) {
        var store = new Pandri( "test", __dirname + "/expected/test-one.json", function( err, pandriStore ) {
            test.equal( err, null, "should be null." );

            test.equal( store.name, "test", "should be 'test'." );
            test.equal( store.path, __dirname + "/expected/test-one.json", "should be the good path." );
            test.equal( store.hasChange, false, "should be false." );

            test.equal( store.get( "foo" ), "bar", "should be 'bar'." );
            test.equal( store.get( "bar" ), 2, "should be 2." );
            test.deepEqual( store.get( "baz" ), [ 1, 2, 3, 4, 5 ], "should be [ 1, 2, 3, 4, 5 ]." );
            test.equal( store.get( "fuu" ), false, "should be false." );

            test.equal( pandriStore.name, "test", "should be 'test'." );
            test.equal( pandriStore.path, __dirname + "/expected/test-one.json", "should be the good path." );
            test.equal( pandriStore.hasChange, false, "should be false." );

            test.equal( pandriStore.get( "foo" ), "bar", "should be 'bar'." );
            test.equal( pandriStore.get( "bar" ), 2, "should be 2." );
            test.deepEqual( pandriStore.get( "baz" ), [ 1, 2, 3, 4, 5 ], "should be [ 1, 2, 3, 4, 5 ]." );
            test.equal( pandriStore.get( "fuu" ), false, "should be false." );

            store.set( "faa", true );

            test.equal( store.hasChange, true, "should be true." );
            test.equal( pandriStore.get( "faa" ), true, "should be true." );

            store.remove( "fuu" );

            test.equal( store.get( "fuu" ), null, "should be null." );

            store.save( __dirname + "/expected/test-one.json", function( err, pandriStore ) {
                test.equal( err, null, "should be null." );

                test.equal( pandriStore.get( "foo" ), "bar", "should be 'bar'." );
                test.equal( pandriStore.get( "bar" ), 2, "should be 2." );
                test.deepEqual( pandriStore.get( "baz" ), [ 1, 2, 3, 4, 5 ], "should be [ 1, 2, 3, 4, 5 ]." );
                test.equal( pandriStore.get( "fuu" ), null, "should be null." );
                test.equal( pandriStore.get( "faa" ), true, "should be true." );

                test.equal( store.hasChange, false, "should be false." );
                test.equal( store.path, __dirname + "/expected/test-one.json", "should be the good path." );

                test.equal( fs.existsSync( __dirname + "/expected/test-one.json" ), true, "should be true." );

                test.equal( fs.readFileSync( __dirname + "/expected/test-one.json", { encoding: "utf-8" } ), '{"foo":"bar","bar":2,"baz":[1,2,3,4,5],"faa":true}', "content of the saved file should be the good json representation." );

                test.done();
            } );
        } );
    },
};
