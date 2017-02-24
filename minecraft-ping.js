/**
 * Created by rkoch on 1/15/17.
 */

const dgram = require('dgram');
const server = dgram.createSocket('udp4');

function ping(host="127.0.0.1", port=25565) {
    if (port < 1 || port > 65565) {
        port = 25565;
    } else {

    }

    server.on('error', (err) => {
        console.log(`server error:\n${err.stack}`);
        server.close();
    });

    server.on('message', (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
    });

    server.on('listening', () => {
        let address = server.address();
        console.log(`server listening ${address.address}:${address.port}`);
    });

    server.bind(port);
}

module.exports = ping;
