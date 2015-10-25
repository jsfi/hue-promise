/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/lights-api
 * for argument and response documentation
 * version 1.10.0 (30/09/2015)
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const req = require('../request');

module.exports = function(url, parseBody) {
    let path = 'lights';

    return {
        /* 1.1. Get all lights */
        findAll: findAll,
        /* 1.2. Get new lights */
        findNew: findNew,
        /* 1.3. Search for new lights */
        searchNew: searchNew,
        /* 1.4. Get light attributes and state */
        getAttributesAndState: getAttributesAndState,
        getAttributes: getAttributes,
        getName: getName,
        getState: getState,
        isOn: isOn,
        getBrightness: getBrightness,
        getHue: getHue,
        getSaturation: getSaturation,
        /* 1.5. Set light attributes (rename) */
        setAttributes: setAttributes,
        setName: setName,
        /* 1.6. Set light state */
        setState: setState,
        switchState: switchState,
        switchOn: switchOn,
        switchOff: switchOff,
        setBrightness: setBrightness,
        addToBrightness: addToBrightness,
        setHue: setHue,
        addToHue: addToHue,
        setSaturation: setSaturation,
        addToSaturation: addToSaturation,
        /* 1.7. Delete lights */
        remove: remove
    };

    /*
     * 1.1. Get all lights
     */
    function findAll() {
        return req.get(url(path)).then(parseBody);
    }

    /*
     * 1.2. Get new lights
     */
    function findNew() {
        return req.get(url(path, 'new')).then(parseBody);
    }

    /*
     * 1.3. Search for new lights
     */
    function searchNew(deviceid) {
        return req.post(url(path), { deviceid: deviceid }).then(parseBody);
    }

    /*
     * 1.4. Get light attributes and state
     */
    function getAttributesAndState(id) {
        return req.get(url(path, id)).then(parseBody);
    }

    function getAttributes(id) {
        return getAttributesAndState(id).then(data => {
            delete data.state;
            return data;
        });
    }

    function getName(id) {
        return getAttributesAndState(id).then(data => data.name);
    }

    function getState(id) {
        return getAttributesAndState(id).then(data => {
            return data.state;
        });
    }

    function isOn(id) {
        return getAttributesAndState(id).then(data => data.state.on);
    }

    function getBrightness(id) {
        return getAttributesAndState(id).then(data => data.state.bri);
    }

    function getHue(id) {
        return getAttributesAndState(id).then(data => data.state.hue);
    }

    function getSaturation(id) {
        return getAttributesAndState(id).then(data => data.state.sat);
    }

    /*
     * 1.5. Set light attributes (rename)
     */
    function setAttributes(id, attr) {
        return req.put(url(path, id), attr).then(parseBody);
    }

    function setName(id, name) {
        return setAttributes(id, { name: name });
    }

    /*
     * 1.6. Set light state
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
     * 1.7. Delete lights
     */
    function remove(id) {
        return req.delete(url(path, id)).then(parseBody);
    }
};
