/**
 * Created by lanhao on 17/4/11.
 */

'use strict';

const fs = require('fs');
const node = require('./libs/node');
const IDENTITY = 'LAN_TRIES_TREE';

class TriesTree {

  constructor(config) {
    this.config = config;
    this.check();

    this.tree = new node('ROOT');
  }

  check() {
    if (this.config.runtimePath) {
      try {
        fs.accessSync(this.config.runtimePath, fs.constants.R_OK | fs.constants.W_OK)
      } catch (e) {
        throw e;
      }
    }
  }

  build(words) {
    if (Array.isArray(words) && words.length) {
      words = [...new Set(words)];

      for (let k in words) {

        let chs = Array.from(words[k]);
        let ch = null;
        let _node = this.tree.s;
        this.tree.n++;
        this.tree.l = (this.tree.l < chs.length) ? chs.length : this.tree.l;
        while (ch = chs.shift()) {
          ch = ch + '';
          if (ch === ' ') {
            _node = this.tree.s;
            continue;
          }
          if (_node[ch]) {
            _node[ch].n++;
            _node[ch].l = (_node[ch].l < chs.length) ? chs.length : _node[ch].l;
            _node = _node[ch].s;
          } else {
            _node[ch] = new node(ch);
            _node[ch].l = chs.length;
            _node = _node[ch].s;
          }
        }
      }
    }
  }

  info(word) {
    let chs = Array.from(word);
    let ch;
    let _node = this.tree.s;
    let _p = null;
    let currentCount = 0;

    while (ch = chs.shift()) {
      if (ch === ' ') {
        return false;
      }
      if (_node[ch]) {
        _p = _node[ch];
        currentCount = _node[ch].n;
        _node = _node[ch].s;
      } else {
        return false;
      }
    }
    delete _p.s;
    return _p;
  }

  find(word) {
    let chs = Array.from(word);
    let ch;
    let _node = this.tree.s;
    let _p = null;
    let currentCount = 0;

    while (ch = chs.shift()) {
      if (ch === ' ') {
        return false;
      }
      if (_node[ch]) {
        _p = _node[ch];
        currentCount = _node[ch].n;
        _node = _node[ch].s;
      } else {
        return false;
      }
    }

    let nodeCount = 0;

    if (_p.s) {
      for (let k in _p.s) {

        nodeCount += _p.s[k].n;
      }
    }

    if (nodeCount < currentCount) {
      return true;
    }
    return false;
  }

  add(word) {
    let chs = Array.from(word);
    let ch;
    let _node = this.tree.s;

    while (ch = chs.shift()) {

      if (ch === ' ') {
        _node = this.tree.s;
        continue;
      }
      if (_node[ch]) {
        _node[ch].n++;
        _node = _node[ch].s;
      } else {
        _node[ch] = new node(ch);
        _node = _node[ch].s;
      }
    }
  }

  dump(identity = IDENTITY) {
    if (this.config.runtimePath) {
      fs.writeFileSync(this.config.runtimePath + '/' + identity + '.json', this.tree.toString());
    }
  }

  load(identify = IDENTITY) {
    if (this.config.runtimePath) {
      let data = require(this.config.runtimePath + '/' + identify + '.json');
      node.wakeUp(data);
      this.tree = data;
    }
  }

  toString() {
    return this.tree.toString();
  }
}


module.exports = TriesTree;