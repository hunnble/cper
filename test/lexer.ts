import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/Lexer';

const lexer = new Lexer();

describe('tokens', () => {
  it('should analyze normal HTML tags', () => {
    const html = '<div class="classname">burn it all</div>';
    const tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(3);
    expect(tokens[0][0]).to.equal('<div class="classname">');
    expect(tokens[1][0]).to.equal('burn it all');
    expect(tokens[2][0]).to.equal('</div>');
  });

  it('should analyze correct self-closing tags', () => {
    const html = '<input name="username" />';
    const tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(1);
    expect(tokens[0][0]).to.equal(html);
  });

  it('should get comments', () => {
    const html = '<!-- useless words -->';
    const tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(1);
    expect(tokens[0][0]).to.equal(html);
  });
});
