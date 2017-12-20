/*global module */
module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    // read in the project settings from the package.json file into the pkg property
    pkg: grunt.file.readJSON('package.json'),
    
    dirs: {
      dest: 'dist'
    },

    meta: {
      banner: [
        '/**',
        ' * <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @author <%= pkg.author %>',
        ' * @license MIT License, http://www.opensource.org/licenses/MIT',
        ' */'
      ].join('\n')
    },
    
    // define configuration for each of the tasks we have
    clean: ['illyum-ng/providers/dist/*'],
    
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['illyum-ng/providers/src/**/*.js'],
        // the location of the resulting JS file
        dest: 'illyum-ng/providers/dist/<%= pkg.name %>.js'
      }
    },
    
    jshint: {
      files: ['Gruntfile.js', 'illyum-ng/providers/src/*.js', 'illyum-ng/providers/test/*/*.js'],
      options: {
        multistr: true,
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    jasmine: {
      src: 'illyum-ng/providers/src/*.js',
      options: {
        vendor: [
          'scripts/angular.js',
          'scripts/angular-mocks.js'
        ],
        specs: 'illyum-ng/providers/test/specs/*.js',
        helpers: 'illyum-ng/providers/test/mocks/*.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMap: true
      },
      dist: {
        files: {
          'illyum-ng/providers/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

  });

  // Add all plugins that your project needs here
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('test', ['jshint', 'jasmine']);
  grunt.registerTask('default', ['clean', 'jshint', 'jasmine', 'concat', 'uglify']);
};