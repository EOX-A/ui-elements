import{g as s}from"./index-DuuuSFPv.js";function i(a,r){for(var c=0;c<r.length;c++){const e=r[c];if(typeof e!="string"&&!Array.isArray(e)){for(const n in e)if(n!=="default"&&!(n in a)){const o=Object.getOwnPropertyDescriptor(e,n);o&&Object.defineProperty(a,n,o.get?o:{enumerable:!0,get:()=>e[n]})}}}return Object.freeze(Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}))}var t={exports:{}},A;function l(){return A||(A=1,function(a,r){ace.define("ace/theme/xcode-css",["require","exports","module"],function(c,e,n){n.exports=`/* THIS THEME WAS AUTOGENERATED BY Theme.tmpl.css (UUID: EE3AD170-2B7F-4DE1-B724-C75F13FE0085) */

.ace-xcode .ace_gutter {
  background: #e8e8e8;
  color: #333
}

.ace-xcode .ace_print-margin {
  width: 1px;
  background: #e8e8e8
}

.ace-xcode {
  background-color: #FFFFFF;
  color: #000000
}

.ace-xcode .ace_cursor {
  color: #000000
}

.ace-xcode .ace_marker-layer .ace_selection {
  background: #B5D5FF
}

.ace-xcode.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #FFFFFF;
}

.ace-xcode .ace_marker-layer .ace_step {
  background: rgb(198, 219, 174)
}

.ace-xcode .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #BFBFBF
}

.ace-xcode .ace_marker-layer .ace_active-line {
  background: rgba(0, 0, 0, 0.071)
}

.ace-xcode .ace_gutter-active-line {
  background-color: rgba(0, 0, 0, 0.071)
}

.ace-xcode .ace_marker-layer .ace_selected-word {
  border: 1px solid #B5D5FF
}

.ace-xcode .ace_constant.ace_language,
.ace-xcode .ace_keyword,
.ace-xcode .ace_meta,
.ace-xcode .ace_variable.ace_language {
  color: #C800A4
}

.ace-xcode .ace_invisible {
  color: #BFBFBF
}

.ace-xcode .ace_constant.ace_character,
.ace-xcode .ace_constant.ace_other {
  color: #275A5E
}

.ace-xcode .ace_constant.ace_numeric {
  color: #3A00DC
}

.ace-xcode .ace_entity.ace_other.ace_attribute-name,
.ace-xcode .ace_support.ace_constant,
.ace-xcode .ace_support.ace_function {
  color: #450084
}

.ace-xcode .ace_fold {
  background-color: #C800A4;
  border-color: #000000
}

.ace-xcode .ace_entity.ace_name.ace_tag,
.ace-xcode .ace_support.ace_class,
.ace-xcode .ace_support.ace_type {
  color: #790EAD
}

.ace-xcode .ace_storage {
  color: #C900A4
}

.ace-xcode .ace_string {
  color: #DF0002
}

.ace-xcode .ace_comment {
  color: #008E00
}

.ace-xcode .ace_indent-guide {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==) right repeat-y
}

.ace-xcode .ace_indent-guide-active {
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAZSURBVHjaYvj///9/hivKyv8BAAAA//8DACLqBhbvk+/eAAAAAElFTkSuQmCC") right repeat-y;
} 
`}),ace.define("ace/theme/xcode",["require","exports","module","ace/theme/xcode-css","ace/lib/dom"],function(c,e,n){e.isDark=!1,e.cssClass="ace-xcode",e.cssText=c("./xcode-css");var o=c("../lib/dom");o.importCssString(e.cssText,e.cssClass,!1)}),function(){ace.require(["ace/theme/xcode"],function(c){a&&(a.exports=c)})}()}(t)),t.exports}var d=l();const x=s(d),_=i({__proto__:null,default:x},[d]);export{_ as t};
