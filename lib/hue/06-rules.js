/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/rules-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'rules';

    return {
        /* 6.1. Get all rules */
        findAll: findAll,
        /* 6.2. Get Rule */
        findById: findById,
        /* 6.3. Create Rule */
        add: add,
        /* 6.4. Update Rule */
        update: update,
        /* 6.5. Delete Rule */
        remove: remove
    };

    /*
     * 6.1. Get all rules
     */
    function findAll() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 6.2. Get Rule
     */
    function findById(id) {
         return req.get(url(path, id)).then(parseBody);
    }

    /*
     * 6.3. Create Rule
     */
    function add(rule) {
        return req.post(url(path), rule).then(parseBody);
    }

    /*
     * 6.4. Update Rule
     */
    function update(id, rule) {
        return req.put(url('sensors', id), rule).then(parseBody);
    }

    /*
     * 6.5. Delete Rule
     */
    function remove(id) {
        return req.delete(url(path, id)).then(parseBody);
    }
};
