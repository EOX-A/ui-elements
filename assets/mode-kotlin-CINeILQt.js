import{g as w}from"./index-DuuuSFPv.js";function R(u,m){for(var o=0;o<m.length;o++){const a=m[o];if(typeof a!="string"&&!Array.isArray(a)){for(const d in a)if(d!=="default"&&!(d in u)){const c=Object.getOwnPropertyDescriptor(a,d);c&&Object.defineProperty(u,d,c.get?c:{enumerable:!0,get:()=>a[d]})}}}return Object.freeze(Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}))}var y={exports:{}},v;function M(){return v||(v=1,function(u,m){ace.define("ace/mode/kotlin_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,a,d){var c=o("../lib/oop"),h=o("./text_highlight_rules").TextHighlightRules,p=function(){var x=this.$keywords=this.createKeywordMapper({"storage.modifier.kotlin":"var|val|public|private|protected|abstract|final|enum|open|attribute|annotation|override|inline|var|val|vararg|lazy|in|out|internal|data|tailrec|operator|infix|const|yield|typealias|typeof|sealed|inner|value|lateinit|external|suspend|noinline|crossinline|reified|expect|actual",keyword:"companion|class|object|interface|namespace|type|fun|constructor|if|else|while|for|do|return|when|where|break|continue|try|catch|finally|throw|in|is|as|assert|constructor","constant.language.kotlin":"true|false|null|this|super","entity.name.function.kotlin":"get|set"},"identifier");this.$rules={start:[{include:"#comments"},{token:["text","keyword.other.kotlin","text","entity.name.package.kotlin","text"],regex:/^(\s*)(package)\b(?:(\s*)([^ ;$]+)(\s*))?/},{token:"comment",regex:/^\s*#!.*$/},{include:"#imports"},{include:"#expressions"},{token:"string",regex:/@[a-zA-Z][a-zA-Z:]*\b/},{token:["keyword.other.kotlin","text","entity.name.variable.kotlin"],regex:/\b(var|val)(\s+)([a-zA-Z_][\w]*)\b/},{token:["keyword.other.kotlin","text","entity.name.variable.kotlin","paren.lparen"],regex:/(fun)(\s+)(\w+)(\()/,push:[{token:["variable.parameter.function.kotlin","text","keyword.operator"],regex:/(\w+)(\s*)(:)/},{token:"paren.rparen",regex:/\)/,next:"pop"},{include:"#comments"},{include:"#types"},{include:"#expressions"}]},{token:["text","keyword","text","identifier"],regex:/^(\s*)(class)(\s*)([a-zA-Z]+)/,next:"#classes"},{token:["identifier","punctuaction"],regex:/([a-zA-Z_][\w]*)(<)/,push:[{include:"#generics"},{include:"#defaultTypes"},{token:"punctuation",regex:/>/,next:"pop"}]},{token:x,regex:/[a-zA-Z_][\w]*\b/},{token:"paren.lparen",regex:/[{(\[]/},{token:"paren.rparen",regex:/[})\]]/}],"#comments":[{token:"comment",regex:/\/\*/,push:[{token:"comment",regex:/\*\//,next:"pop"},{defaultToken:"comment"}]},{token:["text","comment"],regex:/(\s*)(\/\/.*$)/}],"#constants":[{token:"constant.numeric.kotlin",regex:/\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDd]|UL|ul)?\b/},{token:"constant.other.kotlin",regex:/\b[A-Z][A-Z0-9_]+\b/}],"#expressions":[{include:"#strings"},{include:"#constants"},{include:"#keywords"}],"#imports":[{token:["text","keyword.other.kotlin","text","keyword.other.kotlin"],regex:/^(\s*)(import)(\s+[^ $]+\s+)((?:as)?)/}],"#generics":[{token:"punctuation",regex:/</,push:[{token:"punctuation",regex:/>/,next:"pop"},{token:"storage.type.generic.kotlin",regex:/\w+/},{token:"keyword.operator",regex:/:/},{token:"punctuation",regex:/,/},{include:"#generics"}]}],"#classes":[{include:"#generics"},{token:"keyword",regex:/public|private|constructor/},{token:"string",regex:/@[a-zA-Z][a-zA-Z:]*\b/},{token:"text",regex:/(?=$|\(|{)/,next:"start"}],"#keywords":[{token:"keyword.operator.kotlin",regex:/==|!=|===|!==|<=|>=|<|>|=>|->|::|\?:/},{token:"keyword.operator.assignment.kotlin",regex:/=/},{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?=$|{|=|,)/,next:"pop"},{include:"#types"}]},{token:"keyword.operator.dot.kotlin",regex:/\./},{token:"keyword.operator.increment-decrement.kotlin",regex:/\-\-|\+\+/},{token:"keyword.operator.arithmetic.kotlin",regex:/\-|\+|\*|\/|%/},{token:"keyword.operator.arithmetic.assign.kotlin",regex:/\+=|\-=|\*=|\/=/},{token:"keyword.operator.logical.kotlin",regex:/!|&&|\|\|/},{token:"keyword.operator.range.kotlin",regex:/\.\./},{token:"punctuation.kotlin",regex:/[;,]/}],"#types":[{include:"#defaultTypes"},{token:"paren.lparen",regex:/\(/,push:[{token:"paren.rparen",regex:/\)/,next:"pop"},{include:"#defaultTypes"},{token:"punctuation",regex:/,/}]},{include:"#generics"},{token:"keyword.operator.declaration.kotlin",regex:/->/},{token:"paren.rparen",regex:/\)/},{token:"keyword.operator.declaration.kotlin",regex:/:/,push:[{token:"text",regex:/(?=$|{|=|,)/,next:"pop"},{include:"#types"}]}],"#defaultTypes":[{token:"storage.type.buildin.kotlin",regex:/\b(Any|Unit|String|Int|Boolean|Char|Long|Double|Float|Short|Byte|dynamic|IntArray|BooleanArray|CharArray|LongArray|DoubleArray|FloatArray|ShortArray|ByteArray|Array|List|Map|Nothing|Enum|Throwable|Comparable)\b/}],"#strings":[{token:"string",regex:/"""/,push:[{token:"string",regex:/"""/,next:"pop"},{token:"variable.parameter.template.kotlin",regex:/\$\w+|\${[^}]+}/},{token:"constant.character.escape.kotlin",regex:/\\./},{defaultToken:"string"}]},{token:"string",regex:/"/,push:[{token:"string",regex:/"/,next:"pop"},{token:"variable.parameter.template.kotlin",regex:/\$\w+|\$\{[^\}]+\}/},{token:"constant.character.escape.kotlin",regex:/\\./},{defaultToken:"string"}]},{token:"string",regex:/'/,push:[{token:"string",regex:/'/,next:"pop"},{token:"constant.character.escape.kotlin",regex:/\\./},{defaultToken:"string"}]},{token:"string",regex:/`/,push:[{token:"string",regex:/`/,next:"pop"},{defaultToken:"string"}]}]},this.normalizeRules()};p.metaData={fileTypes:["kt","kts"],name:"Kotlin",scopeName:"source.Kotlin"},c.inherits(p,h),a.KotlinHighlightRules=p}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(o,a,d){var c=o("../../lib/oop"),h=o("../../range").Range,p=o("./fold_mode").FoldMode,x=a.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};c.inherits(x,p),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var l=e.getLine(n);if(this.singleLineBlockCommentRe.test(l)&&!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(l)?"start":i},this.getFoldWidgetRange=function(e,t,n,l){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var r=i.match(this.foldingStartMarker);if(r){var g=r.index;if(r[1])return this.openingBracketBlock(e,r[1],n,g);var s=e.getCommentFoldRange(n,g+r[0].length,1);return s&&!s.isMultiLine()&&(l?s=this.getSectionRange(e,n):t!="all"&&(s=null)),s}if(t!=="markbegin"){var r=i.match(this.foldingStopMarker);if(r){var g=r.index+r[0].length;return r[1]?this.closingBracketBlock(e,r[1],n,g):e.getCommentFoldRange(n,g,-1)}}},this.getSectionRange=function(e,t){var n=e.getLine(t),l=n.search(/\S/),i=t,g=n.length;t=t+1;for(var s=t,r=e.getLength();++t<r;){n=e.getLine(t);var f=n.search(/\S/);if(f!==-1){if(l>f)break;var k=this.getFoldWidgetRange(e,"all",t);if(k){if(k.start.row<=i)break;if(k.isMultiLine())t=k.end.row;else if(l==f)break}s=t}}return new h(i,g,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,n){for(var l=t.search(/\s*$/),i=e.getLength(),g=n,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,r=1;++n<i;){t=e.getLine(n);var f=s.exec(t);if(f&&(f[1]?r--:r++,!r))break}var k=n;if(k>g)return new h(g,l,k,t.length)}}).call(x.prototype)}),ace.define("ace/mode/kotlin",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/kotlin_highlight_rules","ace/mode/folding/cstyle"],function(o,a,d){var c=o("../lib/oop"),h=o("./text").Mode,p=o("./kotlin_highlight_rules").KotlinHighlightRules,x=o("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=p,this.foldingRules=new x,this.$behaviour=this.$defaultBehaviour};c.inherits(e,h),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/kotlin"}).call(e.prototype),a.Mode=e}),function(){ace.require(["ace/mode/kotlin"],function(o){u&&(u.exports=o)})}()}(y)),y.exports}var b=M();const $=w(b),_=R({__proto__:null,default:$},[b]);export{_ as m};
