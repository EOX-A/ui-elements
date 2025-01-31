import{g as _}from"./index-DuuuSFPv.js";function R(p,x){for(var r=0;r<x.length;r++){const u=x[r];if(typeof u!="string"&&!Array.isArray(u)){for(const h in u)if(h!=="default"&&!(h in p)){const s=Object.getOwnPropertyDescriptor(u,h);s&&Object.defineProperty(p,h,s.get?s:{enumerable:!0,get:()=>u[h]})}}}return Object.freeze(Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}))}var b={exports:{}},v;function M(){return v||(v=1,function(p,x){ace.define("ace/mode/ion_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(r,u,h){var s=r("../lib/oop"),f=r("./text_highlight_rules").TextHighlightRules,l=function(){var c="TRUE|FALSE",e=c,t="NULL.NULL|NULL.BOOL|NULL.INT|NULL.FLOAT|NULL.DECIMAL|NULL.TIMESTAMP|NULL.STRING|NULL.SYMBOL|NULL.BLOB|NULL.CLOB|NULL.STRUCT|NULL.LIST|NULL.SEXP|NULL",n=t,i=this.createKeywordMapper({"constant.language.bool.ion":e,"constant.language.null.ion":n},"constant.other.symbol.identifier.ion",!0),o={token:i,regex:"\\b\\w+(?:\\.\\w+)?\\b"};this.$rules={start:[{include:"value"}],value:[{include:"whitespace"},{include:"comment"},{include:"annotation"},{include:"string"},{include:"number"},{include:"keywords"},{include:"symbol"},{include:"clob"},{include:"blob"},{include:"struct"},{include:"list"},{include:"sexp"}],sexp:[{token:"punctuation.definition.sexp.begin.ion",regex:"\\(",push:[{token:"punctuation.definition.sexp.end.ion",regex:"\\)",next:"pop"},{include:"comment"},{include:"value"},{token:"storage.type.symbol.operator.ion",regex:"[\\!\\#\\%\\&\\*\\+\\-\\./\\;\\<\\=\\>\\?\\@\\^\\`\\|\\~]+"}]}],comment:[{token:"comment.line.ion",regex:"//[^\\n]*"},{token:"comment.block.ion",regex:"/\\*",push:[{token:"comment.block.ion",regex:"[*]/",next:"pop"},{token:"comment.block.ion",regex:"[^*/]+"},{token:"comment.block.ion",regex:"[*/]+"}]}],list:[{token:"punctuation.definition.list.begin.ion",regex:"\\[",push:[{token:"punctuation.definition.list.end.ion",regex:"\\]",next:"pop"},{include:"comment"},{include:"value"},{token:"punctuation.definition.list.separator.ion",regex:","}]}],struct:[{token:"punctuation.definition.struct.begin.ion",regex:"\\{",push:[{token:"punctuation.definition.struct.end.ion",regex:"\\}",next:"pop"},{include:"comment"},{include:"value"},{token:"punctuation.definition.struct.separator.ion",regex:",|:"}]}],blob:[{token:["punctuation.definition.blob.begin.ion","string.other.blob.ion","punctuation.definition.blob.end.ion"],regex:'(\\{\\{)([^"]*)(\\}\\})'}],clob:[{token:["punctuation.definition.clob.begin.ion","string.other.clob.ion","punctuation.definition.clob.end.ion"],regex:'(\\{\\{)("[^"]*")(\\}\\})'}],symbol:[{token:"storage.type.symbol.quoted.ion",regex:"(['])((?:(?:\\\\')|(?:[^']))*?)(['])"},{token:"storage.type.symbol.identifier.ion",regex:"[\\$_a-zA-Z][\\$_a-zA-Z0-9]*"}],number:[{token:"constant.numeric.timestamp.ion",regex:"\\d{4}(?:-\\d{2})?(?:-\\d{2})?T(?:\\d{2}:\\d{2})(?::\\d{2})?(?:\\.\\d+)?(?:Z|[-+]\\d{2}:\\d{2})?"},{token:"constant.numeric.timestamp.ion",regex:"\\d{4}-\\d{2}-\\d{2}T?"},{token:"constant.numeric.integer.binary.ion",regex:"-?0[bB][01](?:_?[01])*"},{token:"constant.numeric.integer.hex.ion",regex:"-?0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*"},{token:"constant.numeric.float.ion",regex:"-?(?:0|[1-9](?:_?\\d)*)(?:\\.(?:\\d(?:_?\\d)*)?)?(?:[eE][+-]?\\d+)"},{token:"constant.numeric.float.ion",regex:"(?:[-+]inf)|(?:nan)"},{token:"constant.numeric.decimal.ion",regex:"-?(?:0|[1-9](?:_?\\d)*)(?:(?:(?:\\.(?:\\d(?:_?\\d)*)?)(?:[dD][+-]?\\d+)|\\.(?:\\d(?:_?\\d)*)?)|(?:[dD][+-]?\\d+))"},{token:"constant.numeric.integer.ion",regex:"-?(?:0|[1-9](?:_?\\d)*)"}],string:[{token:["punctuation.definition.string.begin.ion","string.quoted.double.ion","punctuation.definition.string.end.ion"],regex:'(["])((?:(?:\\\\")|(?:[^"]))*?)(["])'},{token:"punctuation.definition.string.begin.ion",regex:"'{3}",push:[{token:"punctuation.definition.string.end.ion",regex:"'{3}",next:"pop"},{token:"string.quoted.triple.ion",regex:"(?:\\\\'|[^'])+"},{token:"string.quoted.triple.ion",regex:"'"}]}],annotation:[{token:["variable.language.annotation.ion","punctuation.definition.annotation.ion"],regex:/('(?:[^'\\]|\\.)*')\s*(::)/},{token:["variable.language.annotation.ion","punctuation.definition.annotation.ion"],regex:"([\\$_a-zA-Z][\\$_a-zA-Z0-9]*)\\s*(::)"}],whitespace:[{token:"text.ion",regex:"\\s+"}]},this.$rules.keywords=[o],this.normalizeRules()};s.inherits(l,f),u.IonHighlightRules=l}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(r,u,h){var s=r("../range").Range,f=function(){};(function(){this.checkOutdent=function(l,c){return/^\s+$/.test(l)?/^\s*\}/.test(c):!1},this.autoOutdent=function(l,c){var e=l.getLine(c),t=e.match(/^(\s*\})/);if(!t)return 0;var n=t[1].length,i=l.findMatchingBracket({row:c,column:n});if(!i||i.row==c)return 0;var o=this.$getIndent(l.getLine(i.row));l.replace(new s(c,0,c,n-1),o)},this.$getIndent=function(l){return l.match(/^\s*/)[0]}}).call(f.prototype),u.MatchingBraceOutdent=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(r,u,h){var s=r("../../lib/oop"),f=r("../../range").Range,l=r("./fold_mode").FoldMode,c=u.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};s.inherits(c,l),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var i=e.getLine(n);if(this.singleLineBlockCommentRe.test(i)&&!this.startRegionRe.test(i)&&!this.tripleStarBlockCommentRe.test(i))return"";var o=this._getFoldWidgetBase(e,t,n);return!o&&this.startRegionRe.test(i)?"start":o},this.getFoldWidgetRange=function(e,t,n,i){var o=e.getLine(n);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,n);var a=o.match(this.foldingStartMarker);if(a){var d=a.index;if(a[1])return this.openingBracketBlock(e,a[1],n,d);var g=e.getCommentFoldRange(n,d+a[0].length,1);return g&&!g.isMultiLine()&&(i?g=this.getSectionRange(e,n):t!="all"&&(g=null)),g}if(t!=="markbegin"){var a=o.match(this.foldingStopMarker);if(a){var d=a.index+a[0].length;return a[1]?this.closingBracketBlock(e,a[1],n,d):e.getCommentFoldRange(n,d,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),i=n.search(/\S/),o=t,d=n.length;t=t+1;for(var g=t,a=e.getLength();++t<a;){n=e.getLine(t);var k=n.search(/\S/);if(k!==-1){if(i>k)break;var m=this.getFoldWidgetRange(e,"all",t);if(m){if(m.start.row<=o)break;if(m.isMultiLine())t=m.end.row;else if(i==k)break}g=t}}return new f(o,d,g,e.getLine(g).length)},this.getCommentRegionBlock=function(e,t,n){for(var i=t.search(/\s*$/),o=e.getLength(),d=n,g=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;++n<o;){t=e.getLine(n);var k=g.exec(t);if(k&&(k[1]?a--:a++,!a))break}var m=n;if(m>d)return new f(d,i,m,t.length)}}).call(c.prototype)}),ace.define("ace/mode/ion",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ion_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(r,u,h){var s=r("../lib/oop"),f=r("./text").Mode,l=r("./ion_highlight_rules").IonHighlightRules,c=r("./matching_brace_outdent").MatchingBraceOutdent,e=r("./folding/cstyle").FoldMode,t=function(){this.HighlightRules=l,this.$outdent=new c,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};s.inherits(t,f),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(n,i,o){var d=this.$getIndent(i);if(n=="start"){var g=i.match(/^.*[\{\(\[]\s*$/);g&&(d+=o)}return d},this.checkOutdent=function(n,i,o){return this.$outdent.checkOutdent(i,o)},this.autoOutdent=function(n,i,o){this.$outdent.autoOutdent(i,o)},this.$id="ace/mode/ion"}).call(t.prototype),u.Mode=t}),function(){ace.require(["ace/mode/ion"],function(r){p&&(p.exports=r)})}()}(b)),b.exports}var L=M();const y=_(L),$=R({__proto__:null,default:y},[L]);export{$ as m};
