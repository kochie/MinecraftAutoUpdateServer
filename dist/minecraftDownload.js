#!/usr/bin/env node
"use strict";

var fetch = require("node-fetch");
var fs = require("fs");
var mineping = require("mineping");
var exec = require('child_process').exec;

function updateServer() {
    return new Promise(function (resolve) {
        resolve();
    }).then(function () {
        return isUpdateAvailable();
    }).then(function (updateData) {
        return getUpdate(updateData);
    }).then(function (updateData) {
        return restartServer(updateData);
    });
}

function getUpdate(updateData) {
    if (updateData.available) {
        console.log(updateData);
        return downloadJarFile(updateData.remote).then(function () {
            return {
                updated: true,
                message: "Downloaded version: " + updateData.remote.release
            };
        });
        // return (update.remote.release);
    } else {
        return {
            updated: false,
            message: "No new version found"
        };
    }
}

function restartServer(updateData) {
    if (updateData.updated) {
        exec('source restart.sh', function (error, stdout, stderr) {
            if (stderr !== '') {
                console.log('stderr: ' + stderr);
            }
            console.log('stdout: ' + stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    } else {}

    return updateData;
}

function isUpdateAvailable() {
    return Promise.all([getRemoteVersion(), getLocalVersion()]).then(function (values) {
        console.log(values);
        var remote = values[0];
        var local = values[1];
        return {
            available: remote.release > local.release,
            local: local,
            remote: remote
        };
    }).catch(function (error) {
        console.log(error);
    });
}

/**
 *
 * @return {Promise}
 */
function downloadJarFile(release_json) {
    return fetch("https://s3.amazonaws.com/Minecraft.Download/versions/" + release_json.release + "/minecraft_server." + release_json.release + ".jar").then(function (res) {
        var file = fs.createWriteStream("./minecraft_server.jar");
        res.body.pipe(file);
        console.log("Downloaded version " + release_json.release);

        setLocalVersion(release_json);
    });
}

/**
 *
 * @returns {Promise}
 */
function getRemoteVersion() {
    return fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json").then(function (res) {
        return res.json();
    }).then(function (json) {
        return json.latest;
    }).catch(function (error) {
        return error;
    });
}

/**
 * getLocalVersion - looks for the version number of the downloaded minecraft
 * instance.
 *
 * @return {Promise}  promise object representing the reading of the json file. 
 */
function getLocalVersion() {
    var file = "./latest.json";
    return new Promise(function (resolve, reject) {
        if (fs.existsSync(file)) {
            fs.readFile(file, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            });
        } else {
            resolve({
                release: "0.0.0",
                snapshot: "0.0.0"
            });
        }
    });
}

function setLocalVersion(json) {
    var file = "./latest.json";
    return new Promise(function (resolve, reject) {
        fs.writeFile(file, JSON.stringify(json), function (error) {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

function ping() {
    return new Promise(function (resolve, reject) {
        mineping(3, "minecraft.kochie.io", 25565, function (response) {
            console.log(response);
            resolve(response);
        });
    });
}

module.exports = {
    getRemoteVersion: getRemoteVersion,
    getLocalVersion: getLocalVersion,
    updateServer: updateServer,
    isUpdateAvailable: isUpdateAvailable,
    ping: ping
};
//# sourceMappingURL=minecraftDownload.js.map