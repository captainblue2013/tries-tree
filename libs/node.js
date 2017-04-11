/**
 * Created by lanhao on 17/4/11.
 */

'use strict';

class Node {

  constructor(ch){
    this.ch = ch;
    this.count = 1;
    this.children = {};
  }

  toString(){
    let data = {};
    data[this.ch] = [];
    for(let k in this.children){
      data[this.ch][this.children[k].ch] = this.children[k].toString();
    }
    return data;
  }
}
module.exports = Node;