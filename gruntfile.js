module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["src/**/*.ts"],
                options: {
                    target: "es5",
                    module: "commonjs"
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.registerTask("default", ["ts"]);
}

