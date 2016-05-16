module.exports = function(grunt) {
	
	grunt.initConfig({
		compass: {
			dev: {
				options: {
					sassDir:"sass",
					cssDir: "css"
				}
			}
		},
		watch: {
			compass: {
				files: 'sass/**/*.scss',
				tasks:["compass"],
				options: {
					interrupt: true,
				}
			}
		}
	});
	
	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');


}