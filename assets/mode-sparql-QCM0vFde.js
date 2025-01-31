import{g as k}from"./index-DuuuSFPv.js";function T(f,S){for(var a=0;a<S.length;a++){const n=S[a];if(typeof n!="string"&&!Array.isArray(n)){for(const g in n)if(g!=="default"&&!(g in f)){const u=Object.getOwnPropertyDescriptor(n,g);u&&Object.defineProperty(f,g,u.get?u:{enumerable:!0,get:()=>n[g]})}}}return Object.freeze(Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}))}var E={exports:{}},A;function v(){return A||(A=1,function(f,S){ace.define("ace/mode/sparql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(a,n,g){var u=a("../lib/oop"),h=a("./text_highlight_rules").TextHighlightRules,c=function(){this.$rules={start:[{include:"#comments"},{include:"#strings"},{include:"#string-language-suffixes"},{include:"#string-datatype-suffixes"},{include:"#logic-operators"},{include:"#relative-urls"},{include:"#xml-schema-types"},{include:"#rdf-schema-types"},{include:"#owl-types"},{include:"#qnames"},{include:"#keywords"},{include:"#built-in-functions"},{include:"#variables"},{include:"#boolean-literal"},{include:"#punctuation-operators"}],"#boolean-literal":[{token:"constant.language.boolean.sparql",regex:/true|false/}],"#built-in-functions":[{token:"support.function.sparql",regex:/[Aa][Bb][Ss]|[Aa][Vv][Gg]|[Bb][Nn][Oo][Dd][Ee]|[Bb][Oo][Uu][Nn][Dd]|[Cc][Ee][Ii][Ll]|[Cc][Oo][Aa][Ll][Ee][Ss][Cc][Ee]|[Cc][Oo][Nn][Cc][Aa][Tt]|[Cc][Oo][Nn][Tt][Aa][Ii][Nn][Ss]|[Cc][Oo][Uu][Nn][Tt]|[Dd][Aa][Tt][Aa][Tt][Yy][Pp][Ee]|[Dd][Aa][Yy]|[Ee][Nn][Cc][Oo][Dd][Ee]_[Ff][Oo][Rr]_[Uu][Rr][Ii]|[Ee][Xx][Ii][Ss][Tt][Ss]|[Ff][Ll][Oo][Oo][Rr]|[Gg][Rr][Oo][Uu][Pp]_[Cc][Oo][Nn][Cc][Aa][Tt]|[Hh][Oo][Uu][Rr][Ss]|[Ii][Ff]|[Ii][Rr][Ii]|[Ii][Ss][Bb][Ll][Aa][Nn][Kk]|[Ii][Ss][Ii][Rr][Ii]|[Ii][Ss][Ll][Ii][Tt][Ee][Rr][Aa][Ll]|[Ii][Ss][Nn][Uu][Mm][Ee][Rr][Ii][Cc]|[Ii][Ss][Uu][Rr][Ii]|[Ll][Aa][Nn][Gg]|[Ll][Aa][Nn][Gg][Mm][Aa][Tt][Cc][Hh][Ee][Ss]|[Ll][Cc][Aa][Ss][Ee]|[Mm][Aa][Xx]|[Mm][Dd]5|[Mm][Ii][Nn]|[Mm][Ii][Nn][Uu][Tt][Ee][Ss]|[Mm][Oo][Nn][Tt][Hh]|[Nn][Oo][Ww]|[Rr][Aa][Nn][Dd]|[Rr][Ee][Gg][Ee][Xx]|[Rr][Ee][Pp][Ll][Aa][Cc][Ee]|[Rr][Oo][Uu][Nn][Dd]|[Ss][Aa][Mm][Ee][Tt][Ee][Rr][Mm]|[Ss][Aa][Mm][Pp][Ll][Ee]|[Ss][Ee][Cc][Oo][Nn][Dd][Ss]|[Ss][Ee][Pp][Aa][Rr][Aa][Tt][Oo][Rr]|[Ss][Hh][Aa](?:1|256|384|512)|[Ss][Tt][Rr]|[Ss][Tt][Rr][Aa][Ff][Tt][Ee][Rr]|[Ss][Tt][Rr][Bb][Ee][Ff][Oo][Rr][Ee]|[Ss][Tt][Rr][Dd][Tt]|[Ss][Tt][Rr][Ee][Nn][Dd][Ss]|[Ss][Tt][Rr][Ll][Aa][Nn][Gg]|[Ss][Tt][Rr][Ll][Ee][Nn]|[Ss][Tt][Rr][Ss][Tt][Aa][Rr][Tt][Ss]|[Ss][Tt][Rr][Uu][Uu][Ii][Dd]|[Ss][Uu][Bb][Ss][Tt][Rr]|[Ss][Uu][Mm]|[Tt][Ii][Mm][Ee][Zz][Oo][Nn][Ee]|[Tt][Zz]|[Uu][Cc][Aa][Ss][Ee]|[Uu][Rr][Ii]|[Uu][Uu][Ii][Dd]|[Yy][Ee][Aa][Rr]/}],"#comments":[{token:["punctuation.definition.comment.sparql","comment.line.hash.sparql"],regex:/(#)(.*$)/}],"#keywords":[{token:"keyword.other.sparql",regex:/[Aa][Dd][Dd]|[Aa][Ll][Ll]|[Aa][Ss]|[As][Ss][Cc]|[Aa][Ss][Kk]|[Bb][Aa][Ss][Ee]|[Bb][Ii][Nn][Dd]|[Bb][Yy]|[Cc][Ll][Ee][Aa][Rr]|[Cc][Oo][Nn][Ss][Tt][Rr][Uu][Cc][Tt]|[Cc][Oo][Pp][Yy]|[Cc][Rr][Ee][Aa][Tt][Ee]|[Dd][Aa][Tt][Aa]|[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Dd][Ee][Ll][Ee][Tt][Ee]|[Dd][Ee][Sc][Cc]|[Dd][Ee][Ss][Cc][Rr][Ii][Bb][Ee]|[Dd][Ii][Ss][Tt][Ii][Nn][Cc][Tt]|[Dd][Rr][Oo][Pp]|[Ff][Ii][Ll][Tt][Ee][Rr]|[Ff][Rr][Oo][Mm]|[Gg][Rr][Aa][Pp][Hh]|[Gg][Rr][Oo][Uu][Pp]|[Hh][Aa][Vv][Ii][Nn][Gg]|[Ii][Nn][Ss][Ee][Rr][Tt]|[Ll][Ii][Mm][Ii][Tt]|[Ll][Oo][Aa][Dd]|[Mm][Ii][Nn][Uu][Ss]|[Mm][Oo][Vv][Ee]|[Nn][Aa][Mm][Ee][Dd]|[Oo][Ff][Ff][Ss][Ee][Tt]|[Oo][Pp][Tt][Ii][Oo][Nn][Aa][Ll]|[Oo][Rr][Dd][Ee][Rr]|[Pp][Rr][Ee][Ff][Ii][Xx]|[Rr][Ee][Dd][Uu][Cc][Ee][Dd]|[Ss][Ee][Ll][Ee][Cc][Tt]|[Ss][Ee][Pp][Aa][Rr][Aa][Tt][Oo][Rr]|[Ss][Ee][Rr][Vv][Ii][Cc][Ee]|[Ss][Ii][Ll][Ee][Nn][Tt]|[Tt][Oo]|[Uu][Nn][Dd][Ee][Ff]|[Uu][Nn][Ii][Oo][Nn]|[Uu][Ss][Ii][Nn][Gg]|[Vv][Aa][Ll][Uu][Ee][Ss]|[Ww][He][Ee][Rr][Ee]|[Ww][Ii][Tt][Hh]/}],"#logic-operators":[{token:"keyword.operator.logical.sparql",regex:/\|\||&&|=|!=|<|>|<=|>=|(?:^|!?\s)IN(?:!?\s|$)|(?:^|!?\s)NOT(?:!?\s|$)|-|\+|\*|\/|\!/}],"#owl-types":[{token:"support.type.datatype.owl.sparql",regex:/owl:[a-zA-Z]+/}],"#punctuation-operators":[{token:"keyword.operator.punctuation.sparql",regex:/;|,|\.|\(|\)|\{|\}|\|/}],"#qnames":[{token:"entity.name.other.qname.sparql",regex:/(?:[a-zA-Z][-_a-zA-Z0-9]*)?:(?:[_a-zA-Z][-_a-zA-Z0-9]*)?/}],"#rdf-schema-types":[{token:"support.type.datatype.rdf.schema.sparql",regex:/rdfs?:[a-zA-Z]+|(?:^|\s)a(?:\s|$)/}],"#relative-urls":[{token:"string.quoted.other.relative.url.sparql",regex:/</,push:[{token:"string.quoted.other.relative.url.sparql",regex:/>/,next:"pop"},{defaultToken:"string.quoted.other.relative.url.sparql"}]}],"#string-datatype-suffixes":[{token:"keyword.operator.datatype.suffix.sparql",regex:/\^\^/}],"#string-language-suffixes":[{token:["keyword.operator.language.suffix.sparql","constant.language.suffix.sparql"],regex:/(?!")(@)([a-z]+(?:\-[a-z0-9]+)*)/}],"#strings":[{token:"string.quoted.triple.sparql",regex:/"""/,push:[{token:"string.quoted.triple.sparql",regex:/"""/,next:"pop"},{defaultToken:"string.quoted.triple.sparql"}]},{token:"string.quoted.double.sparql",regex:/"/,push:[{token:"string.quoted.double.sparql",regex:/"/,next:"pop"},{token:"invalid.string.newline",regex:/$/},{token:"constant.character.escape.sparql",regex:/\\./},{defaultToken:"string.quoted.double.sparql"}]}],"#variables":[{token:"variable.other.sparql",regex:/(?:\?|\$)[-_a-zA-Z0-9]+/}],"#xml-schema-types":[{token:"support.type.datatype.schema.sparql",regex:/xsd?:[a-z][a-zA-Z]+/}]},this.normalizeRules()};c.metaData={fileTypes:["rq","sparql"],name:"SPARQL",scopeName:"source.sparql"},u.inherits(c,h),n.SPARQLHighlightRules=c}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(a,n,g){var u=a("../../lib/oop"),h=a("../../range").Range,c=a("./fold_mode").FoldMode,m=n.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};u.inherits(m,c),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var l=e.getLine(r);if(this.singleLineBlockCommentRe.test(l)&&!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";var o=this._getFoldWidgetBase(e,t,r);return!o&&this.startRegionRe.test(l)?"start":o},this.getFoldWidgetRange=function(e,t,r,l){var o=e.getLine(r);if(this.startRegionRe.test(o))return this.getCommentRegionBlock(e,o,r);var i=o.match(this.foldingStartMarker);if(i){var d=i.index;if(i[1])return this.openingBracketBlock(e,i[1],r,d);var s=e.getCommentFoldRange(r,d+i[0].length,1);return s&&!s.isMultiLine()&&(l?s=this.getSectionRange(e,r):t!="all"&&(s=null)),s}if(t!=="markbegin"){var i=o.match(this.foldingStopMarker);if(i){var d=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],r,d):e.getCommentFoldRange(r,d,-1)}}},this.getSectionRange=function(e,t){var r=e.getLine(t),l=r.search(/\S/),o=t,d=r.length;t=t+1;for(var s=t,i=e.getLength();++t<i;){r=e.getLine(t);var R=r.search(/\S/);if(R!==-1){if(l>R)break;var p=this.getFoldWidgetRange(e,"all",t);if(p){if(p.start.row<=o)break;if(p.isMultiLine())t=p.end.row;else if(l==R)break}s=t}}return new h(o,d,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,r){for(var l=t.search(/\s*$/),o=e.getLength(),d=r,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,i=1;++r<o;){t=e.getLine(r);var R=s.exec(t);if(R&&(R[1]?i--:i++,!i))break}var p=r;if(p>d)return new h(d,l,p,t.length)}}).call(m.prototype)}),ace.define("ace/mode/sparql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/sparql_highlight_rules","ace/mode/folding/cstyle"],function(a,n,g){var u=a("../lib/oop"),h=a("./text").Mode,c=a("./sparql_highlight_rules").SPARQLHighlightRules,m=a("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=c,this.foldingRules=new m};u.inherits(e,h),(function(){this.$id="ace/mode/sparql"}).call(e.prototype),n.Mode=e}),function(){ace.require(["ace/mode/sparql"],function(a){f&&(f.exports=a)})}()}(E)),E.exports}var x=v();const q=k(x),L=T({__proto__:null,default:q},[x]);export{L as m};
