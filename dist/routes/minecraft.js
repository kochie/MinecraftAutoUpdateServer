"use strict";

var express = require("express");
// const hello = require('../hello');
var minecraftDownload = require("../minecraftDownload");

var router = express.Router();

/* GET users listing. */
router.get("/latest-remote", function (req, res) {
    minecraftDownload.getRemoteVersion().then(function (releaseNumber) {
        res.send("Remote Version: " + releaseNumber.release);
    });
});

router.get("/latest-local", function (req, res) {
    minecraftDownload.getLocalVersion().then(function (localVersionNumber) {
        res.send("Local Version: " + localVersionNumber.release);
    });
});

router.get("/update-server", function (req, res) {
    minecraftDownload.updateServer().then(function (response) {
        res.send(response);
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

router.get("/is-update-available", function (req, res) {
    minecraftDownload.isUpdateAvailable().then(function (response) {
        res.send(response);
    }).catch(function (error) {
        console.log(error);
        res.send(error);
    });
});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Expresso'
    });
});

module.exports = router;
//# sourceMappingURL=minecraft.js.map