'use strict';

const expect = require('expect.js');

const config = require('./config.json');

if (!config.bridge || !config.username) {
    throw new Error('Hue bridge must be configured.');
}

let huePromise = require('../')(config);

/*global describe*/
/*global it*/

describe('05-sensors', function() {
    describe('test', function() {
        it('findAll', function () {
            return huePromise.sensors.findAll().then(data => {
                expect(data).to.be.an('object');
            });
        });

        it('searchNew', function () {
            return huePromise.sensors.searchNew().then(data => {
                expect(data).to.be.an('array');
            });
        });

        it('findNew', function () {
            return huePromise.sensors.findNew().then(data => {
                expect(data).to.be.an('object');
            });
        });
    });
});
