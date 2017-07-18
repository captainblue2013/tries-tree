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

