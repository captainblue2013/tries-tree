# USAGE 

    let TriesTree = require('tries-tree');
    
    let option = [
        runtimePath: '', // storage path while you dump your tree
    ];
    
    let triesTree = new TriesTree(option);
    
    triesTree.build(['abc','abd']);