const chalk = require('chalk');
const colors = ['black', 'white', 'blue']; //BG_COLOR = blue

const part1 = data => {
  const imgSize = { width: 25, height: 6 };
  const layers = getLayers(data)(imgSize);
  let fewest0 = null,
    result = 0;

  layers.forEach(layer => {
    const zeros = layer.match(/0/g) || [];

    if (fewest0 === null || fewest0 > zeros.length) {
      const ones = layer.match(/1/g) || [];
      const twos = layer.match(/2/g) || [];

      result = ones.length * twos.length;
      fewest0 = zeros.length;
    }
  });

  return result;
};

const part2 = data => {
  const imgSize = { width: 25, height: 6 };
  const layers = getLayers(data)(imgSize);
  const mergedLayer = mergeLayers(layers)();
  const imgArray = getImageArray(mergedLayer)(imgSize.width);

  imgArray.forEach(line => {
    console.log(line);
  });

  return 'PWD PRINTED!';
};

const getLayers = data => size => {
  const pixels = size.width * size.height;
  const layer = data.substring(0, pixels);
  const remain = data.substring(pixels);

  if (remain) return [layer, ...getLayers(remain)(size)];

  return [layer];
};

const mergeLayers = ([...layers]) => (mergedLayer = '') => {
  const layer = layers.shift();
  let result = '';

  [...layer].forEach((chr, i) => {
    let newChr = mergedLayer[i];

    if (!newChr || newChr === '2') newChr = chr;
    result += newChr;
  });

  if (layers.length > 0) return mergeLayers(layers)(result);
  return result;
};

const getImageArray = layer => width => {
  let row = layer.substring(0, width);
  let remain = layer.substring(width);
  let img = '';

  [...row].forEach((chr, i) => {
    let color = colors[Number(chr)];
    img += chalk[color]('██');
  });

  if (remain) return [img, ...getImageArray(remain)(width)];
  return [img];
};

module.exports = { part1, part2 };
