export default class Lexer {
  symbols: Array<string>
  grammar: Array<Object>
  constructor() {
    this.symbols = ['"', "'", '<', '>', '/'];
    this.grammar = [
      { token: 'self-closing-tag', rule: /<([a-zA-Z])+\s*([^<>"']|"[^"]*"|'[^']*')*?\s*\/>/ },
      { token: 'start-tag', rule: /<([a-zA-Z])+\s*([^<>"']|"[^"]*"|'[^']*')*?\s*>/ },
      { token: 'end-tag', rule: /<\/([a-zA-Z])+\s*>/ },
      { token: 'comment', rule: /<!--.+?-->/ },
      // TODO: change rule of string, support <
      { token: 'string', rule: /[^<>]+|[^<>]*>(?!<[a-zA-Z])*/ }
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
        let match: Object = line.match(this.grammar[i]['rule']);
        if (!match) continue;
        match['token'] = this.grammar[i]['token'];
        if (match['index'] < token['index']) {
          token = match;
        } else if (match['index'] === token['index'] && match[0].length < token[0].length) {
          token = match;
        }
      }
      if (!token[0]) throw new Error('catch match');
      line = line.substring(token['index'] + token[0].length);

      if (!token['input'] || !/\S/.test(token[0])) continue;

      // concatenate strings
      if (token['token'] === 'string' && tokens.length > 0 && tokens[tokens.length - 1]['token'] === 'string') {
        tokens[tokens.length - 1]['string'] = tokens[tokens.length - 1]['string'] + token[0];
        continue;
      }

      token['input'] && tokens.push({
        string: token[0],
        token: token['token']
      });
    }

    return tokens;
  }
}
