/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * @see http://www.developers.meethue.com/documentation/configuration-api
 * for argument and response documentation
 * version 1.0
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const urljoin = require('url-join');
const req = require('./lib/request');
const base = 'api';

module.exports = function(configuration) {
    let bridge = configuration.bridge;
    let username = configuration.username;
    let baseUrl = urljoin(bridge, base);

    if (isUser) {
        return {
            /* 1. Lights */
            getAllLights: getAllLights,
            getNewLights: getNewLights,
            searchForNewLights: searchForNewLights,
            getLightAttributesAndState: getLightAttributesAndState,
            setLightAttributes: setLightAttributes,
            setLightState: setLightState,
            deleteLights: deleteLights,
            /* 2. Groups */
            getAllGroups: getAllGroups,
            createGroup: createGroup,
            getGroupAttributes: getGroupAttributes,
            setGroupAttributes: setGroupAttributes,
            setGroupState: setGroupState,
            deleteGroup: deleteGroup,
            /* 3. Schedules */
            getAllSchedules: getAllSchedules,
            createSchedule: createSchedule,
            getScheduleAttributes: getScheduleAttributes,
            setScheduleAttributes: setScheduleAttributes,
            deleteSchedule: deleteSchedule,
            /* 4. Scenes */
            getAllScenes: getAllScenes,
            createScene: createScene,
            modifyScene: modifyScene,
            /* 5. Sensors */
            getAllSensors: getAllSensors,
            createSensor: createSensor,
            findNewSensors: findNewSensors,
            getNewSensors: getNewSensors,
            getSensor: getSensor,
            updateSensor: updateSensor,
            deleteSensor: deleteSensor,
            changeSensorConfig: changeSensorConfig,
            changeSensorState: changeSensorState,
            /* 6. Rules */
            getAllRules: getAllRules,
            getRule: getRule,
            createRule: createRule,
            updateRule: updateRule,
            deleteRule: deleteRule,
            /* 7. Configuration */
            createUser: createUser,
            getConfiguration: getConfiguration,
            modifyConfiguration: modifyConfiguration,
            deleteUserFromWhitelist: deleteUserFromWhitelist,
            getFullState: getFullState
        };
    } else {
        return { createUser: createUser };
    }

    /* 1. Lights */
    function getAllLights() {
        return req.get(url('lights')).then(parseBody);
    }

    function getNewLights() {
        return req.get(url('lights/new')).then(parseBody);
    }

    function searchForNewLights(deviceid) {
        return req.post(url('lights'), { deviceid: deviceid }).then(parseBody);
    }

    function getLightAttributesAndState(id) {
        return req.get(url('lights', id)).then(parseBody);
    }

    function setLightAttributes(id, attr) {
        return req.put(url('lights', id), attr).then(parseBody);
    }

    function setLightState(id, state) {
        return req.put(url('lights', id, 'state'), state).then(parseBody);
    }

    function deleteLights(id) {
        return req.delete(url('lights', id)).then(parseBody);
    }

    /* 2. Groups */
    function getAllGroups() {
        return req.get(url('groups')).then(parseBody);
    }

    function createGroup(group) {
        return req.post(url('groups'), group).then(parseBody);
    }

    function getGroupAttributes(id) {
        return req.get(url('groups', id)).then(parseBody);
    }

    function setGroupAttributes(id, attr) {
        return req.put(url('groups', id), attr).then(parseBody);
    }

    function setGroupState(id, state) {
        return req.put(url('groups', id, 'action'), state).then(parseBody);
    }

    function deleteGroup(id) {
        return req.delete(url('groups', id)).then(parseBody);
    }

    /* 3. Schedules */
    function getAllSchedules() {
        return req.get(url('schedules')).then(parseBody);
    }

    function createSchedule(schedule) {
        return req.post(url('schedules'), schedule).then(parseBody);
    }

    function getScheduleAttributes(id) {
        return req.get(url('schedules', id)).then(parseBody);
    }

    function setScheduleAttributes(id, attr) {
        return req.put(url('schedules', id), attr).then(parseBody);
    }

    function deleteSchedule(id) {
        return req.delete(url('schedules', id)).then(parseBody);
    }

    /* 4. Scenes */
    function getAllScenes() {
        return req.get(url('scenes')).then(parseBody);
    }

    function createScene(scene) {
        return req.post(url('scenes'), scene).then(parseBody);
    }

    function modifyScene(id, scene) {
        return req.get(url('scenes', id), scene).then(parseBody);
    }

    /* 5. Sensors */
    function getAllSensors() {
        return req.get(url('sensors')).then(parseBody);
    }

    function createSensor(sensor) {
        return req.post(url('sensors'), sensor).then(parseBody);
    }

    function findNewSensors() {
        return req.post(url('sensors')).then(parseBody);
    }

    function getNewSensors() {
        return req.get(url('sensors/new')).then(parseBody);
    }

    function getSensor(id) {
        return req.get(url('sensors', id)).then(parseBody);
    }

    function updateSensor(id, sensor) {
        return req.put(url('sensors', id), sensor).then(parseBody);
    }

    function deleteSensor(id) {
        return req.delete(url('sensors', id)).then(parseBody);
    }

    function changeSensorConfig(id, config) {
        return req.put(url('sensors', id, 'config'), config).then(parseBody);
    }

    function changeSensorState(id, state) {
        return req.put(url('sensors', id, 'state'), state).then(parseBody);
    }

    /* 6. Rules */
    function getAllRules() {
        return req.get(url('rules')).then(parseBody);
    }

    function getRule(id) {
        return req.get(url('rules', id)).then(parseBody);
    }

    function createRule(rule) {
        return req.post(url('rules'), rule).then(parseBody);
    }

    function updateRule(id, rule) {
        return req.put(url('rules', id), rule).then(parseBody);
    }

    function deleteRule(id) {
        return req.delete(url('rules', id)).then(parseBody);
    }

    /* 7. Configuration */
    function createUser(devicetype) {
        return req.post(baseUrl, { devicetype: devicetype }).then(parseBody);
    }

    function getConfiguration() {
        return req.get(url('config')).then(parseBody);
    }

    function modifyConfiguration(config) {
        return req.put(url('config'), config).then(parseBody);
    }

    function deleteUserFromWhitelist(user) {
        return req.delete(url('config/whitelist', user)).then(parseBody);
    }

    function getFullState() {
        return req.get(url()).then(parseBody);
    }

    /* helper methods */
    function isUser() {
        if (!username) {
            throw new Error('No username configured.');
        }
    }

    function url() {
        return urljoin.apply(null, [baseUrl, username].concat(Array.prototype.slice.call(arguments)));
    }

    function parseBody(response) {
        return JSON.parse(response.body);
    }
}
