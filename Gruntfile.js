'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'res/source_css/style.scss',
          'res/source_css/style_sp.scss'
        ],
        tasks: ['compass', 'cmq', 'csscomb', 'cssmin'],
        options: {
          nospawn: true
        }
      },
      js: {
        files: ['res/source_js/scroll.js'],
        tasks: ['concat', 'uglify'],
        options: {
          nospawn: true
        }
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9001
        }
      }
    },
    // バラバラに記述されたメディアクエリをまとめることができます。
    cmq:{
      options: {
        log: false
      },
      dev: {
        files: {
            'res/css/': ['res/css/style.css']
        }
      }
    },
    // csscombでCSSプロパティを揃えます。
    csscomb:{
      dev:{
        expand: true,
        cwd: 'res/css/',
        src: ['*.css'],
        dest: 'res/css/'
      }
    },
    // css minify
    cssmin: {
      build: {
        files: {
          'res/css/style.min.css' : 'res/css/style.css'
        }
      }
    },
    // ファイル結合の設定
    concat: {
      dist: {
        src: [
          'res/source_js/jquery.js',
          'res/source_js/easing.js',
          'res/source_js/scroll.js',
        ],
        dest: 'js/<%= pkg.name %>.js'
      }
    },

    // ファイル圧縮の設定
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'res/js/<%= pkg.name %>.js',
        dest: 'res/js/<%= pkg.name %>.min.js'
      }
    }
  });

  var taskName;
  // GruntFile.jsに記載されているパッケージを自動読み込み
  for(taskName in grunt.file.readJSON('package.json').devDependencies) {
    if(taskName.substring(0, 6) == 'grunt-') {
      grunt.loadNpmTasks(taskName);
    }
  }

  // デフォルトタスクの設定
  grunt.registerTask('default', ['connect', 'watch']);
  grunt.registerTask('build', [ 'concat', 'uglify' ]);
  grunt.registerTask('eatwarnings', function() {
    grunt.warn = grunt.fail.warn = function(warning) {
      grunt.log.error(warning);
    };
  });
   
};