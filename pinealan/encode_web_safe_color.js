/* Pair of compress/decompress functions for hex-triplet encoded web safe 16x16 image.
 *
 * Uses max Brotli quality for max compression ratio, trading off computation
 * time. Assumes lower case image string input and produces lower case output.
 *
 * Uses the first byte to lookup the encoding/compression strategy.
 */

const base91 = require('node-base91')
const stream = require('stream') // needed for zlib
const zlib = require('zlib')



const cartesian = (...a) => a.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())))

const allowed_hex = ['0', '3', '6', '9', 'c', 'f']
const websafe_triplets = cartesian(allowed_hex, allowed_hex, allowed_hex).map(x => x.join(''))
const hex_to_code = Object.fromEntries([...websafe_triplets.entries()].map(x => x.reverse()))

function chunk_of_n(n, seq) {
    const chunks = []
    for (let i = 0; i < (seq.length / n); i++) {
        chunks.push(seq.slice(i * n, (i + 1) * n))
    }
    return chunks
}

function encode_web_safe(triplets) {
    return Buffer.from(triplets.map(x => hex_to_code[x]))
}

function decode_web_safe(buf) {
    return [...buf].map(x => websafe_triplets[x]).join('')
}

function encode_12bit(triplets) {
    return Buffer.concat(triplets.map(x => Buffer.from('0' + x, 'hex')))
}

function decode_12bit(buf) {
    return chunk_of_n(2, buf).map(
        byte2 => byte2.toString('hex').slice(1)
    ).join('')
}

WEBSAFE_PALETTE = 1
TWELVEB_PALETTE = 2

function compress(s) {


    const triplets = chunk_of_n(3, s)
    let buf, buf_strat;

    // Dispatch encoding strategy based on content
    if (triplets.every(x => websafe_triplets.includes(x))) {
        buf = encode_web_safe(triplets)
        buf_strat = Buffer.from([WEBSAFE_PALETTE])
    } else {
        buf = encode_12bit(triplets)
        buf_strat = Buffer.from([TWELVEB_PALETTE])
    }

    return base91.encode(zlib.brotliCompressSync(Buffer.concat([buf_strat, buf])))
}

function decompress(s) {
    const buf = zlib.brotliDecompressSync(base91.decode(s))
    const buf_strat = buf[0]

    // Dispatch decoding strategy based on first byte
    if (buf_strat === WEBSAFE_PALETTE) {
        return decode_web_safe(buf.slice(1))
    } else if (buf_strat === TWELVEB_PALETTE) {
        return decode_12bit(buf.slice(1))
    }
}

function test(s, name) {
    s_encoded = compress(s)

    console.log("--- Case " + name + " ---")
    console.log("Length: (" + s_encoded.length + ") Payload: " + s_encoded)

    if (decompress(s_encoded) == s) {
        console.log('pass')
    } else {
        console.log('FAIL')
        console.log(s)
        console.log(decompress(s_encoded))
    }
    console.log("")
}

test([
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
    '000000000390390390390390390390390390390000000000'
].join(''), "Star")

test([
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
].join(''), "Black")

test([
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
].join(''), "Pinky");

test([
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
].join(''), "Inky");
