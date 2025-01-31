import{g as b}from"./index-DuuuSFPv.js";function y(p,x){for(var o=0;o<x.length;o++){const a=x[o];if(typeof a!="string"&&!Array.isArray(a)){for(const f in a)if(f!=="default"&&!(f in p)){const u=Object.getOwnPropertyDescriptor(a,f);u&&Object.defineProperty(p,f,u.get?u:{enumerable:!0,get:()=>a[f]})}}}return Object.freeze(Object.defineProperty(p,Symbol.toStringTag,{value:"Module"}))}var k={exports:{}},v;function A(){return v||(v=1,function(p,x){ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(o,a,f){var u=o("../lib/oop"),h=o("./text_highlight_rules").TextHighlightRules,d=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},d.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};u.inherits(d,h),d.getTagRule=function(c){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},d.getStartRule=function(c){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:c}},d.getEndRule=function(c){return{token:"comment.doc",regex:"\\*\\/",next:c}},a.DocCommentHighlightRules=d}),ace.define("ace/mode/asl_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(o,a,f){var u=o("../lib/oop"),h=o("./doc_comment_highlight_rules").DocCommentHighlightRules,d=o("./text_highlight_rules").TextHighlightRules,c=function(){var e="Default|DefinitionBlock|Device|Method|Else|ElseIf|For|Function|If|Include|Method|Return|Scope|Switch|Case|While|Break|BreakPoint|Continue|NoOp|Wait|True|False|AccessAs|Acquire|Alias|BankField|Buffer|Concatenate|ConcatenateResTemplate|CondRefOf|Connection|CopyObject|CreateBitField|CreateByteField|CreateDWordField|CreateField|CreateQWordField|CreateWordField|DataTableRegion|Debug|DMA|DWordIO|DWordMemory|DWordSpace|EisaId|EISAID|EndDependentFn|Event|ExtendedIO|ExtendedMemory|ExtendedSpace|External|Fatal|Field|FindSetLeftBit|FindSetRightBit|FixedDMA|FixedIO|Fprintf|FromBCD|GpioInt|GpioIo|I2CSerialBusV2|IndexField|Interrupt|IO|IRQ|IRQNoFlags|Load|LoadTable|Match|Memory32|Memory32Fixed|Mid|Mutex|Name|Notify|Offset|ObjectType|OperationRegion|Package|PowerResource|Printf|QWordIO|QWordMemory|QWordSpace|RawDataBuffer|Register|Release|Reset|ResourceTemplate|Signal|SizeOf|Sleep|SPISerialBusV2|Stall|StartDependentFn|StartDependentFnNoPri|Store|ThermalZone|Timer|ToBCD|ToBuffer|ToDecimalString|ToInteger|ToPLD|ToString|ToUUID|UARTSerialBusV2|Unicode|Unload|VendorLong|VendorShort|WordBusNumber|WordIO|WordSpace",t="Add|And|Decrement|Divide|Increment|Index|LAnd|LEqual|LGreater|LGreaterEqual|LLess|LLessEqual|LNot|LNotEqual|LOr|Mod|Multiply|NAnd|NOr|Not|Or|RefOf|Revision|ShiftLeft|ShiftRight|Subtract|XOr|DerefOf",r="AttribQuick|AttribSendReceive|AttribByte|AttribBytes|AttribRawBytes|AttribRawProcessBytes|AttribWord|AttribBlock|AttribProcessCall|AttribBlockProcessCall|AnyAcc|ByteAcc|WordAcc|DWordAcc|QWordAcc|BufferAcc|AddressRangeMemory|AddressRangeReserved|AddressRangeNVS|AddressRangeACPI|RegionSpaceKeyword|FFixedHW|PCC|AddressingMode7Bit|AddressingMode10Bit|DataBitsFive|DataBitsSix|DataBitsSeven|DataBitsEight|DataBitsNine|BusMaster|NotBusMaster|ClockPhaseFirst|ClockPhaseSecond|ClockPolarityLow|ClockPolarityHigh|SubDecode|PosDecode|BigEndianing|LittleEndian|FlowControlNone|FlowControlXon|FlowControlHardware|Edge|Level|ActiveHigh|ActiveLow|ActiveBoth|Decode16|Decode10|IoRestrictionNone|IoRestrictionInputOnly|IoRestrictionOutputOnly|IoRestrictionNoneAndPreserve|Lock|NoLock|MTR|MEQ|MLE|MLT|MGE|MGT|MaxFixed|MaxNotFixed|Cacheable|WriteCombining|Prefetchable|NonCacheable|MinFixed|MinNotFixed|ParityTypeNone|ParityTypeSpace|ParityTypeMark|ParityTypeOdd|ParityTypeEven|PullDefault|PullUp|PullDown|PullNone|PolarityHigh|PolarityLow|ISAOnlyRanges|NonISAOnlyRanges|EntireRange|ReadWrite|ReadOnly|UserDefRegionSpace|SystemIO|SystemMemory|PCI_Config|EmbeddedControl|SMBus|SystemCMOS|PciBarTarget|IPMI|GeneralPurposeIO|GenericSerialBus|ResourceConsumer|ResourceProducer|Serialized|NotSerialized|Shared|Exclusive|SharedAndWake|ExclusiveAndWake|ControllerInitiated|DeviceInitiated|StopBitsZero|StopBitsOne|StopBitsOnePlusHalf|StopBitsTwo|Width8Bit|Width16Bit|Width32Bit|Width64Bit|Width128Bit|Width256Bit|SparseTranslation|DenseTranslation|TypeTranslation|TypeStatic|Preserve|WriteAsOnes|WriteAsZeros|Transfer8|Transfer16|Transfer8_16|ThreeWireMode|FourWireMode",l="UnknownObj|IntObj|StrObj|BuffObj|PkgObj|FieldUnitObj|DeviceObj|EventObj|MethodObj|MutexObj|OpRegionObj|PowerResObj|ProcessorObj|ThermalZoneObj|BuffFieldObj|DDBHandleObj",n="__FILE__|__PATH__|__LINE__|__DATE__|__IASL__",g="One|Ones|Zero",s="Memory24|Processor",i=this.createKeywordMapper({keyword:e,"constant.numeric":g,"keyword.operator":t,"constant.language":n,"storage.type":l,"constant.library":r,"invalid.deprecated":s},"identifier");this.$rules={start:[{token:"comment",regex:"\\/\\/.*$"},h.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},h.getStartRule("doc-start"),{token:"comment",regex:"\\[",next:"ignoredfield"},{token:"variable",regex:"\\Local[0-7]|\\Arg[0-6]"},{token:"keyword",regex:"#\\s*(?:define|elif|else|endif|error|if|ifdef|ifndef|include|includebuffer|line|pragma|undef|warning)\\b",next:"directive"},{token:"string",regex:'["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'},{token:"constant.character",regex:"['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[0-9]+\b/},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:/[!\~\*\/%+-<>\^|=&]/},{token:"lparen",regex:"[[({]"},{token:"rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],ignoredfield:[{token:"comment",regex:"\\]",next:"start"},{defaultToken:"comment"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>*s",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]*s',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(h,"doc-",[h.getEndRule("start")])};u.inherits(c,d),a.ASLHighlightRules=c}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(o,a,f){var u=o("../../lib/oop"),h=o("../../range").Range,d=o("./fold_mode").FoldMode,c=a.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};u.inherits(c,d),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,r){var l=e.getLine(r);if(this.singleLineBlockCommentRe.test(l)&&!this.startRegionRe.test(l)&&!this.tripleStarBlockCommentRe.test(l))return"";var n=this._getFoldWidgetBase(e,t,r);return!n&&this.startRegionRe.test(l)?"start":n},this.getFoldWidgetRange=function(e,t,r,l){var n=e.getLine(r);if(this.startRegionRe.test(n))return this.getCommentRegionBlock(e,n,r);var i=n.match(this.foldingStartMarker);if(i){var g=i.index;if(i[1])return this.openingBracketBlock(e,i[1],r,g);var s=e.getCommentFoldRange(r,g+i[0].length,1);return s&&!s.isMultiLine()&&(l?s=this.getSectionRange(e,r):t!="all"&&(s=null)),s}if(t!=="markbegin"){var i=n.match(this.foldingStopMarker);if(i){var g=i.index+i[0].length;return i[1]?this.closingBracketBlock(e,i[1],r,g):e.getCommentFoldRange(r,g,-1)}}},this.getSectionRange=function(e,t){var r=e.getLine(t),l=r.search(/\S/),n=t,g=r.length;t=t+1;for(var s=t,i=e.getLength();++t<i;){r=e.getLine(t);var R=r.search(/\S/);if(R!==-1){if(l>R)break;var m=this.getFoldWidgetRange(e,"all",t);if(m){if(m.start.row<=n)break;if(m.isMultiLine())t=m.end.row;else if(l==R)break}s=t}}return new h(n,g,s,e.getLine(s).length)},this.getCommentRegionBlock=function(e,t,r){for(var l=t.search(/\s*$/),n=e.getLength(),g=r,s=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,i=1;++r<n;){t=e.getLine(r);var R=s.exec(t);if(R&&(R[1]?i--:i++,!i))break}var m=r;if(m>g)return new h(g,l,m,t.length)}}).call(c.prototype)}),ace.define("ace/mode/asl",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/asl_highlight_rules","ace/mode/folding/cstyle"],function(o,a,f){var u=o("../lib/oop"),h=o("./text").Mode,d=o("./asl_highlight_rules").ASLHighlightRules,c=o("./folding/cstyle").FoldMode,e=function(){this.HighlightRules=d,this.foldingRules=new c,this.$behaviour=this.$defaultBehaviour};u.inherits(e,h),(function(){this.$id="ace/mode/asl"}).call(e.prototype),a.Mode=e}),function(){ace.require(["ace/mode/asl"],function(o){p&&(p.exports=o)})}()}(k)),k.exports}var S=A();const B=b(S),O=y({__proto__:null,default:B},[S]);export{O as m};
