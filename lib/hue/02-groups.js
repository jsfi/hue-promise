/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/groups-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const uniq = require('array-uniq');
const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'groups';

    return {
        /* 2.1. Get all groups */
        findAll: findAll,
        /* 2.2. Create group */
        add: add,
        /* 2.3. Get group attributes */
        getAttributes: getAttributes,
        getName: getName,
        getLights: getLights,
        isOn: isOn,
        getBrightness: getBrightness,
        getHue: getHue,
        getSaturation: getSaturation,
        /* 2.4. Set group attributes */
        setAttributes: setAttributes,
        setName: setName,
        setLights: setLights,
        addLights: addLights,
        removeLights: removeLights,
        /* 2.5. Set group state */
        setState: setState,
        switchState: switchState('light-ID', Boolean),
        switchOn: switchOn('light-ID'),
        switchOff: switchOff('light-ID'),
        setBrightness: setBrightness,
        addToBrightness: addToBrightness,
        setHue: setHue,
        addToHue: addToHue,
        setSaturation: setSaturation,
        addToSaturation: addToSaturation,
        /* 2.6. Delete Group */
        remove: remove
    };

    /*
     * 2.1. Get all groups
     */
    function findAll() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 2.2. Create group
     */
    function add(group) {
        return req.post(url(path), group).then(parseBody);
    }

    /*
     * 2.3. Get group attributes
     */
    function getAttributes(id) {
         return req.get(url(path, id)).then(parseBody);
    }

    function getName(id) {
        return getAttributes(id).then(data => data.name);
    }

    function getLights(id) {
        return getAttributes(id).then(data => data.lights);
    }

    function isOn(id) {
        return getAttributes(id).then(data => data.action.on);
    }

    function getBrightness(id) {
        return getAttributes(id).then(data => data.action.bri);
    }

    function getHue(id) {
        return getAttributes(id).then(data => data.action.hue);
    }

    function getSaturation(id) {
        return getAttributes(id).then(data => data.action.sat);
    }

    /*
     * 2.4. Set group attributes
     */
    function setAttributes(id, attr) {
        return req.put(url(path, id), attr).then(parseBody);
    }

    function setName(id, name) {
        return setAttributes(id, { name: name });
    }

    function setLights(id, lights) {
        return setAttributes(id, { lights: lights });
    }

    function addLights(id, lights) {
        return getLights(id).then(currentLights => {
            return setLights(uniq(currentLights.concat(lights)));
        });
    }

    function removeLights(id, lights) {
        return getLights(id).then(currentLights => {
            lights.forEach(function(light) {
                let pos = currentLights.indexOf(light);

                if (~pos) {
                    currentLights.splice(pos, 1);
                }
            });

            return setLights(currentLights.concat(lights));
        });
    }

    /*
     * 2.5. Set group state
     */
    function setState(id, state) {
        return req.put(url(path, id, 'state'), state).then(parseBody);
    }

    function switchState(id, state) {
        return setState(id, { on: state });
    }

    function switchOn(id) {
        return switchState(id, true);
    }

    function switchOff(id) {
        return switchState(id, false);
    }

    function setBrightness(id, bri) {
        return setState(id, { bri: bri });
    }

    function addToBrightness(id, step) {
        return setState(id, { bri_inc: step });
    }

    function setHue(id, hue) {
        return setState(id, { hue: hue });
    }

    function addToHue(id, step) {
        return setState(id, { hue_inc: step });
    }

    function setSaturation(id, sat) {
        return setState(id, { sat: sat });
    }

    function addToSaturation(id, step) {
        return setState(id, { sat_inc: step });
    }

    /*
     * 2.6. Delete Group
     */
    function remove(id) {
        return req.delete(url(path, id)).then(parseBody);
    }
};
