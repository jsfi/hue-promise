'use strict';

const expect = require('expect.js');

const config = require('./config.json');

if (!config.bridge || !config.username) {
    throw new Error('Hue bridge must be configured.');
}

let huePromise = require('../')(config);

/*global describe*/
/*global it*/

describe('07-configuration', function() {
    describe('test', function() {
        it('get', function () {
            return huePromise.configuration.get().then(data => {
                expect(data.bridgeid).to.be(config.bridgeid);
            });
        });

        it('getDatastore', function () {
            return huePromise.configuration.getDatastore().then(data => {
                expect(data.config.bridgeid).to.be(config.bridgeid);
            });
        });
    });
});
