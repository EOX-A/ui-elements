import{g as m}from"./index-DuuuSFPv.js";function v(i,s){for(var e=0;e<s.length;e++){const t=s[e];if(typeof t!="string"&&!Array.isArray(t)){for(const r in t)if(r!=="default"&&!(r in i)){const o=Object.getOwnPropertyDescriptor(t,r);o&&Object.defineProperty(i,r,o.get?o:{enumerable:!0,get:()=>t[r]})}}}return Object.freeze(Object.defineProperty(i,Symbol.toStringTag,{value:"Module"}))}var d={exports:{}},g;function b(){return g||(g=1,function(i,s){ace.define("ace/mode/vhdl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t,r){var o=e("../lib/oop"),l=e("./text_highlight_rules").TextHighlightRules,a=function(){var n="access|after|alias|all|architecture|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|context|disconnect|downto|else|elsif|end|entity|exit|file|for|force|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|of|on|or|open|others|out|package|parameter|port|postponed|procedure|process|protected|pure|range|record|register|reject|release|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with",c="bit|bit_vector|boolean|character|integer|line|natural|positive|real|register|signed|std_logic|std_logic_vector|string||text|time|unsigned",h="array|constant",p="abs|and|mod|nand|nor|not|rem|rol|ror|sla|sll|srasrl|xnor|xor",f="true|false|null",x=this.createKeywordMapper({"keyword.operator":p,keyword:n,"constant.language":f,"storage.modifier":h,"storage.type":c},"identifier",!0);this.$rules={start:[{token:"comment",regex:"--.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:"keyword",regex:"\\s*(?:library|package|use)\\b"},{token:x,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"&|\\*|\\+|\\-|\\/|<|=|>|\\||=>|\\*\\*|:=|\\/=|>=|<=|<>"},{token:"punctuation.operator",regex:"\\'|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[(]"},{token:"paren.rparen",regex:"[\\])]"},{token:"text",regex:"\\s+"}]}};o.inherits(a,l),t.VHDLHighlightRules=a}),ace.define("ace/mode/vhdl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/vhdl_highlight_rules"],function(e,t,r){var o=e("../lib/oop"),l=e("./text").Mode,a=e("./vhdl_highlight_rules").VHDLHighlightRules,n=function(){this.HighlightRules=a,this.$behaviour=this.$defaultBehaviour};o.inherits(n,l),(function(){this.lineCommentStart="--",this.$id="ace/mode/vhdl"}).call(n.prototype),t.Mode=n}),function(){ace.require(["ace/mode/vhdl"],function(e){i&&(i.exports=e)})}()}(d)),d.exports}var u=b();const y=m(u),_=v({__proto__:null,default:y},[u]);export{_ as m};
