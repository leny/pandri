"use strict"

module.exports = ( grunt ) ->

    require( "matchdep" ).filterDev( "grunt-*" ).forEach grunt.loadNpmTasks

    grunt.initConfig
        coffee:
            lib:
                options:
                    bare: yes
                files:
                    "lib/pandri.js": "README.md"
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
                    "README.md"
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
