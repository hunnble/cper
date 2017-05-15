class Lexer {
  symbols: Array<string>
  grammar: Array<Object>
  constructor() {
    this.symbols = ['"', "'", '<', '>', '/'];
    this.grammar = [
      { token: 'self_close_tag', rule: /<([a-zA-Z])*\s*.*\/>/ },
      { token: 'start_tag', rule: /<([a-zA-Z])*\s*.*>/ },
      { token: 'end_tag', rule: /<\/([a-zA-Z])*\s*.*>/ },
      { token: 'comment', rule: /<!--.*-->/ }
    ];
  }

  analyze(str: string) {
    const lines: Array<string> = str.split('\n');
    return lines.map(line => this.analyzeLine(line));
  }

  analyzeLine(line: string) {
    
  }
}