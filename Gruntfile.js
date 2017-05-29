
module.exports  = function( grunt ) {
    grunt.initConfig({
        'phonegap-build': {
            debug: {
                options: {
                    archive: "app.zip",
                    appId: "123456",
                    user: {
                        token: "*********"
                    },
                    keys: {
                        ios: { "password": "test" },
                        android: { "key_pw": "test", "keystore_pw": "test" }
                    },
                    download: {
                        ios: 'ios.ipa',
                        android: 'android.apk'
                    }
                }
            },
            
            // minify release version
            release: {
                options: {
                    archive: "dist/app.zip",
                    appId: "123456",
                    user: {
                        token: "*********"
                    },
                    keys: {
                        ios: { "password": "test" },
                        android: { "key_pw": "test", "keystore_pw": "test" }
                    },
                    download: {
                        ios: 'ios.ipa',
                        android: 'android.apk'
                    }
                }
            }
        },
        concat: {
            options: {
                
                // remove comments
                stripBanners: {
                    block: true,
                    line: true
                }
            },
            
            dist: {
                src: ['js/boot.js', 'js/preload.js', 'js/gametitle.js', 'js/main.js', 'js/gameover.js'],
                dest: 'dist/game.min.js'
            }
        },
        
        uglify: {
            my_target: {
                files: {
                    'dist/game.min.js': ['dist/game.min.js']
                }
            }
        },
        
        compress: {
            debug: {
                options: {
                    archive: 'app.zip'
                },
                files: [
                    {expand: true, src: ['resources/**'], dot: true},
                    {expand: true, src: ['js/**']},
                    {expand: true, src: ['assets/**']},
                    {expand: true, src: ['index.html']},
                    {expand: true, src: ['config.xml']}
                ]
            },
            
            release: {
                options: {
                    archive: 'dist/app.zip'
                },
                files: [
                    {expand: true, src: ['phaser.min.js'], cwd: 'js/'},
                    {expand: true, src: ['game.min.js'], cwd: 'dist/'},
                    {expand: true, src: ['assets/**']},
                    {expand: true, src: ['resources/**'], dot: true},
                    {expand: true, src: ['index.html'], cwd: 'dist'},
                    {expand: true, src: ['config.xml']}
                ]
            }
        }
    })
    
    // Load tasks.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-phonegap-build');
    
    // Default task.
    grunt.registerTask('default', 'compress');
    
    //Custom tasks
    grunt.registerTask('build-app-release', ['concat', 'uglify', 'compress:release', 'phonegap-build:release']);
    grunt.registerTask('build-app-debug', ['compress:debug', 'phonegap-build:debug']);
}