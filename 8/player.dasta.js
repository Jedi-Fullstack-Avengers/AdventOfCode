const create2DArray = rows => {
  let twoDArray = [];
  for (let i = 0; i < rows; i++) twoDArray[i] = [];
  return twoDArray;
};

const part1 = (input, imgSize = { wide: 25, tall: 6 }) => {
  const image = Array.from(input);

  const layerTemplate = create2DArray((imgSize.wide * imgSize.tall) / 2);
  const layers = layerTemplate.map(layer => {
    let partialLayer = '';
    const tempLayer = { data: [], zeroes: 0, ones: 0, twos: 0, oneByTwo: 0 };

    for (let j = 0; j < imgSize.tall; j++) {
      for (let i = 0; i < imgSize.wide; i++) {
        const number = image.shift();
        partialLayer += number;
        if (number === '0') tempLayer.zeroes++;
        else if (number === '1') tempLayer.ones++;
        else if (number === '2') tempLayer.twos++;
      }
      tempLayer.data.push(partialLayer);
      partialLayer = '';
    }

    tempLayer.oneByTwo = tempLayer.ones * tempLayer.twos;

    return tempLayer;
  });

  return layers.sort((a, b) => a.zeroes - b.zeroes)[0].oneByTwo;
};
const part2 = input => {};

module.exports = { part1, part2 };

// Layer object template
/*const layers = [
  { data: ['123', '456'], zeroes: 0, ones: 1, twos: 1, oneByTwo: 1 },
  { data: ['789', '012'], zeroes: 1, ones: 1, twos: 1, oneByTwo: 1 }
];*/
