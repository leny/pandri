"use strict"

module.exports = ( grunt ) ->

    require( "matchdep" ).filterDev( "grunt-*" ).forEach grunt.loadNpmTasks

    grunt.initConfig
        coffee:
            files:
                "lib/pandri.js": "src/pandri.litcoffee"
        jshint:
            options:
                reporter: require "jshint-stylish"
                jshintrc: ".jshintrc"
            lib:
                src: [ "lib/**/*.js" ]
            test:
                src: [ "test/**/*.js" ]
        nodeunit:
            files: [ "test/**/*_test.js" ]
        watch:
            lib:
                files: [
                    "src/pandri.litcoffee"
                ]
                tasks: [
                    "coffee"
                    "jshint:lib"
                    "nodeunit"
                ]

    grunt.registerTask "default", [
        "coffee"
        "jshint"
        "nodeunit"
    ]
