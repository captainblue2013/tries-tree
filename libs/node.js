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
    return JSON.stringify(this, null, 2);
  }
}
module.exports = Node;