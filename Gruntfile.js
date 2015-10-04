module.exports = function(grunt) {
	grunt.initConfig({
		auto_install:{
			local: {},
			back: {
				options:{
					cwd:'back',
					stdout:true,
					stderr:true,
					failOnError:true
				}
			}
		},
		clean:{
			back:['back/node_modules']
		},
		apidoc:{
			back:{
				src:'back/',
				dest:'docs/apirest/'
			}
		},
		execute:{
			initDb:{
				src:['loadDbScript.js']
			},
			startServer:{
				src:['back/index.js']
			}
		},
		env:{
			secEnv:{
				SECURITY:'true'
			}
		}
	});

	grunt.loadNpmTasks('grunt-auto-install');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-apidoc');
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-env');

	grunt.registerTask('docsBack',['clean:back','apidoc:back','auto_install:back']);
	grunt.registerTask('backInstall',['clean:back','apidoc:back','auto_install:back','execute:initDb','env:secEnv','execute:startServer']);
	grunt.registerTask('initBack',['execute:initDb','env:secEnv','execute:startServer']);
	grunt.registerTask('startBack',['env:secEnv','execute:startServer']);
};

