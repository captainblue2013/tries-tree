import { describe } from "mocha";
import { assert } from 'chai';
import TriesTree from '../src/tries-tree';
import Node from '../src/tries-node';

describe('tries-tree-node', () => {
  it('basic-node', () => {
    const n = new Node('a');
    assert.deepEqual([
      n.char,
      n.count,
      n.deep,
      n.isLeaf,
      n.children,
    ], [
      'a',
      0,
      0,
      false,
      {},
    ]);
  });
});

describe('tries-tree-leaf-count', () => {
  it('build-tree', () => {
    const t = new TriesTree();
    t.build(['ab','ac']);
    assert.deepEqual([
      t.find('ab').exist,
      t.find('ac').exist,
      t.find('bc').exist,
    ],[
      true,
      true,
      false,
    ]);
  });
  it('basic-tree', () => {
    const t = new TriesTree();
    t.add('ab');
    t.add('ac');
    t.add('abc');
    assert.equal(t.tree.children['a'].count, 3);
  });

  it('dumplicate-words', () => {
    const t = new TriesTree();
    t.add('ab');
    t.add('ab');
    t.add('abc');
    assert.equal(t.tree.children['a'].count, 2);
  });

  it('count-word-with-space', () => {
    const t = new TriesTree();
    t.add('ab abc');
    assert.equal(t.tree.children['a'].count, 2);
  });
});

describe('tries-tree-tree-deep', () => {
  it('long-word', () => {
    const t = new TriesTree();
    t.add('abcdefghijklmnopqrstuvwxyz');
    assert.equal(t.tree.children['a'].deep, 26);
  });
  it('long-word-with-space', () => {
    const t = new TriesTree();
    t.add('abcdef ghijklmnopqrstuvwxyz');

    assert.deepEqual([
      t.tree.children['a'].deep,
      t.tree.children['g'].deep
    ], [
      6,
      20,
    ])
  });
});

describe('tries-tree-search', () => {
  it('find-word', () => {
    const t = new TriesTree();
    t.add('abc');
    t.add('abd');
    assert.deepEqual([
      t.find('abc').exist,
      t.find('abd').exist,
      t.find('ab').exist,
      t.find('abcd').exist,
      t.find('word with space').exist,
    ], [
      true,
      true,
      false,
      false,
      false,
    ]);
  });

  it('find-word-data', () => {
    const t = new TriesTree();
    t.add('abc', 123);
    t.add('abc', 456);
    t.add('ab', 12);
    t.add('ac');
    assert.deepEqual([
      t.find('ab').data,
      t.find('abc').data,
      t.find('ac').data,
      t.find('ad').data,
    ], [
      [12],
      [123, 456],
      [],
      undefined,
    ]);
  });
});