var Tapable = require("tapable");
var Parser = require("./Parser");
var ArrayMap = require("./ArrayMap");

function Compilation(compiler) {
  Tapable.call(this);
  Tapable.call(this);
  this.compiler = compiler;
  this.mainTemplate = compiler.mainTemplate;
  this.chunkTemplate = compiler.chunkTemplate;
  // .....
  this.moduleTemplate = compiler.moduleTemplate;
  this.resolvers = compiler.resolvers;
  // .....
  var options = this.options = compiler.options;
  this.outputOptions = options && options.output;
  this.entries = [];
  // .....
  this.chunks = [];
  // .....
  this.modules = [];
  this._modules = {};
  this.cache = null;
  this.records = null;
  // ....
  this.additionalChunkAssets = [];
  this.assets = {};
  this.errors = [];
  this.warnings = [];
  this.children = [];
  this.dependencyFactories = new ArrayMap();
  this.dependencyTemplates = new ArrayMap();
}

module.exports = Compilation;
Compilation.prototype = Object.create(Tapable.prototype);

Compilation.prototype.addModule = function (module, cacheGroup) {
  // cacheGroup = cacheGroup || "m";
  var identifier = module.identifier();
  if(this._modules[identifier]) {
    return false
  }

  // 省略 this.cache 判断 ...

  this._modules[identifier] = module;
  this.modules.push(module);
  return true;
}

Compilation.prototype.buildModule = function (module, thisCallback) {

}

Compilation.prototype._addModuleChain = function process(context, dependency, onModule, callback) {
  // 如果 dependency 是 SingleEntryDependency 的实例，那么 moduleFactory 是 NormalModuleFactory
  var moduleFactory = this.dependencyFactories.get(dependency.Class);

  moduleFactory.create(context, dependency, function (err, module) {
    // if(err) {}

    var result = this.addModule(module);
  })
}

Compilation.prototype.addEntry = function process(context, entry, name, callback) {
  this._addModuleChain(
    context,
    entry,
    function (module) {
      this.entries.push(module);
      module.id = 0;
    }.bind(this),
    function (err, module) {

    }.bind(this))
}

Compilation.prototype.seal = function seal(callback) {
}

Compilation.prototype.addChunk = function addChunk(name, module, loc) {
}
