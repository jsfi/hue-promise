/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/philips-hue-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const urljoin = require('url-join');
const base = 'api';

module.exports = function(configuration) {
    let bridge = configuration.bridge;
    let username = configuration.username;
    let baseUrl = urljoin(bridge, base);

    return {
        lights: require('./lib/hue/01-lights')(url, parseBody),
        groups: require('./lib/hue/02-groups')(url, parseBody),
        schedules: require('./lib/hue/03-schedules')(url, parseBody),
        scenes: require('./lib/hue/04-scenes')(url, parseBody),
        sensors: require('./lib/hue/05-sensors')(url, parseBody),
        rules: require('./lib/hue/06-rules')(url, parseBody),
        configuration: require('./lib/hue/07-configuration')(baseUrl, url, parseBody),
        info: require('./lib/hue/08-info')(url, parseBody),
        setUsername: setUsername
    };

    /* helper methods */
    function setUsername(newUsername) {
        username = newUsername;
    }

    function url() {
        return urljoin.apply(null, [baseUrl, username].concat(Array.prototype.slice.call(arguments)));
    }

    function parseBody(response) {
        return JSON.parse(response.body);
    }
}
