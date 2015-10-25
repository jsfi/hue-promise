/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/sensors-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'sensors';

    return {
        /* 5.1. Get all sensors */
        findAll: findAll,
        /* 5.2. Create sensor */
        add: add,
        /* 5.3. Find new sensors */
        searchNew: searchNew,
        /* 5.4. Get New Sensors */
        findNew: findNew,
        /* 5.5. Get Sensor */
        findById: findById,
        /* 5.6. Update Sensor */
        update: update,
        /* 5.7. Delete Sensor */
        remove: remove,
        /* 5.8. Change Sensor Config */
        setConfig: setConfig,
        /* 5.9. Change Sensor State */
        setState: setState
    };

    /*
     * 5.1. Get all sensors
     */
    function findAll() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 5.2. Create sensor
     */
    function add(sensor) {
        return req.post(url(path), sensor).then(parseBody);
    }

    /*
     * 5.3. Find new sensors
     */
    function searchNew() {
        return req.post(url(path)).then(parseBody);
    }

    /*
     * 5.4. Get New Sensors
     */
    function findNew() {
        return req.get(url(path, 'new')).then(parseBody);
    }

    /*
     * 5.5. Get Sensor
     */
    function findById(id) {
         return req.get(url(path, id)).then(parseBody);
    }

    /*
     * 5.6. Update Sensor
     */
    function update(id, sensor) {
        return req.put(url('sensors', id), sensor).then(parseBody);
    }

    /*
     * 5.7. Delete Sensor
     */
    function remove(id) {
        return req.delete(url(path, id)).then(parseBody);
    }

    /*
     * 5.8. Change Sensor Config
     */
    function setConfig(id, config) {
        return req.put(url(path, id), config).then(parseBody);
    }

    /*
     * 5.9. Change Sensor State
     */
    function setState(id, state) {
        return req.put(url(path, id, 'state'), state).then(parseBody);
    }
};
