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
  
  voice(){
    console.log('hello');
  }

  static wakeUP(data){
    if(data.ch && data.count && data.children){
      data.__proto__ = Node.prototype;
      for(let k in data.children){
        Node.wakeUP(data.children[k]);
      }
    }
  }

}
module.exports = Node;