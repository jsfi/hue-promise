# hue-promise

> Philips Hue API with promises

![dependencies](https://david-dm.org/jsfi/hue-promise.svg)

## 1. Step: Translate documentation to API

The first step is the literal translation of the [documentation](http://www.developers.meethue.com/documentation/configuration-api) to a promise-based API.

## 2. Step: Streamlining of the API

> next todo

The API methods will be refactored to create a comprehensible interface.

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
let huePromise = require('../')({ station: 'IP', username: 'username' });
```
