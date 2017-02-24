'use strict';

/**
 * Created by rkoch on 1/15/17.
 */

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

function ping() {
    var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "127.0.0.1";
    var port = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 25565;

    if (port < 1 || port > 65565) {
        port = 25565;
    } else {}

    server.on('error', function (err) {
        console.log('server error:\n' + err.stack);
        server.close();
    });

    server.on('message', function (msg, rinfo) {
        console.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
    });

    server.on('listening', function () {
        var address = server.address();
        console.log('server listening ' + address.address + ':' + address.port);
    });

    server.bind(port);
}

module.exports = ping;
//# sourceMappingURL=minecraft-ping.js.map