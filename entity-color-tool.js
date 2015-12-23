function Module(exports) {

    exports.hexToRGB = hexToRGB;
    exports.blendRGB = blendRGB;
    exports.blendHex = blendHex;
    exports.blendHexArray = blendHexArray;
    exports.rgbToHLS = rgbToHLS;
    exports.hlsToRGB = hlsToRGB;
    exports.rgbToHex = rgbToHex;
    exports.hueHexArray = hueHexArray;

    /**
     * Expand #000 to #000000
     * @param hexColor
     * @returns {string}
     */
    function expandHex(hexColor) {
        // (I love this line of code)[from http://stackoverflow.com/a/17433060]
        return hexColor.replace(/(.)/g, '$1$1');
    }

    /**
     * Ensure the hex color fails nicely
     * @param hc
     * @param error
     * @returns {*}
     */
    function prepareHexColor(hc, error) {
        if (!error) {
            error = "000000";
        } else if (error[0] === "#") {
            error = error.substring(1);
        }

        if (!hc) { hc = error; }
        if (hc[0] === "#") { hc = hc.substring(1); }
        if (hc.length === 3) { hc = expandHex(hc); }
        if (hc.length !== 6 && hc.length !== 3) { hc = error; }
        return hc;
    }

    /**
     * convert hex to [r, g, b] falling back to error
     * @param hc
     * @param error
     * @returns Array[Integer, Integer, Integer]
     */
    function hexToRGB(hc, error)  {
        hc = prepareHexColor(hc, error);

        return [
            parseInt(hc.substring(0,2),16),
            parseInt(hc.substring(2,4),16),
            parseInt(hc.substring(4,6),16)
        ];
    }

    /**
     * Blend rgb1 with rgb2 at given point
     * @param rgb1
     * @param rgb2
     * @param point
     * @returns {*[]}
     */
    function blendRGB(rgb1, rgb2, point){
        var fraction = point * 2 - 1,
            left = (fraction + 1) / 2.0,
            right = 1 - left,
            blendChannel = function(i) { return parseInt(rgb1[i] * left + rgb2[i] * right) },
            rgb = [blendChannel(0), blendChannel(1), blendChannel(2)];

        return rgb;
    }

    /**
     * blend hex1 with hex2 at given point
     * @param hex1
     * @param hex2
     * @param fraction
     * @returns {string}
     */
    function blendHex(hex1, hex2, point) {
        if (!point) {
            point = 0.5;
        }
        var rgb = blendRGB(hexToRGB(hex1), hexToRGB(hex2), point);
        return "#" + channelIntToHex(rgb[0]) + channelIntToHex(rgb[1]) + channelIntToHex(rgb[2]);
    }


    function blendHexArray(size, hex1, hex2, preferFirst) {
        var steps = [preferFirst?hex1:hex2];
        for (var i = 1; i < size -1; i++ ) {
            steps.push(blendHex(preferFirst?hex2:hex1, preferFirst?hex1:hex2, (1 / size) * i));
        }
        steps.push(preferFirst?hex2:hex1);
        return steps;
    }

    function hueHexArray(size, hex, deg) {

        var steps = [hex],
            dps = deg / size;

        for (var i = 1; i < size; i++ ) {
            var rgb = hexToRGB(hex);
            var hls = rgbToHLS(rgb);
            hls[0] = hls[0] + (dps*i);
            rgb = hlsToRGB(hls);
            steps.push(rgbToHex(rgb));
        }

        return steps;
    }

    function channelIntToHex(value) {
        var hex = value.toString(16);
        return "00".substring(hex.length) + hex
    }

    //modified [from http://stackoverflow.com/a/17433060]
    function rgbToHLS(rgb) {
        var r = rgb[0] / 255,
            g = rgb[1] / 255,
            b = rgb[2] / 255,
            cMax = Math.max(r, g, b),
            cMin = Math.min(r, g, b),
            delta = cMax - cMin,
            l = (cMax + cMin) / 2,
            h = 0,
            s = 0;

        if (delta == 0) {
            h = 0;
        } else if (cMax == r) {
            h = 60 * (((g - b) / delta) % 6);
        } else if (cMax == g) {
            h = 60 * (((b - r) / delta) + 2);
        } else {
            h = 60 * (((r - g) / delta) + 4);
        }

        if (delta == 0) {
            s = 0;
        } else {
            s = (delta/(1-Math.abs(2*l - 1)))
        }

        return [h,l,s]
    }

    //modified [from http://stackoverflow.com/a/17433060]
    function hlsToRGB(hls) {
        var h = hls[0],
            l = hls[1],
            s = hls[2],
            c = (1 - Math.abs(2*l - 1)) * s,
            x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
            m = l - c/ 2,
            r, g, b;

        if (h < 60) {
            r = c;
            g = x;
            b = 0;
        } else if (h < 120) {
            r = x;
            g = c;
            b = 0;
        } else if (h < 180) {
            r = 0;
            g = c;
            b = x;
        } else if (h < 240) {
            r = 0;
            g = x;
            b = c;
        } else if (h < 300) {
            r = x;
            g = 0;
            b = c;
        } else {
            r = c;
            g = 0;
            b = x;
        }

        r = normalizeRgbValue(r, m);
        g = normalizeRgbValue(g, m);
        b = normalizeRgbValue(b, m);

        return [r,g,b];
    }

    //modified [from http://stackoverflow.com/a/17433060]
    function rgbToHex(rgb) {
        return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1).toUpperCase();
    }

    //from [from http://stackoverflow.com/a/17433060]
    function normalizeRgbValue(color, m) {
        color = Math.floor((color + m) * 255);
        if (color < 0) {
            color = 0;
        }
        return color;
    }
}

Module.prototype.global = ["colorTool", "entity-color-tool"];

// Module UMD Loader
(function (g, f) {
    var d=Module.prototype.dependencies,gn=Module.prototype.global
    if (typeof define==='function'&&define.amd){define(['exports'].concat(d||[]),f)}else if(typeof exports==='object'&&
    typeof exports.nodeName!=='string'){f.apply(this,[exports].concat(d?d.map(require):[]))}else{if(typeof gn==='string'
    )gn=[gn];g[gn[0]]={};gn.splice(1).map(function(d){g[d]=g[gn[0]]});f.apply(this, [g[gn[0]]].concat(d?d.map(function(d
    ){return g[d]}):[]))}
}(this, Module));
