import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/Lexer';

const lexer = new Lexer();

describe('tokens', () => {
  it('should analyze normal HTML tags', () => {
    let html = '<div class="classname">burn it all</div>';
    let tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(3);
    expect(tokens[0]['string']).to.equal('<div class="classname">');
    expect(tokens[1]['string']).to.equal('burn it all');
    expect(tokens[2]['string']).to.equal('</div>');
    html = '<div onClick="() => 1 < 2">burn it all</div>';
    tokens = lexer.analyze(html)[0];
    expect(tokens[0]['string']).to.equal('<div onClick="() => 1 < 2">');
    expect(tokens[1]['string']).to.equal('burn it all');
    expect(tokens[2]['string']).to.equal('</div>');
  });

  it('should analyze correct self-closing tags', () => {
    let html = '<input name="username" />';
    let tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(1);
    expect(tokens[0]['string']).to.equal(html.trim());
    html = '<input onClick="function() { 1 < 2 }" />';
    tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(1);
    expect(tokens[0]['string']).to.equal(html.trim());
  });

  it('should get comments', () => {
    const html = '<!-- useless words -->';
    const tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(1);
    expect(tokens[0]['string']).to.equal(html.trim());
  });
});
