const Stream = require('stream');
const { reduce, map } = require('../streamUtils');

const getStream = () => {
  var src = new Stream();
  src.readable = true;
  return src;
};

const generateDataStream = stream => range => {
  for (let i = range[0]; i < range[1]; i++) stream.emit('data', i);
};

const part1 = input => {
  const stream = getStream(input);
  const generateData = generateDataStream(stream);
  stream.pipe(map(acc => console.log(acc)));
  //console.log(result);
  generateData(input);
  return 0;
};

const part2 = input => {
  return 0;
};

module.exports = { part1, part2 };
