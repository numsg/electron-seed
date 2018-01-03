var path = require('path');

var _root = path.resolve(__dirname, '..');
const EVENT = process.env.npm_lifecycle_event || '';

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

function hasProcessFlag(flag) {
  return process.argv.join('').indexOf(flag) > -1;
}

function hasNpmFlag(flag) {
  return EVENT.includes(flag);
}

exports.root = root;
exports.hasProcessFlag = hasProcessFlag;
exports.hasNpmFlag = hasNpmFlag;