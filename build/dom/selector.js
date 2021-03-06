/*
Copyright 2013, KISSY v1.50dev
MIT Licensed
build time: Nov 27 00:40
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 dom/selector/parser
 dom/selector
*/

KISSY.add("dom/selector/parser", [], function() {
  var parser = {}, S = KISSY, GrammarConst = {SHIFT_TYPE:1, REDUCE_TYPE:2, ACCEPT_TYPE:0, TYPE_INDEX:0, PRODUCTION_INDEX:1, TO_INDEX:2};
  var Lexer = function(cfg) {
    var self = this;
    self.rules = [];
    S.mix(self, cfg);
    self.resetInput(self.input)
  };
  Lexer.prototype = {constructor:function(cfg) {
    var self = this;
    self.rules = [];
    S.mix(self, cfg);
    self.resetInput(self.input)
  }, resetInput:function(input) {
    S.mix(this, {input:input, matched:"", stateStack:[Lexer.STATIC.INITIAL], match:"", text:"", firstLine:1, lineNumber:1, lastLine:1, firstColumn:1, lastColumn:1})
  }, getCurrentRules:function() {
    var self = this, currentState = self.stateStack[self.stateStack.length - 1], rules = [];
    currentState = self.mapState(currentState);
    S.each(self.rules, function(r) {
      var state = r.state || r[3];
      if(!state) {
        if(currentState == Lexer.STATIC.INITIAL) {
          rules.push(r)
        }
      }else {
        if(S.inArray(currentState, state)) {
          rules.push(r)
        }
      }
    });
    return rules
  }, pushState:function(state) {
    this.stateStack.push(state)
  }, popState:function() {
    return this.stateStack.pop()
  }, getStateStack:function() {
    return this.stateStack
  }, showDebugInfo:function() {
    var self = this, DEBUG_CONTEXT_LIMIT = Lexer.STATIC.DEBUG_CONTEXT_LIMIT, matched = self.matched, match = self.match, input = self.input;
    matched = matched.slice(0, matched.length - match.length);
    var past = (matched.length > DEBUG_CONTEXT_LIMIT ? "..." : "") + matched.slice(-DEBUG_CONTEXT_LIMIT).replace(/\n/, " "), next = match + input;
    next = next.slice(0, DEBUG_CONTEXT_LIMIT) + (next.length > DEBUG_CONTEXT_LIMIT ? "..." : "");
    return past + next + "\n" + (new Array(past.length + 1)).join("-") + "^"
  }, mapSymbol:function(t) {
    var self = this, symbolMap = self.symbolMap;
    if(!symbolMap) {
      return t
    }
    return symbolMap[t] || (symbolMap[t] = ++self.symbolId)
  }, mapReverseSymbol:function(rs) {
    var self = this, symbolMap = self.symbolMap, i, reverseSymbolMap = self.reverseSymbolMap;
    if(!reverseSymbolMap && symbolMap) {
      reverseSymbolMap = self.reverseSymbolMap = {};
      for(i in symbolMap) {
        reverseSymbolMap[symbolMap[i]] = i
      }
    }
    if(reverseSymbolMap) {
      return reverseSymbolMap[rs]
    }else {
      return rs
    }
  }, mapState:function(s) {
    var self = this, stateMap = self.stateMap;
    if(!stateMap) {
      return s
    }
    return stateMap[s] || (stateMap[s] = ++self.stateId)
  }, lex:function() {
    var self = this, input = self.input, i, rule, m, ret, lines, rules = self.getCurrentRules();
    self.match = self.text = "";
    if(!input) {
      return self.mapSymbol(Lexer.STATIC.END_TAG)
    }
    for(i = 0;i < rules.length;i++) {
      rule = rules[i];
      var regexp = rule.regexp || rule[1], token = rule.token || rule[0], action = rule.action || rule[2] || undefined;
      if(m = input.match(regexp)) {
        lines = m[0].match(/\n.*/g);
        if(lines) {
          self.lineNumber += lines.length
        }
        S.mix(self, {firstLine:self.lastLine, lastLine:self.lineNumber + 1, firstColumn:self.lastColumn, lastColumn:lines ? lines[lines.length - 1].length - 1 : self.lastColumn + m[0].length});
        var match;
        match = self.match = m[0];
        self.matches = m;
        self.text = match;
        self.matched += match;
        ret = action && action.call(self);
        if(ret == undefined) {
          ret = token
        }else {
          ret = self.mapSymbol(ret)
        }
        input = input.slice(match.length);
        self.input = input;
        if(ret) {
          return ret
        }else {
          return self.lex()
        }
      }
    }
    S.error("lex error at line " + self.lineNumber + ":\n" + self.showDebugInfo());
    return undefined
  }};
  Lexer.STATIC = {INITIAL:"I", DEBUG_CONTEXT_LIMIT:20, END_TAG:"$EOF"};
  var lexer = new Lexer({rules:[[2, /^\[(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [3, /^(?:[\t\r\n\f\x20]*)\]/, function() {
    this.text = KISSY.trim(this.text)
  }], [4, /^(?:[\t\r\n\f\x20]*)~=(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [5, /^(?:[\t\r\n\f\x20]*)\|=(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [6, /^(?:[\t\r\n\f\x20]*)\^=(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [7, /^(?:[\t\r\n\f\x20]*)\$=(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [8, /^(?:[\t\r\n\f\x20]*)\*=(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [9, /^(?:[\t\r\n\f\x20]*)\=(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [10, /^(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)\(/, function() {
    this.text = KISSY.trim(this.text).slice(0, -1);
    this.pushState("fn")
  }], [11, /^[^\)]*/, function() {
    this.popState()
  }, ["fn"]], [12, /^(?:[\t\r\n\f\x20]*)\)/, function() {
    this.text = KISSY.trim(this.text)
  }], [13, /^:not\((?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [14, /^(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)/, function() {
    this.text = this.yy.unEscape(this.text)
  }], [15, /^"(\\"|[^"])*"/, function() {
    this.text = this.yy.unEscapeStr(this.text)
  }], [15, /^'(\\'|[^'])*'/, function() {
    this.text = this.yy.unEscapeStr(this.text)
  }], [16, /^#(?:(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))+)/, function() {
    this.text = this.yy.unEscape(this.text.slice(1))
  }], [17, /^\.(?:(?:[\w]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))(?:[\w\d-]|[^\x00-\xa0]|(?:\\[^\n\r\f0-9a-f]))*)/, function() {
    this.text = this.yy.unEscape(this.text.slice(1))
  }], [18, /^(?:[\t\r\n\f\x20]*),(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [19, /^::?/, 0], [20, /^(?:[\t\r\n\f\x20]*)\+(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [21, /^(?:[\t\r\n\f\x20]*)>(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [22, /^(?:[\t\r\n\f\x20]*)~(?:[\t\r\n\f\x20]*)/, function() {
    this.text = KISSY.trim(this.text)
  }], [23, /^\*/, 0], [24, /^(?:[\t\r\n\f\x20]+)/, 0], [25, /^./, 0]]});
  parser.lexer = lexer;
  lexer.symbolMap = {$EOF:1, LEFT_BRACKET:2, RIGHT_BRACKET:3, INCLUDES:4, DASH_MATCH:5, PREFIX_MATCH:6, SUFFIX_MATCH:7, SUBSTRING_MATCH:8, ALL_MATCH:9, FUNCTION:10, PARAMETER:11, RIGHT_PARENTHESES:12, NOT:13, IDENT:14, STRING:15, HASH:16, CLASS:17, COMMA:18, COLON:19, PLUS:20, GREATER:21, TILDE:22, UNIVERSAL:23, S:24, INVALID:25, $START:26, selectors_group:27, selector:28, simple_selector_sequence:29, combinator:30, type_selector:31, id_selector:32, class_selector:33, attrib_match:34, attrib:35, 
  attrib_val:36, pseudo:37, negation:38, negation_arg:39, suffix_selector:40, suffix_selectors:41};
  parser.productions = [[26, [27]], [27, [28], function() {
    return[this.$1]
  }], [27, [27, 18, 28], function() {
    this.$1.push(this.$3)
  }], [28, [29]], [28, [28, 30, 29], function() {
    this.$1.nextCombinator = this.$3.prevCombinator = this.$2;
    var order;
    order = this.$1.order = this.$1.order || 0;
    this.$3.order = order + 1;
    this.$3.prev = this.$1;
    this.$1.next = this.$3;
    return this.$3
  }], [30, [20]], [30, [21]], [30, [22]], [30, [24], function() {
    return" "
  }], [31, [14], function() {
    return{t:"tag", value:this.$1}
  }], [31, [23], function() {
    return{t:"tag", value:this.$1}
  }], [32, [16], function() {
    return{t:"id", value:this.$1}
  }], [33, [17], function() {
    return{t:"cls", value:this.$1}
  }], [34, [6]], [34, [7]], [34, [8]], [34, [9]], [34, [4]], [34, [5]], [35, [2, 14, 3], function() {
    return{t:"attrib", value:{ident:this.$2}}
  }], [36, [14]], [36, [15]], [35, [2, 14, 34, 36, 3], function() {
    return{t:"attrib", value:{ident:this.$2, match:this.$3, value:this.$4}}
  }], [37, [19, 10, 11, 12], function() {
    return{t:"pseudo", value:{fn:this.$2.toLowerCase(), param:this.$3}}
  }], [37, [19, 14], function() {
    return{t:"pseudo", value:{ident:this.$2.toLowerCase()}}
  }], [38, [13, 39, 12], function() {
    return{t:"pseudo", value:{fn:"not", param:this.$2}}
  }], [39, [31]], [39, [32]], [39, [33]], [39, [35]], [39, [37]], [40, [32]], [40, [33]], [40, [35]], [40, [37]], [40, [38]], [41, [40], function() {
    return[this.$1]
  }], [41, [41, 40], function() {
    this.$1.push(this.$2)
  }], [29, [31]], [29, [41], function() {
    return{suffix:this.$1}
  }], [29, [31, 41], function() {
    return{t:"tag", value:this.$1.value, suffix:this.$2}
  }]];
  parser.table = {gotos:{"0":{"27":8, "28":9, "29":10, "31":11, "32":12, "33":13, "35":14, "37":15, "38":16, "40":17, "41":18}, "2":{"31":20, "32":21, "33":22, "35":23, "37":24, "39":25}, "9":{"30":33}, "11":{"32":12, "33":13, "35":14, "37":15, "38":16, "40":17, "41":34}, "18":{"32":12, "33":13, "35":14, "37":15, "38":16, "40":35}, "19":{"34":43}, "28":{"28":46, "29":10, "31":11, "32":12, "33":13, "35":14, "37":15, "38":16, "40":17, "41":18}, "33":{"29":47, "31":11, "32":12, "33":13, "35":14, "37":15, 
  "38":16, "40":17, "41":18}, "34":{"32":12, "33":13, "35":14, "37":15, "38":16, "40":35}, "43":{"36":50}, "46":{"30":33}}, action:{"0":{"2":[1, 0, 1], "13":[1, 0, 2], "14":[1, 0, 3], "16":[1, 0, 4], "17":[1, 0, 5], "19":[1, 0, 6], "23":[1, 0, 7]}, "1":{"14":[1, 0, 19]}, "2":{"2":[1, 0, 1], "14":[1, 0, 3], "16":[1, 0, 4], "17":[1, 0, 5], "19":[1, 0, 6], "23":[1, 0, 7]}, "3":{"1":[2, 9, 0], "2":[2, 9, 0], "12":[2, 9, 0], "13":[2, 9, 0], "16":[2, 9, 0], "17":[2, 9, 0], "18":[2, 9, 0], "19":[2, 9, 0], 
  "20":[2, 9, 0], "21":[2, 9, 0], "22":[2, 9, 0], "24":[2, 9, 0]}, "4":{"1":[2, 11, 0], "2":[2, 11, 0], "12":[2, 11, 0], "13":[2, 11, 0], "16":[2, 11, 0], "17":[2, 11, 0], "18":[2, 11, 0], "19":[2, 11, 0], "20":[2, 11, 0], "21":[2, 11, 0], "22":[2, 11, 0], "24":[2, 11, 0]}, "5":{"1":[2, 12, 0], "2":[2, 12, 0], "12":[2, 12, 0], "13":[2, 12, 0], "16":[2, 12, 0], "17":[2, 12, 0], "18":[2, 12, 0], "19":[2, 12, 0], "20":[2, 12, 0], "21":[2, 12, 0], "22":[2, 12, 0], "24":[2, 12, 0]}, "6":{"10":[1, 0, 26], 
  "14":[1, 0, 27]}, "7":{"1":[2, 10, 0], "2":[2, 10, 0], "12":[2, 10, 0], "13":[2, 10, 0], "16":[2, 10, 0], "17":[2, 10, 0], "18":[2, 10, 0], "19":[2, 10, 0], "20":[2, 10, 0], "21":[2, 10, 0], "22":[2, 10, 0], "24":[2, 10, 0]}, "8":{"1":[0, 0, 0], "18":[1, 0, 28]}, "9":{"1":[2, 1, 0], "18":[2, 1, 0], "20":[1, 0, 29], "21":[1, 0, 30], "22":[1, 0, 31], "24":[1, 0, 32]}, "10":{"1":[2, 3, 0], "18":[2, 3, 0], "20":[2, 3, 0], "21":[2, 3, 0], "22":[2, 3, 0], "24":[2, 3, 0]}, "11":{"1":[2, 38, 0], "2":[1, 
  0, 1], "13":[1, 0, 2], "16":[1, 0, 4], "17":[1, 0, 5], "18":[2, 38, 0], "19":[1, 0, 6], "20":[2, 38, 0], "21":[2, 38, 0], "22":[2, 38, 0], "24":[2, 38, 0]}, "12":{"1":[2, 31, 0], "2":[2, 31, 0], "13":[2, 31, 0], "16":[2, 31, 0], "17":[2, 31, 0], "18":[2, 31, 0], "19":[2, 31, 0], "20":[2, 31, 0], "21":[2, 31, 0], "22":[2, 31, 0], "24":[2, 31, 0]}, "13":{"1":[2, 32, 0], "2":[2, 32, 0], "13":[2, 32, 0], "16":[2, 32, 0], "17":[2, 32, 0], "18":[2, 32, 0], "19":[2, 32, 0], "20":[2, 32, 0], "21":[2, 32, 
  0], "22":[2, 32, 0], "24":[2, 32, 0]}, "14":{"1":[2, 33, 0], "2":[2, 33, 0], "13":[2, 33, 0], "16":[2, 33, 0], "17":[2, 33, 0], "18":[2, 33, 0], "19":[2, 33, 0], "20":[2, 33, 0], "21":[2, 33, 0], "22":[2, 33, 0], "24":[2, 33, 0]}, "15":{"1":[2, 34, 0], "2":[2, 34, 0], "13":[2, 34, 0], "16":[2, 34, 0], "17":[2, 34, 0], "18":[2, 34, 0], "19":[2, 34, 0], "20":[2, 34, 0], "21":[2, 34, 0], "22":[2, 34, 0], "24":[2, 34, 0]}, "16":{"1":[2, 35, 0], "2":[2, 35, 0], "13":[2, 35, 0], "16":[2, 35, 0], "17":[2, 
  35, 0], "18":[2, 35, 0], "19":[2, 35, 0], "20":[2, 35, 0], "21":[2, 35, 0], "22":[2, 35, 0], "24":[2, 35, 0]}, "17":{"1":[2, 36, 0], "2":[2, 36, 0], "13":[2, 36, 0], "16":[2, 36, 0], "17":[2, 36, 0], "18":[2, 36, 0], "19":[2, 36, 0], "20":[2, 36, 0], "21":[2, 36, 0], "22":[2, 36, 0], "24":[2, 36, 0]}, "18":{"1":[2, 39, 0], "2":[1, 0, 1], "13":[1, 0, 2], "16":[1, 0, 4], "17":[1, 0, 5], "18":[2, 39, 0], "19":[1, 0, 6], "20":[2, 39, 0], "21":[2, 39, 0], "22":[2, 39, 0], "24":[2, 39, 0]}, "19":{"3":[1, 
  0, 36], "4":[1, 0, 37], "5":[1, 0, 38], "6":[1, 0, 39], "7":[1, 0, 40], "8":[1, 0, 41], "9":[1, 0, 42]}, "20":{"12":[2, 26, 0]}, "21":{"12":[2, 27, 0]}, "22":{"12":[2, 28, 0]}, "23":{"12":[2, 29, 0]}, "24":{"12":[2, 30, 0]}, "25":{"12":[1, 0, 44]}, "26":{"11":[1, 0, 45]}, "27":{"1":[2, 24, 0], "2":[2, 24, 0], "12":[2, 24, 0], "13":[2, 24, 0], "16":[2, 24, 0], "17":[2, 24, 0], "18":[2, 24, 0], "19":[2, 24, 0], "20":[2, 24, 0], "21":[2, 24, 0], "22":[2, 24, 0], "24":[2, 24, 0]}, "28":{"2":[1, 0, 
  1], "13":[1, 0, 2], "14":[1, 0, 3], "16":[1, 0, 4], "17":[1, 0, 5], "19":[1, 0, 6], "23":[1, 0, 7]}, "29":{"2":[2, 5, 0], "13":[2, 5, 0], "14":[2, 5, 0], "16":[2, 5, 0], "17":[2, 5, 0], "19":[2, 5, 0], "23":[2, 5, 0]}, "30":{"2":[2, 6, 0], "13":[2, 6, 0], "14":[2, 6, 0], "16":[2, 6, 0], "17":[2, 6, 0], "19":[2, 6, 0], "23":[2, 6, 0]}, "31":{"2":[2, 7, 0], "13":[2, 7, 0], "14":[2, 7, 0], "16":[2, 7, 0], "17":[2, 7, 0], "19":[2, 7, 0], "23":[2, 7, 0]}, "32":{"2":[2, 8, 0], "13":[2, 8, 0], "14":[2, 
  8, 0], "16":[2, 8, 0], "17":[2, 8, 0], "19":[2, 8, 0], "23":[2, 8, 0]}, "33":{"2":[1, 0, 1], "13":[1, 0, 2], "14":[1, 0, 3], "16":[1, 0, 4], "17":[1, 0, 5], "19":[1, 0, 6], "23":[1, 0, 7]}, "34":{"1":[2, 40, 0], "2":[1, 0, 1], "13":[1, 0, 2], "16":[1, 0, 4], "17":[1, 0, 5], "18":[2, 40, 0], "19":[1, 0, 6], "20":[2, 40, 0], "21":[2, 40, 0], "22":[2, 40, 0], "24":[2, 40, 0]}, "35":{"1":[2, 37, 0], "2":[2, 37, 0], "13":[2, 37, 0], "16":[2, 37, 0], "17":[2, 37, 0], "18":[2, 37, 0], "19":[2, 37, 0], 
  "20":[2, 37, 0], "21":[2, 37, 0], "22":[2, 37, 0], "24":[2, 37, 0]}, "36":{"1":[2, 19, 0], "2":[2, 19, 0], "12":[2, 19, 0], "13":[2, 19, 0], "16":[2, 19, 0], "17":[2, 19, 0], "18":[2, 19, 0], "19":[2, 19, 0], "20":[2, 19, 0], "21":[2, 19, 0], "22":[2, 19, 0], "24":[2, 19, 0]}, "37":{"14":[2, 17, 0], "15":[2, 17, 0]}, "38":{"14":[2, 18, 0], "15":[2, 18, 0]}, "39":{"14":[2, 13, 0], "15":[2, 13, 0]}, "40":{"14":[2, 14, 0], "15":[2, 14, 0]}, "41":{"14":[2, 15, 0], "15":[2, 15, 0]}, "42":{"14":[2, 16, 
  0], "15":[2, 16, 0]}, "43":{"14":[1, 0, 48], "15":[1, 0, 49]}, "44":{"1":[2, 25, 0], "2":[2, 25, 0], "13":[2, 25, 0], "16":[2, 25, 0], "17":[2, 25, 0], "18":[2, 25, 0], "19":[2, 25, 0], "20":[2, 25, 0], "21":[2, 25, 0], "22":[2, 25, 0], "24":[2, 25, 0]}, "45":{"12":[1, 0, 51]}, "46":{"1":[2, 2, 0], "18":[2, 2, 0], "20":[1, 0, 29], "21":[1, 0, 30], "22":[1, 0, 31], "24":[1, 0, 32]}, "47":{"1":[2, 4, 0], "18":[2, 4, 0], "20":[2, 4, 0], "21":[2, 4, 0], "22":[2, 4, 0], "24":[2, 4, 0]}, "48":{"3":[2, 
  20, 0]}, "49":{"3":[2, 21, 0]}, "50":{"3":[1, 0, 52]}, "51":{"1":[2, 23, 0], "2":[2, 23, 0], "12":[2, 23, 0], "13":[2, 23, 0], "16":[2, 23, 0], "17":[2, 23, 0], "18":[2, 23, 0], "19":[2, 23, 0], "20":[2, 23, 0], "21":[2, 23, 0], "22":[2, 23, 0], "24":[2, 23, 0]}, "52":{"1":[2, 22, 0], "2":[2, 22, 0], "12":[2, 22, 0], "13":[2, 22, 0], "16":[2, 22, 0], "17":[2, 22, 0], "18":[2, 22, 0], "19":[2, 22, 0], "20":[2, 22, 0], "21":[2, 22, 0], "22":[2, 22, 0], "24":[2, 22, 0]}}};
  parser.parse = function parse(input) {
    var self = this, lexer = self.lexer, state, symbol, action, table = self.table, gotos = table.gotos, tableAction = table.action, productions = self.productions, valueStack = [null], stack = [0];
    lexer.resetInput(input);
    while(1) {
      state = stack[stack.length - 1];
      if(!symbol) {
        symbol = lexer.lex()
      }
      if(!symbol) {
        S.log("it is not a valid input: " + input, "error");
        return false
      }
      action = tableAction[state] && tableAction[state][symbol];
      if(!action) {
        var expected = [], error;
        if(tableAction[state]) {
          S.each(tableAction[state], function(_, symbol) {
            expected.push(self.lexer.mapReverseSymbol(symbol))
          })
        }
        error = "Syntax error at line " + lexer.lineNumber + ":\n" + lexer.showDebugInfo() + "\n" + "expect " + expected.join(", ");
        S.error(error);
        return false
      }
      switch(action[GrammarConst.TYPE_INDEX]) {
        case GrammarConst.SHIFT_TYPE:
          stack.push(symbol);
          valueStack.push(lexer.text);
          stack.push(action[GrammarConst.TO_INDEX]);
          symbol = null;
          break;
        case GrammarConst.REDUCE_TYPE:
          var production = productions[action[GrammarConst.PRODUCTION_INDEX]], reducedSymbol = production.symbol || production[0], reducedAction = production.action || production[2], reducedRhs = production.rhs || production[1], len = reducedRhs.length, i = 0, ret = undefined, $$ = valueStack[valueStack.length - len];
          self.$$ = $$;
          for(;i < len;i++) {
            self["$" + (len - i)] = valueStack[valueStack.length - 1 - i]
          }
          if(reducedAction) {
            ret = reducedAction.call(self)
          }
          if(ret !== undefined) {
            $$ = ret
          }else {
            $$ = self.$$
          }
          if(len) {
            stack = stack.slice(0, -1 * len * 2);
            valueStack = valueStack.slice(0, -1 * len)
          }
          stack.push(reducedSymbol);
          valueStack.push($$);
          var newState = gotos[stack[stack.length - 2]][stack[stack.length - 1]];
          stack.push(newState);
          break;
        case GrammarConst.ACCEPT_TYPE:
          return $$
      }
    }
    return undefined
  };
  return parser
});
KISSY.add("dom/selector", ["dom/basic", "./selector/parser"], function(S, require) {
  var Dom = require("dom/basic");
  var parser = require("./selector/parser");
  var logger = S.getLogger("s/dom");
  logger.info("use KISSY css3 selector");
  var document = S.Env.host.document, undefined = undefined, EXPANDO_SELECTOR_KEY = "_ks_data_selector_id_", caches = {}, isContextXML, uuid = 0, subMatchesCache = {}, getAttr = function(el, name) {
    if(isContextXML) {
      return Dom._getSimpleAttr(el, name)
    }else {
      return Dom.attr(el, name)
    }
  }, hasSingleClass = Dom._hasSingleClass, isTag = Dom._isTag, aNPlusB = /^(([+-]?(?:\d+)?)?n)?([+-]?\d+)?$/;
  var unescape = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g, unescapeFn = function(_, escaped) {
    var high = "0x" + escaped - 65536;
    return isNaN(high) ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
  };
  function unEscape(str) {
    return str.replace(unescape, unescapeFn)
  }
  parser.lexer.yy = {unEscape:unEscape, unEscapeStr:function(str) {
    return this.unEscape(str.slice(1, -1))
  }};
  function resetStatus() {
    subMatchesCache = {}
  }
  function dir(el, dir) {
    do {
      el = el[dir]
    }while(el && el.nodeType != 1);
    return el
  }
  function getAb(param) {
    var a = 0, match, b = 0;
    if(typeof param == "number") {
      b = param
    }else {
      if(param == "odd") {
        a = 2;
        b = 1
      }else {
        if(param == "even") {
          a = 2;
          b = 0
        }else {
          if(match = param.replace(/\s/g, "").match(aNPlusB)) {
            if(match[1]) {
              a = parseInt(match[2]);
              if(isNaN(a)) {
                if(match[2] == "-") {
                  a = -1
                }else {
                  a = 1
                }
              }
            }else {
              a = 0
            }
            b = parseInt(match[3]) || 0
          }
        }
      }
    }
    return{a:a, b:b}
  }
  function matchIndexByAb(index, a, b, eq) {
    if(a == 0) {
      if(index == b) {
        return eq
      }
    }else {
      if((index - b) / a >= 0 && (index - b) % a == 0 && eq) {
        return 1
      }
    }
    return undefined
  }
  function isXML(elem) {
    var documentElement = elem && (elem.ownerDocument || elem).documentElement;
    return documentElement ? documentElement.nodeName.toLowerCase() !== "html" : false
  }
  var pseudoFnExpr = {"nth-child":function(el, param) {
    var ab = getAb(param), a = ab.a, b = ab.b;
    if(a == 0 && b == 0) {
      return 0
    }
    var index = 0, parent = el.parentNode;
    if(parent) {
      var childNodes = parent.childNodes, count = 0, child, ret, len = childNodes.length;
      for(;count < len;count++) {
        child = childNodes[count];
        if(child.nodeType == 1) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if(ret !== undefined) {
            return ret
          }
        }
      }
    }
    return 0
  }, "nth-last-child":function(el, param) {
    var ab = getAb(param), a = ab.a, b = ab.b;
    if(a == 0 && b == 0) {
      return 0
    }
    var index = 0, parent = el.parentNode;
    if(parent) {
      var childNodes = parent.childNodes, len = childNodes.length, count = len - 1, child, ret;
      for(;count >= 0;count--) {
        child = childNodes[count];
        if(child.nodeType == 1) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if(ret !== undefined) {
            return ret
          }
        }
      }
    }
    return 0
  }, "nth-of-type":function(el, param) {
    var ab = getAb(param), a = ab.a, b = ab.b;
    if(a == 0 && b == 0) {
      return 0
    }
    var index = 0, parent = el.parentNode;
    if(parent) {
      var childNodes = parent.childNodes, elType = el.tagName, count = 0, child, ret, len = childNodes.length;
      for(;count < len;count++) {
        child = childNodes[count];
        if(child.tagName == elType) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if(ret !== undefined) {
            return ret
          }
        }
      }
    }
    return 0
  }, "nth-last-of-type":function(el, param) {
    var ab = getAb(param), a = ab.a, b = ab.b;
    if(a == 0 && b == 0) {
      return 0
    }
    var index = 0, parent = el.parentNode;
    if(parent) {
      var childNodes = parent.childNodes, len = childNodes.length, elType = el.tagName, count = len - 1, child, ret;
      for(;count >= 0;count--) {
        child = childNodes[count];
        if(child.tagName == elType) {
          index++;
          ret = matchIndexByAb(index, a, b, child === el);
          if(ret !== undefined) {
            return ret
          }
        }
      }
    }
    return 0
  }, lang:function(el, lang) {
    var elLang;
    lang = unEscape(lang.toLowerCase());
    do {
      if(elLang = isContextXML ? el.getAttribute("xml:lang") || el.getAttribute("lang") : el.lang) {
        elLang = elLang.toLowerCase();
        return elLang === lang || elLang.indexOf(lang + "-") === 0
      }
    }while((el = el.parentNode) && el.nodeType === 1);
    return false
  }, not:function(el, negation_arg) {
    return!matchExpr[negation_arg.t](el, negation_arg.value)
  }};
  var pseudoIdentExpr = {empty:function(el) {
    var childNodes = el.childNodes, index = 0, len = childNodes.length - 1, child, nodeType;
    for(;index < len;index++) {
      child = childNodes[index];
      nodeType = child.nodeType;
      if(nodeType == 1 || nodeType == 3 || nodeType == 4 || nodeType == 5) {
        return 0
      }
    }
    return 1
  }, root:function(el) {
    return el.ownerDocument && el === el.ownerDocument.documentElement
  }, "first-child":function(el) {
    return pseudoFnExpr["nth-child"](el, 1)
  }, "last-child":function(el) {
    return pseudoFnExpr["nth-last-child"](el, 1)
  }, "first-of-type":function(el) {
    return pseudoFnExpr["nth-of-type"](el, 1)
  }, "last-of-type":function(el) {
    return pseudoFnExpr["nth-last-of-type"](el, 1)
  }, "only-child":function(el) {
    return pseudoIdentExpr["first-child"](el) && pseudoIdentExpr["last-child"](el)
  }, "only-of-type":function(el) {
    return pseudoIdentExpr["first-of-type"](el) && pseudoIdentExpr["last-of-type"](el)
  }, focus:function(el) {
    var doc = el.ownerDocument;
    return doc && el === doc.activeElement && (!doc["hasFocus"] || doc["hasFocus"]()) && !!(el.type || el.href || el.tabIndex >= 0)
  }, target:function(el) {
    var hash = location.hash;
    return hash && hash.slice(1) === getAttr(el, "id")
  }, enabled:function(el) {
    return!el.disabled
  }, disabled:function(el) {
    return el.disabled
  }, checked:function(el) {
    var nodeName = el.nodeName.toLowerCase();
    return nodeName === "input" && el.checked || nodeName === "option" && el.selected
  }};
  var attribExpr = {"~=":function(elValue, value) {
    if(!value || value.indexOf(" ") > -1) {
      return 0
    }
    return(" " + elValue + " ").indexOf(" " + value + " ") != -1
  }, "|=":function(elValue, value) {
    return(" " + elValue).indexOf(" " + value + "-") != -1
  }, "^=":function(elValue, value) {
    return value && S.startsWith(elValue, value)
  }, "$=":function(elValue, value) {
    return value && S.endsWith(elValue, value)
  }, "*=":function(elValue, value) {
    return value && elValue.indexOf(value) != -1
  }, "=":function(elValue, value) {
    return elValue === value
  }};
  var matchExpr = {tag:isTag, cls:hasSingleClass, id:function(el, value) {
    return getAttr(el, "id") === value
  }, attrib:function(el, value) {
    var name = value.ident;
    if(!isContextXML) {
      name = name.toLowerCase()
    }
    var elValue = getAttr(el, name);
    var match = value.match;
    if(!match && elValue !== undefined) {
      return 1
    }else {
      if(match) {
        if(elValue === undefined) {
          return 0
        }
        var matchFn = attribExpr[match];
        if(matchFn) {
          return matchFn(elValue + "", value.value + "")
        }
      }
    }
    return 0
  }, pseudo:function(el, value) {
    var fn, fnStr, ident;
    if(fnStr = value.fn) {
      if(!(fn = pseudoFnExpr[fnStr])) {
        throw new SyntaxError("Syntax error: not support pseudo: " + fnStr);
      }
      return fn(el, value.param)
    }
    if(ident = value.ident) {
      if(!pseudoIdentExpr[ident]) {
        throw new SyntaxError("Syntax error: not support pseudo: " + ident);
      }
      return pseudoIdentExpr[ident](el)
    }
    return 0
  }};
  var relativeExpr = {">":{dir:"parentNode", immediate:1}, " ":{dir:"parentNode"}, "+":{dir:"previousSibling", immediate:1}, "~":{dir:"previousSibling"}};
  if("sourceIndex" in document.documentElement) {
    Dom._compareNodeOrder = function(a, b) {
      return a.sourceIndex - b.sourceIndex
    }
  }
  function matches(str, seeds) {
    return Dom._selectInternal(str, null, seeds)
  }
  Dom._matchesInternal = matches;
  function singleMatch(el, match) {
    if(!match) {
      return true
    }
    if(!el) {
      return false
    }
    if(el.nodeType === 9) {
      return false
    }
    var matched = 1, matchSuffix = match.suffix, matchSuffixLen, matchSuffixIndex;
    if(match.t == "tag") {
      matched &= matchExpr["tag"](el, match.value)
    }
    if(matched && matchSuffix) {
      matchSuffixLen = matchSuffix.length;
      matchSuffixIndex = 0;
      for(;matched && matchSuffixIndex < matchSuffixLen;matchSuffixIndex++) {
        var singleMatchSuffix = matchSuffix[matchSuffixIndex], singleMatchSuffixType = singleMatchSuffix.t;
        if(matchExpr[singleMatchSuffixType]) {
          matched &= matchExpr[singleMatchSuffixType](el, singleMatchSuffix.value)
        }
      }
    }
    return matched
  }
  function matchImmediate(el, match) {
    var matched = 1, startEl = el, relativeOp, startMatch = match;
    do {
      matched &= singleMatch(el, match);
      if(matched) {
        match = match && match.prev;
        if(!match) {
          return true
        }
        relativeOp = relativeExpr[match.nextCombinator];
        el = dir(el, relativeOp.dir);
        if(!relativeOp.immediate) {
          return{el:el, match:match}
        }
      }else {
        relativeOp = relativeExpr[match.nextCombinator];
        if(relativeOp.immediate) {
          return{el:dir(startEl, relativeExpr[startMatch.nextCombinator].dir), match:startMatch}
        }else {
          return{el:el && dir(el, relativeOp.dir), match:match}
        }
      }
    }while(el);
    return{el:dir(startEl, relativeExpr[startMatch.nextCombinator].dir), match:startMatch}
  }
  function findFixedMatchFromHead(el, head) {
    var relativeOp, cur = head;
    do {
      if(!singleMatch(el, cur)) {
        return null
      }
      cur = cur.prev;
      if(!cur) {
        return true
      }
      relativeOp = relativeExpr[cur.nextCombinator];
      el = dir(el, relativeOp.dir)
    }while(el && relativeOp.immediate);
    if(!el) {
      return null
    }
    return{el:el, match:cur}
  }
  function genId(el) {
    var selectorId;
    if(isContextXML) {
      if(!(selectorId = el.getAttribute(EXPANDO_SELECTOR_KEY))) {
        el.setAttribute(EXPANDO_SELECTOR_KEY, selectorId = +new Date + "_" + ++uuid)
      }
    }else {
      if(!(selectorId = el[EXPANDO_SELECTOR_KEY])) {
        selectorId = el[EXPANDO_SELECTOR_KEY] = +new Date + "_" + ++uuid
      }
    }
    return selectorId
  }
  function matchSub(el, match) {
    var selectorId = genId(el), matchKey;
    matchKey = selectorId + "_" + (match.order || 0);
    if(matchKey in subMatchesCache) {
      return subMatchesCache[matchKey]
    }
    return subMatchesCache[matchKey] = matchSubInternal(el, match)
  }
  function matchSubInternal(el, match) {
    var matchImmediateRet = matchImmediate(el, match);
    if(matchImmediateRet === true) {
      return true
    }else {
      el = matchImmediateRet.el;
      match = matchImmediateRet.match;
      while(el) {
        if(matchSub(el, match)) {
          return true
        }
        el = dir(el, relativeExpr[match.nextCombinator].dir)
      }
      return false
    }
  }
  function select(str, context, seeds) {
    if(!caches[str]) {
      caches[str] = parser.parse(str)
    }
    var selector = caches[str], groupIndex = 0, groupLen = selector.length, contextDocument, group, ret = [];
    if(seeds) {
      context = context || seeds[0].ownerDocument
    }
    contextDocument = context && context.ownerDocument || document;
    context = context || contextDocument;
    isContextXML = isXML(context);
    for(;groupIndex < groupLen;groupIndex++) {
      resetStatus();
      group = selector[groupIndex];
      var suffix = group.suffix, suffixIndex, suffixLen, seedsIndex, mySeeds = seeds, seedsLen, id = null;
      if(!mySeeds) {
        if(suffix && !isContextXML) {
          suffixIndex = 0;
          suffixLen = suffix.length;
          for(;suffixIndex < suffixLen;suffixIndex++) {
            var singleSuffix = suffix[suffixIndex];
            if(singleSuffix.t == "id") {
              id = singleSuffix.value;
              break
            }
          }
        }
        if(id) {
          var doesNotHasById = !context.getElementById, contextInDom = Dom._contains(contextDocument, context), tmp = doesNotHasById ? contextInDom ? contextDocument.getElementById(id) : null : context.getElementById(id);
          if(!tmp && doesNotHasById || tmp && getAttr(tmp, "id") != id) {
            var tmps = Dom._getElementsByTagName("*", context), tmpLen = tmps.length, tmpI = 0;
            for(;tmpI < tmpLen;tmpI++) {
              tmp = tmps[tmpI];
              if(getAttr(tmp, "id") == id) {
                mySeeds = [tmp];
                break
              }
            }
            if(tmpI === tmpLen) {
              mySeeds = []
            }
          }else {
            if(contextInDom && tmp && context !== contextDocument) {
              tmp = Dom._contains(context, tmp) ? tmp : null
            }
            mySeeds = tmp ? [tmp] : []
          }
        }else {
          mySeeds = Dom._getElementsByTagName(group.value || "*", context)
        }
      }
      seedsIndex = 0;
      seedsLen = mySeeds.length;
      if(!seedsLen) {
        continue
      }
      for(;seedsIndex < seedsLen;seedsIndex++) {
        var seed = mySeeds[seedsIndex];
        var matchHead = findFixedMatchFromHead(seed, group);
        if(matchHead === true) {
          ret.push(seed)
        }else {
          if(matchHead) {
            if(matchSub(matchHead.el, matchHead.match)) {
              ret.push(seed)
            }
          }
        }
      }
    }
    if(groupLen > 1) {
      ret = Dom.unique(ret)
    }
    return ret
  }
  Dom._selectInternal = select;
  return{parse:function(str) {
    return parser.parse(str)
  }, select:select, matches:matches}
});

