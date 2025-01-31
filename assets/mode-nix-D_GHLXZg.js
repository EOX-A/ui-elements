import{g as _}from"./index-DuuuSFPv.js";function y(x,v){for(var n=0;n<v.length;n++){const g=v[n];if(typeof g!="string"&&!Array.isArray(g)){for(const h in g)if(h!=="default"&&!(h in x)){const m=Object.getOwnPropertyDescriptor(g,h);m&&Object.defineProperty(x,h,m.get?m:{enumerable:!0,get:()=>g[h]})}}}return Object.freeze(Object.defineProperty(x,Symbol.toStringTag,{value:"Module"}))}var k={exports:{}},w;function R(){return w||(w=1,function(x,v){ace.define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(n,g,h){var m=n("../lib/oop"),f=n("./text_highlight_rules").TextHighlightRules,a=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@\\w+(?=\\s|$)"},a.getTagRule(),{defaultToken:"comment.doc.body",caseInsensitive:!0}]}};m.inherits(a,f),a.getTagRule=function(i){return{token:"comment.doc.tag.storage.type",regex:"\\b(?:TODO|FIXME|XXX|HACK)\\b"}},a.getStartRule=function(i){return{token:"comment.doc",regex:/\/\*\*(?!\/)/,next:i}},a.getEndRule=function(i){return{token:"comment.doc",regex:"\\*\\/",next:i}},g.DocCommentHighlightRules=a}),ace.define("ace/mode/c_cpp_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(n,g,h){var m=n("../lib/oop"),f=n("./doc_comment_highlight_rules").DocCommentHighlightRules,a=n("./text_highlight_rules").TextHighlightRules,i=g.cFunctions="hypot|hypotf|hypotl|sscanf|system|snprintf|scanf|scalbn|scalbnf|scalbnl|scalbln|scalblnf|scalblnl|sin|sinh|sinhf|sinhl|sinf|sinl|signal|signbit|strstr|strspn|strncpy|strncat|strncmp|strcspn|strchr|strcoll|strcpy|strcat|strcmp|strtoimax|strtod|strtoul|strtoull|strtoumax|strtok|strtof|strtol|strtold|strtoll|strerror|strpbrk|strftime|strlen|strrchr|strxfrm|sprintf|setjmp|setvbuf|setlocale|setbuf|sqrt|sqrtf|sqrtl|swscanf|swprintf|srand|nearbyint|nearbyintf|nearbyintl|nexttoward|nexttowardf|nexttowardl|nextafter|nextafterf|nextafterl|nan|nanf|nanl|csin|csinh|csinhf|csinhl|csinf|csinl|csqrt|csqrtf|csqrtl|ccos|ccosh|ccoshf|ccosf|ccosl|cimag|cimagf|cimagl|ctime|ctan|ctanh|ctanhf|ctanhl|ctanf|ctanl|cos|cosh|coshf|coshl|cosf|cosl|conj|conjf|conjl|copysign|copysignf|copysignl|cpow|cpowf|cpowl|cproj|cprojf|cprojl|ceil|ceilf|ceill|cexp|cexpf|cexpl|clock|clog|clogf|clogl|clearerr|casin|casinh|casinhf|casinhl|casinf|casinl|cacos|cacosh|cacoshf|cacoshl|cacosf|cacosl|catan|catanh|catanhf|catanhl|catanf|catanl|calloc|carg|cargf|cargl|cabs|cabsf|cabsl|creal|crealf|creall|cbrt|cbrtf|cbrtl|time|toupper|tolower|tan|tanh|tanhf|tanhl|tanf|tanl|trunc|truncf|truncl|tgamma|tgammaf|tgammal|tmpnam|tmpfile|isspace|isnormal|isnan|iscntrl|isinf|isdigit|isunordered|isupper|ispunct|isprint|isfinite|iswspace|iswcntrl|iswctype|iswdigit|iswupper|iswpunct|iswprint|iswlower|iswalnum|iswalpha|iswgraph|iswxdigit|iswblank|islower|isless|islessequal|islessgreater|isalnum|isalpha|isgreater|isgreaterequal|isgraph|isxdigit|isblank|ilogb|ilogbf|ilogbl|imaxdiv|imaxabs|div|difftime|_Exit|ungetc|ungetwc|pow|powf|powl|puts|putc|putchar|putwc|putwchar|perror|printf|erf|erfc|erfcf|erfcl|erff|erfl|exit|exp|exp2|exp2f|exp2l|expf|expl|expm1|expm1f|expm1l|vsscanf|vsnprintf|vscanf|vsprintf|vswscanf|vswprintf|vprintf|vfscanf|vfprintf|vfwscanf|vfwprintf|vwscanf|vwprintf|va_start|va_copy|va_end|va_arg|qsort|fscanf|fsetpos|fseek|fclose|ftell|fopen|fdim|fdimf|fdiml|fpclassify|fputs|fputc|fputws|fputwc|fprintf|feholdexcept|fesetenv|fesetexceptflag|fesetround|feclearexcept|fetestexcept|feof|feupdateenv|feraiseexcept|ferror|fegetenv|fegetexceptflag|fegetround|fflush|fwscanf|fwide|fwprintf|fwrite|floor|floorf|floorl|fabs|fabsf|fabsl|fgets|fgetc|fgetpos|fgetws|fgetwc|freopen|free|fread|frexp|frexpf|frexpl|fmin|fminf|fminl|fmod|fmodf|fmodl|fma|fmaf|fmal|fmax|fmaxf|fmaxl|ldiv|ldexp|ldexpf|ldexpl|longjmp|localtime|localeconv|log|log1p|log1pf|log1pl|log10|log10f|log10l|log2|log2f|log2l|logf|logl|logb|logbf|logbl|labs|lldiv|llabs|llrint|llrintf|llrintl|llround|llroundf|llroundl|lrint|lrintf|lrintl|lround|lroundf|lroundl|lgamma|lgammaf|lgammal|wscanf|wcsstr|wcsspn|wcsncpy|wcsncat|wcsncmp|wcscspn|wcschr|wcscoll|wcscpy|wcscat|wcscmp|wcstoimax|wcstod|wcstoul|wcstoull|wcstoumax|wcstok|wcstof|wcstol|wcstold|wcstoll|wcstombs|wcspbrk|wcsftime|wcslen|wcsrchr|wcsrtombs|wcsxfrm|wctob|wctomb|wcrtomb|wprintf|wmemset|wmemchr|wmemcpy|wmemcmp|wmemmove|assert|asctime|asin|asinh|asinhf|asinhl|asinf|asinl|acos|acosh|acoshf|acoshl|acosf|acosl|atoi|atof|atol|atoll|atexit|atan|atanh|atanhf|atanhl|atan2|atan2f|atan2l|atanf|atanl|abs|abort|gets|getc|getchar|getenv|getwc|getwchar|gmtime|rint|rintf|rintl|round|roundf|roundl|rename|realloc|rewind|remove|remquo|remquof|remquol|remainder|remainderf|remainderl|rand|raise|bsearch|btowc|modf|modff|modfl|memset|memchr|memcpy|memcmp|memmove|mktime|malloc|mbsinit|mbstowcs|mbsrtowcs|mbtowc|mblen|mbrtowc|mbrlen",e=function(r){var t="break|case|continue|default|do|else|for|goto|if|_Pragma|return|switch|while|catch|operator|try|throw|using",o="asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|_Imaginary|int|int8_t|int16_t|int32_t|int64_t|long|short|signed|size_t|struct|typedef|uint8_t|uint16_t|uint32_t|uint64_t|union|unsigned|void|class|wchar_t|template|char16_t|char32_t",s="const|extern|register|restrict|static|volatile|inline|private|protected|public|friend|explicit|virtual|export|mutable|typename|constexpr|new|delete|alignas|alignof|decltype|noexcept|thread_local",l="and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|const_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace",d="NULL|true|false|TRUE|FALSE|nullptr",c=this.$keywords=this.createKeywordMapper(Object.assign({"keyword.control":t,"storage.type":o,"storage.modifier":s,"keyword.operator":l,"variable.language":"this","constant.language":d,"support.function.C99.c":i},r),"identifier"),p=/\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source,u="%"+/(\d+\$)?/.source+/[#0\- +']*/.source+/[,;:_]?/.source+/((-?\d+)|\*(-?\d+\$)?)?/.source+/(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source+/(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source+/(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source;this.$rules={start:[{token:"comment",regex:"//$",next:"start"},{token:"comment",regex:"//",next:"singleLineComment"},f.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment"},{token:"string",regex:"'(?:"+p+"|.)?'"},{token:"string.start",regex:'"',stateName:"qqstring",next:[{token:"string",regex:/\\\s*$/,next:"qqstring"},{token:"constant.language.escape",regex:p},{token:"constant.language.escape",regex:u},{token:"string.end",regex:'"|$',next:"start"},{defaultToken:"string"}]},{token:"string.start",regex:'R"\\(',stateName:"rawString",next:[{token:"string.end",regex:'\\)"',next:"start"},{defaultToken:"string"}]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"keyword",regex:"#\\s*(?:include|import|pragma|line|define|undef)\\b",next:"directive"},{token:"keyword",regex:"#\\s*(?:endif|if|ifdef|else|elif|ifndef)\\b"},{token:c,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*"},{token:"keyword.operator",regex:/--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\;|\\."},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],singleLineComment:[{token:"comment",regex:/\\$/,next:"singleLineComment"},{token:"comment",regex:/$/,next:"start"},{defaultToken:"comment"}],directive:[{token:"constant.other.multiline",regex:/\\/},{token:"constant.other.multiline",regex:/.*\\/},{token:"constant.other",regex:"\\s*<.+?>",next:"start"},{token:"constant.other",regex:'\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',next:"start"},{token:"constant.other",regex:"\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",next:"start"},{token:"constant.other",regex:/[^\\\/]+/,next:"start"}]},this.embedRules(f,"doc-",[f.getEndRule("start")]),this.normalizeRules()};m.inherits(e,a),g.c_cppHighlightRules=e}),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(n,g,h){var m=n("../range").Range,f=function(){};(function(){this.checkOutdent=function(a,i){return/^\s+$/.test(a)?/^\s*\}/.test(i):!1},this.autoOutdent=function(a,i){var e=a.getLine(i),r=e.match(/^(\s*\})/);if(!r)return 0;var t=r[1].length,o=a.findMatchingBracket({row:i,column:t});if(!o||o.row==i)return 0;var s=this.$getIndent(a.getLine(o.row));a.replace(new m(i,0,i,t-1),s)},this.$getIndent=function(a){return a.match(/^\s*/)[0]}}).call(f.prototype),g.MatchingBraceOutdent=f}),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(n,g,h){var m=n("../../lib/oop"),f=n("../../range").Range,a=n("./fold_mode").FoldMode,i=g.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};m.inherits(i,a),(function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,r,t){var o=e.getLine(t);if(this.singleLineBlockCommentRe.test(o)&&!this.startRegionRe.test(o)&&!this.tripleStarBlockCommentRe.test(o))return"";var s=this._getFoldWidgetBase(e,r,t);return!s&&this.startRegionRe.test(o)?"start":s},this.getFoldWidgetRange=function(e,r,t,o){var s=e.getLine(t);if(this.startRegionRe.test(s))return this.getCommentRegionBlock(e,s,t);var c=s.match(this.foldingStartMarker);if(c){var l=c.index;if(c[1])return this.openingBracketBlock(e,c[1],t,l);var d=e.getCommentFoldRange(t,l+c[0].length,1);return d&&!d.isMultiLine()&&(o?d=this.getSectionRange(e,t):r!="all"&&(d=null)),d}if(r!=="markbegin"){var c=s.match(this.foldingStopMarker);if(c){var l=c.index+c[0].length;return c[1]?this.closingBracketBlock(e,c[1],t,l):e.getCommentFoldRange(t,l,-1)}}},this.getSectionRange=function(e,r){var t=e.getLine(r),o=t.search(/\S/),s=r,l=t.length;r=r+1;for(var d=r,c=e.getLength();++r<c;){t=e.getLine(r);var p=t.search(/\S/);if(p!==-1){if(o>p)break;var u=this.getFoldWidgetRange(e,"all",r);if(u){if(u.start.row<=s)break;if(u.isMultiLine())r=u.end.row;else if(o==p)break}d=r}}return new f(s,l,d,e.getLine(d).length)},this.getCommentRegionBlock=function(e,r,t){for(var o=r.search(/\s*$/),s=e.getLength(),l=t,d=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,c=1;++t<s;){r=e.getLine(t);var p=d.exec(r);if(p&&(p[1]?c--:c++,!c))break}var u=t;if(u>l)return new f(l,o,u,r.length)}}).call(i.prototype)}),ace.define("ace/mode/c_cpp",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/c_cpp_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle"],function(n,g,h){var m=n("../lib/oop"),f=n("./text").Mode,a=n("./c_cpp_highlight_rules").c_cppHighlightRules,i=n("./matching_brace_outdent").MatchingBraceOutdent,e=n("./folding/cstyle").FoldMode,r=function(){this.HighlightRules=a,this.$outdent=new i,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new e};m.inherits(r,f),(function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(t,o,s){var l=this.$getIndent(o),d=this.getTokenizer().getLineTokens(o,t),c=d.tokens,p=d.state;if(c.length&&c[c.length-1].type=="comment")return l;if(t=="start"){var u=o.match(/^.*[\{\(\[]\s*$/);u&&(l+=s)}else if(t=="doc-start"){if(p=="start")return"";var u=o.match(/^\s*(\/?)\*/);u&&(u[1]&&(l+=" "),l+="* ")}return l},this.checkOutdent=function(t,o,s){return this.$outdent.checkOutdent(o,s)},this.autoOutdent=function(t,o,s){this.$outdent.autoOutdent(o,s)},this.$id="ace/mode/c_cpp",this.snippetFileId="ace/snippets/c_cpp"}).call(r.prototype),g.Mode=r}),ace.define("ace/mode/nix_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(n,g,h){var m=n("../lib/oop"),f=n("./text_highlight_rules").TextHighlightRules,a=function(){var i="true|false",e="with|import|if|else|then|inherit",r="let|in|rec",t=this.createKeywordMapper({"constant.language.nix":i,"keyword.control.nix":e,"keyword.declaration.nix":r},"identifier");this.$rules={start:[{token:"comment",regex:/#.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"constant",regex:"<[^>]+>"},{regex:"(==|!=|<=?|>=?)",token:["keyword.operator.comparison.nix"]},{regex:"((?:[+*/%-]|\\~)=)",token:["keyword.operator.assignment.arithmetic.nix"]},{regex:"=",token:"keyword.operator.assignment.nix"},{token:"string",regex:"''",next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',push:"qqstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:t,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{regex:"}",token:function(o,s,l){return l[1]&&l[1].charAt(0)=="q"?"constant.language.escape":"text"},next:"pop"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],qqdoc:[{token:"constant.language.escape",regex:/\$\{/,push:"start"},{token:"string",regex:"''",next:"pop"},{defaultToken:"string"}],qqstring:[{token:"constant.language.escape",regex:/\$\{/,push:"start"},{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:/\$\{/,push:"start"},{token:"string",regex:"'",next:"pop"},{defaultToken:"string"}]},this.normalizeRules()};m.inherits(a,f),g.NixHighlightRules=a}),ace.define("ace/mode/nix",["require","exports","module","ace/lib/oop","ace/mode/c_cpp","ace/mode/nix_highlight_rules","ace/mode/folding/cstyle"],function(n,g,h){var m=n("../lib/oop"),f=n("./c_cpp").Mode,a=n("./nix_highlight_rules").NixHighlightRules,i=n("./folding/cstyle").FoldMode,e=function(){f.call(this),this.HighlightRules=a,this.foldingRules=new i,this.$behaviour=this.$defaultBehaviour};m.inherits(e,f),(function(){this.lineCommentStart="#",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/nix"}).call(e.prototype),g.Mode=e}),function(){ace.require(["ace/mode/nix"],function(n){x&&(x.exports=n)})}()}(k)),k.exports}var b=R();const $=_(b),L=y({__proto__:null,default:$},[b]);export{L as m};
