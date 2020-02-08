var DependenciesBlock = require("./DependenciesBlock");
var ModuleReason = require("./ModuleReason");

var debugId = 1000;

function Module() {
  DependenciesBlock.call(this);
  this.context = null;
  this.reasons = [];
  this.lastId = -1;
  this.id = null;
  this.chunks = [];
}

module.exports = Module;

Module.prototype = Object.create(DependenciesBlock.prototype);
Module.prototype.identifier = null;

Module.prototype.addChunk = function (chunk) {
  var idx = this.chunks.indexOf(chunk);
  if (idx < 0) {
    this.chunks.push(chunk);
  }
};
