require('../src/pixelmapCompression_websafe.js')
require('./generateExample_websafe.js')

// Sample Data
const star = [
  '390390390390390390390000000390390390390390390390',
  '390390390390390390000ff0ff0000390390390390390390',
  '390390390390390390000ff0ff0000390390390390390390',
  '390390390390390000ff0ff0ff0ff0000390390390390390',
  '000000000000000000ff0ff0ff0ff0000000000000000000',
  '000ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0000',
  '390000ff0ff0ff0ff0000ff0ff0000ff0ff0ff0ff0000390',
  '390390000ff0ff0ff0000ff0ff0000ff0ff0ff0000390390',
  '390390390000ff0ff0000ff0ff0000ff0ff0000390390390',
  '390390390000ff0ff0ff0ff0ff0ff0ff0ff0000390390390',
  '390390000ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0000390390',
  '390390000ff0ff0ff0ff0ff0ff0ff0ff0ff0ff0000390390',
  '390000ff0ff0ff0ff0ff0000000ff0ff0ff0ff0ff0000390',
  '390000ff0ff0ff0000000390390000000ff0ff0ff0000390',
  '000ff0ff0000000390390390390390390000000ff0ff0000',
  '000000000390390390390390390390390390390000000000'].join('');
const black = [
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
  '000000000000000000000000000000000000000000000000',
].join('')
const pinky = [
  '000000000000000300f9cf9cf9cf9cf9c300000000000000',
  '000000000000c9cf9cf9cf9cf9cf9cf9cf9cc9c000000000',
  '000000000c9cf9cf9cf9cf9cf9cf9cf9cf9cf9cc9c000000',
  '000000c9cfffffff9cf9cf9cf9cfffffff9cf9cf9c000000',
  '000000fcfffffffffff9cf9cfffffffffffff9cf9c000000',
  '00000000f00ffffffff9cf9c00f00ffffffff9cf9cc9c000',
  '000c9c00f00ffffffff9cf9c00f00ffffffff9cf9cf9c000',
  '000f9cf9cfffffff9cf9cf9cf9cfffffff9cf9cf9cf9c000',
  '000f9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9c000',
  '000f9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9c000',
  '000f9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9c000',
  '000f9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9c000',
  '000f9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9c000',
  '000f9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9cf9c000',
  '000c9cf9cf9cc9c303c9cf9cf9cc9c303c9cf9cf9cc9c000',
  '000000f9cf9c000000000f9cf9c000000000f9cf9c000000',
].join('');
const inky = [
  '0000000000000000306fc6fc6fc6fc6fc030000000000000',
  '0000000000006cc6fc6fc6fc6fc6fc6fc6fc6cc000000000',
  '0000000006cc6ff6fc6fc6fc6fc6fc6fc6fc6fc6cc000000',
  '0000006ccffffff9fc6fc6fc9fcffffff9fc6fc6fc000000',
  '000000cfffffffffff6fc6fccfffffffffff6fc6fc000000',
  '00000000f00fffffff6fc6fc00f00fffffff6fc6fc6cc000',
  '0006cc00f00fffffff6fc6fc00f00fffffff6fc6fc6fc000',
  '0006fc6fcffffff9fc6fc6fc6fcffffff9fc6fc6fc6fc000',
  '0006fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc000',
  '0006fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc000',
  '0006fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc000',
  '0006fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc000',
  '0006fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc000',
  '0006fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc6fc000',
  '0006cc6fc6fc6cc0336cc6fc6fc6cc0336cc6fc6fc6cc000',
  '0000006fc6fc0000000006fc6fc0000000006fc6fc000000',
].join('');


let ss, encoded, decoded

console.log("*************** STAR ***************")
ss = star
encoded = encode(ss)
decoded = decode(encoded)
console.log('Original:' + ss)
console.log('Encoded:' + encoded)
console.log('Decoded: ' + decoded)
console.log('Matching: ' + (ss == decoded))
console.log('Original Length:' + ss.length)
console.log('Encoded Length:' + encoded.length)
console.log('Ratio:' + ((1 - encoded.length/ss.length) * 100).toFixed(2) + '%')
console.log("")

console.log("*************** Black ***************")
ss = black
encoded = encode(ss)
decoded = decode(encoded)
console.log('Original:' + ss)
console.log('Encoded:' + encoded)
console.log('Decoded: ' + decoded)
console.log('Matching: ' + (ss == decoded))
console.log('Original Length:' + ss.length)
console.log('Encoded Length:' + encoded.length)
console.log('Ratio:' + ((1 - encoded.length/ss.length) * 100).toFixed(2) + '%')
console.log("")

console.log("*************** Pinky ***************")
ss = pinky
encoded = encode(ss)
decoded = decode(encoded)
console.log('Original:' + ss)
console.log('Encoded:' + encoded)
console.log('Decoded: ' + decoded)
console.log('Matching: ' + (ss == decoded))
console.log('Original Length:' + ss.length)
console.log('Encoded Length:' + encoded.length)
console.log('Ratio:' + ((1 - encoded.length/ss.length) * 100).toFixed(2) + '%')
console.log("")

console.log("*************** Inky ***************")
ss = inky
encoded = encode(ss)
decoded = decode(encoded)
console.log('Original:' + ss)
console.log('Encoded:' + encoded)
console.log('Decoded: ' + decoded)
console.log('Matching: ' + (ss == decoded))
console.log('Original Length:' + ss.length)
console.log('Encoded Length:' + encoded.length)
console.log('Ratio:' + ((1 - encoded.length/ss.length) * 100).toFixed(2) + '%')
console.log("")
