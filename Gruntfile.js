module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: [ "lib/", "dist/*.js" ],
		copy: {
			main: {
				files: [{
					expand: true,
					cwd: "src/",
					src: [ "**/*.js" ],
					dest: "lib/",
					filter: 'isFile'
				}]
			}
		},
		peg: {
			main: {
				options: {
					optimize: "size"
				},
				files: [{
					expand: true,
					cwd: "src/",
					src: [ "**/*.peg" ],
					dest: "lib/",
					ext: ".js",
					filter: 'isFile'
				}]
			}
		},
		browserify: {
			dist: {
				src: "lib/index.js",
				dest: "dist/temple-selector.js",
				options: {
					browserifyOptions: { standalone: "Temple.fromSelector" }
				}
			},
			dev: {
				src: "lib/index.js",
				dest: "dist/temple-selector.dev.js",
				options: {
					browserifyOptions: { debug: true, standalone: "Temple.fromSelector" }
				}
			},
			test: {
				src: "test/*.js",
				dest: "dist/temple-selector.test.js",
				options: {
					browserifyOptions: { debug: true }
				}
			}
		},
		wrap2000: {
			dist: {
				src: 'dist/temple-selector.js',
				dest: 'dist/temple-selector.js',
				options: {
					header: "/*\n * Temple Selector\n * (c) 2014 Beneath the Ink, Inc.\n * MIT License\n * Version <%= pkg.version %>\n */\n"
				}
			},
			dev: {
				src: 'dist/temple-selector.dev.js',
				dest: 'dist/temple-selector.dev.js',
				options: {
					header: "/*\n * Temple Selector (with Source Map)\n * (c) 2014 Beneath the Ink, Inc.\n * MIT License\n * Version <%= pkg.version %>\n */\n"
				}
			},
			test: {
				src: 'dist/temple-selector.test.js',
				dest: 'dist/temple-selector.test.js',
				options: {
					header: "/* Temple Selector Tests / (c) 2014 Beneath the Ink, Inc. / MIT License / Version <%= pkg.version %> */"
				}
			}
		},
		uglify: {
			dist: {
				src: "dist/temple-selector.js",
				dest: "dist/temple-selector.min.js"
			}
		},
		watch: {
			test: {
				files: [ "src/**/*.{js,peg}", "test/**/*.js" ],
				tasks: [ 'test' ],
				options: { spawn: false }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-peg');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-wrap2000');

	grunt.registerTask('precompile', [ 'clean', 'copy', 'peg' ]);

	grunt.registerTask('build-dev', [ 'browserify:dev', 'wrap2000:dev' ]);
	grunt.registerTask('build-test', [ 'browserify:test', 'wrap2000:test' ]);
	grunt.registerTask('build-dist', [ 'browserify:dist', 'wrap2000:dist', 'uglify:dist' ]);

	grunt.registerTask('dev', [ 'precompile', 'build-dev' ]);
	grunt.registerTask('test', [ 'precompile', 'build-test' ]);
	grunt.registerTask('dist', [ 'precompile', 'build-dist' ]);

	grunt.registerTask('default', [ 'dist' ]);

}
