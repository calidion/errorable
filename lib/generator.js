import fs from 'fs';
var Errorable = require('./errorable');

function Generator(options, loc) {
  var json = {};
  this.errors = {};
  this.json = json;
  this._generate(json, options, loc);
}
Generator.prototype.capitalize = function(str) {
  return str[0].toUpperCase() + str.substring(1).toLowerCase();
};

Generator.prototype.getName = function(name, k) {
  name = name || '';
  return name + this.capitalize(k);
};

Generator.prototype.save = function(file) {
  fs.writeFileSync(file, JSON.stringify(this.json, null, 2));
};

Generator.prototype._generate = function(savor, data, locale, name) {
  if (name && data && data.messages) {
    if (!savor[name]) {
      savor[name] = {};
    }
    savor[name].messages = data.messages;
    if (data.code !== undefined) {
      savor[name].code = data.code;
    }
    this.errors[name] = new Errorable({
      name: name,
      messages: data.messages,
      code: data.code,
      locale: locale
    });
  }
  for (var k in data) {
    if (data[k].alias) {
      this._generate(savor, data[data[k].alias], locale, this.getName(name, k));
      continue;
    }
    if (k === 'messages' || k === 'code') {
      continue;
    }
    this._generate(savor, data[k], locale, this.getName(name, k));
  }
};

module.exports = Generator;
