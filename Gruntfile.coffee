"use strict"

module.exports = ( grunt ) ->

    require( "matchdep" ).filterDev( "grunt-*" ).forEach grunt.loadNpmTasks

    grunt.initConfig
        clean: [ "test/expected" ]
        copy:
            test:
                expand: yes
                cwd: "test/fixtures/"
                src: [ "**/*.json" ]
                dest: "test/expected/"
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
                ]

    grunt.registerTask "test", [
        "clean"
        "copy"
        "nodeunit"
    ]

    grunt.registerTask "default", [
        "coffee"
        "jshint"
        "test"
    ]
