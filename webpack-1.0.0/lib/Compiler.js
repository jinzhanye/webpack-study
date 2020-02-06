var clone = require("clone");
var Tapable = require("tapable");
var Compilation = require("./Compilation");
// var Resolver = require("enhanced-resolve/lib/Resolver");
var Parser = require("./Parser");

function Compiler() {
  Tapable.call(this);
  this.mainTemplate = this.chunkTemplate = this.moduleTemplate = null;

  //....

  // 作用未知
  // this.resolvers = {
  //   normal: new Resolver(null),
  //   loader: new Resolver(null),
  //   context: new Resolver(null)
  // };
  this.parser = new Parser();

  this.options = {};
}

module.exports = Compiler;

// 继承 Tapable
Compiler.prototype = Object.create(Tapable.prototype);

Compiler.prototype.run = function (callback) {
  var startTime = new Date().getTime();
  // 触发 run 异步勾子
  this.applyPluginsAsync('run', this, function (err) {
    if (err) {
      return callback(err)
    }

    this.readRecords(function (err) {
      if (err) {
        return callback(err)
      }

      this.compile(function (err, compilation) {
        if (err) {
          return callback(err)
        }

        this.emitAssets(compilation, function (err) {
          if (err) {
            return callback(err)
          }

          this.emitRecords(function(err) {
            if (err) {
              return callback(err)
            }
            var stats = compilation.getStats();
            // 记录花费时间
            stats.startTime = startTime;
            stats.endTime = new Date().getTime();
            // 触发打包结束勾子
            this.applyPlugins("done", stats);
            return callback(null, stats);
          })
        }.bind(this))
      }.bind(this))
    }.bind(this))
  }.bind(this))
}

Compiler.prototype.readRecords = function readRecords(callback) {
  if (!this.recordsInputPath) {
    this.records = {};
    return callback();
  }
  // ...
}


/**
 * 获取自定义内容跳转链接
 * @param {Function} callback compile结束回调
 */
Compiler.prototype.compile = function (callback) {
  var params = this.newCompilationParams();
  this.applyPlugins("compile", params);
  var compilation = this.newCompilation(params);
  this.applyPluginsParallel("make", compilation, function (err) {
    if (err) {
      return callback(err);
    }

    compilation.seal(function (err) {
      if (err) {
        return callback(err);
      }
      this.applyPluginsAsync("after-compile", compilation, function (err) {
        if (err) {
          return callback(err);
        }

        return callback(null, compilation);
      });
    }.bind(this))
  }.bind(this));
}

Compiler.prototype.createCompilation = function () {
  return new Compilation(this);
};

Compiler.prototype.newCompilation = function (params) {
  var compilation = this.createCompilation();
  // ...
  compilation.name = this.name;
  compilation.records = this.records;
  this.applyPlugins("compilation", compilation, params);
  return compilation;
};
