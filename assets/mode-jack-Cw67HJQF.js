import{g as _}from"./index-DuuuSFPv.js";function M(k,x){for(var i=0;i<x.length;i++){const l=x[i];if(typeof l!="string"&&!Array.isArray(l)){for(const d in l)if(d!=="default"&&!(d in k)){const h=Object.getOwnPropertyDescriptor(l,d);h&&Object.defineProperty(k,d,h.get?h:{enumerable:!0,get:()=>l[d]})}}}return Object.freeze(Object.defineProperty(k,Symbol.toStringTag,{value:"Module"}))}var v={exports:{}},b;function F(){return b||(b=1,function(k,x){ace.define("ace/mode/jack_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(i,l,d){var h=i("../lib/oop"),f=i("./text_highlight_rules").TextHighlightRules,g=function(){this.$rules={start:[{token:"string",regex:'"',next:"string2"},{token:"string",regex:"'",next:"string1"},{token:"constant.numeric",regex:"-?0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"(?:0|[-+]?[1-9][0-9]*)\\b"},{token:"constant.binary",regex:"<[0-9A-Fa-f][0-9A-Fa-f](\\s+[0-9A-Fa-f][0-9A-Fa-f])*>"},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"constant.language.null",regex:"null\\b"},{token:"storage.type",regex:"(?:Integer|Boolean|Null|String|Buffer|Tuple|List|Object|Function|Coroutine|Form)\\b"},{token:"keyword",regex:"(?:return|abort|vars|for|delete|in|is|escape|exec|split|and|if|elif|else|while)\\b"},{token:"language.builtin",regex:"(?:lines|source|parse|read-stream|interval|substr|parseint|write|print|range|rand|inspect|bind|i-values|i-pairs|i-map|i-filter|i-chunk|i-all\\?|i-any\\?|i-collect|i-zip|i-merge|i-each)\\b"},{token:"comment",regex:"--.*$"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"storage.form",regex:"@[a-z]+"},{token:"constant.other.symbol",regex:":+[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"},{token:"variable",regex:"[a-zA-Z_]([-]?[a-zA-Z0-9_])*[?!]?"},{token:"keyword.operator",regex:"\\|\\||\\^\\^|&&|!=|==|<=|<|>=|>|\\+|-|\\*|\\/|\\^|\\%|\\#|\\!"},{token:"text",regex:"\\s+"}],string1:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\\/bfnrt])/},{token:"string",regex:"[^'\\\\]+"},{token:"string",regex:"'",next:"start"},{token:"string",regex:"",next:"start"}],string2:[{token:"constant.language.escape",regex:/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|['"\\\/bfnrt])/},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:'"',next:"start"},{token:"string",regex:"",next:"start"}]}};h.inherits(g,f),l.JackHighlightRules=g}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(i,l,d){var h=i("../range").Range,f=function(){};(function(){this.checkOutdent=function(g,u){return/^\s+$/.test(g)?/^\s*\}/.test(u):!1},this.autoOutdent=function(g,u){var e=g.getLine(u),t=e.match(/^(\s*\})/);if(!t)return 0;var n=t[1].length,r=g.findMatchingBracket({row:u,column:n});if(!r||r.row==u)return 0;var a=this.$getIndent(g.getLine(r.row));g.replace(new h(u,0,u,n-1),a)},this.$getIndent=function(g){return g.match(/^\s*/)[0]}}).call(f.prototype),l.MatchingBraceOutdent=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(i,l,d){var h=i("../../lib/oop"),f=i("../../range").Range,g=i("./fold_mode").FoldMode,u=l.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};h.inherits(u,g),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var a=this._getFoldWidgetBase(e,t,n);return!a&&this.startRegionRe.test(r)?"start":a},this.getFoldWidgetRange=function(e,t,n,r){var a=e.getLine(n);if(this.startRegionRe.test(a))return this.getCommentRegionBlock(e,a,n);var o=a.match(this.foldingStartMarker);if(o){var c=o.index;if(o[1])return this.openingBracketBlock(e,o[1],n,c);var s=e.getCommentFoldRange(n,c+o[0].length,1);return s&&!s.isMultiLine()&&(r?s=this.getSectionRange(e,n):t!="all"&&(s=null)),s}if(t!=="markbegin"){var o=a.match(this.foldingStopMarker);if(o){var c=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,c):e.getCommentFoldRange(n,c,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),a=t,c=n.length;t=t+1;for(var s=t,o=e.getLength();++t<o;){n=e.getLine(t);var p=n.search(/\S/);if(p!==-1){if(r>p)break;var m=this.getFoldWidgetRange(e,"all",t);if(m){if(m.start.row<=a)break;if(m.isMultiLine())t=m.end.row;else if(r==p)break}s=t}}return new f(a,c,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var r=t.search(/\s*$/),a=e.getLength(),c=n,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++n<a;){t=e.getLine(n);var p=s.exec(t);if(p&&(p[1]?o--:o++,!o))break}var m=n;if(m>c)return new f(c,r,m,t.length)}}).call(u.prototype)}),ace.define("ace/mode/jack",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/jack_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(i,l,d){var h=i("../lib/oop"),f=i("./text").Mode,g=i("./jack_highlight_rules").JackHighlightRules,u=i("./matching_brace_outdent").MatchingBraceOutdent,e=i("./folding/cstyle").FoldMode,t=function(){this.HighlightRules=g,this.$outdent=new u,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};h.inherits(t,f),(function(){this.lineCommentStart="--",this.getNextLineIndent=function(n,r,a){var c=this.$getIndent(r);if(n=="start"){var s=r.match(/^.*[\{\(\[]\s*$/);s&&(c+=a)}return c},this.checkOutdent=function(n,r,a){return this.$outdent.checkOutdent(r,a)},this.autoOutdent=function(n,r,a){this.$outdent.autoOutdent(r,a)},this.$id="ace/mode/jack"}).call(t.prototype),l.Mode=t}),function(){ace.require(["ace/mode/jack"],function(i){k&&(k.exports=i)})}()}(v)),v.exports}var R=F();const B=_(R),y=M({__proto__:null,default:B},[R]);export{y as m};
