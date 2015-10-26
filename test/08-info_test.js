'use strict';

const expect = require('expect.js');

const config = require('./config.json');

if (!config.bridge || !config.username) {
    throw new Error('Hue bridge must be configured.');
}

let huePromise = require('../')(config);

/*global describe*/
/*global it*/

describe('08-info', function() {
    describe('test', function() {
        it('getTimezones', function () {
            return huePromise.info.getTimezones().then(data => {
                expect(data).to.be.an('array');
                expect(~data.indexOf('CET')).to.be.ok();
            });
        });
    });
});
