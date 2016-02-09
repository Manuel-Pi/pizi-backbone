module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		srcFile: 'src/',
		build: 'build/',
		testFile: 'tests/',
		//serverFolder: 'C:/Developppment/Web/Servers/pizi-express-server/Apps/pizi-backbone/',
        serverFolder: 'C:/Users/e_na/Documents/GitHub/pizi-express-server/Apps/pizi-backbone/',
		jshint: {
			all: {
				options: {
					devel: true,
					esnext: true
				},
				src: '<%= srcFile %>'
			}
		},
		copy: {
            build : {
                files : [
                    {
                        expand: true,
                        cwd: '<%= srcFile %>',
                        src: ['*.css'],
                        dest: '<%= build %>'
                    }
                ]
            },
			deployDev : {
					files : [
						{
							expand: true,
							cwd: '<%= srcFile %>',
							src: ['**'],
							dest: '<%= serverFolder %>'
						},
						{
							expand: true,
							cwd: '<%= testFile %>',
							src: ['**'],
							dest: '<%= serverFolder %>'
						}
					]
			},
			deployDevBabel : {
				files : [
					{
						expand: true,
						cwd: '<%= build %>',
						src: ['**'],
						dest: '<%= serverFolder %>'
					},
					{
						expand: true,
						cwd: '<%= testFile %>',
						src: ['**'],
						dest: '<%= serverFolder %>'
					}
				]
			},
			css: {
				files: [
					{
						expand: true,
						cwd: 'bower_components/',
						src: ['foundation/css/foundation.css',
							'foundation/css/normalize.css'
						],
						dest: '<%= serverFolder %>'
					},
					{ '<%= serverFolder %>/pizi-backbone.css': 'src/pizi-backbone.css'}
				]
			}
		},
		clean: {
			options :{
				force : true
			},
			deployDev: '<%= serverFolder %>',
			build: '<%= build %>',
			bower: "<%= serverFolder %>/trash",
		},
		babel: {
			options: {
				sourceMaps: false,
        		"plugins": ["transform-es2015-modules-umd"],
                "presets": ["es2015"]
			},
			dist: {
				files: [{
					"expand": true,
					"cwd": '<%= srcFile %>',
					"src": ["**/*.js"],
					"dest": '<%= build %>',
					"ext": ".js"
				}]
			}
		},
		bower: {
			dev : {
				dest: '<%= serverFolder %>/trash',
				js_dest: '<%= serverFolder %>',
				options: {
					expand: true
				}       
			}
		}
	});
	
	grunt.registerTask('build', ['jshint', 'clean:build', 'babel', 'copy:build']);
	grunt.registerTask('deployDev', ['jshint', 'clean:deployDev', 'copy:deployDev']);
	grunt.registerTask('deployBuild', ['build', 'clean:deployDev', 'copy:deployDevBabel', 'copy:css', 'bower', 'clean:bower']);
};