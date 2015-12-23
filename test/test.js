var testable = require('../entity-color-tool.min.js');

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

exports.testScale = function(test) {
  test.deepEqual(testable.blendHexArray(3, '#FFF', '#000'), ['#000', '#555555', '#FFF']);
  test.deepEqual(testable.blendHexArray(5, '#FFF', '#000'), ['#000', '#333333', '#666666', '#999999', '#FFF']);
  test.done();
}

exports.testExpand = function(test) {
  test.deepEqual(testable.blendHexArray(3, '#FF0000', '#0000FF'), ['#0000FF', '#5500aa', '#FF0000']);
  test.deepEqual(testable.blendHexArray(3, '#F00', '#00F'), ['#00F', '#5500aa', '#F00']);
  test.done();
}
