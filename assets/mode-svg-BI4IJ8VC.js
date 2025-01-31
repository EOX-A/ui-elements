import{g as F}from"./index-DuuuSFPv.js";function S(y,R){for(var g=0;g<R.length;g++){const x=R[g];if(typeof x!="string"&&!Array.isArray(x)){for(const f in x)if(f!=="default"&&!(f in y)){const p=Object.getOwnPropertyDescriptor(x,f);p&&Object.defineProperty(y,f,p.get?p:{enumerable:!0,get:()=>x[f]})}}}return Object.freeze(Object.defineProperty(y,Symbol.toStringTag,{value:"Module"}))}var w={exports:{}},M;function C(){return M||(M=1,function(y,R){ace.define("ace/mode/xml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(g,x,f){var p=g("../lib/oop"),m=g("./text_highlight_rules").TextHighlightRules,d=function(e){var o="[_:a-zA-ZÀ-￿][-_:.a-zA-Z0-9À-￿]*";this.$rules={start:[{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\[",next:"cdata"},{token:["punctuation.instruction.xml","keyword.instruction.xml"],regex:"(<\\?)("+o+")",next:"processing_instruction"},{token:"comment.start.xml",regex:"<\\!--",next:"comment"},{token:["xml-pe.doctype.xml","xml-pe.doctype.xml"],regex:"(<\\!)(DOCTYPE)(?=[\\s])",next:"doctype",caseInsensitive:!0},{include:"tag"},{token:"text.end-tag-open.xml",regex:"</"},{token:"text.tag-open.xml",regex:"<"},{include:"reference"},{defaultToken:"text.xml"}],processing_instruction:[{token:"entity.other.attribute-name.decl-attribute-name.xml",regex:o},{token:"keyword.operator.decl-attribute-equals.xml",regex:"="},{include:"whitespace"},{include:"string"},{token:"punctuation.xml-decl.xml",regex:"\\?>",next:"start"}],doctype:[{include:"whitespace"},{include:"string"},{token:"xml-pe.doctype.xml",regex:">",next:"start"},{token:"xml-pe.xml",regex:"[-_a-zA-Z0-9:]+"},{token:"punctuation.int-subset",regex:"\\[",push:"int_subset"}],int_subset:[{token:"text.xml",regex:"\\s+"},{token:"punctuation.int-subset.xml",regex:"]",next:"pop"},{token:["punctuation.markup-decl.xml","keyword.markup-decl.xml"],regex:"(<\\!)("+o+")",push:[{token:"text",regex:"\\s+"},{token:"punctuation.markup-decl.xml",regex:">",next:"pop"},{include:"string"}]}],cdata:[{token:"string.cdata.xml",regex:"\\]\\]>",next:"start"},{token:"text.xml",regex:"\\s+"},{token:"text.xml",regex:"(?:[^\\]]|\\](?!\\]>))+"}],comment:[{token:"comment.end.xml",regex:"-->",next:"start"},{defaultToken:"comment.xml"}],reference:[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],attr_reference:[{token:"constant.language.escape.reference.attribute-value.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}],tag:[{token:["meta.tag.punctuation.tag-open.xml","meta.tag.punctuation.end-tag-open.xml","meta.tag.tag-name.xml"],regex:"(?:(<)|(</))((?:"+o+":)?"+o+")",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start"}]}],tag_whitespace:[{token:"text.tag-whitespace.xml",regex:"\\s+"}],whitespace:[{token:"text.whitespace.xml",regex:"\\s+"}],string:[{token:"string.xml",regex:"'",push:[{token:"string.xml",regex:"'",next:"pop"},{defaultToken:"string.xml"}]},{token:"string.xml",regex:'"',push:[{token:"string.xml",regex:'"',next:"pop"},{defaultToken:"string.xml"}]}],attributes:[{token:"entity.other.attribute-name.xml",regex:o},{token:"keyword.operator.attribute-equals.xml",regex:"="},{include:"tag_whitespace"},{include:"attribute_value"}],attribute_value:[{token:"string.attribute-value.xml",regex:"'",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"attr_reference"},{defaultToken:"string.attribute-value.xml"}]}]},this.constructor===d&&this.normalizeRules()};(function(){this.embedTagRules=function(e,o,l){this.$rules.tag.unshift({token:["meta.tag.punctuation.tag-open.xml","meta.tag."+l+".tag-name.xml"],regex:"(<)("+l+"(?=\\s|>|$))",next:[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:o+"start"}]}),this.$rules[l+"-end"]=[{include:"attributes"},{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",next:"start",onMatch:function(n,s,r){return r.splice(0),this.token}}],this.embedRules(e,o,[{token:["meta.tag.punctuation.end-tag-open.xml","meta.tag."+l+".tag-name.xml"],regex:"(</)("+l+"(?=\\s|>|$))",next:l+"-end"},{token:"string.cdata.xml",regex:"<\\!\\[CDATA\\["},{token:"string.cdata.xml",regex:"\\]\\]>"}])}}).call(m.prototype),p.inherits(d,m),x.XmlHighlightRules=d}),ace.define("ace/mode/behaviour/xml",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator"],function(g,x,f){var p=g("../../lib/oop"),m=g("../behaviour").Behaviour,d=g("../../token_iterator").TokenIterator;function e(l,n){return l&&l.type.lastIndexOf(n+".xml")>-1}var o=function(){this.add("string_dquotes","insertion",function(l,n,s,r,t){if(t=='"'||t=="'"){var a=t,i=r.doc.getTextRange(s.getSelectionRange());if(i!==""&&i!=="'"&&i!='"'&&s.getWrapBehavioursEnabled())return{text:a+i+a,selection:!1};var u=s.getCursorPosition(),c=r.doc.getLine(u.row),v=c.substring(u.column,u.column+1),k=new d(r,u.row,u.column),h=k.getCurrentToken();if(v==a&&(e(h,"attribute-value")||e(h,"string")))return{text:"",selection:[1,1]};if(h||(h=k.stepBackward()),!h)return;for(;e(h,"tag-whitespace")||e(h,"whitespace");)h=k.stepBackward();var b=!v||v.match(/\s/);if(e(h,"attribute-equals")&&(b||v==">")||e(h,"decl-attribute-equals")&&(b||v=="?"))return{text:a+a,selection:[1,1]}}}),this.add("string_dquotes","deletion",function(l,n,s,r,t){var a=r.doc.getTextRange(t);if(!t.isMultiLine()&&(a=='"'||a=="'")){var i=r.doc.getLine(t.start.row),u=i.substring(t.start.column+1,t.start.column+2);if(u==a)return t.end.column++,t}}),this.add("autoclosing","insertion",function(l,n,s,r,t){if(t==">"){var a=s.getSelectionRange().start,i=new d(r,a.row,a.column),u=i.getCurrentToken()||i.stepBackward();if(!u||!(e(u,"tag-name")||e(u,"tag-whitespace")||e(u,"attribute-name")||e(u,"attribute-equals")||e(u,"attribute-value"))||e(u,"reference.attribute-value"))return;if(e(u,"attribute-value")){var c=i.getCurrentTokenColumn()+u.value.length;if(a.column<c)return;if(a.column==c){var v=i.stepForward();if(v&&e(v,"attribute-value"))return;i.stepBackward()}}if(/^\s*>/.test(r.getLine(a.row).slice(a.column)))return;for(;!e(u,"tag-name");)if(u=i.stepBackward(),u.value=="<"){u=i.stepForward();break}var k=i.getCurrentTokenRow(),h=i.getCurrentTokenColumn();if(e(i.stepBackward(),"end-tag-open"))return;var b=u.value;return k==a.row&&(b=b.substring(0,a.column-h)),this.voidElements&&this.voidElements.hasOwnProperty(b.toLowerCase())?void 0:{text:"></"+b+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(l,n,s,r,t){if(t==`
`){var a=s.getCursorPosition(),i=r.getLine(a.row),u=new d(r,a.row,a.column),c=u.getCurrentToken();if(e(c,"")&&c.type.indexOf("tag-close")!==-1){if(c.value=="/>")return;for(;c&&c.type.indexOf("tag-name")===-1;)c=u.stepBackward();if(!c)return;var v=c.value,k=u.getCurrentTokenRow();if(c=u.stepBackward(),!c||c.type.indexOf("end-tag")!==-1)return;if(this.voidElements&&!this.voidElements[v]||!this.voidElements){var h=r.getTokenAt(a.row,a.column+1),i=r.getLine(k),b=this.$getIndent(i),_=b+r.getTabString();return h&&h.value==="</"?{text:`
`+_+`
`+b,selection:[1,_.length,1,_.length]}:{text:`
`+_}}}}})};p.inherits(o,m),x.XmlBehaviour=o}),ace.define("ace/mode/folding/xml",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(g,x,f){var p=g("../../lib/oop"),m=g("../../range").Range,d=g("./fold_mode").FoldMode,e=x.FoldMode=function(n,s){d.call(this),this.voidElements=n||{},this.optionalEndTags=p.mixin({},this.voidElements),s&&p.mixin(this.optionalEndTags,s)};p.inherits(e,d);var o=function(){this.tagName="",this.closing=!1,this.selfClosing=!1,this.start={row:0,column:0},this.end={row:0,column:0}};function l(n,s){return n.type.lastIndexOf(s+".xml")>-1}(function(){this.getFoldWidget=function(n,s,r){var t=this._getFirstTagInLine(n,r);return t?t.closing||!t.tagName&&t.selfClosing?s==="markbeginend"?"end":"":!t.tagName||t.selfClosing||this.voidElements.hasOwnProperty(t.tagName.toLowerCase())||this._findEndTagInLine(n,r,t.tagName,t.end.column)?"":"start":this.getCommentFoldWidget(n,r)},this.getCommentFoldWidget=function(n,s){return/comment/.test(n.getState(s))&&/<!-/.test(n.getLine(s))?"start":""},this._getFirstTagInLine=function(n,s){for(var r=n.getTokens(s),t=new o,a=0;a<r.length;a++){var i=r[a];if(l(i,"tag-open")){if(t.end.column=t.start.column+i.value.length,t.closing=l(i,"end-tag-open"),i=r[++a],!i)return null;if(t.tagName=i.value,i.value===""){if(i=r[++a],!i)return null;t.tagName=i.value}for(t.end.column+=i.value.length,a++;a<r.length;a++)if(i=r[a],t.end.column+=i.value.length,l(i,"tag-close")){t.selfClosing=i.value=="/>";break}return t}else if(l(i,"tag-close"))return t.selfClosing=i.value=="/>",t;t.start.column+=i.value.length}return null},this._findEndTagInLine=function(n,s,r,t){for(var a=n.getTokens(s),i=0,u=0;u<a.length;u++){var c=a[u];if(i+=c.value.length,!(i<t-1)&&l(c,"end-tag-open")&&(c=a[u+1],l(c,"tag-name")&&c.value===""&&(c=a[u+2]),c&&c.value==r))return!0}return!1},this.getFoldWidgetRange=function(n,s,r){var t=this._getFirstTagInLine(n,r);if(!t)return this.getCommentFoldWidget(n,r)&&n.getCommentFoldRange(r,n.getLine(r).length);var a=n.getMatchingTags({row:r,column:0});if(a)return new m(a.openTag.end.row,a.openTag.end.column,a.closeTag.start.row,a.closeTag.start.column)}}).call(e.prototype)}),ace.define("ace/mode/xml",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text","ace/mode/xml_highlight_rules","ace/mode/behaviour/xml","ace/mode/folding/xml","ace/worker/worker_client"],function(g,x,f){var p=g("../lib/oop"),m=g("../lib/lang"),d=g("./text").Mode,e=g("./xml_highlight_rules").XmlHighlightRules,o=g("./behaviour/xml").XmlBehaviour,l=g("./folding/xml").FoldMode,n=g("../worker/worker_client").WorkerClient,s=function(){this.HighlightRules=e,this.$behaviour=new o,this.foldingRules=new l};p.inherits(s,d),(function(){this.voidElements=m.arrayToMap([]),this.blockComment={start:"<!--",end:"-->"},this.createWorker=function(r){var t=new n(["ace"],"ace/mode/xml_worker","Worker");return t.attachToDocument(r.getDocument()),t.on("error",function(a){r.setAnnotations(a.data)}),t.on("terminate",function(){r.clearAnnotations()}),t},this.$id="ace/mode/xml"}).call(s.prototype),x.Mode=s}),ace.define("ace/mode/jsdoc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(g,x,f){var p=g("../lib/oop"),m=g("./text_highlight_rules").TextHighlightRules,d=function(){this.$rules={start:[{token:["comment.doc.tag","comment.doc.text","lparen.doc"],regex:"(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:["rparen.doc","text.doc","variable.parameter.doc","lparen.doc","variable.parameter.doc","rparen.doc"],regex:/(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,next:"pop"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","lparen.doc"],regex:"(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|implements|external|exception|throws|enum|define|extends))(\\s*)({)",push:[{token:"lparen.doc",regex:"{",push:[{include:"doc-syntax"},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"}]},{token:"rparen.doc",regex:"}|(?=$)",next:"pop"},{include:"doc-syntax"},{defaultToken:"text.doc"}]},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:'(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|requires|param|implements|function|extends|typedef|mixes|constructor|var|memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#.:/~"\\-]*)?'},{token:["comment.doc.tag","text.doc","variable.parameter.doc"],regex:"(@method)(\\s+)(\\w[\\w.\\(\\)]*)"},{token:"comment.doc.tag",regex:"@access\\s+(?:private|public|protected)"},{token:"comment.doc.tag",regex:"@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"},{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},d.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}],"doc-syntax":[{token:"operator.doc",regex:/[|:]/},{token:"paren.doc",regex:/[\[\]]/}]},this.normalizeRules()};p.inherits(d,m),d.getTagRule=function(e){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},d.getStartRule=function(e){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:e}},d.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},x.JsDocCommentHighlightRules=d}),ace.define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/jsdoc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(g,x,f){var p=g("../lib/oop"),m=g("./jsdoc_comment_highlight_rules").JsDocCommentHighlightRules,d=g("./text_highlight_rules").TextHighlightRules,e="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*",o=function(s){var r={"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|async|await|break|case|catch|continue|default|delete|do|else|finally|for|if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},t=this.createKeywordMapper(r,"identifier"),a="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",i="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u{[0-9a-fA-F]{1,6}}|[0-2][0-7]{0,2}|3[0-7][0-7]?|[4-7][0-7]?|.)",u="(function)(\\s*)(\\*?)",c={token:["identifier","text","paren.lparen"],regex:"(\\b(?!"+Object.values(r).join("|")+"\\b)"+e+")(\\s*)(\\()"};this.$rules={no_regex:[m.getStartRule("doc-start"),n("no_regex"),c,{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+e+")(\\s*)(=)(\\s*)"+u+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))("+e+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","storage.type","text","paren.lparen"],regex:"("+e+")(\\s*)(:)(\\s*)"+u+"(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)"+u+"(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:`from(?=\\s*('|"))`},{token:"keyword",regex:"(?:"+a+")\\b",next:"start"},{token:"support.constant",regex:/that\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/},{token:t,regex:e},{token:"punctuation.operator",regex:/[.](?![.])/,next:"property"},{token:"storage.type",regex:/=>/,next:"start"},{token:"keyword.operator",regex:/--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,next:"start"},{token:"punctuation.operator",regex:/[?:,;.]/,next:"start"},{token:"paren.lparen",regex:/[\[({]/,next:"start"},{token:"paren.rparen",regex:/[\])}]/},{token:"comment",regex:/^#!.*$/}],property:[{token:"text",regex:"\\s+"},{token:"keyword.operator",regex:/=/},{token:["storage.type","text","storage.type","text","paren.lparen"],regex:u+"(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","storage.type","text","text","entity.name.function","text","paren.lparen"],regex:"(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:"punctuation.operator",regex:/[.](?![.])/},{token:"support.function",regex:"prototype"},{token:"support.function",regex:/(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:"support.function.dom",regex:/(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:"support.constant",regex:/(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:"identifier",regex:e},{regex:"",token:"empty",next:"no_regex"}],start:[m.getStartRule("doc-start"),n("start"),{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+|^$",next:"start"},{token:"empty",regex:"",next:"no_regex"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/[sxngimy]*",next:"no_regex"},{token:"invalid",regex:/\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.charclass.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"no_regex"},{defaultToken:"string.regexp.charachterclass"}],default_parameter:[{token:"string",regex:"'(?=.)",push:[{token:"string",regex:"'|$",next:"pop"},{include:"qstring"}]},{token:"string",regex:'"(?=.)',push:[{token:"string",regex:'"|$',next:"pop"},{include:"qqstring"}]},{token:"constant.language",regex:"null|Infinity|NaN|undefined"},{token:"constant.numeric",regex:/0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/},{token:"constant.numeric",regex:/(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/},{token:"punctuation.operator",regex:",",next:"function_arguments"},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],function_arguments:[n("function_arguments"),{token:"variable.parameter",regex:e},{token:"punctuation.operator",regex:","},{token:"text",regex:"\\s+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"no_regex"}],qqstring:[{token:"constant.language.escape",regex:i},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:'"|$',next:"no_regex"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:i},{token:"string",regex:"\\\\$",consumeLineEnd:!0},{token:"string",regex:"'|$",next:"no_regex"},{defaultToken:"string"}]},(!s||!s.noES6)&&(this.$rules.no_regex.unshift({regex:"[{}]",onMatch:function(v,k,h){if(this.next=v=="{"?this.nextState:"",v=="{"&&h.length)h.unshift("start",k);else if(v=="}"&&h.length&&(h.shift(),this.next=h.shift(),this.next.indexOf("string")!=-1||this.next.indexOf("jsx")!=-1))return"paren.quasi.end";return v=="{"?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.quasi.start",regex:/`/,push:[{token:"constant.language.escape",regex:i},{token:"paren.quasi.start",regex:/\${/,push:"start"},{token:"string.quasi.end",regex:/`/,next:"pop"},{defaultToken:"string.quasi"}]},{token:["variable.parameter","text"],regex:"("+e+")(\\s*)(?=\\=>)"},{token:"paren.lparen",regex:"(\\()(?=[^\\(]+\\s*=>)",next:"function_arguments"},{token:"variable.language",regex:"(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"}),this.$rules.function_arguments.unshift({token:"keyword.operator",regex:"=",next:"default_parameter"},{token:"keyword.operator",regex:"\\.{3}"}),this.$rules.property.unshift({token:"support.function",regex:"(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"},{token:"constant.language",regex:"(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"}),(!s||s.jsx!=!1)&&l.call(this)),this.embedRules(m,"doc-",[m.getEndRule("no_regex")]),this.normalizeRules()};p.inherits(o,d);function l(){var s=e.replace("\\d","\\d\\-"),r={onMatch:function(a,i,u){var c=a.charAt(1)=="/"?2:1;return c==1?(i!=this.nextState?u.unshift(this.next,this.nextState,0):u.unshift(this.next),u[2]++):c==2&&i==this.nextState&&(u[1]--,(!u[1]||u[1]<0)&&(u.shift(),u.shift())),[{type:"meta.tag.punctuation."+(c==1?"":"end-")+"tag-open.xml",value:a.slice(0,c)},{type:"meta.tag.tag-name.xml",value:a.substr(c)}]},regex:"</?(?:"+s+"|(?=>))",next:"jsxAttributes",nextState:"jsx"};this.$rules.start.unshift(r);var t={regex:"{",token:"paren.quasi.start",push:"start"};this.$rules.jsx=[t,r,{include:"reference"},{defaultToken:"string.xml"}],this.$rules.jsxAttributes=[{token:"meta.tag.punctuation.tag-close.xml",regex:"/?>",onMatch:function(a,i,u){return i==u[0]&&u.shift(),a.length==2&&(u[0]==this.nextState&&u[1]--,(!u[1]||u[1]<0)&&u.splice(0,2)),this.next=u[0]||"start",[{type:this.token,value:a}]},nextState:"jsx"},t,n("jsxAttributes"),{token:"entity.other.attribute-name.xml",regex:s},{token:"keyword.operator.attribute-equals.xml",regex:"="},{token:"text.tag-whitespace.xml",regex:"\\s+"},{token:"string.attribute-value.xml",regex:"'",stateName:"jsx_attr_q",push:[{token:"string.attribute-value.xml",regex:"'",next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},{token:"string.attribute-value.xml",regex:'"',stateName:"jsx_attr_qq",push:[{token:"string.attribute-value.xml",regex:'"',next:"pop"},{include:"reference"},{defaultToken:"string.attribute-value.xml"}]},r],this.$rules.reference=[{token:"constant.language.escape.reference.xml",regex:"(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"}]}function n(s){return[{token:"comment",regex:/\/\*/,next:[m.getTagRule(),{token:"comment",regex:"\\*\\/",next:s||"pop"},{defaultToken:"comment",caseInsensitive:!0}]},{token:"comment",regex:"\\/\\/",next:[m.getTagRule(),{token:"comment",regex:"$|^",next:s||"pop"},{defaultToken:"comment",caseInsensitive:!0}]}]}x.JavaScriptHighlightRules=o}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(g,x,f){var p=g("../range").Range,m=function(){};(function(){this.checkOutdent=function(d,e){return/^\s+$/.test(d)?/^\s*\}/.test(e):!1},this.autoOutdent=function(d,e){var o=d.getLine(e),l=o.match(/^(\s*\})/);if(!l)return 0;var n=l[1].length,s=d.findMatchingBracket({row:e,column:n});if(!s||s.row==e)return 0;var r=this.$getIndent(d.getLine(s.row));d.replace(new p(e,0,e,n-1),r)},this.$getIndent=function(d){return d.match(/^\s*/)[0]}}).call(m.prototype),x.MatchingBraceOutdent=m}),ace.define("ace/mode/behaviour/javascript",["require","exports","module","ace/lib/oop","ace/token_iterator","ace/mode/behaviour/cstyle","ace/mode/behaviour/xml"],function(g,x,f){var p=g("../../lib/oop"),m=g("../../token_iterator").TokenIterator,d=g("../behaviour/cstyle").CstyleBehaviour,e=g("../behaviour/xml").XmlBehaviour,o=function(){var l=new e({closeCurlyBraces:!0}).getBehaviours();this.addBehaviours(l),this.inherit(d),this.add("autoclosing-fragment","insertion",function(n,s,r,t,a){if(a==">"){var i=r.getSelectionRange().start,u=new m(t,i.row,i.column),c=u.getCurrentToken()||u.stepBackward();if(!c)return;if(c.value=="<")return{text:"></>",selection:[1,1]}}})};p.inherits(o,d),x.JavaScriptBehaviour=o}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(g,x,f){var p=g("../../lib/oop"),m=g("../../range").Range,d=g("./fold_mode").FoldMode,e=x.FoldMode=function(o){o&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+o.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+o.end)))};p.inherits(e,d),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(o,l,n){var s=o.getLine(n);if(this.singleLineBlockCommentRe.test(s)&&!this.startRegionRe.test(s)&&!this.tripleStarBlockCommentRe.test(s))return"";var r=this._getFoldWidgetBase(o,l,n);return!r&&this.startRegionRe.test(s)?"start":r},this.getFoldWidgetRange=function(o,l,n,s){var r=o.getLine(n);if(this.startRegionRe.test(r))return this.getCommentRegionBlock(o,r,n);var i=r.match(this.foldingStartMarker);if(i){var t=i.index;if(i[1])return this.openingBracketBlock(o,i[1],n,t);var a=o.getCommentFoldRange(n,t+i[0].length,1);return a&&!a.isMultiLine()&&(s?a=this.getSectionRange(o,n):l!="all"&&(a=null)),a}if(l!=="markbegin"){var i=r.match(this.foldingStopMarker);if(i){var t=i.index+i[0].length;return i[1]?this.closingBracketBlock(o,i[1],n,t):o.getCommentFoldRange(n,t,-1)}}},this.getSectionRange=function(o,l){var n=o.getLine(l),s=n.search(/\S/),r=l,t=n.length;l=l+1;for(var a=l,i=o.getLength();++l<i;){n=o.getLine(l);var u=n.search(/\S/);if(u!==-1){if(s>u)break;var c=this.getFoldWidgetRange(o,"all",l);if(c){if(c.start.row<=r)break;if(c.isMultiLine())l=c.end.row;else if(s==u)break}a=l}}return new m(r,t,a,o.getLine(a).length)},this.getCommentRegionBlock=function(o,l,n){for(var s=l.search(/\s*$/),r=o.getLength(),t=n,a=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,i=1;++n<r;){l=o.getLine(n);var u=a.exec(l);if(u&&(u[1]?i--:i++,!i))break}var c=n;if(c>t)return new m(t,s,c,l.length)}}).call(e.prototype)}),ace.define("ace/mode/folding/javascript",["require","exports","module","ace/lib/oop","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(g,x,f){var p=g("../../lib/oop"),m=g("./xml").FoldMode,d=g("./cstyle").FoldMode,e=x.FoldMode=function(o){o&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+o.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+o.end))),this.xmlFoldMode=new m};p.inherits(e,d),(function(){this.getFoldWidgetRangeBase=this.getFoldWidgetRange,this.getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(o,l,n){var s=this.getFoldWidgetBase(o,l,n);return s||this.xmlFoldMode.getFoldWidget(o,l,n)},this.getFoldWidgetRange=function(o,l,n,s){var r=this.getFoldWidgetRangeBase(o,l,n,s);return r||this.xmlFoldMode.getFoldWidgetRange(o,l,n)}}).call(e.prototype)}),ace.define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/worker/worker_client","ace/mode/behaviour/javascript","ace/mode/folding/javascript"],function(g,x,f){var p=g("../lib/oop"),m=g("./text").Mode,d=g("./javascript_highlight_rules").JavaScriptHighlightRules,e=g("./matching_brace_outdent").MatchingBraceOutdent,o=g("../worker/worker_client").WorkerClient,l=g("./behaviour/javascript").JavaScriptBehaviour,n=g("./folding/javascript").FoldMode,s=function(){this.HighlightRules=d,this.$outdent=new e,this.$behaviour=new l,this.foldingRules=new n};p.inherits(s,m),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.$quotes={'"':'"',"'":"'","`":"`"},this.$pairQuotesAfter={"`":/\w/},this.getNextLineIndent=function(r,t,a){var i=this.$getIndent(t),u=this.getTokenizer().getLineTokens(t,r),c=u.tokens,v=u.state;if(c.length&&c[c.length-1].type=="comment")return i;if(r=="start"||r=="no_regex"){var k=t.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);k&&(i+=a)}else if(r=="doc-start"&&(v=="start"||v=="no_regex"))return"";return i},this.checkOutdent=function(r,t,a){return this.$outdent.checkOutdent(t,a)},this.autoOutdent=function(r,t,a){this.$outdent.autoOutdent(t,a)},this.createWorker=function(r){var t=new o(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return t.attachToDocument(r.getDocument()),t.on("annotate",function(a){r.setAnnotations(a.data)}),t.on("terminate",function(){r.clearAnnotations()}),t},this.$id="ace/mode/javascript",this.snippetFileId="ace/snippets/javascript"}).call(s.prototype),x.Mode=s}),ace.define("ace/mode/svg_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/javascript_highlight_rules","ace/mode/xml_highlight_rules"],function(g,x,f){var p=g("../lib/oop"),m=g("./javascript_highlight_rules").JavaScriptHighlightRules,d=g("./xml_highlight_rules").XmlHighlightRules,e=function(){d.call(this),this.embedTagRules(m,"js-","script"),this.normalizeRules()};p.inherits(e,d),x.SvgHighlightRules=e}),ace.define("ace/mode/folding/mixed",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(g,x,f){var p=g("../../lib/oop"),m=g("./fold_mode").FoldMode,d=x.FoldMode=function(e,o){this.defaultMode=e,this.subModes=o};p.inherits(d,m),(function(){this.$getMode=function(e){typeof e!="string"&&(e=e[0]);for(var o in this.subModes)if(e.indexOf(o)===0)return this.subModes[o];return null},this.$tryMode=function(e,o,l,n){var s=this.$getMode(e);return s?s.getFoldWidget(o,l,n):""},this.getFoldWidget=function(e,o,l){return this.$tryMode(e.getState(l-1),e,o,l)||this.$tryMode(e.getState(l),e,o,l)||this.defaultMode.getFoldWidget(e,o,l)},this.getFoldWidgetRange=function(e,o,l){var n=this.$getMode(e.getState(l-1));return(!n||!n.getFoldWidget(e,o,l))&&(n=this.$getMode(e.getState(l))),(!n||!n.getFoldWidget(e,o,l))&&(n=this.defaultMode),n.getFoldWidgetRange(e,o,l)}}).call(d.prototype)}),ace.define("ace/mode/svg",["require","exports","module","ace/lib/oop","ace/mode/xml","ace/mode/javascript","ace/mode/svg_highlight_rules","ace/mode/folding/mixed","ace/mode/folding/xml","ace/mode/folding/cstyle"],function(g,x,f){var p=g("../lib/oop"),m=g("./xml").Mode,d=g("./javascript").Mode,e=g("./svg_highlight_rules").SvgHighlightRules,o=g("./folding/mixed").FoldMode,l=g("./folding/xml").FoldMode,n=g("./folding/cstyle").FoldMode,s=function(){m.call(this),this.HighlightRules=e,this.createModeDelegates({"js-":d}),this.foldingRules=new o(new l,{"js-":new n})};p.inherits(s,m),(function(){this.getNextLineIndent=function(r,t,a){return this.$getIndent(t)},this.$id="ace/mode/svg"}).call(s.prototype),x.Mode=s}),function(){ace.require(["ace/mode/svg"],function(g){y&&(y.exports=g)})}()}(w)),w.exports}var T=C();const I=F(T),A=S({__proto__:null,default:I},[T]);export{A as m};
