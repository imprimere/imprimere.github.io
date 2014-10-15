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
          'source_css/style.scss',
          'source_css/style_sp.scss'
        ],
        tasks: ['compass', 'cmq', 'csscomb', 'cssmin'],
        options: {
          nospawn: true
        }
      },
      js: {
        files: ['source_js/scroll.js'],
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
            'css/': ['css/style.css']
        }
      }
    },
    // csscombでCSSプロパティを揃えます。
    csscomb:{
      dev:{
        expand: true,
        cwd: 'css/',
        src: ['*.css'],
        dest: 'css/'
      }
    },
    // css minify
    cssmin: {
      build: {
        files: {
          'css/style.min.css' : 'css/style.css'
        }
      }
    },
    // ファイル結合の設定
    concat: {
      dist: {
        src: [
          'source_js/jquery.js',
          'source_js/easing.js',
          'source_js/scroll.js',
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
        src: 'js/<%= pkg.name %>.js',
        dest: 'js/<%= pkg.name %>.min.js'
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