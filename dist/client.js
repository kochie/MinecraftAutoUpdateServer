'use strict';

/**
 * Created by rkoch on 1/15/17.
 */

var dgram = require('dgram');
var message = Buffer.from('Some Data');
var client = dgram.createSocket('udp4');
client.send(message, 25565, 'localhost', function (err) {
  client.close();
});
//# sourceMappingURL=client.js.map