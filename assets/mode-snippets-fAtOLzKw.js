import{g as E}from"./index-DuuuSFPv.js";function M(c,h){for(var i=0;i<h.length;i++){const a=h[i];if(typeof a!="string"&&!Array.isArray(a)){for(const x in a)if(x!=="default"&&!(x in c)){const d=Object.getOwnPropertyDescriptor(a,x);d&&Object.defineProperty(c,x,d.get?d:{enumerable:!0,get:()=>a[x]})}}}return Object.freeze(Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}))}var v={exports:{}},S;function _(){return S||(S=1,function(c,h){ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],function(i,a,x){var d=i("../../lib/oop"),m=i("./fold_mode").FoldMode,f=i("../../range").Range,p=a.FoldMode=function(){};d.inherits(p,m),(function(){this.commentBlock=function(e,g){var t=/\S/,n=e.getLine(g),r=n.search(t);if(!(r==-1||n[r]!="#")){for(var l=n.length,o=e.getLength(),s=g,u=g;++g<o;){n=e.getLine(g);var k=n.search(t);if(k!=-1){if(n[k]!="#")break;u=g}}if(u>s){var R=e.getLine(u).length;return new f(s,l,u,R)}}},this.getFoldWidgetRange=function(e,g,t){var n=this.indentationBlock(e,t);if(n||(n=this.commentBlock(e,t),n))return n},this.getFoldWidget=function(e,g,t){var n=e.getLine(t),r=n.search(/\S/),l=e.getLine(t+1),o=e.getLine(t-1),s=o.search(/\S/),u=l.search(/\S/);if(r==-1)return e.foldWidgets[t-1]=s!=-1&&s<u?"start":"","";if(s==-1){if(r==u&&n[r]=="#"&&l[r]=="#")return e.foldWidgets[t-1]="",e.foldWidgets[t+1]="","start"}else if(s==r&&n[r]=="#"&&o[r]=="#"&&e.getLine(t-2).search(/\S/)==-1)return e.foldWidgets[t-1]="start",e.foldWidgets[t+1]="","";return s!=-1&&s<r?e.foldWidgets[t-1]="start":e.foldWidgets[t-1]="",r<u?"start":""}}).call(p.prototype)}),ace.define("ace/mode/snippets",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/text_highlight_rules","ace/mode/folding/coffee"],function(i,a,x){var d=i("../lib/oop"),m=i("./text").Mode,f=i("./text_highlight_rules").TextHighlightRules,p=function(){var n="SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";this.$rules={start:[{token:"constant.language.escape",regex:/\\[\$}`\\]/},{token:"keyword",regex:"\\$(?:TM_)?(?:"+n+")\\b"},{token:"variable",regex:"\\$\\w+"},{onMatch:function(r,l,o){return o[1]?o[1]++:o.unshift(l,1),this.tokenName},tokenName:"markup.list",regex:"\\${",next:"varDecl"},{onMatch:function(r,l,o){return o[1]?(o[1]--,o[1]||o.splice(0,2),this.tokenName):"text"},tokenName:"markup.list",regex:"}"},{token:"doc.comment",regex:/^\${2}-{5,}$/}],varDecl:[{regex:/\d+\b/,token:"constant.numeric"},{token:"keyword",regex:"(?:TM_)?(?:"+n+")\\b"},{token:"variable",regex:"\\w+"},{regex:/:/,token:"punctuation.operator",next:"start"},{regex:/\//,token:"string.regex",next:"regexp"},{regex:"",next:"start"}],regexp:[{regex:/\\./,token:"escape"},{regex:/\[/,token:"regex.start",next:"charClass"},{regex:"/",token:"string.regex",next:"format"},{token:"string.regex",regex:"."}],charClass:[{regex:"\\.",token:"escape"},{regex:"\\]",token:"regex.end",next:"regexp"},{token:"string.regex",regex:"."}],format:[{regex:/\\[ulULE]/,token:"keyword"},{regex:/\$\d+/,token:"variable"},{regex:"/[gim]*:?",token:"string.regex",next:"start"},{token:"string",regex:"."}]}};d.inherits(p,f),a.SnippetHighlightRules=p;var e=function(){this.$rules={start:[{token:"text",regex:"^\\t",next:"sn-start"},{token:"invalid",regex:/^ \s*/},{token:"comment",regex:/^#.*/},{token:"constant.language.escape",regex:"^regex ",next:"regex"},{token:"constant.language.escape",regex:"^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"}],regex:[{token:"text",regex:"\\."},{token:"keyword",regex:"/"},{token:"empty",regex:"$",next:"start"}]},this.embedRules(p,"sn-",[{token:"text",regex:"^\\t",next:"sn-start"},{onMatch:function(n,r,l){return l.splice(l.length),this.tokenName},tokenName:"text",regex:"^(?!	)",next:"start"}])};d.inherits(e,f),a.SnippetGroupHighlightRules=e;var g=i("./folding/coffee").FoldMode,t=function(){this.HighlightRules=e,this.foldingRules=new g,this.$behaviour=this.$defaultBehaviour};d.inherits(t,m),(function(){this.$indentWithTabs=!0,this.lineCommentStart="#",this.$id="ace/mode/snippets",this.snippetFileId="ace/snippets/snippets"}).call(t.prototype),a.Mode=t}),function(){ace.require(["ace/mode/snippets"],function(i){c&&(c.exports=i)})}()}(v)),v.exports}var b=_();const L=E(b),y=M({__proto__:null,default:L},[b]);export{y as m};
