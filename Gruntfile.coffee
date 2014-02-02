"use strict"

module.exports = ( grunt ) ->

    require( "matchdep" ).filterDev( "grunt-*" ).forEach grunt.loadNpmTasks

    grunt.initConfig
        coffee:
            options:
                bare: yes
            files:
                "lib/pandri.js": "./README.coffee.md"
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
                    "./README.coffee.md"
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
