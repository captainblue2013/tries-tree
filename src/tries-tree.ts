import { Config, SearchResult } from './type';
import Node from './tries-node';

class TriesTree {
  private config: Config;
  tree: Node;

  constructor(config?: Config) {
    this.config = config || {};
    this.tree = new Node('ROOT');
  }


  /**
   * 从一组词中构建树
   * @param words 
   */
  build(words: Array<string>) {
    words = [...new Set(words)];
    words.forEach((word: string) => {
      this.add(word);
    });
  }

  find(word: string): SearchResult {
    const NOT_FOUND = {
      exist: false,
    };
    if (word.includes(' ')) {
      return NOT_FOUND;
    }
    let chs: Array<string> = Array.from(word);
    let ch: string | undefined;
    let _node: Node = this.tree;

    while (ch = chs.shift()) {
      if (_node.children[ch]) {
        _node = _node.children[ch];
      } else {
        return NOT_FOUND;
      }
    }

    return {
      exist: _node.isLeaf,
      data: _node.data,
    };
  }

  /**
   * 添加一个词
   * @param word 
   * @param data 
   */
  add(word: string, data?: any) {
    if (word.includes(' ')) {
      word.split(' ').forEach(w => {
        this.add(w, data);
      });
      return;
    }
    let chs: Array<string> = Array.from(word);
    let ch: string | undefined;

    const traces: Array<Node> = [];
    let isNew: boolean = false;

    let _node: Node = this.tree;
    _node.deep = _node.deep > chs.length + 1 ? _node.deep : chs.length + 1;
    while (ch = chs.shift()) {
      traces.push(_node);
      if (!_node.children[ch]) {
        _node.children[ch] = new Node(ch);
        isNew = true;
      }
      _node = _node.children[ch];

      // 如果当前字符已经是最后一个，那标记为叶子
      if (chs.length === 0) {
        _node.isLeaf = true;
        data && _node.data.push(data);
      }
      _node.deep = _node.deep > chs.length + 1 ? _node.deep : chs.length + 1;
    }

    if (isNew) {
      traces.forEach((_: Node, index: number) => {
        traces[index].count++;
      });
    }
  }
}


export default TriesTree;