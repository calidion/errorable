import fs from 'fs';

var makeAnError = require('./makeAnError');

function Generator(options, locale, upperCase) {
  var json = {};
  if (typeof upperCase === 'boolean' && upperCase) {
    upperCase = true;
  } else {
    upperCase = false;
  }
  this.errors = {};
  this.functions = {};
  this.json = json;
  this.upperCase = upperCase;
  this._generate(json, options, locale);
}
Generator.prototype.capitalize = function(str, upperCase) {
  if (!upperCase) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
  }
  return str.toUpperCase();
};

Generator.prototype.getName = function(name, k, upperCase) {
  name = name || '';
  if (!upperCase) {
    return name + this.capitalize(k);
  } else {
    if (name && name !== '') {
      return name + '_' + this.capitalize(k, upperCase);
    } else {
      return name + this.capitalize(k, upperCase);
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

    this.functions[name] = makeAnError({
      name: name,
      messages: data.messages,
      code: data.code,
      locale: locale
    });
    
    this.errors[name] = new this.functions[name]();
  }
  if (typeof data !== 'object') {
    throw Error('Parse JSON Error, Please check you Json Format at : ' + JSON.stringify(data));
  }
  for (var k in data) {
    if (data[k].alias) {
      this._generate(savor, data[data[k].alias], locale, this.getName(name, k, this.upperCase));
      continue;
    }
    if (k === 'messages' || k === 'code') {
      continue;
    }
    this._generate(savor, data[k], locale, this.getName(name, k, this.upperCase));
  }
};

module.exports = Generator;
