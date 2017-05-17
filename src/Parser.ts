export default class Parser {
  parse(tokens: Array<Array<Object>>) {
     const toks: Array<Object> = tokens.reduce((tok1, tok2) => tok1.concat(tok2))
     let root: Node = new Node({ token: 'root', string: '<root ' });
     let stack: Stack = new Stack();
     stack.push(root);

     for (let i = 0; i < tokens.length; i += 1) {
       const token: Object = tokens[i];
       const type = token['token'];
       if (type === 'start-tag') {
         const node = new Node(token);
         stack.top().addChild(node);
         stack.push(node);
       } else if (type === 'end-tag') {
         const node = new Node(token);
         if (stack.isEmpty() || node.name !== stack.top().name) {
           throw new Error('unclosed tag exists');
         }
         stack.pop();
       } else {
         stack.top().addChild(new Node(token));
       }
     }

     if (!stack.isEmpty()) {
       throw new Error('unclosed tag exists');
     }

     return root;
  }
}

class Stack {
  stack: Array<Node>
  constructor() {
    this.stack = [];
  }

  top() {
    return this.stack[0];
  }

  push(obj: Node) {
    this.stack.unshift(obj);
  }

  pop() {
    return this.stack.shift();
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  inspect() {
    return this.stack;
  }
}

class Node {
  name: String
  isString: boolean
  children: Array<Node>
  constructor(attrs: Object) {
    this.isString = attrs['token'] === 'string';
    if (!this.isString) {
      this.children = [];
      this.name = attrs['string'].split(' ')[0].substring(1).toLowerCase();
    }
  }

  addChild(node) {
    this.children.push(node);
  }
}
