function Module(exports) {

    exports.hexToRGB = hexToRGB;
    exports.blendRGB = blendRGB;
    exports.blendHex = blendHex;
    exports.blendHexArray = blendHexArray;

    /**
     * Expand #000 to #00000
     * @param hexColor
     * @returns {string}
     */
    function expandHex(hexColor) {
        var expanded = '';
        for (char in hexColor) {
            expanded = expanded + hexColor[char] + hexColor[char];
        }
        return expanded;
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

    function channelIntToHex(value) {
        var hex = value.toString(16);
        return "00".substring(hex.length) + hex
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
