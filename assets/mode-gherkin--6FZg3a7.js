import{g as v}from"./index-DuuuSFPv.js";function b(a,l){for(var e=0;e<l.length;e++){const n=l[e];if(typeof n!="string"&&!Array.isArray(n)){for(const o in n)if(o!=="default"&&!(o in a)){const i=Object.getOwnPropertyDescriptor(n,o);i&&Object.defineProperty(a,o,i.get?i:{enumerable:!0,get:()=>n[o]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var x={exports:{}},d;function y(){return d||(d=1,function(a,l){ace.define("ace/mode/gherkin_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,n,o){var i=e("../lib/oop"),u=e("./text_highlight_rules").TextHighlightRules,h=`\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})`,s=function(){var g=[{name:"en",labels:"Feature|Background|Scenario(?: Outline)?|Examples",keywords:"Given|When|Then|And|But"}],r=g.map(function(t){return t.labels}).join("|"),k=g.map(function(t){return t.keywords}).join("|");this.$rules={start:[{token:"constant.numeric",regex:"(?:(?:[1-9]\\d*)|(?:0))"},{token:"comment",regex:"#.*$"},{token:"keyword",regex:"(?:"+r+"):|(?:"+k+")\\b"},{token:"keyword",regex:"\\*"},{token:"string",regex:'"{3}',next:"qqstring3"},{token:"string",regex:'"',next:"qqstring"},{token:"text",regex:"^\\s*(?=@[\\w])",next:[{token:"text",regex:"\\s+"},{token:"variable.parameter",regex:"@[\\w]+"},{token:"empty",regex:"",next:"start"}]},{token:"comment",regex:"<[^>]+>"},{token:"comment",regex:"\\|(?=.)",next:"table-item"},{token:"comment",regex:"\\|$",next:"start"}],qqstring3:[{token:"constant.language.escape",regex:h},{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],qqstring:[{token:"constant.language.escape",regex:h},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],"table-item":[{token:"comment",regex:/$/,next:"start"},{token:"comment",regex:/\|/},{token:"string",regex:/\\./},{defaultToken:"string"}]},this.normalizeRules()};i.inherits(s,u),n.GherkinHighlightRules=s}),ace.define("ace/mode/gherkin",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/gherkin_highlight_rules"],function(e,n,o){var i=e("../lib/oop"),u=e("./text").Mode,h=e("./gherkin_highlight_rules").GherkinHighlightRules,s=function(){this.HighlightRules=h,this.$behaviour=this.$defaultBehaviour};i.inherits(s,u),(function(){this.lineCommentStart="#",this.$id="ace/mode/gherkin",this.getNextLineIndent=function(g,r,k){var t=this.$getIndent(r),m="  ",p=this.getTokenizer().getLineTokens(r,g),c=p.tokens;return r.match("[ ]*\\|")&&(t+="| "),c.length&&c[c.length-1].type=="comment"||g=="start"&&(r.match("Scenario:|Feature:|Scenario Outline:|Background:")||r.match("(Given|Then).+(:)$|Examples:")?t+=m:r.match("\\*.+")&&(t+="* ")),t}}).call(s.prototype),n.Mode=s}),function(){ace.require(["ace/mode/gherkin"],function(e){a&&(a.exports=e)})}()}(x)),x.exports}var f=y();const _=v(f),q=b({__proto__:null,default:_},[f]);export{q as m};
