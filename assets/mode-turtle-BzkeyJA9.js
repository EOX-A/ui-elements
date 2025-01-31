import{g as M}from"./index-DuuuSFPv.js";function b(f,k){for(var i=0;i<k.length;i++){const l=k[i];if(typeof l!="string"&&!Array.isArray(l)){for(const d in l)if(d!=="default"&&!(d in f)){const g=Object.getOwnPropertyDescriptor(l,d);g&&Object.defineProperty(f,d,g.get?g:{enumerable:!0,get:()=>l[d]})}}}return Object.freeze(Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}))}var v={exports:{}},R;function _(){return R||(R=1,function(f,k){ace.define("ace/mode/turtle_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(i,l,d){var g=i("../lib/oop"),p=i("./text_highlight_rules").TextHighlightRules,c=function(){this.$rules={start:[{include:"#comments"},{include:"#strings"},{include:"#base-prefix-declarations"},{include:"#string-language-suffixes"},{include:"#string-datatype-suffixes"},{include:"#relative-urls"},{include:"#xml-schema-types"},{include:"#rdf-schema-types"},{include:"#owl-types"},{include:"#qnames"},{include:"#punctuation-operators"}],"#base-prefix-declarations":[{token:"keyword.other.prefix.turtle",regex:/@(?:base|prefix)/}],"#comments":[{token:["punctuation.definition.comment.turtle","comment.line.hash.turtle"],regex:/(#)(.*$)/}],"#owl-types":[{token:"support.type.datatype.owl.turtle",regex:/owl:[a-zA-Z]+/}],"#punctuation-operators":[{token:"keyword.operator.punctuation.turtle",regex:/;|,|\.|\(|\)|\[|\]/}],"#qnames":[{token:"entity.name.other.qname.turtle",regex:/(?:[a-zA-Z][-_a-zA-Z0-9]*)?:(?:[_a-zA-Z][-_a-zA-Z0-9]*)?/}],"#rdf-schema-types":[{token:"support.type.datatype.rdf.schema.turtle",regex:/rdfs?:[a-zA-Z]+|(?:^|\s)a(?:\s|$)/}],"#relative-urls":[{token:"string.quoted.other.relative.url.turtle",regex:/</,push:[{token:"string.quoted.other.relative.url.turtle",regex:/>/,next:"pop"},{defaultToken:"string.quoted.other.relative.url.turtle"}]}],"#string-datatype-suffixes":[{token:"keyword.operator.datatype.suffix.turtle",regex:/\^\^/}],"#string-language-suffixes":[{token:["keyword.operator.language.suffix.turtle","constant.language.suffix.turtle"],regex:/(?!")(@)([a-z]+(?:\-[a-z0-9]+)*)/}],"#strings":[{token:"string.quoted.triple.turtle",regex:/"""/,push:[{token:"string.quoted.triple.turtle",regex:/"""/,next:"pop"},{defaultToken:"string.quoted.triple.turtle"}]},{token:"string.quoted.double.turtle",regex:/"/,push:[{token:"string.quoted.double.turtle",regex:/"/,next:"pop"},{token:"invalid.string.newline",regex:/$/},{token:"constant.character.escape.turtle",regex:/\\./},{defaultToken:"string.quoted.double.turtle"}]}],"#xml-schema-types":[{token:"support.type.datatype.xml.schema.turtle",regex:/xsd?:[a-z][a-zA-Z]+/}]},this.normalizeRules()};c.metaData={fileTypes:["ttl","nt"],name:"Turtle",scopeName:"source.turtle"},g.inherits(c,p),l.TurtleHighlightRules=c}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(i,l,d){var g=i("../../lib/oop"),p=i("../../range").Range,c=i("./fold_mode").FoldMode,x=l.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};g.inherits(x,c),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var a=e.getLine(r);if(this.singleLineBlockCommentRe.test(a)&&!this.startRegionRe.test(a)&&!this.tripleStarBlockCommentRe.test(a))return"";var n=this._getFoldWidgetBase(e,t,r);return!n&&this.startRegionRe.test(a)?"start":n},this.getFoldWidgetRange=function(e,t,r,a){var n=e.getLine(r);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,r);var o=n.match(this.foldingStartMarker);if(o){var s=o.index;if(o[1])return this.openingBracketBlock(e,o[1],r,s);var u=e.getCommentFoldRange(r,s+o[0].length,1);return u&&!u.isMultiLine()&&(a?u=this.getSectionRange(e,r):t!="all"&&(u=null)),u}if(t!=="markbegin"){var o=n.match(this.foldingStopMarker);if(o){var s=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],r,s):e.getCommentFoldRange(r,s,-1)}}},this.getSectionRange=function(e,t){var r=e.getLine(t),a=r.search(/\S/),n=t,s=r.length;t=t+1;for(var u=t,o=e.getLength();++t<o;){r=e.getLine(t);var m=r.search(/\S/);if(m!==-1){if(a>m)break;var h=this.getFoldWidgetRange(e,"all",t);if(h){if(h.start.row<=n)break;if(h.isMultiLine())t=h.end.row;else if(a==m)break}u=t}}return new p(n,s,u,e.getLine(u).length)},this.getCommentRegionBlock=function(e,t,r){for(var a=t.search(/\s*$/),n=e.getLength(),s=r,u=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,o=1;++r<n;){t=e.getLine(r);var m=u.exec(t);if(m&&(m[1]?o--:o++,!o))break}var h=r;if(h>s)return new p(s,a,h,t.length)}}).call(x.prototype)}),ace.define("ace/mode/turtle",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/turtle_highlight_rules","ace/mode/folding/cstyle"],function(i,l,d){var g=i("../lib/oop"),p=i("./text").Mode,c=i("./turtle_highlight_rules").TurtleHighlightRules,x=i("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=c,this.foldingRules=new x};g.inherits(e,p),(function(){this.$id="ace/mode/turtle"}).call(e.prototype),l.Mode=e}),function(){ace.require(["ace/mode/turtle"],function(i){f&&(f.exports=i)})}()}(v)),v.exports}var y=_();const T=M(y),S=b({__proto__:null,default:T},[y]);export{S as m};
