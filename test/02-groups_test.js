'use strict';

const expect = require('expect.js');

const config = require('./config.json');

if (!config.bridge || !config.username) {
    throw new Error('Hue bridge must be configured.');
}

let huePromise = require('../')(config);

/*global describe*/
/*global it*/

describe('02-groups', function() {
    describe('test', function() {
        it('findAll', function () {
            return huePromise.groups.findAll().then(data => {
                expect(data).to.be.an('object');
            });
        });
    });
});
