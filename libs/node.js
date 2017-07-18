/**
 * Created by lanhao on 17/4/11.
 */

'use strict';

class Node {

  constructor(ch) {
    this.c = ch;//char
    this.n = 1;//count 以這個節點為root的樹後面有多少個葉子節點（多少個詞）
    this.l = 0;//deep, 以這個節點為root的樹的高度
    this.s = {};//children
  }

  toString() {
    return JSON.stringify(this, null, 2);
  }

  voice() {
    console.log('hello');
  }

  static wakeUp(data) {
    if (data.c && data.n && data.s) {
      data.__proto__ = Node.prototype;
      for (let k in data.s) {
        Node.wakeUp(data.s[k]);
      }
    }
  }

  toString() {
    return JSON.stringify({
      char: this.c,
      count: this.n,
      deep: this.l
    });
  }

}
module.exports = Node;