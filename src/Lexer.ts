export default class Lexer {
  symbols: Array<string>
  grammar: Array<Object>
  selfCloseTags: Array<string>
  constructor() {
    this.symbols = ['"', "'", '<', '>', '/'];
    this.grammar = [
      { token: 'self_close_tag', rule: /<([a-zA-Z])+?\s*[^<>]*\/>/ },
      { token: 'start_tag', rule: /<([a-zA-Z])+?\s*[^<>]*>/ },
      { token: 'end_tag', rule: /<\/([a-zA-Z])+?\s*[^<>]*>/ },
      { token: 'comment', rule: /<!--.*-->/ },
      { token: 'string', rule: /[^<>]+/ }
    ];
  }

  analyze(str: string) {
    const lines: Array<string> = str.split('\n');
    return lines.map(line => this.analyzeLine(line));
  }

  analyzeLine(line: string): Array<any> {
    const grammarLen: Number = this.grammar.length;
    let tokens: Array<Object> = [];
    let token: Object;
    while (line.length > 0) {
      token = { index: line.length };
      for (let i = 0; i < grammarLen; i += 1) {
        const match: Object = line.match(this.grammar[i]['rule']);
        if (!match) continue;
        if (match['index'] < token['index']) {
          token = match;
        } else if (match['index'] === token['index'] && match[0].length < token[0].length) {
          token = match;
        }
      }
      line = line.substring(token['index'] + token[0].length);
      token['input'] && tokens.push(token);
    }
    return tokens;
  }
}
