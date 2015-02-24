module.exports = function(grunt) {

  // Configuration
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      // Releaser
      release: {
        options: {
          file: 'bower.json', //default: package.json
          npm: false, //default: true
          github: {
            repo: 'daniguardiola/paperkit-stable', //put your user/repo here
            usernameVar: 'GITHUB_USERNAME', //ENVIRONMENT VARIABLE that contains Github username
            passwordVar: 'GITHUB_PASSWORD' //ENVIRONMENT VARIABLE that contains Github password
          }
        }
      },

      // Shell tasks
      exec: {
        stageAll: {
          command: 'git tag -l | xargs git tag -d && git fetch && git add . --all && git reset -- bower.json && git commit -m "New release" --allow-empty && git push -q'
        }
      }
  });

  // Loading NPM tasks
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-exec');

  // Tasks
  grunt.registerTask('default', ['exec:stageAll', 'release']);
};

