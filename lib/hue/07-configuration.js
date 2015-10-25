/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/configuration-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(baseUrl, url, parseBody) {
    let path = 'config';
    
    return {
        /* 7.1. Create user */
        createUser: createUser,
        /* 7.2. Get configuration */
        get: get,
        /* 7.3. Modify configuration */
        update: update,
        /* 7.4. Delete user from whitelist */
        removeUser: removeUser,
        /* 7.5. Get full state (datastore) */
        getDatastore: getDatastore
    };

    /*
     * 7.1. Create user
     */
    function createUser(devicetype) {
        return req.post(baseUrl, { devicetype: devicetype }).then(parseBody);
    }

    /*
     * 7.2. Get configuration
     */
    function get() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 7.3. Modify configuration
     */
    function update(config) {
        return req.put(url(path), config).then(parseBody);
    }

    /*
     * 7.4. Delete user from whitelist
     */
    function removeUser(user) {
        return req.delete(url(path, 'whitelist', user)).then(parseBody);
    }

    /*
     * 7.5. Get full state (datastore)
     */
    function getDatastore() {
        return req.get(url()).then(parseBody);
    }
};
