import{g as T}from"./index-DuuuSFPv.js";function O(y,L){for(var o=0;o<L.length;o++){const s=L[o];if(typeof s!="string"&&!Array.isArray(s)){for(const v in s)if(v!=="default"&&!(v in y)){const p=Object.getOwnPropertyDescriptor(s,v);p&&Object.defineProperty(y,v,p.get?p:{enumerable:!0,get:()=>s[v]})}}}return Object.freeze(Object.defineProperty(y,Symbol.toStringTag,{value:"Module"}))}var _={exports:{}},R;function $(){return R||(R=1,function(y,L){ace.define("ace/mode/logiql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,s,v){var p=o("../lib/oop"),x=o("./text_highlight_rules").TextHighlightRules,c=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}]},{token:"comment.single",regex:"//.*"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?"},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"constant.language",regex:"\\b(true|false)\\b"},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b"},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"-->",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}]},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)"},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)"},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"}]},this.normalizeRules()};p.inherits(c,x),s.LogiQLHighlightRules=c}),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(o,s,v){var p=o("../../lib/oop"),x=o("./fold_mode").FoldMode,c=o("../../range").Range,h=s.FoldMode=function(){};p.inherits(h,x),(function(){this.commentBlock=function(e,d){var a=/\S/,t=e.getLine(d),r=t.search(a);if(!(r==-1||t[r]!="#")){for(var g=t.length,n=e.getLength(),i=d,l=d;++d<n;){t=e.getLine(d);var u=t.search(a);if(u!=-1){if(t[u]!="#")break;l=d}}if(l>i){var f=e.getLine(l).length;return new c(i,g,l,f)}}},this.getFoldWidgetRange=function(e,d,a){var t=this.indentationBlock(e,a);if(t||(t=this.commentBlock(e,a),t))return t},this.getFoldWidget=function(e,d,a){var t=e.getLine(a),r=t.search(/\S/),g=e.getLine(a+1),n=e.getLine(a-1),i=n.search(/\S/),l=g.search(/\S/);if(r==-1)return e.foldWidgets[a-1]=i!=-1&&i<l?"start":"","";if(i==-1){if(r==l&&t[r]=="#"&&g[r]=="#")return e.foldWidgets[a-1]="",e.foldWidgets[a+1]="","start"}else if(i==r&&t[r]=="#"&&n[r]=="#"&&e.getLine(a-2).search(/\S/)==-1)return e.foldWidgets[a-1]="start",e.foldWidgets[a+1]="","";return i!=-1&&i<r?e.foldWidgets[a-1]="start":e.foldWidgets[a-1]="",r<l?"start":""}}).call(h.prototype)}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(o,s,v){var p=o("../range").Range,x=function(){};(function(){this.checkOutdent=function(c,h){return/^\s+$/.test(c)?/^\s*\}/.test(h):!1},this.autoOutdent=function(c,h){var e=c.getLine(h),d=e.match(/^(\s*\})/);if(!d)return 0;var a=d[1].length,t=c.findMatchingBracket({row:h,column:a});if(!t||t.row==h)return 0;var r=this.$getIndent(c.getLine(t.row));c.replace(new p(h,0,h,a-1),r)},this.$getIndent=function(c){return c.match(/^\s*/)[0]}}).call(x.prototype),s.MatchingBraceOutdent=x}),ace.define("ace/mode/logiql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logiql_highlight_rules","ace/mode/folding/coffee","ace/token_iterator","ace/range","ace/mode/matching_brace_outdent"],function(o,s,v){var p=o("../lib/oop"),x=o("./text").Mode,c=o("./logiql_highlight_rules").LogiQLHighlightRules,h=o("./folding/coffee").FoldMode,e=o("../token_iterator").TokenIterator,d=o("../range").Range,a=o("./matching_brace_outdent").MatchingBraceOutdent,t=function(){this.HighlightRules=c,this.foldingRules=new h,this.$outdent=new a,this.$behaviour=this.$defaultBehaviour};p.inherits(t,x),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(r,g,n){var i=this.$getIndent(g),l=this.getTokenizer().getLineTokens(g,r),u=l.tokens,f=l.state;return/comment|string/.test(f)||u.length&&u[u.length-1].type=="comment.single"||(g.match(),/(-->|<--|<-|->|{)\s*$/.test(g)&&(i+=n)),i},this.checkOutdent=function(r,g,n){return this.$outdent.checkOutdent(g,n)?!0:!(n!==`
`&&n!==`\r
`||!/^\s+/.test(g))},this.autoOutdent=function(r,g,n){if(!this.$outdent.autoOutdent(g,n)){var i=g.getLine(n),l=i.match(/^\s+/),u=i.lastIndexOf(".")+1;if(!l||!n||!u)return 0;g.getLine(n+1);var f=this.getMatching(g,{row:n,column:u});if(!f||f.start.row==n)return 0;u=l[0].length;var k=this.$getIndent(g.getLine(f.start.row));g.replace(new d(n+1,0,n+1,u),k)}},this.getMatching=function(r,m,n){m==null&&(m=r.selection.lead),typeof m=="object"&&(n=m.column,m=m.row);var i=r.getTokenAt(m,n),l="keyword.start",u="keyword.end",f;if(i){if(i.type==l){var k=new e(r,m,n);k.step=k.stepForward}else if(i.type==u){var k=new e(r,m,n);k.step=k.stepBackward}else return;for(;(f=k.step())&&!(f.type==l||f.type==u););if(!(!f||f.type==i.type)){var b=k.getCurrentTokenColumn(),m=k.getCurrentTokenRow();return new d(m,b,m,b+f.value.length)}}},this.$id="ace/mode/logiql"}).call(t.prototype),s.Mode=t}),function(){ace.require(["ace/mode/logiql"],function(o){y&&(y.exports=o)})}()}(_)),_.exports}var M=$();const w=T(M),B=O({__proto__:null,default:w},[M]);export{B as m};
