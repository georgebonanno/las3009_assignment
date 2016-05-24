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
          base:'.',
          middleware: function(connect, options, middlewares){
            middlewares.unshift(function(req,res,next) {
              if (req.url.indexOf("v1") > 0) {
                  grunt.log.write("Req: " + req.url);
                  var buffer = grunt.file.read('./index.html', {
                      encoding: 'utf-8'
                  });
                  res.writeHead(200);
                  res.write(buffer);
                  res.end();
              } else {
                  next();
              }
            });
            return middlewares;   
        }
     }
    }
  }
  });

  grunt.registerTask('serve', ['connect:server','watch']);
};