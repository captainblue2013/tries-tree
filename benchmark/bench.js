/**
 * Created by lanhao on 2017/10/17.
 */
"use strict";
const benchmark = require('benchmark');
const suite = new benchmark.Suite();

const Tree = require('../index');
const t = new Tree({});

t.add('我爱北京天安门');

suite.add('fetch', ()=>{
  t.find('我爱北京天安门')
});


suite.on('complete',function(){
  for (var i = 0; i < this.length; i++) {
    console.log(this[i].toString())
  }
  console.log('Fastest is', this.filter('fastest').map('name')[0])
});

suite.run();