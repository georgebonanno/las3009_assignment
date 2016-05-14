'use strict';
module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-json-server');

  grunt.initConfig({
    json_server: {
      options: {
        port: 13337,
        hostname: '0.0.0.0',
        db: "api/logo_commands.json", 
      }
    },
    watch: {
      src: {
        files: ['*.html','*.css','*.js'],
        options: {
          livereload:true
        }
      }
    },
    connect: {
      server: {
        options: {
          port:1234,
          base:'.'
        }
      }
    }
  });

  grunt.registerTask('serve', ['connect:server','watch']);
};