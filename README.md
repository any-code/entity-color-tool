# entity-color-tool

[![Build Status](https://travis-ci.org/any-code/entity-color-tool.svg?branch=master)](https://travis-ci.org/any-code/entity-color-tool)

> Basic color stepping utilities, now includes a universal module loader.

## Getting Started

### 1. Installation

``` bash
npm install entity-color-tool
```

### 2. Examples

``` javascript

var tool = require('entity-color-tool')

tool.blendHexArray(100, "#FF0000", "#FFFF00")

```

Blending colors "#FF0000" and "#FFFF00" over 100 increments returns the hex codes in an array

    [ '#ffff00', '#fffc00', '#fff900', '#fff700', ..., '#ff0c00', '#ff0a00', '#ff0700', '#ff0500', '#FF0000']

## Copyright and license
Copyright (c) 2015, [Anycode](https://anycode.io/ "Anycode") <lee@anycode.io>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.
