// Generated on 2014-08-25 using generator-angular 0.9.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-string-replace');

    // Configurable paths for the application
  var appConfig = {
    name : "App",
    id   : "app",
    module : "module"
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: appConfig,
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.id %>',
          dest: '<%= config.id %>',
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
          dest: '<%= config.dist %>/images',
          src: ['generated/*']
        }]
      }
    },

    'string-replace' : {
      inline: {
          files: [
              {expand: true, cwd: '<%= config.id %>/', dest: '<%= config.id %>/', src: ['*.json','app/app.js', 'app/config.json']}
          ],
          options: {
              replacements: [
                  // place files inline example
                  {
                      pattern: /\{id\}/g,
                      replacement: '<%= config.id %>'
                  },
                  {
                      pattern: /\{name\}/g,
                      replacement: '<%= config.name %>'
                  },
                  {
                      pattern: /\{module\}/g,
                      replacement: '<%= config.module %>'
                  }
              ]
          }
      }
    }
  });

  grunt.registerTask('new', "Initial a new app", function(id, name, module){
      if(id !== undefined){
          appConfig.id = id;
      }
      if(name !== undefined){
          appConfig.name = name;
      }
      if(module !== undefined){
          appConfig.module = module;
      }
      var DecompressZip = require('decompress-zip');
      var unzipper = new DecompressZip("sample.zip");
      unzipper.on('error', function (err) {
          console.log('Caught an error ' + err);
          done();
      });
      unzipper.on('extract', function (log) {
          grunt.task.run(['string-replace:inline']);
          console.log('Finished creating');
          done();
      });
      var done = this.async();
      unzipper.extract({
          path: "./" + appConfig.id
      });
  });

};
