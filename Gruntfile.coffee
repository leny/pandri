"use strict"

module.exports = ( grunt ) ->

    require( "matchdep" ).filterDev( "grunt-*" ).forEach grunt.loadNpmTasks

    grunt.initConfig
        coffee:
            lib:
                expand: yes
                cwd: "src/"
                src: [
                    "**/*.litcoffee"
                ]
                dest: "lib/"
                ext: ".js"
                options:
                    bare: yes
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
                    "src/**/*.litcoffee"
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
