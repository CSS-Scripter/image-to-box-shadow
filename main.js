const pixels = require('image-pixels');
const clipboardy = require('clipboardy');

const cssClass = 'art';
const size = 1;
const begin = `.${cssClass} {
    display: block;
    width: ${size}px;
    height: ${size}px;
    box-shadow:`;

let output = begin;
let r, g, b, a, pixel, x, y;
let amountOfPixels;

async function main() {
  const arguments = process.argv.slice(2);
  if (arguments.length === 0) {
    console.log("Missing image argument");
    return;
  }

  const {data, width, height} = await pixels(arguments[0]);
  amountOfPixels = width * height;
  for (let i = 0; i < data.length; i += 4) {
    calculatePixel(i);
    calculatePosition(width);
    setColours(data);
    addBoxShadowEntry();
    appendClosingString();
  }
  clipboardy.writeSync(output);
  console.log('CSS has been copied to clipboard');
}

function calculatePixel(i) {
  pixel = i / 4;
}

function calculatePosition(width) {
  x = pixel % width;
  y = Math.floor(pixel / width);
}

function setColours(data) {
  const i = pixel * 4
  r = data[i];
  g = data[i+1];
  b = data[i+2];
  a = data[i+3];
}

function addBoxShadowEntry() {
  output += `${size * x}px ${size * y}px 0 rgba(${r}, ${g}, ${b}, ${a})`
}

function appendClosingString() {
  if (pixel === amountOfPixels-1) {
    output += ';\n}';
  } else {
    output += ','
  }
}

main();