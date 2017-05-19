import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/Lexer';
import Parser from '../src/Parser';

const lexer = new Lexer();
const parser = new Parser();

describe('Parser', () => {
  it('parse tokens', () => {
    let html = '<div>cat!</div>';
    let tokens = lexer.analyze(html);
    let treeRoot = parser.parse(tokens);
    expect(treeRoot.isString).to.be.false;
    expect(treeRoot.children.length).to.equal(1);

    html = `<!DOCTYPE>\n<html>\n<body>\n<a href="hunnble.github.io">blog</a>\n</body>\n</html>`;
    tokens = lexer.analyze(html);
    treeRoot = parser.parse(tokens);
    expect(treeRoot.children.length).to.equal(2);
  })
});
