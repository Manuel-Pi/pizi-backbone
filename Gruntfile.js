module.exports = function(grunt) {
	grunt.initConfig({
		srcFile: 'src/',
		build: 'build/',
		testFile: 'tests/',
		serverFolder: 'C:/Developppment/Web/Servers/pizi-express-server/Apps/pizi-backbone/',
        //serverFolder: 'C:/Users/e_na/Documents/GitHub/pizi-express-server/Apps/pizi-backbone/',
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
					},
					{
						expand: true,
						cwd: 'node_modules/',
						src: [
							'backbone/backbone.js',
							'backbone/node_modules/underscore/underscore.js',
							'jquery/dist/jquery.js',
							'zurb-foundation-5/js/foundation/foundation.js',
							'zurb-foundation-5/js/foundation/foundation.reveal.js'
						],
						dest: '<%= serverFolder %>',
						flatten: true
					}
				]
			}
		},
		clean: {
			options :{
				force : true
			},
			deployDev: '<%= serverFolder %>',
			build: '<%= build %>'
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
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-babel');
	
	grunt.registerTask('build', ['jshint', 'clean:build', 'babel']);
	grunt.registerTask('deployDev', ['jshint', 'clean:deployDev', 'copy:deployDev']);
	grunt.registerTask('deployBuild', ['build', 'clean:deployDev', 'copy:deployDevBabel']);
};