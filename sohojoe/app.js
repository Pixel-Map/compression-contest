
const base91 = require('node-base91')
const sharp = require('sharp');

function short_rgb_to_rgba_buffer(pixels) {
    var width = 16, height = 16;
    // var frameData = Buffer.from(rgba)
    var i = 0;
    var frameData = Buffer.alloc(width * height * 4);
    var frameData_idx = 0;
    var rgba = [];
    do {
        short_r = pixels[i++];
        short_g = pixels[i++];
        short_b = pixels[i++];
        // r = short_r * 16 + short_r;
        // g = short_g * 16 + short_g;
        // b = short_b * 16 + short_b;
        r =  parseInt(""+short_r+short_r, 16);
        g =  parseInt(""+short_g+short_g, 16);
        b =  parseInt(""+short_b+short_b, 16);
        frameData[frameData_idx++] = r;
        frameData[frameData_idx++] = g;
        frameData[frameData_idx++] = b;
        frameData[frameData_idx++] = 0xff; // alpha, not used
    } while (i < (16 * 16 * 3));
    return frameData;
}


function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
function rgbToShortHex(rgb) {
    var hexR = Math.round(rgb.r / 17).toString(16);
    var hexG = Math.round(rgb.g / 17).toString(16);
    var hexB = Math.round(rgb.b / 17).toString(16);
    return "" + hexR + "" + hexG + "" + hexB;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getShortHexColorCode(code) {
    var rgb = hexToRgb(code);
    return rgbToShortHex(rgb);
}
function rgb_to_short_rgb(pixels) {
    var str = '';
    var i = 0;
    for (var x = 0; x <= 15; x++) {
        for (var y = 0; y <= 15; y++) {
            var r = pixels[i++];
            var g = pixels[i++];
            var b = pixels[i++];
            str = str + getShortHexColorCode(rgbToHex(r,g,b));
            // str = str + rgbToHex(r,g,b);
        }
    }
    return str;
}

async function joe_encode_async(pixels) {
    var frameData = short_rgb_to_rgba_buffer(pixels);

    const imageData = await sharp(frameData, {
        raw: {
            width: 16,
            height: 16,
            channels: 4
        }
    }).toBuffer();

    var { data, info } = await sharp(frameData, {
        raw: {
            width: 16,
            height: 16,
            channels: 4
        }
        // }).jpeg({
        //     // quality: 100,
        //     mozjpeg: true,
        // }).heif({
        //     lossless: true,
        //     // compression: 'hevc',
        //     speed: 0
        // }).avif({
        //     lossless: true,
        //     // compression: 'hevc',
        //     speed: 0
        // })
    })
        .removeAlpha()
        .webp({
            lossless: true,
            // nearLossless: true,
            // smartSubsample: true,
        })
        .toBuffer({ resolveWithObject: true });
    // console.log("--done--");
    return base91.encode(data);
}

async function joe_decode_async(str) {
    decoded = base91.decode(str);
    var { data, info } = await sharp(decoded)
        // .removeAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });
    var crap_format = rgb_to_short_rgb(data)
    // console.log("--info:" + info + " len:" + data.length);
    // console.log("--info:" + info + " len:" + crap_format.length);
    return (crap_format.toString());
}

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



(async () => {

    var encoded = await joe_encode_async(star);
    console.log("--star len:" + encoded.length + " " + encoded );
    var decoded = await joe_decode_async(encoded);
    console.log(star === decoded);
    // console.log(star);
    // console.log(decoded);

    encoded = await joe_encode_async(black);
    console.log("--black len:" + encoded.length + " " + encoded );
    decoded = await joe_decode_async(encoded);
    console.log(black === decoded);

    encoded = await joe_encode_async(inky);
    console.log("--inky len:" + encoded.length + " " + encoded );
    decoded = await joe_decode_async(encoded);
    console.log(inky === decoded);
    // console.log(inky);
    // console.log(decoded);

    encoded = await joe_encode_async(pinky);
    console.log("--pinky len:" + encoded.length + " " + encoded );
    decoded = await joe_decode_async(encoded);
    console.log(pinky === decoded);
    // console.log(pinky);
    // console.log(decoded);


    // console.log("pinky:" + pinky.length);


})();

// var encoded = joe_encode(ss);
// console.log(encoded[0]);
// console.log(joe_encode(ss));
// console.log(joe_encode(ss).length)
console.log("--end sync code ");
// console.log(web_safe_colors)
// console.log(web_safe_colors.length)
