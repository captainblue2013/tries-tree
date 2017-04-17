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
        let _node = this.tree.children;

        while (ch = chs.shift()) {

          if (ch === ' ') {
            _node = this.tree.children;
            continue;
          }
          if (_node[ch]) {
            _node[ch].count++;
            _node = _node[ch].children;
          } else {
            _node[ch] = new node(ch);
            _node = _node[ch].children;
          }
        }
      }
    }
  }


  find(word) {
    let chs = Array.from(word);
    let ch;
    let _node = this.tree.children;
    let _p = null;
    let currentCount = 0;
    while (ch = chs.shift()) {
      if(ch === ' '){
        return false;
      }
      if(_node[ch]){
        _p = _node[ch];
        currentCount = _node[ch].count;
        _node = _node[ch].children;
      }else{
        return false;
      }
    }

    let nodeCount = 0;

    if(_p.children){
      for(let k in _p.children){

        nodeCount += _p.children[k].count;
      }
    }

    if(nodeCount < currentCount){
      return true;
    }
    return false;
  }

  add(word) {
    let chs = Array.from(word);
    let ch;
    let _node = this.tree.children;

    while (ch = chs.shift()) {

      if (ch === ' ') {
        _node = this.tree.children;
        continue;
      }
      if (_node[ch]) {
        _node[ch].count++;
        _node = _node[ch].children;
      } else {
        _node[ch] = new node(ch);
        _node = _node[ch].children;
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
    return JSON.stringify(this.tree);
  }
}


module.exports = TriesTree;