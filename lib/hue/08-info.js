/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/info-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'info';

    return {
        /* 8.1. Get all Timezones */
        getTimezones: getTimezones
    };

    /*
     * 8.1. Get all Timezones
     */
    function getTimezones() {
        return req.get(url(path, 'timezones')).then(parseBody);
    }
};
