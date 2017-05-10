class Lexer < Struct.new(:string)
  RULE = [
    { token: 'if', pattern: /[Ii]f/ },
    { token: 'else', pattern: /[Ee]lse/ },
    { token: 'while', pattern: /[Ww]hile/ },
    { token: 'for', pattern: /[Ff]or/ },
    { token: 'end', pattern: /end/ },
    { token: '(', pattern: /\(/ },
    { token: ')', pattern: /\)/ },
    { token: '{', pattern: /\{/ },
    { token: '}', pattern: /\}/ },
    { token: ';', pattern: /;/ },
    { token: '=', pattern: /\=/ },
    { token: '+', pattern: /\+/ },
    { token: '*', pattern: /\*/ },
    { token: '<', pattern: /</ },
    { token: '>', pattern: />/ },
    { token: '>=', pattern: />=/ },
    { token: '<=', pattern: /<=/ },
    { token: '==', pattern: /\=\=/ },
    { token: 'Number', pattern: /[0-9]+/ },
    { token: 'Boolean', pattern: /[Tt]rue|[Ff]alse/ },
    { token: 'String', pattern: /\S+/ },
    { token: 'Note', pattern: /#[\s\S]*/ }
  ]

  def analyze
    lines = []
    string.each_line('\n') do |line|
      lines.push(analyze_line(line.gsub('\n', '')))
    end
    lines.tap do |line|
      puts line
    end
  end

  def analyze_line(str)
    [].tap do |tokens|
      while !str.empty?
        rule, match = rule_with_match(str.strip)
        tokens.push({ token: rule[:token], value: match[0] })
        str = match.post_match
      end
    end
  end

  def rule_with_match(str)
    matches = RULE.map { |rule| /\A#{rule[:pattern]}/.match(str) }
    rules_with_matches = RULE.zip(matches).reject { |rule, match| match.nil? }
    rules_with_matches.max_by { |rule, match| match.to_s.length }
  end
end

Lexer.new(' If = a +13 \nand a # while (a) # cannot ').analyze
