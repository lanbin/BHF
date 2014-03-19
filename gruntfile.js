module.exports = function(grunt) {

    grunt.initConfig({

        watch: {
            all: {
                files: ['**/*.html','**/*.css', '**/*.js'],
                options: {
                    livereload: true                    
                }
            }
        },

        connect: {
            all: {
            options: {
                port: 9300,
                hostname: "localhost",
                base: __dirname,
                debug: true,
                livereload: true,
                middleware: function(connect){
                    return [
                        require('connect-livereload')({    
                            port: 9300
                        }),
                        connect.static(__dirname)
                    ]
                }
            }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['connect','watch']);
}
