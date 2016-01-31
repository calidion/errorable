import fs from 'fs';
var Errorable = require('./errorable');

function Generator(options, loc, toUpper) {
  var json = {};
  if(typeof toUpper === 'boolean' && toUpper) {
    toUpper = true;
  }else {
    toUpper = false;
  }
  this.errors = {};
  this.json = json;
  this.toUpper = toUpper;
  this._generate(json, options, loc);
}
Generator.prototype.capitalize = function(str, toUpper) {
  if(!toUpper) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }
  return str.toUpperCase();
};

Generator.prototype.getName = function(name, k, toUpper) {
  name = name || '';
  if(!toUpper) {
    return name + this.capitalize(k);
  }else {
    if(name && name !== '') {
      return name + '_' + this.capitalize(k, toUpper);
    }else {
      return name + this.capitalize(k, toUpper);
    }
  }
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
  if (typeof data !== 'object') {
    throw Error('Parse JSON Error, Please check you Json Format at : ' + JSON.stringify(data));
  }
  for (var k in data) {
    if (data[k].alias) {
      this._generate(savor, data[data[k].alias], locale, this.getName(name, k, this.toUpper));
      continue;
    }
    if (k === 'messages' || k === 'code') {
      continue;
    }
    this._generate(savor, data[k], locale, this.getName(name, k, this.toUpper));
  }
};

module.exports = Generator;
