// Generated on 2014-08-13 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var fs = require('fs');
    var request = require('request');

    // Configurable paths for the application
    var bowerConf = require('./bower.json');

    var appConfig = {
        app  : bowerConf.appPath || 'app',
        id   : bowerConf.id,
        dist : 'dist',
        url  : bowerConf.server,
        name : bowerConf.name
    };


    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
//            bower: {
//                files: ['bower.json'],
//                tasks: ['wiredep']
//            },
            json : {
                files: ['<%= yeoman.app %>/{,*/}*.json'],
                tasks: ['copy:dev'], //'newer:jshint:all'
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
                tasks: ['copy:dev'], //'newer:jshint:all'
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
                tasks: ['less:development', 'copy:dev', 'clean:styles'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
//                    '.tmp/modules/<%= yeoman.id %>/styles/{,*/}*.css',
                    '<%= yeoman.app %>/styles/themes/**/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['copy:dev']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                base: '.tmp',
                livereload: 35729
            },
            dev: {
                options: {
                    open: true,
                    keepalive: true
                }
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
//                            connect().use(
//                                'modules/<%= yeoman.id %>',
//                                connect.static('<%= yeoman.app %>')
//                            ),
//                            connect.static('<%= yeoman.app %>')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
//                            connect.static('.tmp'),
                            connect.static('test'),
//                            connect().use(
//                                '/bower_components',
//                                connect.static('./bower_components')
//                            ),
//                            connect.static('modules/<%= yeoman.id %>')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            zip: '<%= yeoman.name %>.zip',
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            test: '.test',
            styles: {
                files: [{
                    src: ['<%= yeoman.app %>/styles/themes/css/']
                },{
                    src: ['styles/themes/css/'],
                    cwd: '../GSPlatformBaseModule/app/'
                }]
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            options: {
                cwd: '<%= yeoman.app %>'
            },
            app: {
                src: ['<%= yeoman.app %>/index.html'],
                exclude: ['bower_components/bootstrap/dist/js/bootstrap.js','bower_components/pace/pace.js'],
                ignorePath:  /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images']
            }
        },

        // The following *-min tasks will produce minified files in the dist folder
        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            }
        },
        concat: {
            dist: {}
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'images/{,*/}*.{webp}',
                            'fonts/*'
                        ]
                    }, {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: ['generated/*']
                    }, {
                        expand: true,
                        cwd: '<%= yeoman.app %>/lib/bootstrap/dist',
                        src: 'fonts/*',
                        dest: '<%= yeoman.dist %>'
                    }, {
                        expand: true,
                        cwd: '<%= yeoman.app %>/lib/font-awesome',
                        src: 'fonts/*',
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            all: {
                files: [{
                        expand: true,
                        cwd: '../GSPlatformBaseModule/app/',
                        dest: '.tmp',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '.tmp/modules/<%= yeoman.id %>',
                        src: '**/*.*'
                    }
                ]
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '.tmp/modules/<%= yeoman.id %>',
                        src: '**/*.*'
                    }
                ]
            },
            base: {
                files: [
                    {
                        expand: true,
                        cwd: '../GSPlatformBaseModule/app/',
                        dest: '.tmp',
                        src: '**/*.*'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: '../GSPlatformBaseModule/app/lib',
                        dest: '.test/lib',
                        src: '**/*.js'
                    },
                    {
                        expand: true,
                        cwd: '../GSPlatformBaseModule/app/common',
                        dest: '.test/common',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/',
                        dest: '.test/app',
                        src: '**/*.*'
                    },
                    {
                        expand: true,
                        cwd: 'test/',
                        dest: '.test/test',
                        src: '**/*.*'
                    }
                ]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'less:framework',
                'less:development'
            ],
            test: [
//                'less:framework',
//                'less:development'
                'copy:test'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: '.test/test/karma.conf.js',
                singleRun: true
            }
        },

        compress: {
            main: {
                options: {
                    archive: '<%= yeoman.name %>.zip'
                },
                files: [
                    {expand: true, cwd: '<%= yeoman.app %>/', src: ['*/**','*.json', '*.js', '*.html']}
                ]
            }
        },

        less: {
            development: {
                options: {
                    paths : ['<%= yeoman.app %>/styles/themes'],
                    sourceMap: false,
                    sourceMapBasepath : "<%= yeoman.app %>/styles/themes/default",
                    sourceMapFilename : "<%= yeoman.app %>/styles/themes/default/default.css.map"
                },
                files: [{
                    expand: true,
                    cwd: "<%= yeoman.app %>/styles/themes",
                    src: ["**/*.less"],
                    dest: "<%= yeoman.app %>/styles/themes/css/",
                    ext: ".css"
                }]
            },
            framework: {
                options: {
                    paths : ['<%= yeoman.app %>/styles/themes'],
                    sourceMap: false,
                    sourceMapBasepath : "../GSPlatformBaseModule/app/styles/themes/default",
                    sourceMapFilename : "../GSPlatformBaseModule/app/styles/themes/default/default.css.map"
                },
                files: [{
                    expand: true,
                    cwd: "../GSPlatformBaseModule/app/styles/themes",
                    src: ["**/*.less"],
                    dest: "../GSPlatformBaseModule/app/styles/themes/css/",
                    ext: ".css"
                }]
            }
        },

        compass: {                  // Task
            dist: {                   // Target
                options: {              // Target options
                    sassDir: "<%= yeoman.app %>/styles/themes/default/sass",
                    cssDir: "<%= yeoman.app %>/styles/themes/default/css",
                    environment: 'production'
                }
            },
            dev: {                    // Another target
                options: {
                    sassDir: "<%= yeoman.app %>/styles/themes/default/sass",
                    cssDir: "<%= yeoman.app %>/styles/themes/default/css"
                }
            }
        }
    });


    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
//            'wiredep',
            'concurrent:server',
            'copy:all',
            'clean:styles',
//            'autoprefixer',
//            'connect:dev',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:test',
        'concurrent:test',
//        'autoprefixer',
//        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
//    'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
//    'cdnify',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);


    grunt.registerTask('css-compass', ['compass:dev']);
    grunt.registerTask('css', ['less:development']);

    grunt.registerTask('zip', ['compress']);

    grunt.registerTask('install', 'install dev module', function(){
            var str = fs.realpathSync('./' + appConfig.name + '.zip');
            console.log(str);
            var done = this.async();
            request.post({
                    url: "http://" + appConfig.url + "/api/app/install/",
                    qs: {localFile: str}
                }, function(err, response) {
                    if(!err && response != undefined && response.statusCode == 200) {
                        console.log("Success to install module");
                    } else {
                        var code = "unknown";
                        if(response) code = response.statusCode;
                        console.log('Fail to install module ' + err + ', code: ' + code);
                    }
                    done();
                }
            );
        }
    );

//    grunt.registerTask('dev', ['less:development', 'compress', 'install']);
    grunt.registerTask('dev', 'dev on current module', function(arg1){
        if(arg1 == "f"){
            grunt.task.run(['copy:dev']);
        } else if(arg1 == "b"){
            grunt.task.run(['less:framework','copy:base']);
        } else if(arg1 == "bf"){
            grunt.task.run(['copy:base']);
        } else {
            grunt.task.run(['less:development', 'copy:dev']);
        }
        grunt.task.run(['clean:styles']);
    });

    grunt.registerTask('cleanup', 'Clean up workspace', function(){
        grunt.task.run(['clean:zip','clean:server','clean:test','clean:styles']);
    })
};
