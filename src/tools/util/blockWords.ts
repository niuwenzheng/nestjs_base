
const utils = require('./utils')

var fs = require('fs');
var path = require('path');

var initDictionary = function (filepath,callback) {
    fs.readFile(path.join(__dirname,filepath),{encoding: 'utf-8'},function (err, bytesRead) {
        if (err) {
            return console.log(err);
        }

        var dict = bytesRead.toString().replace(/\r/g,'').split("\n");
        // console.log(dict);
        callback(dict);
    })
};

var SensitiveWordsManager = function (dict) {
    var self = this;
    this.dictionary = dict;
    this.createNode = function (char, flag, nodes) {
        var node = {};
        node.char = char;
        node.flag = flag == null ? 0 : flag;
        node.nodes = nodes;
    };

    //创建字典树
    this.createTree = function () {
        self.rootNode = self.createNode('R', 0, {});
        self.dictionary.map(function (word) {
            self.insertNode(self.rootNode, word,0);
        })
    };

    this.insertNode = function (node, word, index) {
        var char = word.charAt(index);
        var resultNode = self.findNode(node, char);
        if (resultNode == null) {
            resultNode = self.createNode(char, 0, {});
            node.nodes[char] = resultNode;
        }

        if (index == word.length -1) {
            resultNode.flag = 1;
        }

        index += 1;
        if (index < word.length) {
            self.insertNode(resultNode, word, index);
        }

    };

    this.findNode = function (node, char) {
        var nodes = node.nodes;
        var result = null;
        for (var keyChar in nodes) {
            if (nodes[keyChar].char == char) {
                result = nodes[keyChar];
                break;
            }
        }
        return result;
    };
    this.createNode = function (char,flag,nodes) {
        var node = {};
        node.char = char;
        node.flag = flag;
        node.nodes = nodes == null ? {} : nodes;
        return node;
    };

    //替换字符串
    this.replaceWarnString = function (inputStr) {
        if (inputStr == null) {
            return '';
        }
        var chars = inputStr;
        var index = 0;
        var node = self.rootNode;
        //需要替换的字符下标集合
        var replaceIndexes = [];

        while (index < chars.length) {
            var ch = chars.charAt(index);
            if (ch != null && ch != ' ') {
                node = self.findNode(node, ch);
            }

            if (node == null) {
                //正常，跳过
                index -= replaceIndexes.length;
                node = self.rootNode;
                replaceIndexes = [];
            }else if (node.flag == 1) {
                //敏感词结束，替换原字符串
                replaceIndexes.push(index);
                var buffer = '';
                for (var j=0;j<=index;++j) {
                    if (replaceIndexes.indexOf(j) == -1) {
                        buffer = buffer + chars.charAt(j);
                    }else {
                        buffer = buffer + '*';
                    }
                }
                chars = buffer + chars.substring(index+1);

                node = self.rootNode;
                replaceIndexes = [];
            }else {
                //敏感词开始
                replaceIndexes.push(index);
            }
            index += 1;
        }
        return chars;

    };
};

var Dictionary = null;
var myManager = null;

module.exports.init = function(){
    if(Dictionary != null){
        return
    }
    initDictionary('blockwords_list.txt', function (dictionary) {
        Dictionary = dictionary;
        myManager = new SensitiveWordsManager(Dictionary);
        myManager.createTree();
    });
};

module.exports.filter = function(inputStr){
    if(Dictionary === null){
        throw new Error('BlockWords is null');
    }
    return myManager.replaceWarnString(inputStr);
};

module.exports.isValid = function(inputStr){

    if(utils.isEmpty(inputStr)){
        return false
    }

    if(Dictionary === null){
        return false;
    }
    let replaceStr = myManager.replaceWarnString(inputStr);
    if(replaceStr.indexOf('*') !== -1){
        return false
    }

    return true;
};
