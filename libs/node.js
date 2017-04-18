/**
 * Created by lanhao on 17/4/11.
 */

'use strict';

class Node {

  constructor(ch){
    this.c = ch;
    this.n = 1;
    this.l = 0;
    this.s = {};
  }

  toString(){
    return JSON.stringify(this, null, 2);
  }
  
  voice(){
    console.log('hello');
  }

  static wakeUp(data){
    if(data.c && data.n && data.s){
      data.__proto__ = Node.prototype;
      for(let k in data.s){
        Node.wakeUp(data.s[k]);
      }
    }
  }

}
module.exports = Node;