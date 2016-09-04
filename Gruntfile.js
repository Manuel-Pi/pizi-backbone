module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		srcFile: 'src/',
		build: 'build/',
		testFile: 'tests/',
		//serverFolder: 'C:/Developppment/Web/Servers/pizi-express-server/Apps/pizi-backbone/',
        serverFolder: '../PiziServer/pizi-backbone/',
		devDependencies: [
			'jquery/dist/jquery.js',
			'backbone/backbone.js',
			'backbone/node_modules/underscore/underscore.js'
		],
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
			server: {
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
				],
			},
			modules: {
				files: {
					'<%= serverFolder %>modules/jquery.js': 'node_modules/jquery/dist/jquery.js',
					'<%= serverFolder %>modules/underscore.js': 'node_modules/backbone/node_modules/underscore/underscore.js',
					'<%= serverFolder %>modules/backbone.js': 'node_modules/backbone/backbone.js',
				}
			}
		},
		clean: {
			options :{
				force : true
			},
			server: '<%= serverFolder %>',
			build: '<%= build %>'
		},
		babel: {
			options: {
        		"plugins": ["add-module-exports", "transform-es2015-modules-umd"]
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
	grunt.registerTask('deployBuild', ['build', 'clean:server', 'copy:server', 'copy:modules']);
};