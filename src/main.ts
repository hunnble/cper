import Lexer from './Lexer';
import Parser, { Stack } from './Parser';

const lexer = new Lexer();
const parser = new Parser();

function draw(html) {
  const tokens = lexer.analyze(html);
  const root = parser.parse(tokens);
  const stack = new Stack();
  console.log(html);
}

function main() {
  const input = document.getElementById('input');
  console.log(input);
  input.onchange = (e) => {
    draw(e.target['value']);
  }
}

window.onload = () => {
  console.log(111);
  main();
}
