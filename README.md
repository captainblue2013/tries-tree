# USAGE 

```javascript
    const TriesTree = require('tries-tree');
    
    const option = {
        runtimePath: '', // option , storage path while you dump your tree
    };
    
    const triesTree = new TriesTree(option);
    
    triesTree.build(['abc','abd']);
 ```   
 
 ![](http://lanhao.name/img/upload/a.png)

 
 
 # Find 、Add
 
    let TriesTree = require('tries-tree');
    
    let triesTree = new TriesTree([]);
    
    triesTree.build(['abc','abd','abcd']);
    
    triesTree.find('abc'); //true
    
    triesTree.find('abcd'); //true
    
    triesTree.find('ab'); //false
    
    triesTree.add('ab'); 
    
    triesTree.find('ab'); //true

# Info 如果節點存在（不一定是葉子），返回節點信息

    let TriesTree = require('tries-tree');
        
    let triesTree = new TriesTree([]);
        
    triesTree.build(['abc','abd','abcd']);
    
    t.find('ab'); //false ,詞 'ab'不存在
    
    f.info('ab').toString(); 
    // {"char":"b","count":3,"deep":2} , 節點b存在，b後面還有3個詞，最長的詞還要追加2個字符（即'ab'.length + 2, 4字符）
       
       
# Dump 、 Load

如果設置了 `runtimePath`則可以將 tree 導出到文件，再通過`load`恢復

    let TriesTree = require('tries-tree');
        
    let triesTree = new TriesTree([
        runtimePath: '/tmp'
    ]);
        
    triesTree.build(['abc','abd','abcd']);
    
    triesTree.dump('foo');  // 導出到 /tmp/foo.json
    
    triesTree.add('ab');  
    
    triesTree.dump('foo2');  // 導出到 /tmp/foo2.json
    
    triesTree.load('foo');  // 加載舊的數據，不包含 'ab'