import{g as F}from"./index-DuuuSFPv.js";function M(k,R){for(var l=0;l<R.length;l++){const h=R[l];if(typeof h!="string"&&!Array.isArray(h)){for(const v in h)if(v!=="default"&&!(v in k)){const f=Object.getOwnPropertyDescriptor(h,v);f&&Object.defineProperty(k,v,f.get?f:{enumerable:!0,get:()=>h[v]})}}}return Object.freeze(Object.defineProperty(k,Symbol.toStringTag,{value:"Module"}))}var w={exports:{}},T;function C(){return T||(T=1,function(k,R){ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator"],function(l,h,v){var f=l("../../lib/oop"),p=l("../behaviour").Behaviour,d=l("../../token_iterator").TokenIterator;function i(u,o){return u&&u.type.lastIndexOf(o+".xml")>-1}var c=function(){this.add("string_dquotes","insertion",function(u,o,s,r,n){if(n=='"'||n=="'"){var e=n,t=r.doc.getTextRange(s.getSelectionRange());if(t!==""&&t!=="'"&&t!='"'&&s.getWrapBehavioursEnabled())return{text:e+t+e,selection:!1};var a=s.getCursorPosition(),g=r.doc.getLine(a.row),x=g.substring(a.column,a.column+1),b=new d(r,a.row,a.column),m=b.getCurrentToken();if(x==e&&(i(m,"attribute-value")||i(m,"string")))return{text:"",selection:[1,1]};if(m||(m=b.stepBackward()),!m)return;for(;i(m,"tag-whitespace")||i(m,"whitespace");)m=b.stepBackward();var y=!x||x.match(/\s/);if(i(m,"attribute-equals")&&(y||x==">")||i(m,"decl-attribute-equals")&&(y||x=="?"))return{text:e+e,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(u,o,s,r,n){var e=r.doc.getTextRange(n);if(!n.isMultiLine()&&(e=='"'||e=="'")){var t=r.doc.getLine(n.start.row),a=t.substring(n.start.column+1,n.start.column+2);if(a==e)return n.end.column++,n}}),this.add("autoclosing","insertion",function(u,o,s,r,n){if(n==">"){var e=s.getSelectionRange().start,t=new d(r,e.row,e.column),a=t.getCurrentToken()||t.stepBackward();if(!a||!(i(a,"tag-name")||i(a,"tag-whitespace")||i(a,"attribute-name")||i(a,"attribute-equals")||i(a,"attribute-value"))||i(a,"reference.attribute-value"))return;if(i(a,"attribute-value")){var g=t.getCurrentTokenColumn()+a.value.length;if(e.column<g)return;if(e.column==g){var x=t.stepForward();if(x&&i(x,"attribute-value"))return;t.stepBackward()}}if(/^\s*>/.test(r.getLine(e.row).slice(e.column)))return;for(;!i(a,"tag-name");)if(a=t.stepBackward(),a.value=="<"){a=t.stepForward();break}var b=t.getCurrentTokenRow(),m=t.getCurrentTokenColumn();if(i(t.stepBackward(),"end-tag-open"))return;var y=a.value;return b==e.row&&(y=y.substring(0,e.column-m)),this.voidElements&&this.voidElements.hasOwnProperty(y.toLowerCase())?void 0:{text:"></"+y+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(u,o,s,r,n){if(n==`
`){var e=s.getCursorPosition(),t=r.getLine(e.row),a=new d(r,e.row,e.column),g=a.getCurrentToken();if(i(g,"")&&g.type.indexOf("tag-close")!==-1){if(g.value=="/>")return;for(;g&&g.type.indexOf("tag-name")===-1;)g=a.stepBackward();if(!g)return;var x=g.value,b=a.getCurrentTokenRow();if(g=a.stepBackward(),!g||g.type.indexOf("end-tag")!==-1)return;if(this.voidElements&&!this.voidElements[x]||!this.voidElements){var m=r.getTokenAt(e.row,e.column+1),t=r.getLine(b),y=this.$getIndent(t),_=y+r.getTabString();return m&&m.value==="</"?{text:`
`+_+`
`+y,selection:[1,_.length,1,_.length]}:{text:`
`+_}}}}})};f.inherits(c,p),h.XmlBehaviour=c}),ace.define("ace/mode/behaviour/javascript",["require","exports","module","ace/lib/oop","ace/token_iterator","ace/mode/behaviour/cstyle","ace/mode/behaviour/xml"],function(l,h,v){var f=l("../../lib/oop"),p=l("../../token_iterator").TokenIterator,d=l("../behaviour/cstyle").CstyleBehaviour,i=l("../behaviour/xml").XmlBehaviour,c=function(){var u=new i({closeCurlyBraces:!0}).getBehaviours();this.addBehaviours(u),this.inherit(d),this.add("autoclosing-fragment","insertion",function(o,s,r,n,e){if(e==">"){var t=r.getSelectionRange().start,a=new p(n,t.row,t.column),g=a.getCurrentToken()||a.stepBackward();if(!g)return;if(g.value=="<")return{text:"></>",selection:[1,1]}}})};f.inherits(c,d),h.JavaScriptBehaviour=c}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(l,h,v){var f=l("../../lib/oop"),p=l("../../range").Range,d=l("./fold_mode").FoldMode,i=h.FoldMode=function(o,s){d.call(this),this.voidElements=o||{},this.optionalEndTags=f.mixin({},this.voidElements),s&&f.mixin(this.optionalEndTags,s)};f.inherits(i,d);var c=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};function u(o,s){return o.type.lastIndexOf(s+".xml")>-1}(function(){this.getFoldWidget=function(o,s,r){var n=this._getFirstTagInLine(o,r);return n?n.closing||!n.tagName&&n.selfClosing?s==="markbeginend"?"end":"":!n.tagName||n.selfClosing||this.voidElements.hasOwnProperty(n.tagName.toLowerCase())||this._findEndTagInLine(o,r,n.tagName,n.end.column)?"":"start":this.getCommentFoldWidget(o,r)},this.getCommentFoldWidget=function(o,s){return/comment/.test(o.getState(s))&&/<!-/.test(o.getLine(s))?"start":""},this._getFirstTagInLine=function(o,s){for(var r=o.getTokens(s),n=new c,e=0;e<r.length;e++){var t=r[e];if(u(t,"tag-open")){if(n.end.column=n.start.column+t.value.length,n.closing=u(t,"end-tag-open"),t=r[++e],!t)return null;if(n.tagName=t.value,t.value===""){if(t=r[++e],!t)return null;n.tagName=t.value}for(n.end.column+=t.value.length,e++;e<r.length;e++)if(t=r[e],n.end.column+=t.value.length,u(t,"tag-close")){n.selfClosing=t.value=="/>";break}return n}else if(u(t,"tag-close"))return n.selfClosing=t.value=="/>",n;n.start.column+=t.value.length}return null},this._findEndTagInLine=function(o,s,r,n){for(var e=o.getTokens(s),t=0,a=0;a<e.length;a++){var g=e[a];if(t+=g.value.length,!(t<n-1)&&u(g,"end-tag-open")&&(g=e[a+1],u(g,"tag-name")&&g.value===""&&(g=e[a+2]),g&&g.value==r))return!0}return!1},this.getFoldWidgetRange=function(o,s,r){var n=this._getFirstTagInLine(o,r);if(!n)return this.getCommentFoldWidget(o,r)&&o.getCommentFoldRange(r,o.getLine(r).length);var e=o.getMatchingTags({row:r,column:0});if(e)return new p(e.openTag.end.row,e.openTag.end.column,e.closeTag.start.row,e.closeTag.start.column)}}).call(i.prototype)}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(l,h,v){var f=l("../../lib/oop"),p=l("../../range").Range,d=l("./fold_mode").FoldMode,i=h.FoldMode=function(c){c&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end)))};f.inherits(i,d),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(c,u,o){var s=c.getLine(o);if(this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s))return"";var r=this._getFoldWidgetBase(c,u,o);return!r&&this.startRegionRe.test(s)?"start":r},this.getFoldWidgetRange=function(c,u,o,s){var r=c.getLine(o);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(c,r,o);var t=r.match(this.foldingStartMarker);if(t){var n=t.index;if(t[1])return this.openingBracketBlock(c,t[1],o,n);var e=c.getCommentFoldRange(o,n+t[0].length,1);return e&&!e.isMultiLine()&&(s?e=this.getSectionRange(c,o):u!="all"&&(e=null)),e}if(u!=="markbegin"){var t=r.match(this.foldingStopMarker);if(t){var n=t.index+t[0].length;return t[1]?this.closingBracketBlock(c,t[1],o,n):c.getCommentFoldRange(o,n,-1)}}},this.getSectionRange=function(c,u){var o=c.getLine(u),s=o.search(/\S/),r=u,n=o.length;u=u+1;for(var e=u,t=c.getLength();++u<t;){o=c.getLine(u);var a=o.search(/\S/);if(a!==-1){if(s>a)break;var g=this.getFoldWidgetRange(c,"all",u);if(g){if(g.start.row<=r)break;if(g.isMultiLine())u=g.end.row;else if(s==a)break}e=u}}return new p(r,n,e,c.getLine(e).length)},this.getCommentRegionBlock=function(c,u,o){for(var s=u.search(/\s*$/),r=c.getLength(),n=o,e=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,t=1;++o<r;){u=c.getLine(o);var a=e.exec(u);if(a&&(a[1]?t--:t++,!t))break}var g=o;if(g>n)return new p(n,s,g,u.length)}}).call(i.prototype)}),ace.define("ace/mode/folding/javascript",["require","exports","module","ace/lib/oop","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(l,h,v){var f=l("../../lib/oop"),p=l("./xml").FoldMode,d=l("./cstyle").FoldMode,i=h.FoldMode=function(c){c&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+c.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+c.end))),this.xmlFoldMode=new p};f.inherits(i,d),(function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(c,u,o){var s=this.getFoldWidgetBase(c,u,o);return s||this.xmlFoldMode.getFoldWidget(c,u,o)},this.getFoldWidgetRange=function(c,u,o,s){var r=this.getFoldWidgetRangeBase(c,u,o,s);return r||this.xmlFoldMode.getFoldWidgetRange(c,u,o)}}).call(i.prototype)}),ace.define("ace/mode/jsdoc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(l,h,v){var f=l("../lib/oop"),p=l("./text_highlight_rules").TextHighlightRules,d=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},d.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()};f.inherits(d,p),d.getTagRule=function(i){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},d.getStartRule=function(i){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:i}},d.getEndRule=function(i){return{token:"comment.doc",regex:"\\*\\/",next:i}},h.JsDocCommentHighlightRules=d}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/jsdoc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(l,h,v){var f=l("../lib/oop"),p=l("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,d=l("./text_highlight_rules").TextHighlightRules,i="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*",c=function(s){var r={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},n=this.createKeywordMapper(r,"identifier"),e="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",t="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",a="(function)(\\s*)(\\*?)",g={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(r).join("|")+"\\b)"+i+")(\\s*)(\\()"};this.$rules={no_regex:[p.getStartRule("doc-start"),o("no_regex"),g,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(=)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+i+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+i+")(\\s*)(:)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+a+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:`from(?=\\s*('|"))`},{token:"keyword",regex:"(?:"+e+")\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:n,regex:i},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:a+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:i},{regex:"",token:"empty",next:"no_regex"}],start:[p.getStartRule("doc-start"),o("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[o("function_arguments"),{token:"variable.parameter",regex:i},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:t},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:t},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},(!s||!s.noES6)&&(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(x,b,m){if(this.next=x=="{"?this.nextState:"",x=="{"&&m.length)m.unshift("start",b);else if(x=="}"&&m.length&&(m.shift(),this.next=m.shift(),this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1))return"paren.quasi.end";return x=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:t},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+i+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),(!s||s.jsx!=!1)&&u.call(this)),this.embedRules(p,"doc-",[p.getEndRule("no_regex")]),this.normalizeRules()};f.inherits(c,d);function u(){var s=i.replace("\\d","\\d\\-"),r={onMatch:function(e,t,a){var g=e.charAt(1)=="/"?2:1;return g==1?(t!=this.nextState?a.unshift(this.next,this.nextState,0):a.unshift(this.next),a[2]++):g==2&&t==this.nextState&&(a[1]--,(!a[1]||a[1]<0)&&(a.shift(),a.shift())),[{type:"meta.tag.punctuation."+(g==1?"":"end-")+"tag-open.xml",value:e.slice(0,g)},{type:"meta.tag.tag-name.xml",value:e.substr(g)}]},regex:"</?(?:"+s+"|(?=>))",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(r);var n={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[n,r,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(e,t,a){return t==a[0]&&a.shift(),e.length==2&&(a[0]==this.nextState&&a[1]--,(!a[1]||a[1]<0)&&a.splice(0,2)),this.next=a[0]||"start",[{type:this.token,value:e}]},nextState:"jsx"},n,o("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:s},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},r],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function o(s){return[{token:"comment",regex:/\/\*/,next:[p.getTagRule(),{token:"comment",regex:"\\*\\/",next:s||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[p.getTagRule(),{token:"comment",regex:"$|^",next:s||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}h.JavaScriptHighlightRules=c}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(l,h,v){var f=l("../range").Range,p=function(){};(function(){this.checkOutdent=function(d,i){return/^\s+$/.test(d)?/^\s*\}/.test(i):!1},this.autoOutdent=function(d,i){var c=d.getLine(i),u=c.match(/^(\s*\})/);if(!u)return 0;var o=u[1].length,s=d.findMatchingBracket({row:i,column:o});if(!s||s.row==i)return 0;var r=this.$getIndent(d.getLine(s.row));d.replace(new f(i,0,i,o-1),r)},this.$getIndent=function(d){return d.match(/^\s*/)[0]}}).call(p.prototype),h.MatchingBraceOutdent=p}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/javascript","ace/mode/folding/javascript"],function(l,h,v){var f=l("../lib/oop"),p=l("./text").Mode,d=l("./javascript_highlight_rules").JavaScriptHighlightRules,i=l("./matching_brace_outdent").MatchingBraceOutdent,c=l("../worker/worker_client").WorkerClient,u=l("./behaviour/javascript").JavaScriptBehaviour,o=l("./folding/javascript").FoldMode,s=function(){this.HighlightRules=d,this.$outdent=new i,this.$behaviour=new u,this.foldingRules=new o};f.inherits(s,p),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(r,n,e){var t=this.$getIndent(n),a=this.getTokenizer().getLineTokens(n,r),g=a.tokens,x=a.state;if(g.length&&g[g.length-1].type=="comment")return t;if(r=="start"||r=="no_regex"){var b=n.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);b&&(t+=e)}else if(r=="doc-start"&&(x=="start"||x=="no_regex"))return"";return t},this.checkOutdent=function(r,n,e){return this.$outdent.checkOutdent(n,e)},this.autoOutdent=function(r,n,e){this.$outdent.autoOutdent(n,e)},this.createWorker=function(r){var n=new c(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return n.attachToDocument(r.getDocument()),n.on("annotate",function(e){r.setAnnotations(e.data)}),n.on("terminate",function(){r.clearAnnotations()}),n},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}).call(s.prototype),h.Mode=s}),ace.define("ace/mode/typescript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules"],function(l,h,v){var f=l("../lib/oop"),p=l("./javascript_highlight_rules").JavaScriptHighlightRules,d=function(i){var c=[{token:["storage.type","text","entity.name.function.ts"],regex:"(function)(\\s+)([a-zA-Z0-9$_¡-￿][a-zA-Z0-9d$_¡-￿]*)"},{token:"keyword",regex:"(?:\\b(constructor|declare|interface|as|AS|public|private|extends|export|super|readonly|module|namespace|abstract|implements)\\b)"},{token:["keyword","storage.type.variable.ts"],regex:"(class|type)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*)"},{token:"keyword",regex:"\\b(?:super|export|import|keyof|infer)\\b"},{token:["storage.type.variable.ts"],regex:"(?:\\b(this\\.|string\\b|bool\\b|boolean\\b|number\\b|true\\b|false\\b|undefined\\b|any\\b|null\\b|(?:unique )?symbol\\b|object\\b|never\\b|enum\\b))"}],u=new p({jsx:(i&&i.jsx)==!0}).getRules();u.no_regex=c.concat(u.no_regex),this.$rules=u};f.inherits(d,p),h.TypeScriptHighlightRules=d}),ace.define("ace/mode/typescript",["require","exports","module","ace/lib/oop","ace/mode/javascript","ace/mode/typescript_highlight_rules","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],function(l,h,v){var f=l("../lib/oop"),p=l("./javascript").Mode,d=l("./typescript_highlight_rules").TypeScriptHighlightRules,i=l("./folding/cstyle").FoldMode,c=l("./matching_brace_outdent").MatchingBraceOutdent,u=function(){this.HighlightRules=d,this.$outdent=new c,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new i};f.inherits(u,p),(function(){this.createWorker=function(o){return null},this.$id="ace/mode/typescript"}).call(u.prototype),h.Mode=u}),ace.define("ace/mode/tsx",["require","exports","module","ace/lib/oop","ace/mode/behaviour/javascript","ace/mode/folding/javascript","ace/mode/typescript"],function(l,h,v){var f=l("../lib/oop"),p=l("./behaviour/javascript").JavaScriptBehaviour,d=l("./folding/javascript").FoldMode,i=l("./typescript").Mode,c=function(){i.call(this),this.$highlightRuleConfig={jsx:!0},this.foldingRules=new d,this.$behaviour=new p};f.inherits(c,i),(function(){this.$id="ace/mode/tsx"}).call(c.prototype),h.Mode=c}),function(){ace.require(["ace/mode/tsx"],function(l){k&&(k.exports=l)})}()}(w)),w.exports}var S=C();const I=F(S),$=M({__proto__:null,default:I},[S]);export{$ as m};
