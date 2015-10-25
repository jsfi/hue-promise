/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/schedules-api-0
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'schedules';

    return {
        /* 3.1. Get all schedules */
        findAll: findAll,
        /* 3.2. Create schedule */
        add: add,
        /* 3.3. Get schedule attributes */
        getAttributes: getAttributes,
        /* 3.4. Set schedule attributes */
        setAttributes: setAttributes,
        /* 3.5. Delete schedule */
        remove: remove
    };

    /*
     * 3.1. Get all schedules
     */
    function findAll() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 3.2. Create schedule
     */
    function add(schedule) {
        return req.post(url(path), schedule).then(parseBody);
    }

    /*
     * 3.3. Get schedule attributes
     */
    function getAttributes(id) {
         return req.get(url(path, id)).then(parseBody);
    }

    /*
     * 3.4. Set schedule attributes
     */
    function setAttributes(id, attr) {
        return req.put(url(path, id), attr).then(parseBody);
    }

    /*
     * 3.5. Delete schedule
     */
    function remove(id) {
        return req.delete(url(path, id)).then(parseBody);
    }
};
