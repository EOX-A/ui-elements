import{g as y}from"./index-DuuuSFPv.js";function M(a,f){for(var e=0;e<f.length;e++){const i=f[e];if(typeof i!="string"&&!Array.isArray(i)){for(const t in i)if(t!=="default"&&!(t in a)){const n=Object.getOwnPropertyDescriptor(i,t);n&&Object.defineProperty(a,t,n.get?n:{enumerable:!0,get:()=>i[t]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var p={exports:{}},x;function I(){return x||(x=1,function(a,f){ace.define("ace/mode/ini_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,i,t){var n=e("../lib/oop"),d=e("./text_highlight_rules").TextHighlightRules,l="\\\\(?:[\\\\0abtrn;#=:]|x[a-fA-F\\d]{4})",o=function(){this.$rules={start:[{token:"punctuation.definition.comment.ini",regex:"#.*",push_:[{token:"comment.line.number-sign.ini",regex:"$|^",next:"pop"},{defaultToken:"comment.line.number-sign.ini"}]},{token:"punctuation.definition.comment.ini",regex:";.*",push_:[{token:"comment.line.semicolon.ini",regex:"$|^",next:"pop"},{defaultToken:"comment.line.semicolon.ini"}]},{token:["keyword.other.definition.ini","text","punctuation.separator.key-value.ini"],regex:"\\b([a-zA-Z0-9_.-]+)\\b(\\s*)(=)"},{token:["punctuation.definition.entity.ini","constant.section.group-title.ini","punctuation.definition.entity.ini"],regex:"^(\\[)(.*?)(\\])"},{token:"punctuation.definition.string.begin.ini",regex:"'",push:[{token:"punctuation.definition.string.end.ini",regex:"'",next:"pop"},{token:"constant.language.escape",regex:l},{defaultToken:"string.quoted.single.ini"}]},{token:"punctuation.definition.string.begin.ini",regex:'"',push:[{token:"constant.language.escape",regex:l},{token:"punctuation.definition.string.end.ini",regex:'"',next:"pop"},{defaultToken:"string.quoted.double.ini"}]}]},this.normalizeRules()};o.metaData={fileTypes:["ini","conf"],keyEquivalent:"^~I",name:"Ini",scopeName:"source.ini"},n.inherits(o,d),i.IniHighlightRules=o}),ace.define("ace/mode/folding/ini",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,i,t){var n=e("../../lib/oop"),d=e("../../range").Range,l=e("./fold_mode").FoldMode,o=i.FoldMode=function(){};n.inherits(o,l),(function(){this.foldingStartMarker=/^\s*\[([^\])]*)]\s*(?:$|[;#])/,this.getFoldWidgetRange=function(r,F,u){var h=this.foldingStartMarker,g=r.getLine(u),s=g.match(h);if(s){for(var k=s[1]+".",b=g.length,_=r.getLength(),m=u,c=u;++u<_;)if(g=r.getLine(u),!/^\s*$/.test(g)){if(s=g.match(h),s&&s[1].lastIndexOf(k,0)!==0)break;c=u}if(c>m){var R=r.getLine(c).length;return new d(m,b,c,R)}}}}).call(o.prototype)}),ace.define("ace/mode/ini",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/ini_highlight_rules","ace/mode/folding/ini"],function(e,i,t){var n=e("../lib/oop"),d=e("./text").Mode,l=e("./ini_highlight_rules").IniHighlightRules,o=e("./folding/ini").FoldMode,r=function(){this.HighlightRules=l,this.foldingRules=new o,this.$behaviour=this.$defaultBehaviour};n.inherits(r,d),(function(){this.lineCommentStart=";",this.blockComment=null,this.$id="ace/mode/ini"}).call(r.prototype),i.Mode=r}),function(){ace.require(["ace/mode/ini"],function(e){a&&(a.exports=e)})}()}(p)),p.exports}var v=I();const $=y(v),H=M({__proto__:null,default:$},[v]);export{H as m};
