import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/Lexer';
import Parser from '../src/Parser';

const lexer = new Lexer();
const parser = new Parser();

describe('Parser', () => {
  it('parse tokens', () => {
    const html = '<div>cat!</div>';
    const tokens = lexer.analyze(html);
    const treeRoot = parser.parse(tokens);
    console.log(treeRoot);
  })
});
