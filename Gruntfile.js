module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			js: {
				src: [
					'src/Plugin.js',
					'src/**/*.js'
				],
				dest: 'dist/slick-ui.min.js'
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['uglify']);

};
