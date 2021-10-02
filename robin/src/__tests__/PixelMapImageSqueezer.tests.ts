import PixelMapImage from '../PixelMapImage';
import PixelMapImageSqueezer from '../PixelMapImageSqueezer';

// TODO: wait for more test cases...
// In theory, we should see an improvement most of the time, only images with every other pixel changing color should result in equal length to the legacy storage.

test('Compress & Uncompress Star', () => {
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
  let pixelMapImage = PixelMapImage.fromLegacyImageData(star);
  let squeezed = PixelMapImageSqueezer.SqueezePixels(pixelMapImage);

  expect(squeezed.length).toEqual(240);
  expect(squeezed.length).toBeLessThanOrEqual(star.length);
  let unSqueezed = PixelMapImageSqueezer.UnSqueezePixels(squeezed);
  expect(unSqueezed.toString()).toEqual(pixelMapImage.toString());
});

test('Compress & Uncompress Black', () => {
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
  let pixelMapImage = PixelMapImage.fromLegacyImageData(black);
  let squeezed = PixelMapImageSqueezer.SqueezePixels(pixelMapImage);

  expect(squeezed.length).toEqual(48);
  expect(squeezed.length).toBeLessThanOrEqual(black.length);
  let unSqueezed = PixelMapImageSqueezer.UnSqueezePixels(squeezed);
  expect(unSqueezed.toString()).toEqual(pixelMapImage.toString());
});

test('Compress & Uncompress Pinky', () => {
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
  let pixelMapImage = PixelMapImage.fromLegacyImageData(pinky);
  let squeezed = PixelMapImageSqueezer.SqueezePixels(pixelMapImage);

  expect(squeezed.length).toEqual(231);
  expect(squeezed.length).toBeLessThanOrEqual(pinky.length);
  let unSqueezed = PixelMapImageSqueezer.UnSqueezePixels(squeezed);
  expect(unSqueezed.toString()).toEqual(pixelMapImage.toString());
});

test('Compress & Uncompress Inky', () => {
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
  let pixelMapImage = PixelMapImage.fromLegacyImageData(inky);
  let squeezed = PixelMapImageSqueezer.SqueezePixels(pixelMapImage);

  expect(squeezed.length).toEqual(252);
  expect(squeezed.length).toBeLessThanOrEqual(inky.length);
  let unSqueezed = PixelMapImageSqueezer.UnSqueezePixels(squeezed);
  expect(unSqueezed.toString()).toEqual(pixelMapImage.toString());
});

