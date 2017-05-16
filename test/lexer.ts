import { describe, it } from 'mocha';
import { expect } from 'chai';
import Lexer from '../src/Lexer';

const lexer = new Lexer();

describe('tokens', () => {
  it('should analyze normal HTML tags', () => {
    let html = `<div show class="classname" style='{ display: none; }'>1 + 1 > 2</div>`;
    let tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(3);
    expect(tokens[0]['string']).to.equal(`<div show class="classname" style='{ display: none; }'>`);
    expect(tokens[1]['string']).to.equal('1 + 1 > 2');
    expect(tokens[2]['string']).to.equal('</div>');

    html = '<div onClick="() => 1 < 2">1 + 1 > 2</div>';
    tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(3);
    expect(tokens[0]['string']).to.equal('<div onClick="() => 1 < 2">');
    expect(tokens[1]['string']).to.equal('1 + 1 > 2');
    expect(tokens[2]['string']).to.equal('</div>');

    html = '>aaa><div>>oh my</div>>';
    tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(5);
    expect(tokens[0]['string']).to.equal('>aaa>');
    expect(tokens[1]['string']).to.equal('<div>');
    expect(tokens[2]['string']).to.equal('>oh my');
    expect(tokens[3]['string']).to.equal('</div>');
    expect(tokens[4]['string']).to.equal('>');

    html = '<aaa<<div><oh my</div>< ';
    tokens = lexer.analyze(html)[0];
    expect(tokens.length).to.equal(5);
    expect(tokens[0]['string']).to.equal('<aaa<');
    expect(tokens[1]['string']).to.equal('<div>');
    expect(tokens[2]['string']).to.equal('<oh my');
    expect(tokens[3]['string']).to.equal('</div>');
    expect(tokens[4]['string']).to.equal('<');
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
