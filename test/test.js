var testable = require('../entity-color-tool.min.js');

exports.testRGBToHLSAndBack = function(test) {
  test.deepEqual(testable.hexToRGB('1EC81E'), [30, 200, 30]);
  test.deepEqual(testable.rgbToHLS([30, 200, 30]), [120, 0.45098039215686275, 0.7391304347826086]);
  test.deepEqual(testable.hlsToRGB([120, 0.45098039215686275, 0.7391304347826086]), [30, 200, 30]);
  test.equals(testable.rgbToHex([30, 200, 30]), '#1EC81E');
  test.done();
}

exports.testHexToRGB = function(test) {
  test.deepEqual(testable.hexToRGB('#FFF'), [255, 255, 255]);
  test.deepEqual(testable.hexToRGB('#000000'), [0, 0, 0]);
  test.deepEqual(testable.hexToRGB('#FF0000'), [255, 0, 0]);
  test.deepEqual(testable.hexToRGB('#AFB963'), [175, 185, 99]);
  test.done();
}

exports.testHexToRGBError = function(test) {
  test.deepEqual(testable.hexToRGB(112344), [0, 0, 0]);
  test.deepEqual(testable.hexToRGB(112344, '#AAAAAA'), [170, 170, 170]);
  test.deepEqual(testable.hexToRGB(null), [0, 0, 0]);
  test.deepEqual(testable.hexToRGB('#FF'), [0, 0, 0]);
  test.done();
}

exports.testHueHexArray = function(test) {
  test.deepEqual(testable.hueHexArray(3, "#FF0000", 30), ["#FF0000", "#FF2A00", "#FF5400"]);
    test.deepEqual(testable.hueHexArray(3, "#FF0000", 360), ["#FF0000", "#00FF00", "#0000FF"]);
  test.done();
}

exports.testBlend = function(test) {
  test.equals(testable.blendHex("#FFFFFF", "#000000", 0.8), "#cccccc");
  test.equals(testable.blendHex("#FFFFFF", "#000000", 0.2), "#333333");
  test.done();
}

exports.testSize = function(test) {
  test.deepEqual(testable.blendHexArray(2, '#FFF', '#000'), ['#000', '#FFF']);
  test.ok(testable.blendHexArray(256, '#FFF', '#000').length === 256, 'wrong size');
  test.done();
}

exports.testPreferFirstColor = function(test) {
    test.deepEqual(testable.blendHexArray(1, '#FFF', '#000'), ['#000', '#FFF']);
    test.deepEqual(testable.blendHexArray(1, '#FFF', '#000', true), ['#FFF', '#000']);
    test.done();
}

exports.testScale = function(test) {
  test.deepEqual(testable.blendHexArray(3, '#FFF', '#000'), ['#000', '#555555', '#FFF']);
  test.deepEqual(testable.blendHexArray(3, '#FFF', '#000', true), ['#FFF', '#aaaaaa', '#000']);
  test.deepEqual(testable.blendHexArray(5, '#FFF', '#000'), ['#000', '#333333', '#666666', '#999999', '#FFF']);
  test.done();
}

exports.testExpand = function(test) {
  test.deepEqual(testable.blendHexArray(3, '#FF0000', '#0000FF'), ['#0000FF', '#5500aa', '#FF0000']);
  test.deepEqual(testable.blendHexArray(3, '#F00', '#00F'), ['#00F', '#5500aa', '#F00']);
  test.done();
}
