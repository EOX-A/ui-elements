import{g as P}from"./index-DuuuSFPv.js";function j(m,E){for(var s=0;s<E.length;s++){const u=E[s];if(typeof u!="string"&&!Array.isArray(u)){for(const b in u)if(b!=="default"&&!(b in m)){const g=Object.getOwnPropertyDescriptor(u,b);g&&Object.defineProperty(m,b,g.get?g:{enumerable:!0,get:()=>u[b]})}}}return Object.freeze(Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}))}var F={exports:{}},N;function W(){return N||(N=1,function(m,E){ace.define("ace/mode/vbscript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(s,u,b){var g=s("../lib/oop"),y=s("./text_highlight_rules").TextHighlightRules,p=function(){var C=this.createKeywordMapper({"keyword.control.asp":"If|Then|Else|ElseIf|End|While|Wend|For|To|Each|Case|Select|Return|Continue|Do|Until|Loop|Next|With|Exit|Function|Property|Type|Enum|Sub|IIf|Class","storage.type.asp":"Dim|Call|Const|Redim|Set|Let|Get|New|Randomize|Option|Explicit|Preserve|Erase|Execute|ExecuteGlobal","storage.modifier.asp":"Private|Public|Default","keyword.operator.asp":"Mod|And|Not|Or|Xor|As|Eqv|Imp|Is","constant.language.asp":"Empty|False|Nothing|Null|True","variable.language.vb.asp":"Me","support.class.vb.asp":"RegExp","support.class.asp":"Application|ObjectContext|Request|Response|Server|Session","support.class.collection.asp":"Contents|StaticObjects|ClientCertificate|Cookies|Form|QueryString|ServerVariables","support.constant.asp":"TotalBytes|Buffer|CacheControl|Charset|ContentType|Expires|ExpiresAbsolute|IsClientConnected|PICS|Status|ScriptTimeout|CodePage|LCID|SessionID|Timeout","support.function.asp":"Lock|Unlock|SetAbort|SetComplete|BinaryRead|AddHeader|AppendToLog|BinaryWrite|Clear|Flush|Redirect|Write|CreateObject|HTMLEncode|MapPath|URLEncode|Abandon|Convert|Regex","support.function.event.asp":"Application_OnEnd|Application_OnStart|OnTransactionAbort|OnTransactionCommit|Session_OnEnd|Session_OnStart","support.function.vb.asp":"Array|Add|Asc|Atn|CBool|CByte|CCur|CDate|CDbl|Chr|CInt|CLng|Conversions|Cos|CreateObject|CSng|CStr|Date|DateAdd|DateDiff|DatePart|DateSerial|DateValue|Day|Derived|Math|Escape|Eval|Exists|Exp|Filter|FormatCurrency|FormatDateTime|FormatNumber|FormatPercent|GetLocale|GetObject|GetRef|Hex|Hour|InputBox|InStr|InStrRev|Int|Fix|IsArray|IsDate|IsEmpty|IsNull|IsNumeric|IsObject|Item|Items|Join|Keys|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|RTrim|Trim|Maths|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Remove|RemoveAll|Replace|RGB|Right|Rnd|Round|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion|ScriptEngineMinorVersion|Second|SetLocale|Sgn|Sin|Space|Split|Sqr|StrComp|String|StrReverse|Tan|Time|Timer|TimeSerial|TimeValue|TypeName|UBound|UCase|Unescape|VarType|Weekday|WeekdayName|Year|AscB|AscW|ChrB|ChrW|InStrB|LeftB|LenB|MidB|RightB|Abs|GetUILanguage","support.type.vb.asp":"vbTrue|vbFalse|vbCr|vbCrLf|vbFormFeed|vbLf|vbNewLine|vbNullChar|vbNullString|vbTab|vbVerticalTab|vbBinaryCompare|vbTextCompare|vbSunday|vbMonday|vbTuesday|vbWednesday|vbThursday|vbFriday|vbSaturday|vbUseSystemDayOfWeek|vbFirstJan1|vbFirstFourDays|vbFirstFullWeek|vbGeneralDate|vbLongDate|vbShortDate|vbLongTime|vbShortTime|vbObjectError|vbEmpty|vbNull|vbInteger|vbLong|vbSingle|vbDouble|vbCurrency|vbDate|vbString|vbObject|vbError|vbBoolean|vbVariant|vbDataObject|vbDecimal|vbByte|vbArray|vbOKOnly|vbOKCancel|vbAbortRetryIgnore|vbYesNoCancel|vbYesNo|vbRetryCancel|vbCritical|vbQuestion|vbExclamation|vbInformation|vbDefaultButton1|vbDefaultButton2|vbDefaultButton3|vbDefaultButton4|vbApplicationModal|vbSystemModal|vbOK|vbCancel|vbAbort|vbRetry|vbIgnore|vbYes|vbNo|vbUseDefault"},"identifier",!0);this.$rules={start:[{token:["meta.ending-space"],regex:"$"},{token:[null],regex:"^(?=\\t)",next:"state_3"},{token:[null],regex:"^(?= )",next:"state_4"},{token:["text","storage.type.function.asp","text","entity.name.function.asp","text","punctuation.definition.parameters.asp","variable.parameter.function.asp","punctuation.definition.parameters.asp"],regex:"^(\\s*)(Function|Sub)(\\s+)([a-zA-Z_]\\w*)(\\s*)(\\()([^)]*)(\\))"},{token:"punctuation.definition.comment.asp",regex:"'|REM(?=\\s|$)",next:"comment",caseInsensitive:!0},{token:"storage.type.asp",regex:"On\\s+Error\\s+(?:Resume\\s+Next|GoTo)\\b",caseInsensitive:!0},{token:"punctuation.definition.string.begin.asp",regex:'"',next:"string"},{token:["punctuation.definition.variable.asp"],regex:"(\\$)[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b\\s*"},{token:"constant.numeric.asp",regex:"-?\\b(?:(?:0(?:x|X)[0-9a-fA-F]*)|(?:(?:[0-9]+\\.?[0-9]*)|(?:\\.[0-9]+))(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"},{regex:"\\w+",token:C},{token:["entity.name.function.asp"],regex:"(?:(\\b[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b)(?=\\(\\)?))"},{token:["keyword.operator.asp"],regex:"\\-|\\+|\\*|\\/|\\>|\\<|\\=|\\&|\\\\|\\^"}],state_3:[{token:["meta.odd-tab.tabs","meta.even-tab.tabs"],regex:"(\\t)(\\t)?"},{token:"meta.leading-space",regex:"(?=[^\\t])",next:"start"},{token:"meta.leading-space",regex:".",next:"state_3"}],state_4:[{token:["meta.odd-tab.spaces","meta.even-tab.spaces"],regex:"(  )(  )?"},{token:"meta.leading-space",regex:"(?=[^ ])",next:"start"},{defaultToken:"meta.leading-space"}],comment:[{token:"comment.line.apostrophe.asp",regex:"$",next:"start"},{defaultToken:"comment.line.apostrophe.asp"}],string:[{token:"constant.character.escape.apostrophe.asp",regex:'""'},{token:"string.quoted.double.asp",regex:'"',next:"start"},{defaultToken:"string.quoted.double.asp"}]}};g.inherits(p,y),u.VBScriptHighlightRules=p}),ace.define("ace/mode/folding/vbscript",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range","ace/token_iterator"],function(s,u,b){var g=s("../../lib/oop"),y=s("./fold_mode").FoldMode,p=s("../../range").Range,C=s("../../token_iterator").TokenIterator,w=u.FoldMode=function(){};g.inherits(w,y),(function(){this.indentKeywords={class:1,function:1,sub:1,if:1,select:1,do:1,for:1,while:1,with:1,property:1,else:1,elseif:1,end:-1,loop:-1,next:-1,wend:-1},this.foldingStartMarker=/(?:\s|^)(class|function|sub|if|select|do|for|while|with|property|else|elseif)\b/i,this.foldingStopMarker=/\b(end|loop|next|wend)\b/i,this.getFoldWidgetRange=function(i,I,f){var o=i.getLine(f),e=this.foldingStartMarker.test(o),a=this.foldingStopMarker.test(o);if(e||a){var t=a?this.foldingStopMarker.exec(o):this.foldingStartMarker.exec(o),n=t&&t[1].toLowerCase();if(n){var r=i.getTokenAt(f,t.index+2).type;if(r==="keyword.control.asp"||r==="storage.type.function.asp")return this.vbsBlock(i,f,t.index+2)}}},this.getFoldWidget=function(i,I,f){var o=i.getLine(f),e=this.foldingStartMarker.test(o),a=this.foldingStopMarker.test(o);if(e&&!a){var t=this.foldingStartMarker.exec(o),n=t&&t[1].toLowerCase();if(n){var r=i.getTokenAt(f,t.index+2).type;if(r=="keyword.control.asp"||r=="storage.type.function.asp")return n=="if"&&!/then\s*('|$)/i.test(o)?"":"start"}}return""},this.vbsBlock=function(i,d,f,o){var e=new C(i,d,f),a={class:1,function:1,sub:1,if:1,select:1,with:1,property:1,else:1,elseif:1},t=e.getCurrentToken();if(!(!t||t.type!="keyword.control.asp"&&t.type!="storage.type.function.asp")){var n=t.value.toLowerCase(),r=t.value.toLowerCase(),l=[r],h=this.indentKeywords[r];if(h){var v=e.getCurrentTokenRange();switch(r){case"property":case"sub":case"function":case"if":case"select":case"do":case"for":case"class":case"while":case"with":var k=i.getLine(d),B=/^\s*If\s+.*\s+Then(?!')\s+(?!')\S/i.test(k);if(B)return;var A=new RegExp("(?:^|\\s)"+r,"i"),D=/^\s*End\s(If|Sub|Select|Function|Class|With|Property)\s*/i.test(k);if(!A.test(k)&&!D)return;if(D){var o=e.getCurrentTokenRange();e.step=e.stepBackward,e.step(),e.step(),t=e.getCurrentToken(),t&&(r=t.value.toLowerCase(),r=="end"&&(v=e.getCurrentTokenRange(),v=new p(v.start.row,v.start.column,o.start.row,o.end.column))),h=-1}break;case"end":var S=e.getCurrentTokenPosition();if(v=e.getCurrentTokenRange(),e.step=e.stepForward,e.step(),e.step(),t=e.getCurrentToken(),t&&(r=t.value.toLowerCase(),r in a)){n=r;var T=e.getCurrentTokenPosition(),L=T.column+r.length;v=new p(S.row,S.column,T.row,L)}e.step=e.stepBackward,e.step(),e.step();break}var O=h===-1?i.getLine(d-1).length:i.getLine(d).length,_=d,c=[];for(c.push(v),e.step=h===-1?e.stepBackward:e.stepForward;t=e.step();){var R=null,M=!1;if(!(t.type!="keyword.control.asp"&&t.type!="storage.type.function.asp")){r=t.value.toLowerCase();var x=h*this.indentKeywords[r];switch(r){case"property":case"sub":case"function":case"if":case"select":case"do":case"for":case"class":case"while":case"with":var k=i.getLine(e.getCurrentTokenRow()),B=/^\s*If\s+.*\s+Then(?!')\s+(?!')\S/i.test(k);B&&(x=0,M=!0);var A=new RegExp("^\\s* end\\s+"+r,"i");A.test(k)&&(x=0,M=!0);break;case"elseif":case"else":x=0,n!="elseif"&&(M=!0);break}if(x>0)l.unshift(r);else if(x<=0&&M===!1){if(l.shift(),!l.length){switch(r){case"end":var S=e.getCurrentTokenPosition();if(R=e.getCurrentTokenRange(),e.step(),e.step(),t=e.getCurrentToken(),t)if(r=t.value.toLowerCase(),r in a){n=="else"||n=="elseif"?r!=="if"&&c.shift():r!=n&&c.shift();var T=e.getCurrentTokenPosition(),L=T.column+r.length;R=new p(S.row,S.column,T.row,L)}else c.shift();else c.shift();e.step=e.stepBackward,e.step(),e.step(),t=e.getCurrentToken(),r=t.value.toLowerCase();break;case"select":case"sub":case"if":case"function":case"class":case"with":case"property":r!=n&&c.shift();break;case"do":n!="loop"&&c.shift();break;case"loop":n!="do"&&c.shift();break;case"for":n!="next"&&c.shift();break;case"next":n!="for"&&c.shift();break;case"while":n!="wend"&&c.shift();break;case"wend":n!="while"&&c.shift();break}break}x===0&&l.unshift(r)}}}if(!t)return null;if(o)return R?c.push(R):c.push(e.getCurrentTokenRange()),c;var d=e.getCurrentTokenRow();if(h===-1){var L=i.getLine(d).length;return new p(d,L,_-1,O)}else return new p(_,O,d-1,i.getLine(d-1).length)}}}}).call(w.prototype)}),ace.define("ace/mode/vbscript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/vbscript_highlight_rules","ace/mode/folding/vbscript","ace/range"],function(s,u,b){var g=s("../lib/oop"),y=s("./text").Mode,p=s("./vbscript_highlight_rules").VBScriptHighlightRules,C=s("./folding/vbscript").FoldMode,w=s("../range").Range,i=function(){this.HighlightRules=p,this.foldingRules=new C,this.$behaviour=this.$defaultBehaviour,this.indentKeywords=this.foldingRules.indentKeywords};g.inherits(i,y),(function(){this.lineCommentStart=["'","REM"];var I=["else","elseif","end","loop","next","wend"];function f(o,e,a){for(var t=0,n=0;n<o.length;n++){var r=o[n];if(r.type=="keyword.control.asp"||r.type=="storage.type.function.asp"){var l=r.value.toLowerCase();if(l in a)switch(l){case"property":case"sub":case"function":case"select":case"do":case"for":case"class":case"while":case"with":case"if":var h=new RegExp("^\\s* end\\s+"+l,"i"),v=/^\s*If\s+.*\s+Then(?!')\s+(?!')\S/i.test(e);!v&&!h.test(e)&&(t+=a[l]);break;default:t+=a[l];break}}}return t<0?-1:t>0?1:0}this.getNextLineIndent=function(o,e,a){var t=this.$getIndent(e),n=0,r=this.getTokenizer().getLineTokens(e,o),l=r.tokens;return o=="start"&&(n=f(l,e,this.indentKeywords)),n>0?t+a:n<0&&t.substr(t.length-a.length)==a&&!this.checkOutdent(o,e,`
`)?t.substr(0,t.length-a.length):t},this.checkOutdent=function(o,e,a){if(a!=`
`&&a!="\r"&&a!=`\r
`)return!1;var t=this.getTokenizer().getLineTokens(e.trim(),o).tokens;if(!t||!t.length)return!1;var n=t[0].value.toLowerCase();return(t[0].type=="keyword.control.asp"||t[0].type=="storage.type.function.asp")&&I.indexOf(n)!=-1},this.getMatching=function(o,e,a,t){if(e==null){var n=o.selection.lead;a=n.column,e=n.row}t==null&&(t=!0);var r=o.getTokenAt(e,a);if(r){var l=r.value.toLowerCase();if(l in this.indentKeywords)return this.foldingRules.vbsBlock(o,e,a,t)}},this.autoOutdent=function(o,e,a){var t=e.getLine(a),n=t.match(/^\s*/)[0].length;if(!(!n||!a)){var r=this.getMatching(e,a,n+1,!1);if(!(!r||r.start.row==a)){var l=this.$getIndent(e.getLine(r.start.row));l.length!=n&&(e.replace(new w(a,0,a,n),l),e.outdentRows(new w(a+1,0,a+1,0)))}}},this.$id="ace/mode/vbscript"}).call(i.prototype),u.Mode=i}),function(){ace.require(["ace/mode/vbscript"],function(s){m&&(m.exports=s)})}()}(F)),F.exports}var V=W();const $=P(V),K=j({__proto__:null,default:$},[V]);export{K as m};
