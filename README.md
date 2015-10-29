# hue-promise

> Philips Hue API with promises

![dependencies](https://david-dm.org/jsfi/hue-promise.svg)

## Install

This module requires node `>=4.0.0`

```
$ git clone git@github.com:jsfi/hue-promise.git
```

## Usage

```js
let huePromise = require('./hue-promise')(configuration);
```

## Example

```js
let huePromise = require('./hue-promise')({ bridge: 'IP', username: 'username' });
```

## Configuration

```js
{
    bridge: 'IP',
    username: 'username'
}
```

### Bridge

This option is required, it sets the IP the requests are send to.

### Username

This option is optional. If it is empty the only method that can return a successful response is `huePromise.configuration.createUser('devicetype')` (if the button on the bridges is pressed during the last 30 seconds).

It can be changed later with the method `huePromise.setUsername(username)`.

## Methods

All API-methods will return a promise that resolves to a parsed response (all arguments and responses are defined in the [Philips hue API Documentation](http://www.developers.meethue.com/philips-hue-api)).

Only setUsername is a synchronous function as it configures the module.

The methods without direct match in the API (recognizable by the missing mapping-comment in the following overview and in the source files) are shortcut-methods that will be forwarded to the API-method they are defined after.

```js
{
    lights: {
        /* 1.1. Get all lights */
        findAll: findAll(),
        /* 1.2. Get new lights */
        findNew: findNew(),
        /* 1.3. Search for new lights */
        searchNew: searchNew(),
        /* 1.4. Get light attributes and state */
        getAttributesAndState: getAttributesAndState('light-ID'),
        getAttributes: getAttributes('light-ID'),
        getName: getName('light-ID'),
        getState: getState('light-ID'),
        isOn: isOn('light-ID'),
        getBrightness: getBrightness('light-ID'),
        getHue: getHue('light-ID'),
        getSaturation: getSaturation('light-ID'),
        /* 1.5. Set light attributes (rename) */
        setAttributes: setAttributes('light-ID', {}),
        setName: setName('light-ID', 'name'),
        /* 1.6. Set light state */
        setState: setState('light-ID', {}),
        switchState: switchState('light-ID', Boolean),
        switchOn: switchOn('light-ID'),
        switchOff: switchOff('light-ID'),
        setBrightness: setBrightness('light-ID', Number),
        addToBrightness: addToBrightness('light-ID', Number),
        setHue: setHue('light-ID', Number),
        addToHue: ('light-ID', Number),
        setSaturation: ('light-ID', Number),
        addToSaturation: ('light-ID', Number),
        /* 1.7. Delete lights */
        remove: remove()
    }, groups: {
        /* 2.1. Get all groups */
        findAll: findAll(),
        /* 2.2. Create group */
        add: add({}),
        /* 2.3. Get group attributes */
        getAttributes: getAttributes('group-ID'),
        getName: getName('group-ID'),
        getLights: getLights('group-ID'),
        isOn: isOn('group-ID'),
        getBrightness: getBrightness('group-ID'),
        getHue: getHue('group-ID'),
        getSaturation: getSaturation('group-ID'),
        /* 2.4. Set group attributes */
        setAttributes: setAttributes('group-ID', {}),
        setName: setName('group-ID', 'name'),
        setLights: setLights('group-ID', ['light-ID']),
        addLights: addLights('group-ID', ['light-ID']),
        removeLights: removeLights('group-ID', ['light-ID']),
        /* 2.5. Set group state */
        setState: setState('group-ID', {}),
        switchState: switchState('group-ID', Boolean),
        switchOn: switchOn('group-ID'),
        switchOff: switchOff('group-ID'),
        setBrightness: setBrightness('group-ID', Number),
        addToBrightness: addToBrightness('group-ID', Number),
        setHue: setHue('group-ID', Number),
        addToHue: addToHue('group-ID', Number),
        setSaturation: setSaturation('group-ID', Number),
        addToSaturation: addToSaturation('group-ID', Number),
        /* 2.6. Delete Group */
        remove: remove('group-ID')
    }, schedules: {
        /* 3.1. Get all schedules */
        findAll: findAll(),
        /* 3.2. Create schedule */
        add: add({}),
        /* 3.3. Get schedule attributes */
        getAttributes: getAttributes('schedule-ID'),
        /* 3.4. Set schedule attributes */
        setAttributes: setAttributes('schedule-ID', {}),
        /* 3.5. Delete schedule */
        remove: remove('schedule-ID')
    }, scenes: {
        /* 4.1. Get all scenes */
        findAll: findAll(),
        /* 4.2. Create Scene */
        add: add({}),
        /* 4.3. Modify Scene */
        update: update('scene-ID', {})
        /* 4.4. Recall a scene -> groups.setState({ scene: scene })
        /* 4.5. Delete scene -> not possible */
    }, sensors: {
        /* 5.1. Get all sensors */
        findAll: findAll(),
        /* 5.2. Create sensor */
        add: add({}),
        /* 5.3. Find new sensors */
        searchNew: searchNew(),
        /* 5.4. Get New Sensors */
        findNew: findNew(),
        /* 5.5. Get Sensor */
        findById: findById('sensor-ID'),
        /* 5.6. Update Sensor */
        update: update('sensor-ID', {}),
        /* 5.7. Delete Sensor */
        remove: remove('sensor-ID'),
        /* 5.8. Change Sensor Config */
        setConfig: setConfig('sensor-ID', {}),
        /* 5.9. Change Sensor State */
        setState: setState('sensor-ID', {})
    }, rules: {
        /* 6.1. Get all rules */
        findAll: findAll(),
        /* 6.2. Get Rule */
        findById: findById('rule-ID'),
        /* 6.3. Create Rule */
        add: add({}),
        /* 6.4. Update Rule */
        update: update('rule-ID', {}),
        /* 6.5. Delete Rule */
        remove: remove('rule-ID')
    }, configuration: {
        /* 7.1. Create user */
        createUser: createUser('devicetype'),
        /* 7.2. Get configuration */
        get: get(),
        /* 7.3. Modify configuration */
        update: update({}),
        /* 7.4. Delete user from whitelist */
        removeUser: removeUser('username'),
        /* 7.5. Get full state (datastore) */
        getDatastore: getDatastore()
    }, info: {
        /* 8.1. Get all Timezones */
        getTimezones: getTimezones()
    }, setUsername: setUsername('username')
};
```
