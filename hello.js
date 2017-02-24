const exec = require('child_process').exec;

function hello(){
  exec('source hello.sh', function (error, stdout, stderr) {
    if (stderr !== ''){
      console.log('stderr: ' + stderr);
    }
    console.log('stdout: ' + stdout);
    if (error !== null) {
         console.log('exec error: ' + error);
    }
  });
}

module.exports = hello;
