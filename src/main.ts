import Lexer from './Lexer';
import Parser, { Stack } from './Parser';

const lexer = new Lexer();
const parser = new Parser();

function draw(html) {
  const tokens = lexer.analyze(html);
  const root = parser.parse(tokens);
  const stack = new Stack();
}

function main() {
  const input = document.getElementById('input');
  input.onchange = (e) => {
    draw(e.target['value']);
  }
}

window.onload = () => {
  main();
}
