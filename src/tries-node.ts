import { Char } from './type';
import { Dict } from '@mohism/utils';

class Node {
  // Meta
  // 字符，
  // count 以這個節點為root的樹後面有多少個葉子節點（多少個詞）
  // deep, 以這個節點為root的樹的高度
  // children
  // isLeaf
  // data
  private m: [string, number, number, Dict<Node>, boolean, Array<any>];

  constructor(ch: Char) {
    this.m = [ch, 0, 0, {}, false, []];
  }

  get char(): string {
    return this.m[0];
  }

  get count(): number {
    return this.m[1];
  }

  set count(n: number) {
    this.m[1] = n;
  }

  get deep(): number {
    return this.m[2];
  }

  set deep(n: number) {
    this.m[2] = n;
  }

  get children(): Dict<Node> {
    return this.m[3];
  }

  get isLeaf(): boolean {
    return this.m[4];
  }

  set isLeaf(n: boolean) {
    this.m[4] = n;
  }

  get data(): Array<any> {
    return this.m[5];
  }
}

export default Node;