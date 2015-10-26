'use strict';

const expect = require('expect.js');

const config = require('./config.json');

if (!config.bridge || !config.username) {
    throw new Error('Hue bridge must be configured.');
}

let huePromise = require('../')(config);

/*global describe*/
/*global it*/

describe('01-lights', function() {
    describe('test', function() {
        it('findAll', function () {
            return huePromise.lights.findAll().then(data => {
                expect(data).to.be.an('object');
                expect(Object.keys(data).length).to.be(config.lights);
            });
        });

        it('findNew', function () {
            return huePromise.lights.findNew().then(data => {
                expect(data).to.be.an('object');
            });
        });

        it('searchNew', function () {
            return huePromise.lights.searchNew().then(data => {
                expect(data).to.be.an('array');
            });
        });
    });
});
