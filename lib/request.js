/*
 * hue-promise
 * https://github.com/jsfi/hue-promise
 *
 * Copyright (c) 2015 Martin Sachse
 * Licensed under the MIT license.
 */

'use strict';

const got = require('got');

module.exports = {
    get: get,
    post: post,
    put: put,
    delete: del
};

function get(url, options) {
    return got(url, Object.assign({}, options));
}

function post(url, body, options) {
    return got(url, Object.assign({}, options, { body: data(body) }, { method: 'POST' }));
}

function put(url, body, options) {
    return got(url, Object.assign({}, options, { body: data(body) }, { method: 'PUT' }));
}

function del(url, options) {
    return got(url, Object.assign({}, options, { method: 'DELETE' }));
}

function data(data) {
    if (typeof data === 'object') {
        return JSON.stringify(data);
    }

    return data;
}
