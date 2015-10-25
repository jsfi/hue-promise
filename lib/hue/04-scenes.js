/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/scenes-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'scenes';

    return {
        /* 4.1. Get all scenes */
        findAll: findAll,
        /* 4.2. Create Scene */
        add: add,
        /* 4.3. Modify Scene */
        update: update
        /* 4.4. Recall a scene -> groups.setState({ scene: scene })
        /* 4.5. Delete scene -> not possible */
    };

    /*
     * 4.1. Get all scenes
     */
    function findAll() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 4.2. Create Scene
     */
    function add(scene) {
        return req.post(url(path), scene).then(parseBody);
    }

    /*
     * 4.3. Modify Scene
     */
    function update(id, light, scene) {
         return req.get(url(path, id, 'lights', light, 'state'), scene).then(parseBody);
    }
};
