import * as utils from './utils';
import * as fs from 'fs';
import * as path from 'path';

const initDictionary = (filepath, callback) => {
  fs.readFile(
    path.join(__dirname, filepath),
    { encoding: 'utf-8' },
    (err, bytesRead) => {
      if (err) {
        return console.log(err);
      }

      const dict = bytesRead
        .toString()
        .replace(/\r/g, '')
        .split('\n');
      // console.log(dict);
      callback(dict);
    },
  );
};

const SensitiveWordsManager = function(dict) {
  this.dictionary = dict;
  this.createNode = function(char, flag, nodes) {
    const node = {
      char,
      flag: flag == null ? 0 : flag,
      nodes,
    };
  };

  //创建字典树
  this.createTree = () => {
    this.rootNode = this.createNode('R', 0, {});
    this.dictionary.map(word => {
      this.insertNode(this.rootNode, word, 0);
    });
  };

  this.insertNode = (node, word, index) => {
    const char = word.charAt(index);
    let resultNode = this.findNode(node, char);
    if (resultNode == null) {
      resultNode = this.createNode(char, 0, {});
      node.nodes[char] = resultNode;
    }

    if (index == word.length - 1) {
      resultNode.flag = 1;
    }

    index += 1;
    if (index < word.length) {
      this.insertNode(resultNode, word, index);
    }
  };

  this.findNode = (node, char) => {
    const nodes = node.nodes;
    let result = null;
    for (const keyChar in nodes) {
      if (nodes[keyChar].char == char) {
        result = nodes[keyChar];
        break;
      }
    }
    return result;
  };
  this.createNode = (char, flag, nodes) => {
    const node = {
      char,
      flag,
      nodes: nodes == null ? {} : nodes
    };
    return node;
  };

  //替换字符串
  this.replaceWarnString = inputStr => {
    if (inputStr == null) {
      return '';
    }
    let chars = inputStr;
    let index = 0;
    let node = this.rootNode;
    //需要替换的字符下标集合
    let replaceIndexes = [];

    while (index < chars.length) {
      const ch = chars.charAt(index);
      if (ch != null && ch != ' ') {
        node = this.findNode(node, ch);
      }

      if (node == null) {
        //正常，跳过
        index -= replaceIndexes.length;
        node = this.rootNode;
        replaceIndexes = [];
      } else if (node.flag == 1) {
        //敏感词结束，替换原字符串
        replaceIndexes.push(index);
        let buffer = '';
        for (let j = 0; j <= index; ++j) {
          if (replaceIndexes.indexOf(j) == -1) {
            buffer = buffer + chars.charAt(j);
          } else {
            buffer = buffer + '*';
          }
        }
        chars = buffer + chars.substring(index + 1);

        node = this.rootNode;
        replaceIndexes = [];
      } else {
        //敏感词开始
        replaceIndexes.push(index);
      }
      index += 1;
    }
    return chars;
  };
};

let Dictionary = null;
let myManager = null;

module.exports.init = function() {
  if (Dictionary != null) {
    return;
  }
  initDictionary('blockwords_list.txt', function(dictionary) {
    Dictionary = dictionary;
    myManager = new SensitiveWordsManager(Dictionary);
    myManager.createTree();
  });
};

module.exports.filter = function(inputStr) {
  if (Dictionary === null) {
    throw new Error('BlockWords is null');
  }
  return myManager.replaceWarnString(inputStr);
};

module.exports.isValid = function(inputStr) {
  if (utils.isEmpty(inputStr)) {
    return false;
  }

  if (Dictionary === null) {
    return false;
  }
  const replaceStr = myManager.replaceWarnString(inputStr);
  if (replaceStr.indexOf('*') !== -1) {
    return false;
  }

  return true;
};
