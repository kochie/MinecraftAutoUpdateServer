/**
 * Created by rkoch on 1/15/17.
 */

const dgram = require('dgram');
const message = Buffer.from('Some Data');
const client = dgram.createSocket('udp4');
client.send(message, 25565, 'localhost', (err) => {
    client.close();
});